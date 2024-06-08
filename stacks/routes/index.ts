/**
 * Export route instances
 */
import { adminRoutes } from './admin';
import { employeeRoutes } from './employee';
import { companyRoutes } from './company';
import { questionRoutes } from './questions';
import { assessmentRoutes } from './assessment';
import { taskRoutes } from './tasks';
import { departmentRoutes } from './department';
import { questionnaireRoutes } from './questionnaire.ts';

export default {
  adminRoutes,
  employeeRoutes,
  companyRoutes,
  questionRoutes,
  assessmentRoutes,
  departmentRoutes,
  taskRoutes,
  questionnaireRoutes,
};
