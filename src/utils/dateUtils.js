const date = new Date();

let localDate = date.toLocaleDateString();

let day = date.getDate();

let month = date.getMonth() + 1;

let year = date.getFullYear();

export { day, month, year, localDate }