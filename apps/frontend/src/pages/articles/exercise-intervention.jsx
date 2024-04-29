import styles from "./articles.module.css";
import RuralSleepPatternsSmall from "../../assets/images/rural-sleep-patterns-sml.jpg";
import GutHealthSmall from "../../assets/images/gut-health-sml.jpg";
import AfricanOriginSmall from "../../assets/images/african-origin-sml.jpg";
import ExerciseInterventionLarge from "../../assets/images/exercise-intervention-lg.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const ExerciseIntervention = () => {
    return (
        <div>
            <CustomHeader styles={styles} />
            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>26 March 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img src={ExerciseInterventionLarge} alt="" />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>MPhil candidate: Zakirah Jaffer</h4>

                        <h5>
                            <u>
                                The development of an exercise intervention, as
                                a modality of treatment for individuals with
                                obstructive sleep apneoa{" "}
                            </u>
                        </h5>

                        <p>
                            Individuals suffering from obstructive sleep apnoea
                            (OSA) are commonly overweight or obese and present
                            with inflammation, both of which exacerbate OSA
                            itself, and increase risk for co-morbidities,
                            specifically cardiometabolic disease. Treatment of
                            OSA via continuous positive airway pressure therapy,
                            while effective, is extremely expensive and
                            inaccessible to those in a low income,
                            under-resourced setting. Addressing weight loss is a
                            key component of OSA treatment, and exercise may
                            provide the benefits of addressing both weight loss
                            and inflammation in OSA patients, as well as
                            lowering the risk of CVD, depression, and
                            comorbidities arising from obesity dramatically. The
                            purpose of this study is to use a mixed method
                            approach to design an exercise intervention
                            framework for OSA patients from under-resourced
                            settings.
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
                                PIs: A/Prof Gómez-Olivé, Prof von Schantz, Dr
                                Dale Rae
                            </h3>

                            <p>
                                Timing, quality, and physiology of sleep in a
                                deprived rural community cohort in South Africa
                                and their relationship with HIV and
                                non-communicable diseases
                            </p>

                            <div className={styles["research-date"]}>
                                12 Mar 2022
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

                    <a href="/articles/african-origins">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={AfricanOriginSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PIs: Dr Rae and Dr O’Brien</h3>

                            <p>
                                Chronotype and sleep patterns in rural and urban
                                South African individuals of African origin{" "}
                            </p>

                            <div className={styles["research-date"]}>
                                26 Feb 2022
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};
