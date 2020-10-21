import React, { useState, useEffect} from 'react'
import Form from '../../components/form/Form';
import moment from "moment"
import {
    chooseCoefficientSpeed,
    calculatePrice,
    calculateWorkDuration,
    calculateResultDate,
} from "./helpers/helpers"

import styles from "./TextCorrectionPage.module.scss"

const TextCorrectionPage = () => {
    const initialValues = {
        email: "",
        name: "",
        text: "",
        language: "ua",
        comments: "",
        format: undefined
    };
    
    // console.log(startTime)
    const [inputValues, setInputValues] = useState(initialValues);
    const [data, setData] = useState([]);
    const [resultDate, setResultDate] = useState({});
  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevState) => ({ ...prevState, [name]: value }));

    }

    const handleChangeLanguage = (e) => {
        const { value } = e.target;
        setInputValues((prevState) => ({ ...prevState, language: value }));

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
    //   '24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss"
      let startTime = moment().local("uk").valueOf();

      const language = inputValues.language
      const length = inputValues.text.length
      const coefficientSpeed = chooseCoefficientSpeed(inputValues.language)
      const coefficient = coefficientSpeed.coefficient;
      const speed = coefficientSpeed.speed;
      const format = inputValues.format;
      const duration = calculateWorkDuration(length, speed, format);
      
      useEffect(() => {
        chooseCoefficientSpeed(language);
        calculatePrice(length, language, coefficient, format);
        calculateWorkDuration(length, speed, format);
        setResultDate(calculateResultDate(startTime, duration))
    }, [language, length, coefficient, format, speed, duration])

        return (
        <div className={`${styles.textCorrectionPageWrapper} container`}>
            <Form
            onFocus={onFocus}
            onBlur={onBlur}
            inputValues={inputValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleChangeLanguage={handleChangeLanguage}
            price={calculatePrice(length, language, coefficient, format)}
            resultDate={resultDate}
            duration={duration}
            />
        </div>
    )
}

export default TextCorrectionPage;