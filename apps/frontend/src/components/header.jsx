import Logo from "../assets/images/logo.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Popover } from "@mui/material";
import DropdownIcon from "../assets/icons/Dropdown.svg";
import styles from "../pages/style.module.css";

/**
Navigation item
@param link to where item navigates to
@param label what item says
@param listStyles styles for list
@param anchorStyles styles for anchor tag
*/
const NavigationItem = ({ link, label, listStyles, anchorStyles }) => {
    const { pathname } = useLocation();

    const setLink = () => {
        const index = link.indexOf("#");
        if (index === -1) {
            document.location.href = link;
            return;
        }
        const path = link.substr(0, index);
        const hash = link.substr(index + 1);
        if (pathname === path) {
            const violation = document.getElementById(hash);
            window.scrollTo({
                top: violation.offsetTop,
                behavior: "smooth",
            });
            return;
        }

        document.location.href = link;
    };

    const setStyles = () => {
        if (pathname === link)
            return {
                backgroundColor: "rgb(154,184,224)",
                borderRadius: "14px",
                color: "white",
                height: "27px",
                paddingLeft: "7px",
                paddingRight: "7px",
            };
        return {};
    };

    return (
        <li
            className={`${styles["active"]}`}
            style={{ ...setStyles(), ...listStyles }}
        >
            <a
                onClick={() => {
                    setLink();
                }}
                style={{ cursor: "pointer", ...anchorStyles }}
            >
                {label}
            </a>
        </li>
    );
};

/**
Navigation item with dropwdown menu
@param link to where item navigates to
@param label what item says
*/
const NavigationItemWithOptions = ({ link, label }) => {
    const { pathname } = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const setStyles = () => {
        if (pathname === link)
            return {
                backgroundColor: "rgb(154,184,224)",
                borderRadius: "14px",
                color: "white",
                height: "27px",
                paddingLeft: "7px",
                paddingRight: "7px",
            };
        return {};
    };

    const renderItems = () => {
        if (label.toLowerCase().includes("support"))
            return (
                <>
                    <NavigationItem
                        link="/contact-us#faqs-page"
                        label="FAQ"
                        anchorStyles={{ fontSize: "13px", color: "white" }}
                        listStyles={{ marginBottom: "4px" }}
                    />
                    <NavigationItem
                        link="/contact-us#form-section"
                        label="Contact us"
                        anchorStyles={{ fontSize: "13px", color: "white" }}
                        listStyles={{ marginBottom: "4px" }}
                    />
                </>
            );

        return (
            <>
                <NavigationItem
                    link="/about-us#vision-page"
                    label="Vision"
                    anchorStyles={{ fontSize: "13px", color: "white" }}
                    listStyles={{ marginBottom: "4px" }}
                />
                <NavigationItem
                    link="/about-us#mission-page"
                    label="Mission"
                    anchorStyles={{ fontSize: "13px", color: "white" }}
                    listStyles={{ marginBottom: "4px" }}
                />
                <NavigationItem
                    link="/about-us#the-team"
                    label="The Team"
                    anchorStyles={{ fontSize: "13px", color: "white" }}
                />
            </>
        );
    };

    return (
        <li
            className={styles["active"]}
            style={setStyles()}
            onClick={(event) => {
                handleClick(event);
            }}
        >
            <a style={{ cursor: "pointer" }}>
                {label}{" "}
                <img
                    src={DropdownIcon}
                    alt="Dropdown icon"
                    style={{ width: "6px", height: "4px", marginBottom: "2px" }}
                />
            </a>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                sx={{
                    ".MuiPaper-root": {
                        width: "120px",
                        padding: "15px",
                        height: label.toLowerCase().includes("support")
                            ? "88px"
                            : "110px",
                        backgroundColor: "#242424",
                    },
                }}
            >
                <ul style={{ marginBottom: 0 }}>{renderItems()}</ul>
            </Popover>
        </li>
    );
};

export const CustomHeader = () => {
    const [display, setDisplay] = useState(false);

    return (
        <header
            className={`${styles["primary-header"]} ${styles["flex"]}`}
            id="top-section"
        >
            <div className={styles["logo"]}>
                <a href="/">
                    <img src={Logo} alt="Sleep Science" height="60px" />
                </a>
            </div>

            <button
                className={styles["mobile-nav-toggle"]}
                aria-controls="primary-navigation"
                aria-expanded={display}
                onClick={() => setDisplay((prev) => !prev)}
            >
                <span className={styles["sr-only"]}>Menu</span>
            </button>

            <nav>
                <ul
                    id="primary-navigation"
                    data-visible={display}
                    className={`${styles["primary-navigation"]} ${styles["flex"]}`}
                >
                    <NavigationItem link="/" label="Home" />
                    <NavigationItemWithOptions
                        link="/about-us"
                        label="Who we are"
                    />
                    <NavigationItem link="/services" label="What we do" />
                    <NavigationItem
                        link="/research"
                        label="Our sleep research"
                    />
                    <NavigationItem
                        link="/contact-us"
                        label="Contact us"
                    />
                </ul>
            </nav>
        </header>
    );
};
