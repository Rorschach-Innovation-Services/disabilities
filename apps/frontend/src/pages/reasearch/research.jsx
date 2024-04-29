import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";
import { FirstPage } from "./components/first";
import { SecondPage } from "./components/second";
import { useState } from "react";
import styles from "./research.module.css";

export const Research = () => {
    const [render, setRender] = useState("first");

    return (
        <div>
            <CustomHeader styles={styles} />

            {render === "first" && (
                <FirstPage
                    setRender={(value) => {
                        setRender(value);
                        const element = document.getElementById("top-section");
                        element.scrollIntoView({ behavior: "smooth" });
                    }}
                />
            )}
            {render === "second" && (
                <SecondPage
                    setRender={(value) => {
                        setRender(value);
                        const element = document.getElementById("top-section");
                        element.scrollIntoView({ behavior: "smooth" });
                    }}
                />
            )}

            <Footer />
        </div>
    );
};
