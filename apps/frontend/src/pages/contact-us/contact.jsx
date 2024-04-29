import styles from "./contact-us.module.css";
import Dale from "../../assets/images/Dale-Rae-sml.png";
import Paula from "../../assets/images/paula-pienaar-sml.png";
import Arron from "../../assets/images/arron-correira-sml.png";
import Pip from "../../assets/images/team/philippa-forshaw-profile.png";
import { FormDetails } from "./components/form-details";
import { FAQ } from "./components/faq";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";
import { Typography } from "@mui/material";

export const ContactUs = () => {
    return (
        <div>
            <CustomHeader styles={styles} />
            <section className={styles["services-container"]}>
                <div className={styles["services-wrapper"]}>
                    <div className={styles["services-overlay"]}></div>

                    <div className={styles["services-text"]}>
                        <h1>Get in touch</h1>
                    </div>
                </div>
            </section>

            <section
                className={styles["form-container"]}
                id={styles["form-section"]}
            >
                <FormDetails />
            </section>
            <Typography
                variant="h5"
                sx={{
                    textAlign: "center",
                    marginTop: "-54px",
                    fontSize: "24px",
                    fontWeight: 410,
                    marginTop: "20px",
                }}
            >
                Or call us: 021 650 4561
            </Typography>

            <section className={styles["faqs-section"]}>
                <div
                    className={styles["faqs-container"]}
                    id={styles["faqs-page"]}
                >
                    <h2>Frequently asked questions</h2>
                    <FAQ />
                </div>
            </section>

            <section className={styles["questions"]}>
                <div className={styles["questions-container"]}>
                    <h2>Still have questions?</h2>
                    <p>
                        Don’t hesitate to get in touch with any of our friendly
                        consultants.
                    </p>

                    <div className={styles["consult"]}>
                        <a href="about-us#the-team">
                            <img
                                src={Dale}
                                alt="Dale Rae Sleep Consultant Cape Town"
                                width="80px"
                                height="80px"
                            />
                        </a>

                        <a href="about-us#the-team">
                            <img
                                src={Paula}
                                alt="Paula Pienaar Sleep Consultant Cape Town"
                                width="90px"
                                height="90px"
                            />
                        </a>

                        <a href="about-us#the-team">
                            <img
                                src={Arron}
                                alt="Arron Correira Sleep Consultant Cape Town"
                                width="90px"
                                height="90px"
                            />
                        </a>

                        <a href="about-us#the-team">
                            <img
                                src={Pip}
                                alt="Philippa Forshaw Sleep Consultant Cape Town"
                                width="80px"
                                height="80px"
                            />
                        </a>
                    </div>

                    <a href="about-us#the-team">
                        <h3>Meet the team</h3>
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};
