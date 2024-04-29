import styles from "./articles.module.css";
import { Footer } from "../../components/footer";
import ComputerGamersLarge from "../../assets/images/computer-gamers-lg.jpg";
import ConcussionHistoryOutcomesSmall from "../../assets/images/concussion-history-outcomes-sml.jpg";
import CircadianRhythmsSmall from "../../assets/images/circadian-rhythms-sml.jpg";
import ObstructiveSleepApnoeaSmall from "../../assets/images/obstructive-sleep-apnoea-sml.jpg";
import { CustomHeader } from "../../components/header";

export const ComputerGamers = () => {
    return (
        <div>
            <CustomHeader styles={styles} />
            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>24 April 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img
                            src={ComputerGamersLarge}
                            alt="sleep cardiometabolic disease risk factors workplace performance"
                        />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>PhD candidate: Chadley Kemp</h4>

                        <h5>
                            <u>
                                Sleep, circadian rhythms, cardiometabolic health
                                and neurocognitive performance in Esports
                                players
                            </u>
                        </h5>

                        <p>
                            This research characterizes and explores the
                            associations between sleep patterns, cardiometabolic
                            health risk factors, and neurocognitive performance
                            in esports players. This study also describes
                            quantitative doses and 24-hour patterns of physical
                            activity and light exposure in these individuals.
                            The work underlying this study is intended to assist
                            the establishment of health regulation in gaming and
                            esports, for which motives are to support individual
                            decisions, governments, and policy makers through
                            evidence-based recommendations to maintain healthy
                            gaming behaviors and minimize disease.
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
                                    alt=""
                                    width="50px"
                                    height="50px"
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

                            <div className={styles["research-date"]}>
                                02 Apr 2022
                            </div>
                        </div>
                    </a>
                </div>
            </section>
            <Footer />
        </div>
    );
};
