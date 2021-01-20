function createEmployeeRecord(employeeData) {
  let [firstName, familyName, title, payPerHour] = employeeData;
  return {firstName, familyName, title, payPerHour, timeInEvents: [], timeOutEvents: []};
}

function createEmployeeRecords(employeeArray) {
  return employeeArray.map(createEmployeeRecord);
}

function createTimeInEvent(timestamp) {
  let [date, time] = timestamp.split(" ");
  this.timeInEvents.push({type: "TimeIn", hour: parseInt(time, 10), date});
  return this;
}  

function createTimeOutEvent(timestamp) {
  let [date, time] = timestamp.split(" ");
  this.timeOutEvents.push({type: "TimeOut", hour: parseInt(time, 10), date});
  return this;
}  

function hoursWorkedOnDate(date) {
  let {timeInEvents, timeOutEvents} = this;
  let timeIn = timeInEvents.find(t => t.date === date).hour;
  let timeOut = timeOutEvents.find(t => t.date === date).hour;
  return (timeOut - timeIn) / 100 ;
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

let allWagesFor = function() {
  let dates = this.timeInEvents.map(e => e.date);
  return dates.reduce(function(total, date) {
    return total + wagesEarnedOnDate.call(this, date)
  }.bind(this), 0);
  
}        

function findEmployeeByFirstName(employees, name) {
  return employees.find(employee => employee.firstName === name);
}

function calculatePayroll(employees) {
  return employees.reduce(function(total, employee){
    return total + allWagesFor.call(employee)
  }, 0)
}
