import styles from "./articles.module.css";
import LowIncomeSmall from "../../assets/images/low-income-sml.jpg";
import CompetitiveGames from "../../assets/images/competitive-games.jpg";
import WorkplacePerformanceLarge from "../../assets/images/workplace-performance--lg.jpg";
import AfricanOriginLarge from "../../assets/images/african-origin-lg.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const AfricanOrigins = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>26 February 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img src={AfricanOriginLarge} alt="" />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>Investigators: Dr Rae and Dr O’Brien</h4>

                        <h5>
                            <u>
                                Chronotype and sleep patterns in rural and urban
                                South African individuals of African origin{" "}
                            </u>
                        </h5>

                        <p>
                            We have previously observed unusually long sleep in
                            South Africans of African-origin, while also
                            noticing that many of the traditional tools used to
                            assess sleep quality and chronotype (the behavioural
                            expression of our circadian rhythms – think night
                            owls and morning people) may not be valid in an
                            African setting. In this study we are interrogating
                            the use of these tools by comparing their outputs to
                            measured sleep patterns in rural, older South
                            Africans. Other team members: Prof von Schantz, A/Prof Gòmez-Olivé, Dr
                            Scheuermaier, Dr Redman.
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
                                    src={WorkplacePerformanceLarge}
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
