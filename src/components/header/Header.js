import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from "./Header.module.scss"

import { ReactComponent as Logo } from '../../ui/logo.svg';
import Button from '../button/Button';


const Header = () => {
    return (
        <header className={styles.header}>
            <div className={` ${styles.headerContainer} container`}>
                <div className={styles.headerItem}>
                    <div className={styles.logo}>
                         <NavLink
                            to="#"
                            exact
                            className={styles.navLink}
                        >
                        <Logo/>
                        </NavLink>
                    
                    </div>
                    <ul className={styles.menuList}>
                        <li>
                            <NavLink
                                to="#"
                                exact
                                className={styles.navLink}
                            >
                                Про нас
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="#"
                                exact
                                className={styles.navLink}
                            >
                             Ціни
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="#"
                                exact
                                className={styles.navLink}
                            >
                                Редактори
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="#"
                                exact
                                className={styles.navLink}
                            >
                                Блог
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={styles.btnWrapper}>
                    <Button type="button" text="Перевірити текст" />
                </div>
            </div>
        </header>
    )
}
export default Header;