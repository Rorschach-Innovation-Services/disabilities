import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { SignInPage } from '../pages/sign-in/sign-in';
import { CssBaseline } from '@mui/material';
import { Questionnaire } from '../pages/questionnaire/questionnaire';
import { CreatePassword } from '../pages/create-password/create-password';
import { Dashboard } from '../pages/dashboard/dashboard';
import { RegisterAdmin } from '../pages/register-admin/register-admin';
import { GenerateLink } from '../pages/generate-link/generate-link';
import { Assessment } from '../pages/assessment/assessment';
import { useLocalStorage } from '../hooks/storage';
import { ContactUs } from '../pages/contact-us/contact';
import { ClientsPage } from '../pages/clients/clients-page';
import { SingleClientPage } from '../pages/clients/single-client';
import { AboutUs } from '../pages/about-us/about-us';
import { Index } from '../pages/home/index';
import { Research } from '../pages/research/research';
import { Services } from '../pages/services/services';
import { Dale } from '../pages/team-members/dale-rae';
import { Philippa } from '../pages/team-members/philippa-forshaw';
import { Arron } from '../pages/team-members/arron-correira';
import { Paula } from '../pages/team-members/paula-pienaar';
import { EmployeeView } from '../pages/employee/employee';
import { EmployeesPage } from '../pages/clients/employees-page';
import {
  AutonomicNervous,
  ComputerGamers,
  CircadianRhythmsComponent,
  WorkplacePerformanceComponent,
  AfricanOrigins,
  ApnoeaWearableDevice,
  ConcussionHistoryOutcomes,
  ExerciseIntervention,
  GutMicrobiotaAndCardiometabolic,
  LowSocioEconomic,
  LowIncome,
  ObstructiveApnoea,
  RuralSleepPatterns,
  SedentaryBehaviourAfricanWoman,
  SleepDeprivation,
  TravelJetlag,
} from '../pages/articles/index';
import { ClientDetails } from '../pages/company/client-details';
import { EmployeeDetails } from '../pages/company/employee-details';
import { CompanyUsers } from '../pages/company/company-users';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { Staff } from '../pages/staff/staff';
import { StaffEdit } from '../pages/staff/staff-edit';
import { Settings } from '../pages/settings/settings';
import { RegisterCompanyDepartment } from '../pages/register-client/register.client';
import { RespondentDetails } from '../pages/assessment/respondent';
import { QuestionnaireBank } from '../pages/questionnaire-bank/banks';
import { QuestionnaireAdd } from '../pages/questionnaire-add/add';
import { LiveDashboard } from '../pages/live-dashboard/dashboard';
import { ActionPlan } from '../pages/live-dashboard/components/actionplan';

const ProtectedRoute = (routeProps) => {
  const { name, token } = useLocalStorage();

  return !name || !token ? (
    <Redirect to="/sign-in" />
  ) : (
    <Route {...routeProps} />
  );
};

const RoleRoute = ({ allowed = [], ...routeProps }) => {
  const { token, role } = useLocalStorage();
  const norm = (role || '').toLowerCase();
  const allowedNorm = allowed.map((r) => String(r).toLowerCase());
  if (!token) return <Redirect to="/sign-in" />;
  if (allowedNorm.length > 0 && !allowedNorm.includes(norm)) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...routeProps} />;
};

const ScrollToTop = withRouter(({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
});

export const Routes = () => {
  console.log('ROutes is being rendered');
  return (
    <BrowserRouter>
      <CssBaseline />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/research" component={Research} />
        <Route
          exact
          path="/articles/workplace-performance"
          component={WorkplacePerformanceComponent}
        />
        <Route
          exact
          path="/articles/autonomic-nervous"
          component={AutonomicNervous}
        />
        <Route
          exact
          path="/articles/computer-gamers"
          component={ComputerGamers}
        />
        <Route
          exact
          path="/articles/circadian-rhythms"
          component={CircadianRhythmsComponent}
        />
        <Route
          exact
          path="/articles/african-origins"
          component={AfricanOrigins}
        />
        <Route
          exact
          path="/articles/apnoea-wearable-device"
          component={ApnoeaWearableDevice}
        />
        <Route
          exact
          path="/articles/concussion-history-outcomes"
          component={ConcussionHistoryOutcomes}
        />
        <Route
          exact
          path="/articles/exercise-intervention"
          component={ExerciseIntervention}
        />
        <Route
          exact
          path="/articles/gut-microbiota-and-cardiometabolic"
          component={GutMicrobiotaAndCardiometabolic}
        />
        <Route exact path="/articles/low-income" component={LowIncome} />
        <Route
          exact
          path="/articles/obstructive-apnoea"
          component={ObstructiveApnoea}
        />
        <Route
          exact
          path="/articles/low-socio-economic"
          component={LowSocioEconomic}
        />
        <Route
          exact
          path="/articles/rural-sleep-patterns"
          component={RuralSleepPatterns}
        />
        <Route
          exact
          path="/articles/sedentary-behaviour-african-woman"
          component={SedentaryBehaviourAfricanWoman}
        />
        <Route
          exact
          path="/articles/sleep-deprivation"
          component={SleepDeprivation}
        />
        <Route exact path="/articles/travel-jetlag" component={TravelJetlag} />
        <Route exact path="/services" component={Services} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/dale-rae" component={Dale} />
        <Route exact path="/paula-pienaar" component={Paula} />
        <Route exact path="/philippa-forshaw" component={Philippa} />
        <Route exact path="/arron-correira" component={Arron} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/sign-in" component={SignInPage} />
        <Route
          exact
          path="/questionnaire/:questionnaireId/:companyId/:departmentId/"
          component={Questionnaire}
        />
        <RoleRoute allowed={["administrator", "admin", "pivot"]}
          exact
          path="/questionnaire-bank"
          component={QuestionnaireBank}
        />
        <RoleRoute allowed={["administrator", "admin", "pivot"]}
          exact
          path="/questionnaire-add"
          component={QuestionnaireAdd}
        />
        <RoleRoute allowed={["client_super", "client_user"]}
          exact
          path="/assessment/questions"
          component={Assessment}
        />
        <RoleRoute allowed={["administrator", "admin", "pivot", "client_super", "client_user"]}
          exact
          path="/assessment/new-department"
          component={RegisterCompanyDepartment}
        />
        <RoleRoute allowed={["client_super", "client_user"]}
          exact
          path="/assessment/respondent"
          component={RespondentDetails}
        />
        <ProtectedRoute exact path={`/settings`} component={Settings} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute
          exact
          path="/live-dashboard"
          component={LiveDashboard}
        />
        <ProtectedRoute
          exact
          path="/employee/:employeeId"
          component={EmployeeView}
        />
        <ProtectedRoute
          exact
          path="/departments/:departmentId"
          component={EmployeesPage}
        />
        <RoleRoute allowed={["administrator", "admin", "pivot"]}
          exact
          path="/clients/:companyID"
          component={SingleClientPage}
        />
        <Route exact path="/create-password/:id" component={CreatePassword} />
        <Route exact path="/forgot-password" component={ForgotPassword} />

        <ProtectedRoute exact path="/action-plan" component={ActionPlan} />
        
        <RoleRoute allowed={["administrator", "admin", "pivot"]} exact path="/clients" component={ClientsPage} />
        <RoleRoute allowed={["administrator", "admin"]} exact path="/staff" component={Staff} />
        <RoleRoute allowed={["administrator", "admin"]} exact path="/staff/:id/edit" component={StaffEdit} />
        <RoleRoute
          exact
          path="/register-admin"
          component={RegisterAdmin}
          allowed={["administrator", "admin"]}
        />
        <RoleRoute allowed={["administrator", "admin", "pivot", "client_super", "client_user"]} exact path="/generate-link" component={GenerateLink} />
        <RoleRoute
          exact
          allowed={["administrator", "admin", "pivot", "client_super"]}
          path="/company/:companyID/users"
          component={CompanyUsers}
        />
        <ProtectedRoute
          exact
          path={`/clients/:company/details`}
          component={ClientDetails}
        />
        <ProtectedRoute
          exact
          path={`/clients/:company/:employee/details`}
          component={EmployeeDetails}
        />

        <Route>
          <h1>Page not found!</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
