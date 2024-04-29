import styles from "./articles.module.css";
import ConcussionHistoryOutcomesSmall from "../../assets/images/concussion-history-outcomes-sml.jpg";
import SleepDeprivationSmall from "../../assets/images/sleep-deprivation-sml.jpg";
import ObstructiveSleepApnoeaLarge from "../../assets/images/obstructive-sleep-apnoea-lg.jpg";
import ExerciseInterventionSmall from "../../assets/images/exercise-intervention-sml.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const ObstructiveApnoea = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>08 April 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img
                            src={ObstructiveSleepApnoeaLarge}
                            alt="sleep cardiometabolic disease risk factors workplace performance"
                        />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>MSc candidate: Batsheva Brand</h4>

                        <h5>
                            <u>
                                Physical activity and sedentary behaviour among
                                patients with obstructive sleep apnoea in South
                                Africa{" "}
                            </u>
                        </h5>

                        <p>
                            Given the promising evidence base for the role of
                            exercise as an adjunct therapy for OSA patients, we
                            would ultimately like to design and implement an
                            exercise intervention as an adjunct therapy for OSA
                            patients, particularly in the public healthcare
                            setting in South Africa where access to CPAP therapy
                            is constrained. Given the paucity of data for
                            patients with OSA in South Africa, we propose the
                            current formative study to first describe OSA
                            severity, CMD risk and habitual physical activity
                            levels among individuals with OSA. In future, we
                            will build on these data to explore the efficacy of
                            exercise interventions as an adjunct therapy for OSA
                            patients.
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
                    <a href="/articles/concussion-history-outcomes">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={ConcussionHistoryOutcomesSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>MSc candidate: Dominique Rosslee</h3>

                            <p>
                                Associations between sleep and concussion
                                history and outcomes in youth rugby players
                            </p>

                            <div className={styles["research-date"]}>
                                02 Apr 2022
                            </div>
                        </div>
                    </a>

                    <a href="/articles/sleep-deprivation">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={SleepDeprivationSmall}
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
                </div>
            </section>
            <Footer />
        </div>
    );
};
