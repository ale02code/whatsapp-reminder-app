const date = new Date();
// console.log(date);

let localDate = date.toLocaleDateString();
// console.log(localDate);

let day = date.getDate();
// console.log(day);

let month = date.getMonth() + 1;
// console.log(month);

let year = date.getFullYear();
// console.log(year);

export { day, month, year, localDate }