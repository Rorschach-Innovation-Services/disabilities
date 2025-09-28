import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { Shell } from '../../components/shell';
import { useLocalStorage } from '../../hooks/storage';
import { useAxios } from '../../hooks/axios';
import { Questionnaire as EmbeddedQuestionnaire } from '../questionnaire/questionnaire';

// Respondent capture: Name, Email, Work Title
// On continue: reuse logged-in user's company/department context and pass details to the questionnaire
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
  const [emailTouched, setEmailTouched] = useState(false);

  // Simple email validation
  const isValidEmail = (value) => {
    const v = String(value || '').trim();
    // Basic RFC 5322-compatible pattern for typical cases
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  // Requests
  // Fetch admin profile (to derive company/department IDs if not in localStorage)
  const adminId = typeof window !== 'undefined' ? localStorage.getItem('adminID') : '';
  const profileReq = useAxios({ url: `/admin/${adminId}`, method: 'get' });
  const [context, setContext] = useState({ companyId: '', departmentId: '' });
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [initialEmployeePayload, setInitialEmployeePayload] = useState(null);
  const [profileCompanyId, setProfileCompanyId] = useState('');
  const [profileDepartmentId, setProfileDepartmentId] = useState('');

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
    // Guard against invalid email or incomplete fields
    if (!name.trim() || !email.trim() || !workTitle.trim() || !isValidEmail(email)) {
      setEmailTouched(true);
      return;
    }
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
    if (!finalCompanyId || !finalDepartmentId) {
      console.warn('Missing departmentId for respondent; ensure user profile has it.');
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedWorkTitle = workTitle.trim();
    const employeePayload = {
      name: trimmedName,
      email: trimmedEmail,
      workTitle: trimmedWorkTitle,
    };

    setContext({ companyId: finalCompanyId, departmentId: finalDepartmentId });
    setInitialEmployeePayload(employeePayload);

    if (isEmbedded) {
      setShowQuestionnaire(true);
      return;
    }

    if (!questionnaire?.id) return;

    push(
      `/questionnaire/${questionnaire.id}/${finalCompanyId}/${finalDepartmentId}/`,
      {
        initialEmployee: employeePayload,
      },
    );
  };

  // No department creation path anymore

  // Always render the form — allow starting without prior context

  // When ready, render the questionnaire inline with combined payload on submit
  if (showQuestionnaire) {
    return (
      <EmbeddedQuestionnaire
        companyId={context.companyId || companyID}
        departmentId={context.departmentId || presetDepartmentId}
        questionnaireId={questionnaire?.id}
        initialEmployee={initialEmployeePayload || { name, email, workTitle }}
      />
    );
  }

  // Determine if we have enough context to proceed (prevents a no-op click)
  const storedDeptIdForDisable =
    typeof window !== 'undefined'
      ? (localStorage.getItem('departmentId') || localStorage.getItem('departmentID'))
      : '';
  const canProceed = Boolean(
    name.trim() &&
    email.trim() &&
    isValidEmail(email) &&
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
            onBlur={() => setEmailTouched(true)}
            error={emailTouched && Boolean(email) && !isValidEmail(email)}
            helperText={
              emailTouched && Boolean(email) && !isValidEmail(email)
                ? 'Please enter a valid email address'
                : ' '
            }
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
