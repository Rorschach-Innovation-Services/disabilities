import styles from "./articles.module.css";
import { Footer } from "../../components/footer";
import CircadianRhythmsSmall from "../../assets/images/circadian-rhythms-sml.jpg";
import CompetitiveGames from "../../assets/images/competitive-games.jpg";
import ObstructiveSleepApnoeaSmall from "../../assets/images/obstructive-sleep-apnoea-sml.jpg";
import WorkplacePerformanceLarge from "../../assets/images/workplace-performance--lg.jpg";
import { CustomHeader } from "../../components/header";

export const WorkplacePerformanceComponent = () => {
    return (
        <div>
            <CustomHeader styles={styles} />
            <section className={styles["article-section"]}>
                <a href="../research.html" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>20 March 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img src={WorkplacePerformanceLarge} alt="" />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>PhD candidate - Paula Pienaar</h4>

                        <h5>
                            <u>
                                Associations between sleep, cardiometabolic
                                disease risk factors and workplace performance
                                in executive employees
                            </u>
                        </h5>

                        <p>
                            Poor sleep health is linked to cardiometabolic
                            diseases (e.g. cardiovascular disease, type 2
                            diabetes, obesity) and impaired work performance.
                            Extended work hours and high job demands are
                            characteristic of corporate executives, often
                            compromising their sleep in response to meeting
                            performance objectives. By investigating the
                            associations between sleep, cardiometabolic disease,
                            and the factors affecting it, the outcome of this
                            research presents the opportunity to establish
                            evidence-based employee sleep health programmes and
                            the business case for underscoring the critical
                            importance of well-rested business leaders.
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

                    <a href="/articles/circadian-rhythms">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={CircadianRhythmsSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3> PhD candidate: Nyambura Shawa</h3>

                            <p>
                                Sleep, circadian rhythms and non-communicable
                                diseases in an urban South African population
                            </p>

                            <div className={styles["research-date"]}>
                                16 Apr 2022
                            </div>
                        </div>
                    </a>

                    <a href="/articles/obstructive-apnoea">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={ObstructiveSleepApnoeaSmall}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                />
                            </div>

                            <h3>PhD candidate: Batsheva Brand</h3>

                            <p>
                                Physical activity and sedentary behaviour among
                                patients with obstructive sleep apnoea in South
                                Africa
                            </p>

                            <div className={styles["research-date"]}>
                                08 Apr 2022
                            </div>
                        </div>
                    </a>
                </div>
            </section>
            <Footer />
        </div>
    );
};
