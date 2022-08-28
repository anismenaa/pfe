
import React from 'react';
import styles from './home.module.css'

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <div className={styles.informations_homepage}>
                <h4 className={styles.informations_homepage_h4}>Contact</h4>
                <p><strong>Email:</strong> rail_logistic@gmail.com</p>
                <p><strong>Facebook:</strong> Rail logistic Algerie</p>
                <p><strong>LinkedIn:</strong> Rail logisitc</p>
            </div>
            <div className={styles.logo} >
                <p>All rights are preserved @2022</p>
            </div>
            <div className={styles.informations_homepage}>
                <h4 className={styles.informations_homepage_h4}>Adresse</h4>
                <p>rouiba rue de la zone</p>
                <p>- Alger -Algerie</p>
            </div>
        </footer>
    );
}

export default Footer;