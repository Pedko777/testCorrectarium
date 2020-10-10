import React from 'react'
import Button from '../button/Button'
import styles from "./Form.module.scss"

const Form = ({
  handleChange,
  handleSubmit,
  onFocus,
  onBlur,
  inputValues: { email, name, text, comments },
  handleChangeText,
  handleChangeLanguage,
  totalSymbols,
price

}) => {
        return (
        <form onSubmit={handleSubmit} className={styles.fromWrapper}>
            <div className={styles.leftForm}> 
                <h3>ЗАМОВИТИ РЕДАГУВАННЯ</h3>
                <p>Виправимо всі помилки, приберемо всі дурниці, перефразуємо невдалі місця, але сильно текст не переписуватимемо. Зайвих виправлень не буде. Детальніше про редагування</p>
                <section>
                    <input
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
                <div>
                    <input
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
                </div>
                <div>
                    <textarea
                        type="text"
                        placeholder="Уведіть текст або завантажте файл"
                        required
                        name="text"
                        value={text}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={handleChangeText}
                    />
                        <div>{totalSymbols}</div>
                </div>
                <div>
                    <h3>МОВА</h3>
                    <section className={styles.languageList}>
                        <div>
                                <label>
                            <input type="radio" name="language" value="ua" onChange={handleChangeLanguage}/>
                                    
                                    Українська</label>
                        </div>
                        <div>
                                <label>
                            <input type="radio" name="language" value="ru" onChange={handleChangeLanguage} />
                                    Російська</label>
                        </div>
                        <div>
                                <label>
                            <input type="radio" name="language" value="en" onChange={handleChangeLanguage} />
                                    Англійська</label>
                        </div>
                    </section>
                </div>
                 <div>
                    <input
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
                </div>
            </div>
            <div className={styles.rightForm}>
                    <div><h3>Summ: {price}</h3></div>
                <div className={styles.btnWrapper}>
                    <Button
                        text="Замовити"
                        type="submit"
                    />
                </div>
            </div>
        </form>
    )
}

export default Form;