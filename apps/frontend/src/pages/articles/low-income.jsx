import styles from "./articles.module.css";
import ObstructiveSleepApnoeaSmall from "../../assets/images/obstructive-sleep-apnoea-sml.jpg";
import LowIncomeLarge from "../../assets/images/low-income-lg.jpg";
import CompetitiveGames from "../../assets/images/competitive-games.jpg";
import CircadianRhythmsSmall from "../../assets/images/circadian-rhythms-sml.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const LowIncome = () => {
    return (
        <div>
            <CustomHeader styles={styles}/>

            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>01 May 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img
                            src={LowIncomeLarge}
                            alt="sleep cardiometabolic disease risk factors workplace performance"
                        />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>PhD candidate: Philippa Forshaw</h4>

                        <h5>
                            <u>
                                Understanding the relationship between sleep and
                                cardiovascular disease in low-income South
                                African adults
                            </u>
                        </h5>

                        <p>
                            Poor sleep quality, including insufficient duration
                            and sleep disruption, has been associated with both
                            long- and short-term poor health outcomes, such as
                            an increased risk for cardiovascular disease. The
                            purpose of this study is to measure habitual sleep
                            in men and women living in a low-income
                            neighbourhood to determine the extent to which these
                            sleep characteristics are associated with
                            cardiovascular disease risk. We further wish to
                            determine to what extent this is mediated by
                            nocturnal blood pressure dipping.
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
