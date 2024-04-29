import styles from "./services.module.css";
import SleepCheckLarge from "../../assets/images/sleep-check-lg.png";
import SleepCoachingLarge from "../../assets/images/sleep-coaching-lg.png";
import WorkshopsLarge from "../../assets/images/workshop-lg.png";
import JetlagLarge from "../../assets/images/jetleg-lg.png";
import PromotionLarge from "../../assets/images/promotion-lg.png";
import Performance from "../../assets/images/performance-icon.svg";
import HighBlooad from "../../assets/images/high-blood-icon.svg";
import Insulin from "../../assets/images/insulin-icon.svg";
import Mission from "../../assets/images/mission-img.png";
import Obesity from "../../assets/images/obesity-icon.svg";
import Risk from "../../assets/images/risk-icon.svg";
import Stress from "../../assets/images/stress-icon.svg";
import Impaired from "../../assets/images/impaired-icon.svg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";
import { Button } from "@mui/material";
import { Colours } from "../../colours";
import { useHistory } from "react-router-dom";
import DataAnalysis from "../../assets/images/data-analysis.png";

export const Services = () => {
    const { push } = useHistory();
    return (
        <div>
            <CustomHeader styles={styles} />
            <section
                className={styles["services-container"]}
                id={styles["learn-more"]}
            >
                <div className={styles["services-wrapper"]}>
                    <div className={styles["services-overlay"]}></div>

                    <div className={styles["services-text"]}>
                        <h1>What we do</h1>

                        <p>
                            We provide in-depth sleep evaluations for
                            individuals who are concerned about their sleep; we
                            design sleep programmes for those needing help to
                            get their sleep on track; and we work with special
                            groups such as athletes, employees, students and
                            learners, as well as individuals on weight-loss and
                            wellness journeys. We pride ourselves on being
                            evidence-based so that you can be sure you will
                            receive the best possible assistance.
                            <br />
                            <br />
                            Let’s address your sleep health.
                        </p>
                    </div>
                </div>
            </section>

            <section
                className={styles["individual-section"]}
                id={styles["mission-page"]}
            >
                <h2>Sleep solutions for individuals</h2>

                <div className={styles["individual-container"]}>
                    <div
                        className={styles["individual-flex-left"]}
                        id={styles["two"]}
                    >
                        <div
                            className={styles["individual-text-box"]}
                            id={styles["sleep-check"]}
                        >
                            <h3>Sleep check</h3>
                            <p>
                                Everyone’s sleep is unique. Understanding your
                                specific sleep habits and challenges is key to
                                finding the best possible solutions and
                                strategies to help you sleep better. The sleep
                                check comprises an initial 60min one-on- one
                                consultation, monitoring of your sleep patterns
                                for seven days using a specialised wrist-worn
                                sleep monitor and diary, and a 30min follow-up
                                session. You will receive a detailed report
                                about your sleep habits, patterns and
                                challenges, as well as recommendations and
                                strategies to help you improve your sleep. Our
                                sleep check can be delivered remotely for people
                                not living in Cape Town.
                            </p>
                        </div>
                    </div>

                    <div
                        className={styles["individual-flex-right"]}
                        id={styles["one"]}
                    >
                        <div className={styles["individual-image"]}>
                            <img
                                src={SleepCheckLarge}
                                alt="arron-correira sleep consultant sleep science"
                            />
                        </div>
                    </div>
                </div>

                <div className={styles["individual-container"]}>
                    <div
                        className={styles["individual-flex-left"]}
                        id={styles["one"]}
                    >
                        <div className={styles["individual-image"]}>
                            <img
                                src={SleepCoachingLarge}
                                alt="arron-correira sleep consultant sleep science"
                            />
                        </div>
                    </div>
                    <div
                        className={styles["individual-flex-right"]}
                        id={styles["two"]}
                    >
                        <div
                            className={styles["individual-text-box"]}
                            id={styles["sleep-coach"]}
                        >
                            <h3>Sleep coaching</h3>
                            <p>
                                Once you have had a sleep check to assess your
                                personal sleep challenges and needs, we will
                                develop a personalised sleep program to help
                                optimise your sleep habits and routines. Over
                                the course of four weeks we will help you
                                implement your sleep program, check in with you
                                weekly and make adjustments as needed. The end
                                goal is for you to be in a position to manage
                                and sustain your own healthy sleep habits and
                                routines!
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles["individual-container"]}>
                    <div
                        className={styles["individual-flex-left"]}
                        id={styles["two"]}
                    >
                        <div
                            className={styles["individual-text-box"]}
                            id={styles["jetlag"]}
                        >
                            <h3>Jetlag toolkit</h3>
                            <p>
                                Travellers often experience jetlag when crossing
                                time zones, arriving at their new destination
                                exhausted, disoriented and out of sync. This is
                                particularly bothersome to business people and
                                athletes who need to be on their A-game as soon
                                as possible. Our jetlag toolkit is tailored
                                specifically to your personal travel plan and
                                natural body clock, to minimise the adverse
                                effects of jetlag and sleep deprivation and to
                                fasttrack your resynchronisation to the new time
                                zone.{" "}
                            </p>
                        </div>
                    </div>

                    <div
                        className={styles["individual-flex-right"]}
                        id={styles["one"]}
                    >
                        <div className={styles["individual-image"]}>
                            <img
                                src={JetlagLarge}
                                alt="arron-correira sleep consultant sleep science"
                            ></img>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={styles["mission-section"]}
                id={styles["mission-page"]}
            >
                <h2>Sleep solutions for organisations</h2>

                <div className={styles["mission-container"]}>
                    <div
                        className={styles["mission-flex-left"]}
                        id={styles["two"]}
                    >
                        <div
                            className={styles["mission-text-box"]}
                            id={styles["sleep-health"]}
                        >
                            <h3>Sleep health screen</h3>
                            <p>
                                Employee sleep health impacts your bottom line.
                                Underslept employees are less productive and
                                more prone to absenteeism and accidents. Our
                                novel sleep health algorithm allows us to flag
                                employees at risk for poor sleep. Each employee
                                will receive her/his own results with
                                recommendations as to next steps. We will also
                                aggregate this information to profile your
                                organisation’s overall sleep health and provide
                                you with organisational level strategies to
                                reduce workplace fatigue.
                            </p>
                        </div>
                    </div>

                    <div
                        className={styles["mission-flex-right"]}
                        id={styles["one"]}
                    >
                        <div className={styles["mission-image"]}>
                            <img
                                src={Mission}
                                alt="arron-correira sleep consultant sleep science"
                            />
                        </div>
                    </div>
                </div>

                <div className={styles["mission-container"]}>
                    <div
                        className={styles["mission-flex-left"]}
                        id={styles["two"]}
                    >
                        <div className={styles["mission-image"]}>
                            <img
                                src={WorkshopsLarge}
                                alt="arron-correira sleep consultant sleep science"
                            />
                        </div>
                    </div>

                    <div
                        className={styles["mission-flex-right"]}
                        id={styles["one"]}
                    >
                        <div
                            className={styles["mission-text-box"]}
                            id={styles["workshops"]}
                        >
                            <h3>Talks, webinars, workshops, and Q&As</h3>
                            <p>
                                Sleep health is a new hot topic and the
                                detrimental effects of poor sleep on physical,
                                mental and emotional health are surfacing. The
                                purpose of these offerings is to raise awareness
                                and spark conversation around sleep health, to
                                ultimately improve employee productivity and
                                workplace performance and protect their long
                                term health. We tailor our talks, webinars and
                                workshops to your organisation’s needs. Talks
                                and webinars are great for lunch-and-learn
                                sessions while workshops provide more in-depth
                                engagement for smaller groups around their sleep
                                health.{" "}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles["mission-container"]}>
                    <div className={styles["mission-flex-left"]}>
                        <div
                            className={styles["mission-text-box"]}
                            id={styles["promotions"]}
                        >
                            <h3>Sleep health promotion</h3>
                            <p>
                                Understanding what sleep is, how important it is
                                and how to sleep better will enable your
                                employees to be on their A-game. Our Sleep
                                Health Promotion Content has been designed and
                                curated by our sleep scientists and is based on
                                the latest scientific evidence relating to sleep
                                health. The purpose of this content is to raise
                                awareness around the importance of sleep, to
                                educate, engage and empower your employees to
                                optimise their own sleep health and promote a
                                healthy sleep culture within an organisation.{" "}
                            </p>
                        </div>
                    </div>

                    <div className={styles["mission-flex-right"]}>
                        <div className={styles["mission-image"]}>
                            <img
                                src={PromotionLarge}
                                alt="arron-correira sleep consultant sleep science"
                            />
                        </div>
                    </div>
                </div>

                <div className={styles["mission-container"]}>
                    <div
                        className={styles["mission-flex-left"]}
                        id={styles["two"]}
                    >
                        <div className={styles["mission-image"]}>
                            <img
                                src={DataAnalysis}
                                alt="Data analysis image"
                                style={{
                                    width: "439px ",
                                    height: "440px",
                                }}
                            />
                        </div>
                    </div>

                    <div
                        className={styles["mission-flex-right"]}
                        id={styles["one"]}
                    >
                        <div
                            className={styles["mission-text-box"]}
                            id={styles["workshops"]}
                        >
                            <h3>Sleep data analysis and contract research</h3>
                            <p>
                                Advances in technology mean that globally many
                                people use sleep trackers to monitor their
                                sleep. Understanding the information generated
                                by these trackers can be overwhelming. We work
                                with companies to analyze and interpret these
                                sleep data to provide consumers with meaningful
                                sleep-related feedback and to estimate
                                associations between sleep and health. We also
                                do contract research for companies wanting to
                                test or validate their sleep-related products or
                                services.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        textAlign: "center",
                    }}
                >
                    <Button
                        onClick={() => push("/contact-us")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${Colours.blue} !important`,
                            boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
                            textTransform: "none",
                            width: "130px",
                        }}
                    >
                        Contact Us
                    </Button>
                </div>
            </section>

            <section className={styles["risks-section"]}>
                <h1>Poor sleep increases your risk for:</h1>

                <div
                    className={styles["risks-container"]}
                    id={styles["our-business"]}
                >
                    <div
                        className={`${styles["risks-text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["risks"]}>
                            <div className={styles["risks-icon"]}>
                                <img
                                    src={Obesity}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                />
                            </div>
                            <p>Obesity</p>
                        </div>
                    </div>

                    <div
                        className={`${styles["risks-text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["risks"]}>
                            <div className={styles["risks-icon"]}>
                                <img
                                    src={HighBlooad}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                />
                            </div>

                            <p>
                                High blood pressure and cardiovascular disease
                            </p>
                        </div>
                    </div>

                    <div
                        className={`${styles["risks-text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["risks"]}>
                            <div className={styles["risks-icon"]}>
                                <img
                                    src={Insulin}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                />
                            </div>

                            <p>
                                Insulin resistance and type 2 diabetes melliuts
                            </p>
                        </div>
                    </div>

                    <div
                        className={`${styles["risks-text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["risks"]}>
                            <div className={styles["risks-icon"]}>
                                <img
                                    src={Stress}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                />
                            </div>
                            <p>Fatigue, stress and burnout</p>
                        </div>
                    </div>

                    <div
                        className={`${styles["risks-text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["risks"]}>
                            <div className={styles["risks-icon"]}>
                                <img
                                    src={Stress}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                />
                            </div>
                            <p>
                                Depression, anxiety and other psychiatric
                                disorders
                            </p>
                        </div>
                    </div>

                    <div
                        className={`${styles["risks-text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["risks"]}>
                            <div className={styles["risks-icon"]}>
                                <img
                                    src={Risk}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                />
                            </div>
                            <p>Accidents and injuries</p>
                        </div>
                    </div>

                    <div
                        className={`${styles["risks-text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["risks"]}>
                            <div className={styles["risks-icon"]}>
                                <img
                                    src={Performance}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                />
                            </div>
                            <p>
                                Suboptimal workplace, school and athletic
                                performance{" "}
                            </p>
                        </div>
                    </div>

                    <div
                        className={`${styles["risks-text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["risks"]}>
                            <div className={styles["risks-icon"]}>
                                <img
                                    src={Impaired}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                />
                            </div>
                            <p>
                                Impaired recovery and training adaption in
                                athletes
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
