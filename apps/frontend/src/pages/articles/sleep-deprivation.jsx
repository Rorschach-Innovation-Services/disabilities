import styles from "./articles.module.css";
import { Footer } from "../../components/footer";
import RuralSleepPatternsSmall from "../../assets/images/rural-sleep-patterns-sml.jpg";
import GutHealthSmall from "../../assets/images/gut-health-sml.jpg";
import ExerciseInterventionSmall from "../../assets/images/exercise-intervention-sml.jpg";
import SleepDeprivationLarge from "../../assets/images/sleep-deprivation-lg.jpg";
import { CustomHeader } from "../../components/header";

export const SleepDeprivation = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>29 March 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img
                            src={SleepDeprivationLarge}
                            alt="sleep cardiometabolic disease risk factors workplace performance"
                        />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>MA candidate: Celine Le Roux</h4>

                        <h5>
                            <u>
                                Exercise as a strategy to mitigate the negative
                                cognitive and mood effects of partial sleep
                                deprivation in healthy adults{" "}
                            </u>
                        </h5>

                        <p>
                            Partial sleep deprivation (PSD) is a prominent and
                            pervasive problem as society places greater
                            importance on academic and work demands than on
                            healthy sleeping habits. The prevalence of PSD is
                            concerning as it is well-established that lack of
                            sleep profoundly impairs functioning. Thus, this
                            research aims to investigate whether a bout of
                            moderate intensity aerobic exercise can be used as a
                            strategy to counteract the cognitive and mood
                            effects of PSD.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles["research-container"]}>
                <h5>Other studies you might like</h5>

                <div
                    className={styles["research-wrapper"]}
                    id={styles["our-business"]}
                >
                    <a href="/articles/exercise-intervention">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={ExerciseInterventionSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PhD candidate: Chadley Kemp</h3>

                            <p>
                                Sleep, circadian rhythms, cardiometabolic health
                                and neurocognitive performance in competitive
                                computer gamers
                            </p>

                            <div className={styles["research-date"]}>
                                26 Mar 2022
                            </div>
                        </div>
                    </a>

                    <a href="/articles/rural-sleep-patterns">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={RuralSleepPatternsSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>
                                A/Prof Gómez-Olivé, Prof von Schantz, Dr Dale
                                Rae){" "}
                            </h3>

                            <p>
                                Timing, quality, and physiology of sleep in a
                                deprived rural community cohort in South Africa
                                and their relationship with HIV and
                                non-communicable diseases
                            </p>

                            <div className={styles["research-date"]}>
                                12 Apr 2022
                            </div>
                        </div>
                    </a>

                    <a href="/articles/gut-microbiota-and-cardiometabolic">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={GutHealthSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PIs: Dr Dale Rae and Prof Dugas</h3>

                            <p>
                                Sleep timing, gut microbiota and cardiometabolic
                                risk across the Epidemiologic Transition{" "}
                            </p>

                            <div className={styles["research-date"]}>
                                09 Mar 2022
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};
