import React, { useState } from "react";
import {
  useMediaQuery,
  Typography,
  Container,
} from "@mui/material";
import Logo from "../assets/logos/Sleep Science Logo NT RGB.png";
import AssessmentIcon from "../assets/icons/clients.svg";
import StartAssessmentIcon from "../assets/icons/Start-assessment.svg";
import DashboardIcon from "../assets/icons/dashboard.svg";
import StuffIcon from "../assets/icons/staff.svg";
import SettingsIcon from "../assets/icons/settings.svg";
import { useHistory } from "react-router-dom";
import { Colours } from "../colours";

const items = [
  {
    text: "Start New Assessment",
    icon: StartAssessmentIcon,
    route: "/assessment/questions"
  },
  {
    text: "Dashboard",
    icon: DashboardIcon,
    route: "/dashboard"
  },
  {
    text: "Clients",
    icon: AssessmentIcon,
    route: "/clients"
  },
  {
    text: "Staff",
    icon: StuffIcon,
    route: "/staff"
  },
  {
    text: "Settings",
    icon: SettingsIcon,
    route: "/settings"
  }
]

const SideBarListItem = ({
  selected,
  text,
  icon,
  sx,
  select,
  textSx,
  route,
}) => {
  const useIconsOnly = useMediaQuery("(max-width:800px)");
  const history = useHistory();
  return (
    <Container
      key={text}
      sx={{
        cursor: "pointer",
        backgroundColor: `${selected ? `${Colours.yellow} !important` : "white"}`,
        borderBottomLeftRadius: "20px",
        borderTopLeftRadius: "20px",
        display: "flex",
        height: "50px",
        alignItems: "center",
        gap: "25px",
        marginTop: text === "Settings" && "150px",
        marginBottom: text === "Start New Assessment" && "30px",
        ...sx,
      }}
      onClick={() => {
        select();
        history.push(route)
      }}
      selected={selected}
    >
      <img
        src={icon}
        alt="icon"
        width="35px"
        style={{
          background: text === "Start New Assessment" ? "#000" : "transparent",
          borderRadius: "50%"
        }}
      />
      {!useIconsOnly && (
        <Typography
          sx={{
            fontWeight: `${selected ? "bold" : undefined}`,
            fontSize: "16px",
            ...textSx,
          }}
        >
          {text}
        </Typography>
      )}
    </Container>
  );
};

// Used for navigation for authenticated sleep scientist
export const SideBar = () => {
  const { push, location } = useHistory();
  const pathnameList = location.pathname.split("/");
  const [selected, setSelected] = useState(
    pathnameList[pathnameList.length - 1]
  );
  return (
    <Container
      sx={{
        width: "22%",
        paddingRight: "0 !important",
        paddingTop: "20px",
        position: "sticky",
        top: 0,
        height: "max-content",
      }}
    >
      <Container
        sx={{
          textAlign: "center",
          margin: "20px 0"
        }}
      >
        <img
          style={{
            cursor: "pointer",
          }}
          src={Logo}
          alt="Sleep Science Logo" 
          height={"100px"}
        />
      </Container>
      {
        items.map(item => (
          <SideBarListItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            selected={selected.includes(`${item.route.toLowerCase().split("/")[item.route.toLowerCase().split("/").length - 1]}`)}
            select={() => setSelected(`${item.text.toLowerCase()}`)}
            route={item.route}
          />
        ))
      }
    </Container>
  );
};
