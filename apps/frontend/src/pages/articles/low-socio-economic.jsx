import styles from "./articles.module.css";
import LowIncomeSmall from "../../assets/images/low-income-sml.jpg";
import LowSocioEconomicLarge from "../../assets/images/low-socio-economic-lg.jpg";
import CompetitiveGames from "../../assets/images/competitive-games.jpg";
import WorkplacePerformanceSmall from "../../assets/images/workplace-performance-sml.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const LowSocioEconomic = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>11 May 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img
                            src={LowSocioEconomicLarge}
                            alt="sleep cardiometabolic disease risk factors workplace performance"
                        />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>PhD candidate - Arron Correia</h4>

                        <h5>
                            <u>
                                Investigating the relationship between sleep,
                                autonomic nervous system function and
                                psychiatric disorders in South Africans living
                                in a low socio-economic environment{" "}
                            </u>
                        </h5>

                        <p>
                            Poor sleep has a well-established bidirectional
                            relationship with disorders such as depression and
                            anxiety. Both poor sleep and mood- and
                            anxiety-related disorders have been linked to
                            altered autonomic nervous system (ANS) function.
                            Parasympathetic activity should predominate during
                            sleep, but stressful environments have been
                            associated with increased sympathetic (i.e.,
                            fight-or-flight) activity during sleep. Therefore,
                            we hypothesise that anxiety and depression may alter ANS
                            function, perhaps in the form of hyperarousal, which
                            may mediate the sleep-mental health relationship.
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
                                African adults (PhD candidate: Philippa Forshaw){" "}
                            </p>

                            <div className={styles["research-date"]}>
                                01 May 2022
                            </div>
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
                                in executive employees
                            </p>

                            <div className={styles["research-date"]}>
                                28 Apr 2022
                            </div>
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
                                players
                            </p>

                            <div className={styles["research-date"]}>
                                24 Apr 2022
                            </div>
                        </div>
                    </a>
                </div>
            </section>
            <Footer />
        </div>
    );
};
