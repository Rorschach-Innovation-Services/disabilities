import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { Shell } from '../../components/shell';
import { useLocalStorage } from '../../hooks/storage';
import { useAxios } from '../../hooks/axios';
import { Loading } from '../../components/loading';
import { Questionnaire as EmbeddedQuestionnaire } from '../questionnaire/questionnaire';

// Respondent capture: Name, Email, Work Title
// On save: use logged-in user's company and department to save respondent, then open questionnaire
export const RespondentDetails = ({ companyID: propCompanyID, questionnaire: propQuestionnaire, departmentID: propDepartmentId, prefillRespondent: propPrefill, embedded }) => {
  const { push } = useHistory();
  const location = useLocation();
  const { companyId: lsCompanyId } = useLocalStorage();

  // Passed from Start Assessment / New Department
  // Prefer prop -> navigation state -> stored companyId (new key) -> legacy stored key
  const legacyCompanyID = typeof window !== 'undefined' ? localStorage.getItem('companyID') : '';
  const companyID = (propCompanyID ?? location.state?.companyID ?? lsCompanyId ?? legacyCompanyID) || null;
  const questionnaire = (propQuestionnaire ?? location.state?.questionnaire) || null;
  const presetDepartmentId = (propDepartmentId ?? location.state?.departmentID) || null;
  const prefill = (propPrefill ?? location.state?.prefillRespondent) || null;
  const isEmbedded = Boolean(embedded || propCompanyID || propQuestionnaire || propDepartmentId);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [workTitle, setWorkTitle] = useState('');

  // Requests
  const saveEmployeeReq = useAxios({ url: '/employees/register', method: 'post' });
  // Fetch admin profile (to derive company/department IDs if not in localStorage)
  const adminId = typeof window !== 'undefined' ? localStorage.getItem('adminID') : '';
  const profileReq = useAxios({ url: `/admin/${adminId}`, method: 'get' });

  // Local flow state
  const [flow, setFlow] = useState('idle'); // idle | saving-employee
  const [context, setContext] = useState({ companyId: '', departmentId: '' });
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [profileCompanyId, setProfileCompanyId] = useState('');
  const [profileDepartmentId, setProfileDepartmentId] = useState('');

  const loading = useMemo(
    () => saveEmployeeReq.loading,
    [saveEmployeeReq.loading]
  );

  const hasRequiredContext = Boolean(companyID && questionnaire);

  // Fetch profile once to derive company/department IDs if needed
  useEffect(() => {
    if (!adminId) return;
    profileReq.execute({});
  }, [adminId]);

  useEffect(() => {
    if (profileReq.loading || profileReq.error || !profileReq.response) return;
    const admin = profileReq.response?.admin || {};
    // Try common shapes for company & department identifiers
    const getId = (v) => (v && (v.id || v._id || v)) || '';
    const compId = admin.companyId || getId(admin.company) || '';
    const deptId = admin.departmentId || getId(admin.department) || '';
    if (compId) setProfileCompanyId(compId);
    if (deptId) setProfileDepartmentId(deptId);
  }, [profileReq.loading, profileReq.error, profileReq.response]);

  // Prefill if returned from questionnaire selection
  useEffect(() => {
    if (!prefill) return;
    if (prefill.name) setName(prefill.name);
    if (prefill.email) setEmail(prefill.email);
    if (prefill.workTitle) setWorkTitle(prefill.workTitle);
  }, [prefill]);

  const onNext = async () => {
    // Ensure we have the required context (company + questionnaire)
    if (!hasRequiredContext) return;

    // Prefer the logged-in user's company and department IDs
    const storedDepartmentId =
      typeof window !== 'undefined'
        ? (localStorage.getItem('departmentId') || localStorage.getItem('departmentID'))
        : null;

    const finalCompanyId = companyID || profileCompanyId; // derived from props/state/localStorage/profile
    const finalDepartmentId = presetDepartmentId || storedDepartmentId || profileDepartmentId;

    // If both are present, save employee directly using user's department
    if (finalCompanyId && finalDepartmentId) {
      setContext({ companyId: finalCompanyId, departmentId: finalDepartmentId });
      setFlow('saving-employee');
      const existingId = (() => { try { return localStorage.getItem('respondentEmployeeId') || undefined; } catch { return undefined; } })();
      saveEmployeeReq.executeWithData({
        name,
        email,
        company: finalCompanyId,
        department: finalDepartmentId,
        workTitle,
        employeeId: existingId,
      });
      return;
    }

    // If department is missing, block and surface a clear message
    // (No auto-creation of departments in this flow)
    console.warn('Missing departmentId for respondent; ensure user profile has it.');
    };

  // No department creation path anymore

  // After saving employee, proceed to questionnaire
  useEffect(() => {
    if (flow !== 'saving-employee') return;
    if (saveEmployeeReq.loading) return;
    if (saveEmployeeReq.error) return;

    const qId = questionnaire?.id;
    const { companyId, departmentId } = context;
    if (!qId || !companyId || !departmentId) return;

    // Persist respondent identity for this session to drive per-employee views
    const eid = saveEmployeeReq.response?.employee;
    try { if (eid) localStorage.setItem('respondentEmployeeId', eid); } catch {}
    try { if (email) localStorage.setItem('respondentEmail', email); } catch {}
    try { if (departmentId) localStorage.setItem('respondentDepartmentId', departmentId); } catch {}
    try { if (companyId) localStorage.setItem('respondentCompanyId', companyId); } catch {}

    // If respondent is embedded in Start Assessment, render inline
    if (isEmbedded) {
      setShowQuestionnaire(true);
    } else {
      // Otherwise, take the user to the questionnaire route
      push(`/questionnaire/${qId}/${companyId}/${departmentId}/`);
    }
  }, [flow, saveEmployeeReq.response, saveEmployeeReq.error, saveEmployeeReq.loading]);

  // Always render the form — allow starting without prior context

  // When ready, render the questionnaire inline with combined payload on submit
  if (showQuestionnaire) {
    return (
      <EmbeddedQuestionnaire
        companyId={context.companyId || companyID}
        departmentId={context.departmentId || presetDepartmentId}
        questionnaireId={questionnaire?.id}
        initialEmployee={{ name, email, workTitle }}
      />
    );
  }

  // Loading screen when making requests
  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          textAlign: 'center',
          transform: 'translateY(50%)',
        }}
      >
        <Loading
          textSx={{ fontSize: '25px' }}
          loadingSx={{ width: '250px !important', height: '250px !important' }}
          containerSx={{ margin: 'auto', marginTop: '-100px', textAlign: 'center' }}
        />
      </Box>
    );
  }

  const errorMessage = saveEmployeeReq.error?.data?.message || '';

  // Determine if we have enough context to proceed (prevents a no-op click)
  const storedDeptIdForDisable =
    typeof window !== 'undefined'
      ? (localStorage.getItem('departmentId') || localStorage.getItem('departmentID'))
      : '';
  const canProceed = Boolean(
    name.trim() &&
    email.trim() &&
    workTitle.trim() &&
    questionnaire &&
    (presetDepartmentId || storedDeptIdForDisable || profileDepartmentId) &&
    (companyID || profileCompanyId)
  );

  return (
    <Shell heading="Employee Details">
      <Container sx={{ maxWidth: '800px !important' }}>
        <Typography sx={{ mb: 3 }}>
          Please enter your details before starting the assessment.
        </Typography>

        {errorMessage && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Work Title"
            value={workTitle}
            onChange={(e) => setWorkTitle(e.target.value)}
          />

          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2, mt: 2 }}>
            {!isEmbedded && (
              <Button
                variant="contained"
                sx={{ backgroundColor: '#000', color: '#fff', textTransform: 'none', borderRadius: '10px' }}
                onClick={() => push('/assessment/questions')}
              >
                Back
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ backgroundColor: '#000', color: '#fff', textTransform: 'none', borderRadius: '10px' }}
              disabled={!canProceed}
              onClick={onNext}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </Shell>
  );
};
