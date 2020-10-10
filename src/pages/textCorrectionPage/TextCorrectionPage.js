import React, {useState} from 'react'
import Form from '../../components/form/Form'
import styles from "./TextCorrectionPage.module.scss"
import { initialValues } from "../../helpers/helpers"




const TextCorrectionPage = () => {

    
    const [inputValues, setInputValues] = useState(initialValues);
    const [data, setData] = useState([]);
    const [price, setPrice] = useState(0);
    const [language, setLenguage] = useState("ua")
    const [totalSymbols, setTotalSymbols] = useState(0)
   console.log(language)

    // get input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleChangeText = (e) => {
        const { name, value } = e.target;
        setInputValues((prevState) => ({ ...prevState, [name]: value }));
        symbols()
        PriceLenguage()

    }

    const handleChangeLanguage = (e) => {
        const { name, value } = e.target;
        setInputValues((prevState) => ({ ...prevState, [name]: value }));
        setLenguage(value)
        PriceLenguage()
    }

   

    // reset form input fields
    const handleReset = () => setInputValues({...initialValues})

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

    // hide input placeholder
     const onFocus = ({ target }) => (target.placeholder = "");
    
    // show input placeholder
    const onBlur = ({ target }) =>
    (target.placeholder =
      target.name.charAt(0).toUpperCase() + target.name.slice(1));
   
    
    // total symbols
    const symbols = () => {
        const { text } = inputValues;
        const textLength = text.length;
        return setTotalSymbols(textLength) 
    }


    // total price
    
    const PriceLenguage = () => {
        
        if (language === "ua" || language === "ru" ) {
            const textLengthPrice = totalSymbols * 0.05
            // return setPrice((prevState) => ({ ...prevState, price: textLengthPrice }))
            return setPrice( textLengthPrice > 50? textLengthPrice : 50 )
        } else {
            const textLengthPrice = totalSymbols * 0.12
            // return setPrice((prevState) => ({ ...prevState, price: textLengthPrice }))
            return setPrice( textLengthPrice > 50? textLengthPrice : 50 )
        }
    }


    return (
        <div className={` ${styles.TextCorrectionPageWrapper} container`}>
            <Form
            onFocus={onFocus}
            onBlur={onBlur}
            inputValues={inputValues}
            handleChange={handleChange}
            handleChangeText={handleChangeText}
            handleSubmit={handleSubmit}
            handleChangeLanguage={handleChangeLanguage}
            price={price}
            totalSymbols={totalSymbols}
            />
        </div>
    )
}

export default TextCorrectionPage;