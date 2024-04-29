import styles from "./articles.module.css";
import LowIncomeSmall from "../../assets/images/low-income-sml.jpg";
import LowSocioEconomicSmall from "../../assets/images/low-socio-economic-sml.jpg";
import WorkplacePerformanceSmall from "../../assets/images/workplace-performance-sml.jpg";
import ApnoeaWearableDeviceLarge from "../../assets/images/apnoea-wearable-device-lg.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const ApnoeaWearableDevice = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>13 Dec 2021</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img src={ApnoeaWearableDeviceLarge} alt="" />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>Investigator: Dr Rae</h4>

                        <h5>
                            <u>
                                A validation study of a PPG-derived algorithm to
                                predict sleep architecture, sleep apnoea and
                                breathing rate using a wearable device
                            </u>
                        </h5>

                        <p>
                            Today, huge numbers of people around the globe own
                            smart watches that track physical activity and
                            sleep, among other behaviours. Excitingly, the
                            technology in this area is advancing rapidly. When
                            it comes to sleep, these devices make predictions
                            based on certain measured indices – like movement or
                            heart rate, since of course they cannot measure
                            sleep directly as one might do in the laboratory. To
                            ensure that these predictions are as accurate as
                            possible – the algorithms must be tested against the
                            current gold-standard measure of sleep –
                            polysomnography. We are conducting this research to
                            help validate proprietary algorithms for a
                            commercial company. Other team members: Dr Henst, Ms
                            Stephenson, Ms Forshaw, Ms Correia.
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
                    <a href="/articles/low-socio-economic">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={LowSocioEconomicSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PhD candidate: Arron Correia</h3>

                            <p>
                                Investigating the relationship between sleep,
                                autonomic nervous system function and
                                psychiatric disorders in South Africans living
                                in a low socio-economic environment
                            </p>

                            <div className={styles["research-date"]}>
                                {" "}
                                11 May 2022
                            </div>
                        </div>
                    </a>

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
                </div>
            </section>
            <Footer />
        </div>
    );
};
