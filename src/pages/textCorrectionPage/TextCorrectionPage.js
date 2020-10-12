import React, { useState, useEffect, useCallback } from 'react'


import 'moment/locale/uk';
import Form from '../../components/form/Form'


import styles from "./TextCorrectionPage.module.scss"


const TextCorrectionPage = () => {
    const initialValues = {
        email: "",
        name: "",
        text: "",
        language: "",
        comments: "",
    };

    const [inputValues, setInputValues] = useState(initialValues);
    const [data, setData] = useState([]);
    const [price, setPrice] = useState(0);


    // get input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevState) => ({ ...prevState, [name]: value }));
        
    }


    const handleChangeLanguage = (e) => {
        const { value } = e.target;
        setInputValues((prevState) => ({ ...prevState, language: value }));
    }


    // submit form data
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

            // handleReset()
        }
    }

    // reset form input fields
    const handleReset = () => setInputValues({...initialValues})

    // hide input placeholder
     const onFocus = ({ target }) => (target.placeholder = "");
    
    // show input placeholder
    const onBlur = ({ target }) =>
    (target.placeholder =
      target.name.charAt(0).toUpperCase() + target.name.slice(1));
   

    
    // total price
    const totalPrice = useCallback(() => {
        if (inputValues.language === "ua" || inputValues.language === "ru" ) {
            const textLengthPrice = inputValues.text.length * 0.05
            return setPrice( textLengthPrice > 50? textLengthPrice : 50 )
        }
        
        if(inputValues.language === "en") {
            const textLengthPrice = inputValues.text.length * 0.12 
            return setPrice( textLengthPrice > 120? textLengthPrice : 120 )
        }
    }, [inputValues.language, inputValues.text.length]) 
  

    //timetodo
    const timeToDo = () => {
        let time = 30;
        if (inputValues.language === "ua" || inputValues.language === "ru") {
             time += Math.ceil(inputValues.text.length / 1333) * 60 
        }
        if (inputValues.language === "en") {
            time += Math.ceil(inputValues.text.length / 333) * 60 
        }
  
        return time < 60 ? 60: time
    }

    let dateNow = new Date();
    const expirationTime = () => {
        let balance = timeToDo();
        do {
            if ( dateNow.getDay() === 0 ||  dateNow.getDay() === 6) {
            console.log("воскресенье или суббота")
            dateNow.setDate(dateNow.getDate() + 1 )
        } else if (dateNow.getHours() >= 10 && dateNow.getHours() <= 19) {
            console.log("работаем с пн по пт с 10 до 19")
            const timeLeft = (18 - dateNow.getHours()) * 60 + (60 - dateNow.getMinutes()) //19- 13.25 = 5.35
            if (balance > timeLeft) {
                balance -= timeLeft;
                dateNow.setDate(dateNow.getDate() + 1);
                dateNow.setHours(10, 0)
                
            } else {
                
                dateNow.setMinutes(dateNow.getMinutes() + balance)
                balance = 0
            }
        } else {
                console.log("не рабочее время")
                dateNow.setDate(dateNow.getDate() + 1);
                // console.log(dateNow.getDate())
                dateNow.setHours(10, 0)
            }
            // console.log(balance !== 0, dateNow.getHours() >= 10,  dateNow.getHours() <= 19, balance !== 0 && dateNow.getHours() < 10 && dateNow.getHours() > 19)
        } while (balance !== 0 && dateNow.getHours() >= 10 && dateNow.getHours() <= 19)
        // return dateNow;
    }
    expirationTime()
    

    console.log(dateNow)


    useEffect(() => {
        totalPrice()
        // expirationTime()
    }, [inputValues.text.length, inputValues.language])
    
   

    return (
        <div className={`${styles.TextCorrectionPageWrapper} container`}>
            <Form
            onFocus={onFocus}
            onBlur={onBlur}
            inputValues={inputValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleChangeLanguage={handleChangeLanguage}
            price={price}
            />
        </div>
    )
}

export default TextCorrectionPage;