import moment from "moment"
// функция определяющая коофициент и скорость в зависимости от языка
const chooseCoefficientSpeed = (language) => {
    if (language === "ua" || language === "ru" ) {
        return {coefficient: 0.05, speed: 1333}
    }
    if(language === "en") {
        return {coefficient: 0.12, speed: 333}
    }
}


// функция подсчета окончательной сумы в зависимости от языка, длины текста и формата документа
const calculatePrice = (length, language, coefficient, format) => {
    // console.log(format)
    if(language === "ua" || language === "ru") {
        if(format === ".doc" || format === ".docx" || format === ".rtf" || format === undefined) {
            return  length * coefficient > 50?  length * coefficient : 50;
        } else {
            return length * coefficient > 50 * 1.2?  length * coefficient * 1.2: 60
        }
    } else {
        if(format === ".doc" || format === ".docx" || format === ".rtf" || format === undefined) {
            return  length * coefficient > 120?  length * coefficient : 120;
        } else {
            return length * coefficient > 120 * 1.2?  length * coefficient * 1.2: 120 * 1.2
        }
    }
}


//функция подсчёта необходимого времени на перевод в зависимости от формата
const calculateWorkDuration = (length, speed, format) => {
    let time = 0.5
    if(format === ".doc" || format === ".docx" || format === ".rtf" || format === undefined) {
        time = Math.round(length / speed + time) *60*60*1000
        return time <= 60 * 60 * 1000 ? 90 * 60 * 1000 : time
    } else {
        time = Math.round((length / speed + time)) *60*60*1000* 1.2
        // time += Math.round(length / speed) * 60 * 60 * 1000 * 1.2
        return time <= 60 * 60 * 1000? 90 * 60 * 1000 * 1.2 : time
    }   
}

//функция изменяющая время с учётом необходимого времени на перевод
const calculateResultDate = (startTime, duration) => {
    let resultDate = moment(startTime)
    do {
        if (resultDate.day() === 0 ||  resultDate.day() === 6) {
            resultDate.set(resultDate.add({day: 1}))
            resultDate.set(resultDate.hour(10).minute(0))
            } else if (resultDate.hour() < 10){
                resultDate.set(resultDate.hour(10).minute(0))
            }else if ( resultDate.hour() <= 19) {
            const timeLeft = (18 - resultDate.hour()) * 60 *60 *1000 + (60 - resultDate.minute())*60*1000
            if (duration > timeLeft) {
                duration -= timeLeft;
                resultDate.set(resultDate.add({day: 1}))
                resultDate.set(resultDate.hour(10).minute(0))              
            } else {      
                duration = Math.round(duration/60/60/1000)*60*60*1000 
                resultDate.set(resultDate.add({ms: duration}))
                duration = 0
            }
            } else {
                resultDate.set(resultDate.add({day: 1}))
                resultDate.set(resultDate.hour(10).minute(0))
            }
    } 
    while (duration !== 0 && resultDate.hour() >= 10 && resultDate.hour() <= 19)

    return resultDate.format("DD.MM.YYYY o HH:mm", "uk")
}

export {
    chooseCoefficientSpeed,
    calculatePrice,
    calculateWorkDuration,
    calculateResultDate,
}