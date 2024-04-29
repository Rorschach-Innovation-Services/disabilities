import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  useMediaQuery,
  Menu,
  MenuItem,
  Fade,
  Button,
  Typography,
} from "@mui/material";
import Logo from "../assets/logos/Sleep Science Logo File.png";
import { NavButton } from "./nav-button";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/storage";
import MenuIcon from "@mui/icons-material/Menu";

const buttonStyles = {
  sx: {
    color: "black",
    marginTop: "2%",
    marginLeft: "2%",
    padding: "0.5% 2%",
  },
  hover: {
    borderRadius: "25px",
    border: "1px solid ",
    borderColor: "primary.main",
  },
};

// Top navigation bar
export const NavBar = () => {
  const { pathname, hash, key } = useLocation();
  const { push } = useHistory();
  const { token } = useLocalStorage();
  const viewportSize = useMediaQuery("(max-width:701px)");
  const [anchorE1, setAnchorE1] = React.useState(null);
  const open = Boolean(anchorE1);

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change

  const setSx = (link) => {
    const path = pathname;

    if (path === link || path === `${path}/`) {
      return { ...buttonStyles.sx, ...buttonStyles.hover };
    }
    return { ...buttonStyles.sx };
  };

  const handleClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorE1(null);
  };

  return !viewportSize ? (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        zIndex: 3,
      }}
    >
      <Toolbar>
        <Box
          component="img"
          src={Logo}
          onClick={() => push("/")}
          sx={{
            width: "5%",
            display: "flex",
            margin: "1% 11% 0.2% 7%",
            cursor: "pointer",
          }}
        />

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            marginLeft: { sm: "60px", md: "100px", lg: "270px", xl: "370px" },
          }}
        >
          <NavButton
            link="/"
            sx={{
              ...setSx("/"),
              ":hover": {
                backgroundColor: "white",
              },
            }}
          >
            <Typography
              sx={{
                textDecoration: "none",
                textDecorationColor: "white",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Home
            </Typography>
          </NavButton>
          <NavButton
            link="/what-we-do"
            sx={{
              ...setSx("/what-we-do"),
              ":hover": {
                backgroundColor: "white",
              },
            }}
          >
            <Typography
              sx={{
                textDecoration: "none",
                textDecorationColor: "white",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              What We Do
            </Typography>
          </NavButton>
          <NavButton
            link={{ pathname: "/what-we-do", hash: "#team" }}
            sx={{
              ...setSx("/what-we-do#team"),
              display: { xs: "none", md: "flex" },
              ":hover": {
                backgroundColor: "white",
              },
            }}
          >
            <Typography
              sx={{
                textDecoration: "none",
                textDecorationColor: "white",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              The Team
            </Typography>
          </NavButton>
          <NavButton
            link="/contact-us"
            sx={{
              ...setSx("/contact-us"),
              ":hover": {
                backgroundColor: "white",
              },
            }}
          >
            <Typography
              sx={{
                textDecoration: "none",
                textDecorationColor: "white",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Contact Us
            </Typography>
          </NavButton>
          <NavButton
            link={token ? "/dashboard" : "/sign-in"}
            variant="outlined"
            sx={{
              borderRadius: "25px",
              ...buttonStyles.sx,
              marginLeft: "7%",
              px: "7%", // padding left and right
              ":hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            {token ? "Dashboard" : "Sign In"}
          </NavButton>
        </Box>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        zIndex: 3,
      }}
    >
      <Toolbar>
        <Box
          component="img"
          src={Logo}
          onClick={() => push("/")}
          sx={{
            width: "5%",
            display: "flex",
            margin: "1% 11% 0.2% 7%",
            cursor: "pointer",
          }}
        />

        <Box
          sx={{
            marginLeft: "60%",
            marginTop: "3%",
          }}
        >
          <Button
            id="burger-menu"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              ":hover": {
                color: "black",
              },
            }}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "burger-menu",
            }}
            anchorEl={anchorE1}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem component={Link} to={"/"}>
              Home
            </MenuItem>
            <MenuItem component={Link} to={"/what-we-do"}>
              What We Do
            </MenuItem>
            <MenuItem component={Link} to={"/what-we-do#team"}>
              The Team
            </MenuItem>
            <MenuItem component={Link} to={"/contact-us"}>
              Contact Us
            </MenuItem>
            <MenuItem component={Link} to={token ? "/dashboard" : "/sign-in"}>
              {token ? "Dashboard" : "Sign In"}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
