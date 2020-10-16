import React, { useState, useEffect} from 'react'
import Form from '../../components/form/Form';
import moment from "moment"

import { totalPrice } from "./helpers/totalPrice"
import { timeToDo } from "./helpers/timeToDo.js"
import {expirationTime} from './helpers/expirationTime'

import styles from "./TextCorrectionPage.module.scss"

const TextCorrectionPage = () => {
    const initialValues = {
        email: "",
        name: "",
        text: "",
        language: "ua",
        comments: "",
    };
    let dateNow = moment().local("uk");

    const [inputValues, setInputValues] = useState(initialValues);
    const [data, setData] = useState([]);
    const [date, setDate] = useState({});
    console.log("date", date);
    console.log("dateNow", dateNow)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevState) => ({ ...prevState, [name]: value }));
        setDate(dateNow)
    }

    const handleChangeLanguage = (e) => {
        const { value } = e.target;
        setInputValues((prevState) => ({ ...prevState, language: value }));
        setDate(dateNow)
    }

    const handleReset = () => setInputValues({...initialValues})
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, name, text, language, comments } = inputValues;
        if ((email !== "" && name !== "" && text !== "" && language !== "")) {
            const textData = {
                email,
                name,
                text,
                language,
                comments,
            }
            setData([...data, textData])
            handleReset()
        }
    }

     const onFocus = ({ target }) => (target.placeholder = "");
    
    const onBlur = ({ target }) =>
    (target.placeholder =
      target.name.charAt(0).toUpperCase() + target.name.slice(1));
    
    useEffect(() => {
        totalPrice(inputValues)
        expirationTime({ balance: timeToDo(inputValues), dateNow})
        setDate(dateNow.format("DD.MM.YY HH.mm"))
    }, [inputValues, totalPrice, timeToDo])
    

        return (
        <div className={`${styles.TextCorrectionPageWrapper} container`}>
            <Form
            onFocus={onFocus}
            onBlur={onBlur}
            inputValues={inputValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleChangeLanguage={handleChangeLanguage}
            price={totalPrice(inputValues)}
            date={date}
            />
        </div>
    )
}

export default TextCorrectionPage;