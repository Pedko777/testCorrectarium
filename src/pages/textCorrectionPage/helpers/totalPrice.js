// функция подсчета окончательной сумы в зависимости от языка и длины текста
export const totalPrice = (inputValues) => {
    if (inputValues.language === "ua" || inputValues.language === "ru" ) {
        const textLengthPrice = inputValues.text.length * 0.05;
        return textLengthPrice > 50? textLengthPrice : 50; 
    }
    if(inputValues.language === "en") {
        const textLengthPrice = inputValues.text.length * 0.12; 
        return textLengthPrice > 120? textLengthPrice : 120; 
    }
}