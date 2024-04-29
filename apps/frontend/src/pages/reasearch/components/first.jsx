import styles from "../research.module.css";
import LowSocioEconomicSmall from "../../../assets/images/research/Arron Correia.jpg";
import LowIncomeSmall from "../../../assets/images/research/philippa forshaw.jpg";
import WorkplacePerformanceSmall from "../../../assets/images/workplace-performance-sml.jpg";
import CompetitiveGames from "../../../assets/images/competitive-games.jpg";
import CircadianRhythmsSmall from "../../../assets/images/research/nyambura shawa.jpg";
import ObstructiveSleepApnoeaSmall from "../../../assets/images/obstructive-sleep-apnoea-sml.jpg";
import ConcussionHistoryOutcomesSmall from "../../../assets/images/concussion-history-outcomes-sml.jpg";
import SleepDeprivationSmall from "../../../assets/images/sleep-deprivation-sml.jpg";
import ExerciseInterventionSmall from "../../../assets/images/research/zakirah jaffer.jpg";
import { Fragment } from "react";

export const FirstPage = ({ setRender }) => {
    return (
        <Fragment>
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
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PhD candidate: Arron Correia</h3>

                            <p>
                                Investigating the relationship between sleep,
                                autonomic nervous system function and
                                psychiatric disorders in South Africans living
                                in a low socio-economic environment
                            </p>
                        </div>
                    </a>

                    <a href="/articles/low-income">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={LowIncomeSmall}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PhD candidate: Phillipa Forshaw</h3>

                            <p>
                                Understanding the relationship between sleep and
                                cardiovascular disease in low-income South
                                African adults
                            </p>
                        </div>
                    </a>

                    <a href="/articles/workplace-performance">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={WorkplacePerformanceSmall}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PhD candidate: Paula Pienaar</h3>

                            <p>
                                Associations between sleep, cardiometabolic
                                disease risk factors and workplace performance
                                in executive employees
                            </p>
                        </div>
                    </a>

                    <a href="/articles/computer-gamers">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={CompetitiveGames}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3> PhD candidate: Chadley Kemp</h3>

                            <p>
                                Sleep, circadian rhythms, cardiometabolic health
                                and neurocognitive performance in Esports
                                players
                            </p>
                        </div>
                    </a>

                    <a href="/articles/circadian-rhythms">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={CircadianRhythmsSmall}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3> PhD candidate: Nyambura Shawa</h3>

                            <p>
                                Sleep, circadian rhythms and non-communicable
                                diseases in an urban South African population
                            </p>
                        </div>
                    </a>

                    <a href="/articles/obstructive-apnoea">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={ObstructiveSleepApnoeaSmall}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>MSc candidate: Batsheva Brand</h3>

                            <p>
                                Physical activity and sedentary behaviour among
                                patients with obstructive sleep apnoea in South
                                Africa
                            </p>
                        </div>
                    </a>

                    <a href="/articles/concussion-history-outcomes">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={ConcussionHistoryOutcomesSmall}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>MSc candidate: Dominique Rosslee</h3>

                            <p>
                                Associations between sleep and concussion
                                history and outcomes in youth rugby players
                            </p>
                        </div>
                    </a>

                    <a href="/articles/sleep-deprivation">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={SleepDeprivationSmall}
                                    alt=""
                                    width="40px"
                                    height="40px"
                                />
                            </div>

                            <h3>MA candidate: Celine Le Roux</h3>

                            <p>
                                Exercise as a strategy to mitigate the negative
                                cognitive and mood effects of partial sleep
                                deprivation in healthy adults
                            </p>
                        </div>
                    </a>

                    <a href="/articles/exercise-intervention">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={ExerciseInterventionSmall}
                                    alt=""
                                    width="40px"
                                    height="40px"
                                />
                            </div>

                            <h3>MPhil candidate: Zakirah Jaffer</h3>

                            <p>
                                The development of an exercise intervention, as
                                a modality of treatment for individuals with
                                obstructive sleep apneoa
                            </p>
                        </div>
                    </a>
                </div>
            </section>
            <section className={styles["pagination-nav"]}>
                <div className={styles["pagination"]}>
                    <a href="#top-section" className={styles["active"]}>
                        1
                    </a>
                    <a
                        onClick={() => setRender("second")}
                        style={{ cursor: "pointer" }}
                    >
                        2
                    </a>
                    <a
                        onClick={() => setRender("second")}
                        style={{ cursor: "pointer" }}
                    >
                        &raquo;
                    </a>
                </div>
            </section>
        </Fragment>
    );
};
