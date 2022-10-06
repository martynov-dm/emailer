import React from "react";
import Heading from "../../common/Heading";
import styles from "./Footer.module.css"


const Footer: React.FC = () => {
    return <footer className={styles.footer}><Heading tag={'h3'} text={'© 2022 Dmitrii Martynov'}/></footer>
}

export default Footer
