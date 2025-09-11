/**
 * Role and permission middleware utilities
 * Enforces route access based on roles and company scoping.
 */
import { Request, Response, NextFunction } from 'express';
import { Employee, Department, Administrator } from '../models';

type UserToken = {
  email: string;
  role: string;
  id: string;
  companyId?: string;
};

const isAdmin = (role?: string) =>
  role === 'administrator' || role === 'admin';
const isPivot = (role?: string) => role === 'pivot';
const isClient = (role?: string) =>
  role === 'client' || role === 'client_super' || role === 'client_user';

const isAssessmentRoute = (req: Request) =>
  (req.baseUrl || '')
    .toLowerCase()
    .includes('/assessment') || (req.baseUrl || '').toLowerCase().includes('/questionnaire');

/**
 * Default check used across routes. Keeps backwards-compatibility with existing imports.
 * Rules:
 * - Admin: everything
 * - Pivot: everything except /admin routes
 * - Client (client_super, client_user):
 *   - No access to assessment/questionnaire endpoints
 *   - Read-only, scoped to own company where applicable
 */
export const checkRole = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const user = (request as any).user as UserToken | undefined;
    const role = (user?.role || '').toLowerCase();
    if (!role) {
      return response
        .status(401)
        .json({ message: 'Unauthorized! - Limited Permission' });
    }

    // Admin: allow all
    if (isAdmin(role)) return next();

  // Pivot: allow, rely on route-level guards
  if (isPivot(role)) {
    return next();
  }

    // Client roles: more restrictive
    if (isClient(role)) {
      // Default: block assessments/questionnaires, with a narrow allow-list below
      if (isAssessmentRoute(request)) {
        const method = request.method.toUpperCase();
        const base = (request.baseUrl || '').toLowerCase();
        const path = (request.path || '').toLowerCase();

        // Allow GET /api/assessments/departments/:departmentId for clients (controller will scope results)
        const isDeptAssessments =
          base.includes('/assessments') &&
          method === 'GET' &&
          path.startsWith('/departments/');

        if (isDeptAssessments) return next();

        return response
          .status(403)
          .json({ message: 'Forbidden - Clients cannot access assessments' });
      }

  // Admin endpoints: for client roles, rely on route-level guards and specific middlewares
  // Keep broader restrictions elsewhere (assessment/company/department/employee) intact.

      const method = request.method.toUpperCase();
  // Company-level scoping
  const baseLower = (request.baseUrl || '').toLowerCase();
  if (baseLower.includes('/company') || baseLower.includes('/companies')) {
    // client_normal: no company endpoints
    if (role === 'client_user')
      return response.status(403).json({ message: 'Forbidden - Insufficient access' });
        // Only allow read-only and only for own company
        if (method !== 'GET')
          return response
            .status(403)
            .json({ message: 'Forbidden - Clients have read-only access' });
        const base = (request.baseUrl || '').toLowerCase();
        const path = (request.path || '').toLowerCase();
        // Allow list endpoint for client_super; controller will filter to own company
        if (role === 'client_super' && base.includes('/companies') && (path === '/' || path === '')) {
          return next();
        }
        const paramCompanyId =
          (request.params as any).id || (request.params as any).companyId;
        if (!paramCompanyId || paramCompanyId !== (user?.companyId || ''))
          return response.status(403).json({
            message: 'Forbidden - Client limited to own company data',
          });
        return next();
      }

  // Department scoping
  if ((request.baseUrl || '').toLowerCase().includes('/department')) {
    if (role === 'client_user')
      return response.status(403).json({ message: 'Forbidden - Insufficient access' });
        if (method !== 'GET')
          return response
            .status(403)
            .json({ message: 'Forbidden - Clients have read-only access' });

        const { departmentId, companyId } = request.params as any;
        if (companyId) {
          if (companyId !== (user?.companyId || ''))
            return response.status(403).json({
              message: 'Forbidden - Client limited to own company departments',
            });
          return next();
        }
        if (departmentId) {
          const department = await Department.get({ id: departmentId });
          if (!department || department.companyId !== (user?.companyId || ''))
            return response.status(403).json({
              message: 'Forbidden - Department not within your company',
            });
          return next();
        }
        // No identifiable scope; deny by default
        return response
          .status(403)
          .json({ message: 'Forbidden - Missing scope for client access' });
      }

  // Employee scoping
  if ((request.baseUrl || '').toLowerCase().includes('/employee')) {
    if (role === 'client_user')
      return response.status(403).json({ message: 'Forbidden - Insufficient access' });
        if (method !== 'GET')
          return response
            .status(403)
            .json({ message: 'Forbidden - Clients have read-only access' });

        const { id: employeeId } = request.params as any;
        if (employeeId) {
          const employee = await Employee.get({ id: employeeId });
          if (!employee || employee.companyId !== (user?.companyId || ''))
            return response.status(403).json({
              message: 'Forbidden - Employee not within your company',
            });
          return next();
        }
        // No identifiable scope; deny by default
        return response
          .status(403)
          .json({ message: 'Forbidden - Missing scope for client access' });
      }

      // Otherwise, allow by default for client roles when not sensitive
      return next();
    }

    // Unknown role
    return response.status(403).json({ message: 'Forbidden - Unknown role' });
  } catch (err) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

/** Simple helper to require specific roles on a route */
export const requireRole = (roles: string[]) =>
  (request: Request, response: Response, next: NextFunction) => {
    const user = (request as any).user as UserToken | undefined;
    const role = (user?.role || '').toLowerCase();
    if (!role) return response.status(401).json({ message: 'Unauthorized' });
    if (roles.map((r) => r.toLowerCase()).includes(role)) return next();
    return response.status(403).json({ message: 'Forbidden - Insufficient role' });
  };

/** Allow if admin or operating on own resource id */
export const requireSelfOrAdmin = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const user = (request as any).user as UserToken | undefined;
  const role = (user?.role || '').toLowerCase();
  const targetId = (request.params as any).id;
  if (!user) return response.status(401).json({ message: 'Unauthorized' });
  if (isAdmin(role)) return next();
  if (targetId && targetId === user.id) return next();
  return response.status(403).json({ message: 'Forbidden - Not your resource' });
};

/**
 * Allow if admin, self, or a manager role acting on permitted client users.
 * - Pivot: may manage (view/update profile) client users (client_super, client_user, client) across companies
 * - Client Super: may manage client normal users (client_user) within own company
 */
export const requireSelfOrAdminOrManager = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const user = (request as any).user as UserToken | undefined;
    if (!user) return response.status(401).json({ message: 'Unauthorized' });
    const role = (user?.role || '').toLowerCase();
    const targetId = (request.params as any).id;
    if (!targetId) return response.status(400).json({ message: 'Target ID required' });

    // Admin or self
    if (isAdmin(role) || targetId === (user?.id || '')) return next();

    // Fetch target user to evaluate role/company
    let target: any;
    try {
      target = await Administrator.get({ id: targetId });
    } catch (_) {
      target = undefined;
    }
    if (!target || target.deleted)
      return response.status(404).json({ message: 'User not found' });

    const tRole = String(target.role || '').toLowerCase();
    const isClientTarget = tRole === 'client' || tRole === 'client_user' || tRole === 'client_super';

    if (role === 'pivot') {
      if (isClientTarget) return next();
      return response.status(403).json({ message: 'Forbidden - Pivot limited to client users' });
    }

    if (role === 'client_super') {
      const sameCompany = (target.companyId || '') === (user.companyId || '');
      if (sameCompany && tRole === 'client_user') return next();
      return response.status(403).json({ message: 'Forbidden - Client Super limited to client users in company' });
    }

    return response.status(403).json({ message: 'Forbidden - Insufficient access' });
  } catch (err) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
