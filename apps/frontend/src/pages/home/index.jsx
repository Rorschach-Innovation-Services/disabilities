import styles from "../style.module.css";
import SleepCheck from "../../assets/images/sleep-check.svg";
import SleepCoach from "../../assets/images/sleep-coach.svg";
import HealthScreen from "../../assets/images/health-screen.svg";
import Workshops from "../../assets/images/workshops.svg";
import WorkplacePerformanceSmall from "../../assets/images/workplace-performance-sml.jpg";
import CompetitiveGames from "../../assets/images/competitive-games.jpg";
import LowSocioEconomicSmall from "../../assets/images/research/Arron Correia.jpg";
import Jetlag from "../../assets/images/jetlag.svg";
import Promotion from "../../assets/images/promotion.svg";
import LowIncomeSmall from "../../assets/images/research/philippa forshaw.jpg";
import { SelfAssessment } from "./components/stepper";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";
import { useHistory } from "react-router-dom";

export const Index = () => {
    const { push } = useHistory();

    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["hero-container"]}>
                <div className={styles["hero"]}>
                    <div className={styles["text-container"]}>
                        <div className={styles["hero-heading"]}>
                            Welcome to Sleep Science.
                        </div>
                        <div className={styles["hero-text"]}>
                            <p>We are a sleep consultancy focused on helping
                            individuals improve their sleep and organisations
                            educate and manage the sleep health of their
                            employees.</p>
                            <p>Are you ready to optimize your sleep?</p>
                        </div>

                        <a href="services#learn-more">
                            <button className={styles["hero-button"]}>
                                Learn more...
                            </button>
                        </a>
                    </div>

                    <div className={styles["arrowbox"]}>
                        <p>&#8595;</p>
                    </div>
                </div>
            </section>

            <section className={styles["welcome-container"]}>
                <div className={styles["welcome-text"]}>
                    <h2>Why choose Sleep Science?</h2>
                    <p>
                        Sleep is a natural and critical part of life. The bottom
                        line is that we need healthy sleep to thrive. Although
                        many of us have suffered the consequences of poor sleep
                        at one point or another, we often ignore just how
                        important it really is. Having a good night’s sleep is
                        essential for our overall health and quality of life. It
                        may also be responsible for how you feel right now.
                    </p>
                </div>
            </section>

            <section className={styles["individual-sol"]}>
                <h1>Sleep solutions for individuals</h1>

                <div
                    className={styles["individual-container"]}
                    id={styles["our-business"]}
                >
                    <div
                        className={`${styles["text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["icon-left"]}>
                            <img
                                src={SleepCheck}
                                width="50px"
                                height="50px"
                                alt=""
                            />
                        </div>

                        <h3>Sleep check</h3>

                        <p>
                            {" "}
                            Our sleep check is a detailed, holistic
                            sleep assessment and needs analysis for
                            anyone who is concerned about their
                            sleep and needs help to sleep better.
                        </p>

                        <a href="services#sleep-check">
                            <button className={styles["btn-sol"]}>
                                Learn more
                            </button>
                        </a>
                    </div>

                    <div
                        className={`${styles["text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["icon-left"]}>
                            <img
                                src={SleepCoach}
                                width="50px"
                                height="50px"
                                alt=""
                            />
                        </div>
                        <h3>Sleep coaching</h3>

                        <p>
                            Sleep coaching is for anyone who has
                            had a formal sleep assessment (Sleep
                            Check) with us and now needs help
                            optimising their sleep habits and routines.
                        </p>

                        <a href="services#sleep-coach">
                            <button className={styles["btn-sol"]}>
                                Learn more
                            </button>
                        </a>
                    </div>

                    <div
                        className={`${styles["text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["icon-left"]}>
                            <img
                                src={Jetlag}
                                width="40px"
                                height="40px"
                                alt=""
                            />
                        </div>
                        <h3>Jetlag toolkit</h3>

                        <p>
                            Our jetlag toolkit is a personalised travel
                            plan with recommendations for you on
                            how to manage jetlag and fatigue based
                            on your personal flight details and
                            preferred sleep schedule.{" "}
                        </p>

                        <a href="services#jetlag">
                            <button className={styles["btn-sol"]}>
                                Learn more
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            <section className={styles["wellness-sol"]}>
                <h1>Sleep solutions for organisations</h1>

                <div className={styles["wellness-container"]}>
                    <div
                        className={`${styles["text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["icon-left"]}>
                            <img
                                src={HealthScreen}
                                width="50px"
                                height="50px"
                            />
                        </div>

                        <h3>Sleep health screen</h3>

                        <p>
                            Our sleep health screen is a brief online
                            questionnaire to screen the sleep health of your
                            employees and generate your organisations overall
                            sleep health profile.{" "}
                        </p>

                        <a href="services#sleep-health">
                            <button className={styles["btn-sol"]}>
                                Learn more
                            </button>
                        </a>
                    </div>

                    <div
                        className={`${styles["text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["icon-left"]}>
                            <img src={Workshops} width="50px" height="50px" />
                        </div>

                        <h3>Talks, webinars, workshops, and Q&As</h3>

                        <p>
                            These are conversational talks, webinars, workshops
                            and Q&A sessions, a great way to introduce the broad
                            concepts of sleep as they relate to health and
                            wellness, workplace productivity and performance.{" "}
                        </p>

                        <a href="services#workshops">
                            <button className={styles["btn-sol"]}>
                                Learn more
                            </button>
                        </a>
                    </div>

                    <div
                        className={`${styles["text-wrapper"]} ${styles["show-on-scroll"]}`}
                    >
                        <div className={styles["icon-left"]}>
                            <img src={Promotion} width="40px" height="40px" />
                        </div>
                        <h3>Sleep health promotion</h3>

                        <p>
                            Our Sleep Health Promotion Content is a series of
                            sleep related content in the form of infographics,
                            videos and fact sheets as well as live Q&A sessions.{" "}
                        </p>

                        <a href="services#promotions">
                            <button className={styles["btn-sol"]}>
                                Learn more
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            <section className={styles["sleep-apnoea"]}>
                <SelfAssessment />
            </section>

            <section className={styles["research-container"]}>
                <h1>Our sleep research</h1>

                <div
                    className={styles["research-wrapper"]}
                    id={styles["our-business"]}
                >
                    <a href="/articles/low-socio-economic">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={LowSocioEconomicSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PhD candidate: Arron Correia</h3>

                            <p>
                                Investigating the relationship between sleep,
                                autonomic nervous system function and
                                psychiatric disorders in South Africans living
                                in a low socio-economic environment.
                            </p>
                        </div>
                    </a>

                    <a href="/articles/low-income">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={LowIncomeSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PhD candidate: Phillipa Forshaw</h3>

                            <p>
                                Understanding the relationship between sleep and
                                cardiovascular disease in low-income South
                                African adults.
                            </p>
                        </div>
                    </a>

                    <a href="/articles/workplace-performance">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={WorkplacePerformanceSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PhD candidate: Paula Pienaar</h3>

                            <p>
                                Associations between sleep, cardiometabolic
                                disease risk factors and workplace performance
                                in executive employees.
                            </p>
                        </div>
                    </a>

                    <a href="/articles/computer-gamers">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={CompetitiveGames}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3> PhD candidate: Chadley Kemp</h3>

                            <p>
                                Sleep, circadian rhythms, cardiometabolic health
                                and neurocognitive performance in Esports
                                players.
                            </p>
                        </div>
                    </a>
                </div>
                <div className={styles["more-research-container"]}>
                    <p
                        className={styles["more-research"]}
                        onClick={() => push("/research")}
                    >
                        See more of our research
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
};
