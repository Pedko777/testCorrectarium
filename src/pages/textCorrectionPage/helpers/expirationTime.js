//функция изминяющая время с учётом необходимого времени на перевод
export const expirationTime = ({ balance, dateNow}) => {
    // console.log(dateNow.valueOf())
    do {
        if ( dateNow.day() === 0 ||  dateNow.day() === 6) {
        dateNow.set(dateNow.add({day: 1}))
        } else if (dateNow.hour() >= 10 && dateNow.hour() <= 19) {

        const timeLeft = (18 - dateNow.hour()) * 60 + (60 - dateNow.minute())
        if (balance > timeLeft) {
            balance -= timeLeft;
            dateNow.set(dateNow.add({day: 1}));
            dateNow.set(dateNow.hour(10).minute(0))              
        } else {      
            dateNow.set(dateNow.add({minutes: balance}))
            balance = 0
        }
        } else {
            dateNow.set(dateNow.add({day: 1}));
            dateNow.set(dateNow.hour(10).minute(0))
        }
    }
    while (balance !== 0 && dateNow.hour() >= 10 && dateNow.hour() <= 19)
}