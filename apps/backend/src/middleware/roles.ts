/**
 * Role and permission middleware utilities
 * Enforces route access based on roles and company scoping.
 */
import { Request, Response, NextFunction } from 'express';
import { Employee, Department } from '../models';

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

    // Pivot: allow all except admin management endpoints
    if (isPivot(role)) {
      if ((request.baseUrl || '').toLowerCase().includes('/admin'))
        return response
          .status(403)
          .json({ message: 'Forbidden - Pivot cannot access admin endpoints' });
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

  // Admin endpoints: allow self-profile for clients, deny management
  if ((request.baseUrl || '').toLowerCase().includes('/admin')) {
    const method = request.method.toUpperCase();
    const path = (request.path || '').toLowerCase();
    const targetId = (request.params as any).id;
    const isSelf = targetId && targetId === (user?.id || '');

    const isSelfProfileRead = method === 'GET' && !!targetId && !path.includes('/clients');
    const isSelfProfileUpdate =
      method === 'POST' && !!targetId &&
      (path.includes('/update-profile') || path.includes('/update-password'));

    if (isSelf && (isSelfProfileRead || isSelfProfileUpdate)) return next();

    return response.status(403).json({
      message: 'Forbidden - Clients cannot access admin management endpoints',
    });
  }

      const method = request.method.toUpperCase();
  // Company-level scoping
  if ((request.baseUrl || '').toLowerCase().includes('/company')) {
    // client_normal: no company endpoints
    if (role === 'client_user')
      return response.status(403).json({ message: 'Forbidden - Insufficient access' });
        // Only allow read-only and only for own company
        if (method !== 'GET')
          return response
            .status(403)
            .json({ message: 'Forbidden - Clients have read-only access' });
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
