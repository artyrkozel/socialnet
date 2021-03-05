import React from "react";
import preloader from "../assets/images/loader.gif";
import styles from './Preloader.module.css'
const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img src={preloader}/>
        </div>
    )
}
export default Preloader