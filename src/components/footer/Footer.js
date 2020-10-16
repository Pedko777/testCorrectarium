import React from 'react'
import { NavLink } from 'react-router-dom';
// import Button from '../button/Button';
import styles from "./Footer.module.scss"

const Footer = () => {
    return (
        <div className={` ${styles.footer} container`}>
            <ul className={styles.contactLinkList}>
                <li className={styles.contactLinkListItem}>
                            <NavLink
                                to="#"
                                exact
                                className={styles.navLink}
                            >
                                Facebook
                            </NavLink>
                        </li>
                        <li className={styles.contactLinkListItem}>
                            <NavLink
                                to="#"
                                exact
                                className={styles.navLink}
                            >
                             manager@correctarium.com
                            </NavLink>
                        </li>
            </ul>
            <div className={styles.LanguageChangeBtnWrapper}>
                <div >
                    <button className={styles.footerBtn}>Українська</button>
                </div>
                <div>
                    <button className={styles.footerBtn}>Русский</button>
                </div>
            </div>
        </div>
)
}


export default Footer;