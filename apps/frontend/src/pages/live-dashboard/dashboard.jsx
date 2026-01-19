import { Shell } from '../../components/shell';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Stack,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useAxios } from '../../hooks/axios';
import { useLocalStorage } from '../../hooks/storage';
import { Loading } from '../../components/loading';
import { Colours } from '../../colours';

import PolarBalanceWheel from './components/PolarBalanceWheel';
import PolarSectorWheel from './components/PolarSectorWheel';
import PolarSubWheel from './components/PolarSubWheel';
import { Slideshow } from './components/slideshow';
import ChartSwitcherBanner from "./components/ChartSwitcherBanner";

// 🔹 Role helpers
const normalizeRole = (role) => String(role || '').toLowerCase();
const isAdmin = (role) => ["admin", "administrator"].includes(normalizeRole(role));
const isPivot = (role) => normalizeRole(role) === "pivot";
const isSuper = (role) => normalizeRole(role) === "client_super";
const isClientUser = (role) => normalizeRole(role) === "client_user";
const isAdminOrPivot = (role) => isAdmin(role) || isPivot(role);

export const LiveDashboard = () => {
  const location = useLocation();
  const [isSlideshowOpen, setSlideshowOpen] = useState(false);

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);

  const { role, companyId } = useLocalStorage();
  const [employeeIdFilter, setEmployeeIdFilter] = useState('');

  const [presetCompany, setPresetCompany] = useState('');
  const [presetDepartment, setPresetDepartment] = useState('');
  const [resolvedCompanyName, setResolvedCompanyName] = useState('');
  const [resolvedDepartmentName, setResolvedDepartmentName] = useState('');

  const [spiderChart, setSpiderChart] = useState(null);
  const [chartView, setChartView] = useState("sector");

  // API hooks
  const clientsRequest = useAxios({ url: '/companies', method: 'get' });
  const assessmentsRequest = useAxios({ url: '/assessments/departments/{departmentId}', method: 'get' });
  // Attempt to fetch questionnaires so we can display the wheel exactly in questionnaire order
  const questionnairesRequest = useAxios({ url: '/questionnaires', method: 'get' });
  const [questionnaireAxes, setQuestionnaireAxes] = useState(null);

  // Populate questionnaire axes (when available) so we can use the authoritative order
  useEffect(() => {
    questionnairesRequest.execute();
  }, []);

  useEffect(() => {
    if (questionnairesRequest.response && !questionnairesRequest.error) {
      try {
        const qList = questionnairesRequest.response.questionnaires || [];
        // Prefer the Pivot questionnaire: order 3 or name 'Pivot'
        const q = qList.find((qq) => qq.order === 3) || qList.find((qq) => String(qq.name || '').toLowerCase() === 'pivot') || qList[0];
        if (q && Array.isArray(q.questions)) {
          const axes = q.questions.map((ques, idx) => `${ques.category} - ${ques.label} ${idx + 1}`);
          setQuestionnaireAxes(axes);
        }
      } catch (e) {
        // ignore; will fallback to hard-coded axis set
      }
    }
  }, [questionnairesRequest.response, questionnairesRequest.error]);


  // 🔹 Fetch companies (only admin/pivot/super)
  useEffect(() => {
    if (isAdminOrPivot(role) || isSuper(role)) {
      clientsRequest.execute();
    }
  }, [role]);

  // 🔹 Parse query/localStorage presets
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search || '');
      const eid = params.get('employeeId') || localStorage.getItem('respondentEmployeeId') || '';
      const dept = params.get('departmentId') || localStorage.getItem('respondentDepartmentId') || '';
      const comp = params.get('companyId') || localStorage.getItem('respondentCompanyId') || '';

      setEmployeeIdFilter(eid);
      setPresetDepartment(dept);
      setPresetCompany(comp);

      if (isClientUser(role) || isSuper(role)) {
        if (comp) setSelectedClient(comp);
        if (dept) setSelectedDepartment(dept);
      }
    } catch {}
  }, [location.search, role]);

  // 🔹 Build department list (admin/pivot only)
  useEffect(() => {
    if (isClientUser(role) || isSuper(role)) return;
    setSelectedDepartment('');
    setDepartments([]);

    const client = clients.find((c) => c.id === selectedClient);
    if (client) {
      setDepartments(client.departments || []);
      if ((client.departments || []).length > 0) {
        setSelectedDepartment(client.departments[0].id);
      }
    }
  }, [selectedClient, clients, role]);

  // 🔹 Fetch assessments
  useEffect(() => {
    if (!selectedDepartment) return;

    let url = `/assessments/departments/${selectedDepartment}`;
    if (isClientUser(role)) {
      if (!employeeIdFilter) return;
      url += `?employeeId=${encodeURIComponent(employeeIdFilter)}`;
    }
    assessmentsRequest.executeWithParameters({ url, method: 'get' })();
  }, [selectedDepartment, employeeIdFilter, role]);

  // 🔹 Handle company filtering
  useEffect(() => {
    if (clientsRequest.response && !clientsRequest.error) {
      const allCompanies = clientsRequest.response.companies || [];
      let companies = [];

      if (isAdminOrPivot(role)) {
        companies = allCompanies;
      } else if (isSuper(role)) {
        companies = allCompanies
          .filter((c) => c.id === companyId)
          .map((c) => ({
            ...c,
            departments: (c.departments || []).filter((d) => d.id === presetDepartment),
          }));
      }

      setClients(companies);

      if (companies.length > 0) {
        const preferredCompanyId = companies[0].id;
        setSelectedClient(preferredCompanyId);

        const deps = companies[0].departments || [];
        if (deps.length > 0) {
          setSelectedDepartment(deps[0].id);
        }
      } else {
        setSelectedClient('');
        setDepartments([]);
        setSelectedDepartment('');
      }
    }
  }, [clientsRequest.response, clientsRequest.error, presetCompany, presetDepartment, role, companyId]);

  // 🔹 Save spider chart
  // Frontend-only correction: Theresa provided the questionnaire order and numbers.
  // We map incoming spider data to the questionnaire order (including question numbers)
  // and recompute sector/sub summaries so charts reflect the real questionnaire layout.
  const applySpiderCorrections = (spider) => {
    if (!spider) return null;

    const incomingAxes = Array.isArray(spider.axes) ? spider.axes : [];
    const incomingRaw = spider.dataRaw || spider.raw || [];
    const incomingPct = spider.dataPct || spider.pct || [];
    const axesLen = 15;

    // Only apply correction when we have full 15-axis data; otherwise return as-is
    if (!Array.isArray(incomingRaw) || incomingRaw.length !== axesLen) return spider;

    // Use questionnaire-derived axes if available, otherwise fall back to the expected canonical array
    const DEFAULT_AXES = [
      'Prepare - Space 1', 'Prepare - Culture 2', 'Prepare - Person 3',
      'Integrate - Person 4', 'Integrate - Culture 5', 'Integrate - Space 6',
      'Value-Add - Person 7', 'Value-Add - Culture 8', 'Value-Add - Space 9',
      'Optimise - Space 10', 'Optimise - Culture 11', 'Optimise - Person 12',
      'Transfer - Person 13', 'Transfer - Culture 14', 'Transfer - Space 15',
    ];

    const desiredAxes = Array.isArray(questionnaireAxes) && questionnaireAxes.length === axesLen ? questionnaireAxes : DEFAULT_AXES;

    const correctedRaw = Array(axesLen).fill(0);
    const correctedPct = Array(axesLen).fill(0);

    // Helper to extract sector and sub without numbers for matching
    const parseAxis = (axisLabel) => {
      if (!axisLabel) return { sector: '', sub: '' };
      const parts = axisLabel.split(' - ');
      const sector = (parts[0] || '').trim();
      const sub = ((parts[1] || '').trim().split(/\s+/)[0] || '').trim();
      return { sector, sub };
    };

    // Build corrected arrays by finding matching incoming axis entries by sector/sub
    desiredAxes.forEach((desired, i) => {
      const { sector: wantSector, sub: wantSub } = parseAxis(desired);
      const incomingIndex = incomingAxes.findIndex((a) => {
        const { sector, sub } = parseAxis(a);
        return sector.toLowerCase() === wantSector.toLowerCase() && sub.toLowerCase() === wantSub.toLowerCase();
      });

      correctedRaw[i] = incomingIndex >= 0 ? Number(incomingRaw[incomingIndex] || 0) : 0;
      correctedPct[i] = incomingIndex >= 0 ? Number(incomingPct[incomingIndex] || 0) : 0;
    });

    // Recompute sectorSummary from corrected raw values
    const maxScore = Number(spider.meta?.maxScore) || 5;
    const SECTORS = ['Prepare', 'Integrate', 'Value-Add', 'Optimise', 'Transfer'];

    const sectorSummary = SECTORS.map((sector, sIdx) => {
      const base = sIdx * 3;
      const values = [correctedRaw[base], correctedRaw[base + 1], correctedRaw[base + 2]];
      const rawAvg = values.reduce((a, b) => a + Number(b || 0), 0) / 3;
      const raw = parseFloat(rawAvg.toFixed(2));
      const pct = parseFloat(((raw / maxScore) * 100).toFixed(1));
      const count = 0; // counts are not available reliably here
      return { sector, raw, pct, count };
    });

    // Recompute subSummary (Space, Person, Culture)
    const SUBS = ['Space', 'Person', 'Culture'];
    const subSummary = SUBS.map((sub, subIdx) => {
      const indices = [0, 1, 2, 3, 4].map((s) => s * 3 + subIdx);
      const vals = indices.map((i) => correctedRaw[i] || 0);
      const rawAvg = vals.reduce((a, b) => a + Number(b || 0), 0) / vals.length;
      const raw = parseFloat(rawAvg.toFixed(2));
      const pct = parseFloat(((raw / maxScore) * 100).toFixed(1));
      const count = 0;
      return { sub, raw, pct, count };
    });

    return {
      ...spider,
      axes: desiredAxes,
      dataRaw: correctedRaw,
      dataPct: correctedPct,
      sectorSummary,
      subSummary,
      meta: { ...spider.meta, frontendCorrected: true },
    };
  };

  useEffect(() => {
    if (assessmentsRequest.response && !assessmentsRequest.error) {
      const rawSpider = assessmentsRequest.response.spiderChart || null;
      setSpiderChart(applySpiderCorrections(rawSpider));
      if (isClientUser(role)) {
        setResolvedCompanyName(assessmentsRequest.response.companyName || '');
        setResolvedDepartmentName(assessmentsRequest.response.departmentName || '');
      }
    }
  }, [assessmentsRequest.response, assessmentsRequest.error, role]);

  const loading = assessmentsRequest.loading || clientsRequest.loading;

  const getCompanyName = (id) => {
    const client = clients.find((c) => c.id === id);
    return client?.name || resolvedCompanyName || 'Unknown Company';
  };

  const getDepartmentName = (id) => {
    const dept = departments.find((d) => d.id === id);
    return dept?.name || resolvedDepartmentName || 'Unknown Department';
  };

  return (
    <Shell heading="Live Dashboard">
      {isClientUser(role) && !employeeIdFilter && (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 600, mb: 1 }}>Almost there</Typography>
          <Typography sx={{ mb: 2 }}>
            Please complete the Start Assessment and questionnaire to view your dashboard.
          </Typography>
          <Button variant="contained" onClick={() => (window.location.href = '/assessment/questions')}>
            Start Assessment
          </Button>
        </Box>
      )}

      <Stack direction="row" spacing={3} sx={{ marginBottom: '50px' }}>
        {(() => {
          if (isClientUser(role) || isSuper(role)) {
            // 🔒 locked company & department
            return (
              <>
                <Box sx={{ minWidth: 260, backgroundColor: Colours.blue, borderRadius: '6px', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#fcf4ec' }}>
                    {`Company: ${getCompanyName(selectedClient)}`}
                  </Typography>
                </Box>
                <Box sx={{ minWidth: 260, backgroundColor: Colours.blue, borderRadius: '6px', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#fcf4ec' }}>
                    {`Department: ${getDepartmentName(selectedDepartment)}`}
                  </Typography>
                </Box>
              </>
            );
          }

          if (isAdminOrPivot(role)) {
            // 🔓 admin/pivot get dropdowns
            return (
              <>
                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="company-label">Company</InputLabel>
                    <Select
                      labelId="company-label"
                      id="company-select"
                      value={selectedClient}
                      onChange={(e) => setSelectedClient(e.target.value)}
                    >
                      {clients.map((client) => (
                        <MenuItem value={client.id} key={client.id}>
                          {client.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      id="department-select"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      {departments.map((department) => (
                        <MenuItem value={department.id} key={department.id}>
                          {department.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </>
            );
          }

          return null;
        })()}
      </Stack>

      {loading && (
        <Loading
          textSx={{ fontSize: '25px' }}
          loadingSx={{ width: '250px !important', height: '250px !important' }}
          containerSx={{ margin: '10% 25%' }}
        />
      )}

      {!loading && spiderChart && (
        <>
          <ChartSwitcherBanner chartView={chartView} setChartView={setChartView} />

          {chartView === "sector" && (
            <PolarSectorWheel sectorSummary={spiderChart?.sectorSummary} mode="percent" />
          )}
          {chartView === "sub" && (
            <PolarSubWheel subSummary={spiderChart?.subSummary} mode="percent" />
          )}
          {chartView === "full" && (
            <PolarBalanceWheel spiderChart={spiderChart} mode="percent" />
          )}

          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <Button variant="contained" onClick={() => setSlideshowOpen(true)}>
              Slideshow
            </Button>
          </Box>

          <Slideshow
            open={isSlideshowOpen}
            onClose={() => setSlideshowOpen(false)}
            spiderChart={spiderChart}
            selectedCompany={getCompanyName(selectedClient)}
            selectedDepartment={getDepartmentName(selectedDepartment)}
          />
        </>
      )}
    </Shell>
  );
};
