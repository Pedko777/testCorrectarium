//функция подсчёта необходимого времени на перевод в зависимости от языка

export const timeToDo = (inputValues) => {
    let time = 30;
    if (inputValues.language === "ua" || inputValues.language === "ru") {
        time += Math.ceil(inputValues.text.length / 666) * 30;
    }
    if (inputValues.language === "en") {
        time += Math.ceil(inputValues.text.length / 166) * 30;
    }
    return time <= 60? 90 : time;
}