let createEmployeeRecord = function(x) {
    return {
        firstName: x[0],
        familyName: x[1],
        title: x[2],
        payPerHour: x[3],
        timeInEvents: [],
        timeOutEvents: []

    }
}

let createEmployeeRecords = function (employeeData) {
    return employeeData.map(function(x){
        return createEmployeeRecord(x)
    })
}

let createTimeInEvent = function (employee, DateStamp) {
    let[date,hour] = DateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,

    })
    return employee
}

let createTimeOutEvent = function(employee,DateStamp){
    let [date, hour] = DateStamp.split(' ')
    
    employee.timeOutEvents.push({
        type:"TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}


let hoursWorkedOnDate = function (employee, FindDate){
    let inEvent = employee.timeInEvents.find(function(a){
        return a.date === FindDate
    })
    
    let outEvent = employee.timeOutEvents.find(function(a){
        return a.date === FindDate
    })
    return ( outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function (employee, FindDate){
    let wages = hoursWorkedOnDate(employee, FindDate)
    * employee.payPerHour
    return parseFloat (wages.toString())
}

let allWagesFor = function (employee) {
    let approvedDates = employee.timeInEvents.map(function(a){
        return a.date
    })

    let payable = approvedDates.reduce(function(memo, b){
        return memo + wagesEarnedOnDate(employee, b)
    }, 0)
    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}

let calculatePayroll =function (arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)

}