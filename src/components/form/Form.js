import React from 'react';
import Button from '../button/Button';
import styles from "./Form.module.scss";
import moment from "moment";
import { NavLink } from 'react-router-dom';

const Form = ({
    handleChange,
    handleSubmit,
    onFocus,
    onBlur,
    inputValues: { email, name, text, comments },
    handleChangeLanguage,
    inputValues,
    price,
    resultDate,
    duration,
}) => {
    const currentTime = moment().locale("uk")
    const resultTime = moment(resultDate, "DD.MM.YYYY o HH:mm")
    const durationMm = duration / 60000;



        return (
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <div className={styles.leftForm}> 
                <h3 className={styles.sectionHeader}>ЗАМОВИТИ РЕДАГУВАННЯ</h3>
                <p className={styles.sectionDesc}>Виправимо всі помилки, приберемо всі дурниці, перефразуємо невдалі місця, але сильно текст не переписуватимемо. Зайвих виправлень не буде. <NavLink to="#" exact>Детальніше про редагування</NavLink></p>
                <section className={styles.containerInput}>
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="Ваша эл. почта"
                        required
                        name="email"
                        value={email}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={handleChange}
                    />
                </section>
                <section className={styles.containerInput}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Ваше имя"
                        minLength="2"
                        maxLength="15"
                        required
                        name="name"
                        value={name}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={handleChange}
                    />
                </section>
                <section className={styles.textareaWrapper}>
                    <textarea                    
                        className={styles.areaText}
                        type="text"
                        placeholder="Уведіть текст або"
                        required
                        name="text"
                        value={text}
                        onBlur={onBlur}
                        onChange={handleChange}></textarea>
                        <label className={styles.downloadFile}>
                            <p className={inputValues.text.length !== 0 && onFocus ?  styles.downloadFileTextDisplayNone : styles.downloadFileText  }>завантажте файл</p>
                            <input className={styles.downloadFileInput} type="file" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, .rtf, .txt, .pdf, .zip"/>
                        </label>
                        <div className={styles.symbols}>{inputValues.text?.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                </section>
                <section>
                    <h3 className={styles.sectionTitle}>Формат</h3>
                    <select name="format" onChange={handleChange} className={styles.format}>
                        <option value={undefined}  name="format" defaultChecked >
                            не обрано
                        </option>
                        <option value=".doc">
                            .doc
                        </option>
                        <option value=".docx">
                            .docx
                        </option>
                        <option value=".rtf">
                            .rtf
                        </option>
                        <option value=".pdf">
                            .pdf
                        </option>
                        <option value=".txt">
                            .txt
                        </option>
                        <option value=".zip">
                            .zip
                        </option>
                    </select>
                </section>
                <div>
                    <h3 className={styles.sectionTitle}>МОВА</h3>
                    <section className={styles.languageList}>
                        <div>
                            <label>
                                <input type="radio" name="language" value="ua" onChange={handleChangeLanguage} defaultChecked />Українська
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="radio" name="language" value="ru" onChange={handleChangeLanguage} />Російська
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="radio" name="language" value="en" onChange={handleChangeLanguage} />Англійська
                            </label>
                        </div>
                    </section>
                </div>
                 <section className={styles.containerInput}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Стислий коментар або покликання"
                        maxLength="60"
                        required
                        name="comments"
                        value={comments}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={handleChange}
                    />
                </section>
            </div>
            <div className={styles.rightForm}>
                <div className={styles.submit}>
                    <div className={styles.content}>
                        <div className={styles.contentPrice}>
                            <div className={styles.price}>{price.toFixed(2)} грн.</div>
                            <div className={styles.time}>{inputValues.lenguage !== "" && inputValues.text !== "" ? <p> {resultTime.day() === currentTime.day()?durationMm <= 90? "зробимо за одну годину": durationMm <= 120 ? "зробимо за дві години":  `термін виконання ${resultDate}`: `термін виконання ${resultDate}`}</p> : <p> </p>}</div></div>
                        <div className={styles.btnWrapper}>
                            <Button
                                text="Замовити"
                                type="submit"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Form;