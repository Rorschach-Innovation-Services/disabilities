import styles from "./articles.module.css";
import CircadianRhythmsLarge from "../../assets/images/circadian-rhythms-lg.jpg";
import SleepDeprivationSmall from "../../assets/images/sleep-deprivation-sml.jpg";
import ConcussionHistoryOutcomesSmall from "../../assets/images/concussion-history-outcomes-sml.jpg";
import ObstructiveSleepApnoeaSmall from "../../assets/images/obstructive-sleep-apnoea-sml.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const CircadianRhythmsComponent = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>16 April 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img
                            src={CircadianRhythmsLarge}
                            alt="sleep cardiometabolic disease risk factors workplace performance"
                        />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>PhD candidate: Nyambura Shawa</h4>

                        <h5>
                            <u>
                                Sleep, circadian rhythms and non-communicable
                                diseases in an urban South African population
                            </u>
                        </h5>

                        <p>
                            Sleep has been linked to elevated body mass index,
                            increased risk of being overweight or obese, and
                            increased risk of coronary events. These are just
                            some of the risk factors for developing certain
                            non-communicable diseases. Sleep is also reported to
                            be regulated and influenced by circadian genetic factors.
                            Therefore, this research seeks to investigate the
                            relationship among sleep, circadian genetic and environmental
                            factors, and risk factors for developing
                            non-communicable diseases in South Africans living
                            in urban communities.
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

                            <h3>PhD candidate: Chadley Kemp</h3>

                            <p>
                                Sleep, circadian rhythms, cardiometabolic health
                                and neurocognitive performance in competitive
                                computer gamers
                            </p>

                            <div className={styles["research-date"]}>
                                09 Apr 2022
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

                            <h3>PhD candidate: Chadley Kemp</h3>

                            <p>
                                Sleep, circadian rhythms and non-communicable
                                diseases in an urban South African population
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
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3> PhD candidate: Arron Correia</h3>

                            <p>
                                Investigating the relationship between sleep,
                                autonomic nervous system function and
                                psychiatric disorders in South African women
                                living in a low socio- economic environment
                            </p>

                            <div className={styles["research-date"]}>
                                29 Mar 2022
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};
