import React, { useState } from 'react';
import { useMediaQuery, Typography, Container } from '@mui/material';
import Logo from '../assets/logos/Pivot-Logo-6.png';
import AssessmentIcon from '../assets/icons/clients.svg';
import StartAssessmentIcon from '../assets/icons/Start-assessment.svg';
import DashboardIcon from '../assets/icons/dashboard.svg';
import StuffIcon from '../assets/icons/staff.svg';
import SettingsIcon from '../assets/icons/settings.svg';
import DatabaseIcon from '../assets/icons/database.svg';
import RadarIcon from '../assets/icons/chart-radar.svg';
import { useHistory } from 'react-router-dom';
import { Colours } from '../colours';
import { useLocalStorage } from '../hooks/storage';

const items = [
  {
    text: 'Start New Assessment',
    icon: StartAssessmentIcon,
    route: '/assessment/questions',
    key: 'questions',
  },
  {
    text: 'Dashboard',
    icon: DashboardIcon,
    route: '/dashboard',
    key: 'dashboard',
  },
  {
    text: 'Clients',
    icon: AssessmentIcon,
    route: '/clients',
    key: 'clients',
  },
  {
    text: 'Manage Users',
    icon: StuffIcon,
    route: '/staff',
    key: 'staff',
  },
  {
    text: 'Questionnaires',
    icon: DatabaseIcon,
    route: '/questionnaire-bank',
    key: 'questionnaire-bank',
  },
  {
    text: 'Live Dashboard',
    icon: RadarIcon,
    route: '/live-dashboard',
    key: 'live-dashboard',
  },
  {
    text: 'Settings',
    icon: SettingsIcon,
    route: '/settings',
    key: 'settings',
  },
];

const SideBarListItem = ({
  selected,
  text,
  icon,
  sx,
  select,
  textSx,
  route,
}) => {
  const useIconsOnly = useMediaQuery('(max-width:800px)');
  const history = useHistory();

  return (
    <Container
      key={text}
      sx={{
        cursor: 'pointer',
        backgroundColor: `${
          selected ? `${Colours.blue} !important` : 'white'
        }`,
        borderBottomLeftRadius: '20px',
        borderTopLeftRadius: '20px',
        display: 'flex',
        height: '50px',
        alignItems: 'center',
        gap: '25px',
        marginTop: text === 'Settings' && '150px',
        marginBottom: text === 'Start New Assessment' && '30px',
        ...sx,
      }}
      onClick={() => {
        select();
        history.push(route);
      }}
      selected={selected}
    >
      <img
        src={icon}
        alt="icon"
        width="35px"
        style={{
          background: text === 'Start New Assessment' ? '#000' : 'transparent',
          borderRadius: '50%',
        }}
      />
      {!useIconsOnly && (
        <Typography
          sx={{
            fontWeight: `${selected ? 'bold' : undefined}`,
            fontSize: '16px',
            ...textSx,
          }}
        >
          {text}
        </Typography>
      )}
    </Container>
  );
};

// Sidebar navigation
export const SideBar = () => {
  const { location } = useHistory();
  const { role } = useLocalStorage();
  const pathnameList = location.pathname.split('/');
  const [selected, setSelected] = useState(
    pathnameList[pathnameList.length - 1]
  );

  // Check if client_user has valid respondent + completed questionnaire
  const hasRespondentContext = (() => {
    try {
      const eid = localStorage.getItem('respondentEmployeeId');
      const email = localStorage.getItem('respondentEmail');
      const completed = localStorage.getItem('respondentCompleted');
      return Boolean(
        ((eid && eid.trim()) || (email && email.trim())) &&
        (completed && completed.trim())
      );
    } catch {
      return false;
    }
  })();

  const isSelected = (item) => {
    const route = item.route.toLowerCase();
    const key = item.key.toLowerCase();
    const lastRouteName = pathnameList[route.split('/').length - 1];

    const currentPath = location.pathname.toLowerCase();
    if (currentPath.startsWith('/assessment/new-department')) {
      return key === 'clients';
    }

    if (key === lastRouteName) return true;
    return false;
  };

  // Role logic
  const r = (role || '').toLowerCase();
  const canStartAssessment = r === 'client_super' || r === 'client_user';
  const canSeeQuestionnaireBank = r === 'administrator' || r === 'admin' || r === 'pivot';
  const canSeeClients = r === 'administrator' || r === 'admin' || r === 'pivot';
  const canSeeStaff = r === 'administrator' || r === 'admin' || r === 'pivot' || r === 'client_super';
  const canSeeDashboard = r === 'administrator' || r === 'admin' || r === 'pivot';

  // Build visible items list
  const visibleItems = items.filter((item) => {
    switch (item.key) {
      case 'dashboard':
        return canSeeDashboard;
      case 'questions':
        return canStartAssessment;
      case 'live-dashboard': {
        // client_user only sees if form filled + questionnaire completed
        if (r === 'client_user' || r === 'client') {
          return hasRespondentContext;
        }
        return true; // other roles always see
      }
      case 'questionnaire-bank':
        return canSeeQuestionnaireBank;
      case 'clients':
        return canSeeClients;
      case 'staff':
        return canSeeStaff;
      default:
        return true; // settings, etc.
    }
  });

  return (
    <Container
      sx={{
        width: '22%',
        paddingRight: '0 !important',
        paddingTop: '20px',
        position: 'sticky',
        top: 0,
        height: 'max-content',
      }}
    >
      <Container sx={{ textAlign: 'center', margin: '0' }}>
        <img
          style={{
            cursor: 'pointer',
            borderRadius: '50%',
            width: '140px',
            height: '140px',
            objectFit: 'cover',
          }}
          src={Logo}
          alt="Pivot Logo"
        />
      </Container>

      {visibleItems.map((item) => (
        <SideBarListItem
          key={item.text}
          icon={item.icon}
          text={item.text}
          selected={isSelected(item)}
          select={() => setSelected(`${item.route.toLowerCase()}`)}
          route={item.route}
        />
      ))}
    </Container>
  );
};
