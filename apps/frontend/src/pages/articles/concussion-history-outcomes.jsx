import styles from "./articles.module.css";
import RuralSleepPatternsSmall from "../../assets/images/rural-sleep-patterns-sml.jpg";
import ConcussionHistoryOutcomesLarge from "../../assets/images/concussion-history-outcomes-lg.jpg";
import SleepDeprivationSmall from "../../assets/images/sleep-deprivation-sml.jpg";
import ExerciseInterventionSmall from "../../assets/images/exercise-intervention-sml.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const ConcussionHistoryOutcomes = () => {
    return (
        <div>
            <CustomHeader styles={styles} />
            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>02 April 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img
                            src={ConcussionHistoryOutcomesLarge}
                            alt="sleep cardiometabolic disease risk factors workplace performance"
                        />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>MSc candidate: Dominique Rosslee</h4>

                        <h5>
                            <u>
                                Associations between sleep and concussion
                                history and outcomes in youth rugby players
                            </u>
                        </h5>

                        <p>
                            The relationship between sleep and concussion in
                            athletes has not been well explored. However, there
                            is significant evidence to show that sleep is highly
                            beneficial for athletes, especially in terms of
                            skills related to performance, reaction time,
                            attention and coordination as well as for recovery
                            and adaptation to training. My area of research
                            explores this sleep-concussion relationship, in
                            particular the extent to which poor sleep alters the
                            risk for sports-related concussion and the
                            concussion-induced changes in sleep.
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
                                Exercise as a Strategy to Mitigate the Negative
                                Cognitive and Mood Effects of Partial Sleep
                                Deprivation in Healthy Adults
                            </p>

                            <div className={styles["research-date"]}>
                                29 Mar 2022
                            </div>
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

                            <div className={styles["research-date"]}>
                                26 Apr 2022
                            </div>
                        </div>
                    </a>

                    <a href="/articles/rural-sleep-patterns">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={RuralSleepPatternsSmall}
                                    alt=""
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
                </div>
            </section>

            <Footer />
        </div>
    );
};
