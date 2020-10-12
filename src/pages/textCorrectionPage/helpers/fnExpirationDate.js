
const fnExpirationDate = (start, end) => {
  // This makes no effort to account for holidays
    // Counts end day, does not count start day

    // make copies we can normalize without changing passed in objects    
    var start = new Date(start);
    var end = new Date(end);
    
    // initial total
    var totalBusinessDays = 0;
    
    // normalize both start and end to beginning of the day
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    
    var current = new Date(start);
    current.setDate(current.getDate() + 1);
    var day;
    // loop through each day, checking
    while (current <= end) {
        day = current.getDay();
        if (day >= 1 && day <= 5) {
            ++totalBusinessDays;
        }
        current.setDate(current.getDate() + 1);
    }
    return totalBusinessDays;
}

export default fnExpirationDate;