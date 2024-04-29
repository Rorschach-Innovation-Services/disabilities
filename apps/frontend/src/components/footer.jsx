import styles from "../pages/style.module.css";
import mapStyles from "./map.module.css";
import Logo02 from "../assets/images/logo02.svg";

export const Footer = () => {
    return (
        <div>
            <footer className={styles["footer"]}>
                <div className={styles["footer-container"]}>
                    <div className={styles["footer-row"]}>
                        <div className={styles["footer-col"]}>
                            <div className={styles["footer-logo"]}>
                                <a href="index.html">
                                    <img src={Logo02} alt="" />
                                </a>
                            </div>
                        </div>

                        <div className={styles["footer-col"]}>
                            <h4>Sitemap</h4>

                            <ul>
                                <li>
                                    <a href="about-us#vision-page">Vision</a>
                                </li>
                                <li>
                                    <a href="about-us#mission-page">Mission</a>
                                </li>
                                <li>
                                    <a href="services">What we do</a>
                                </li>
                                <li>
                                    <a href="about-us#team-members">Team</a>
                                </li>
                                <li>
                                    <a href="contact-us">Contact Us</a>
                                </li>
                                <li>
                                    <a href="contact-us#faqs-page">FAQ’s</a>
                                </li>
                            </ul>
                        </div>

                        <div className={styles["footer-col"]}>
                            <h4>Contact</h4>
                            <ul>
                                <li>
                                    <a href="tel:+27 21 650 4561">
                                        t: +27 21 650 4561
                                    </a>
                                </li>

                                <li>
                                    <a href="mailto:info@sleepscience.co.za">
                                        e: info@sleepscience.co.za
                                    </a>
                                </li>
                                <li>
                                    Sports Science Institute of South Africa, 15 Boundary Road,
                                    Newlands, Cape Town, South Africa
                                </li>
                            </ul>

                            <div className={styles["social-links"]}>
                                <a href="https://www.facebook.com/www.sleepscience.co.za">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/sleep-science-za/">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a href="https://www.instagram.com/sleepscience_/">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>

                        <div className={styles["footer-col"]}>
                            <h4>Times</h4>
                            <div className={styles["location"]}>
                                <h5>Mon - Fri: 08h00- 17h00</h5>

                                <h6>How to find us:</h6>
                                <p>
                                    *Please note visits are by appointment only.
                                </p>

                                <div className={mapStyles["mapouter"]}>
                                    <div className={mapStyles["gmap_canvas"]}>
                                        {/* <iframe
                                            width="600"
                                            height="500"
                                            id="gmap_canvas"
                                            src="https://maps.google.com/maps?q=SSISA%20Academy,%20Boundary%20Rd,%20Newlands,%20Cape%20Town,%207700&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            frameborder="0"
                                            scrolling="no"
                                            marginheight="0"
                                            marginwidth="0"
                                        ></iframe> */}
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6617.6110597204215!2d18.4651484!3d-33.9718376!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5d2cf806cb5d%3A0xc2f04ea73cab51a1!2sSports%20Science%20Institute%20of%20SA!5e0!3m2!1sen!2sza!4v1662301427041!5m2!1sen!2sza" width="600" height="500" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6617.6110597204215!2d18.4651484!3d-33.9718376!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5d2cf806cb5d%3A0xc2f04ea73cab51a1!2sSports%20Science%20Institute%20of%20SA!5e0!3m2!1sen!2sza!4v1662301427041!5m2!1sen!2sza" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                                        <a href="https://putlocker-is.org"></a>
                                        <br />
                                        <a href="https://www.embedgooglemap.net">
                                            google maps code
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className={styles["copyright"]}>
                <p>©Sleep Science 2022 /All Rights Reseverved.</p>
            </div>

            <a
                className={styles["gototop"]}
                href="#top-section"
                onClick={() => {
                    const elem = document.getElementById("top-section");
                    if (elem) elem.scrollIntoView();
                }}
            >
                {" "}
                <i className={`fas fa-angle-double-up`}>
                    {" "}
                    <p>Back To Top</p>{" "}
                </i>{" "}
            </a>
        </div>
    );
};
