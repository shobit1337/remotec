const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getDate = (date) => {
  let newDate = new Date(date);
  return `${monthNames[newDate.getMonth()]} ${newDate.getDate()}`;
};

const getDay = () => {
  let day = new Date();
  return days[day.getDay()];
};

const getDateTime = (date) => {
  let newDate = new Date(date);
  let hours = newDate.getHours() > 12 ? newDate.getHours() - 12 : newDate.getHours();
  let am_pm = newDate.getHours() >= 12 ? 'PM' : 'AM';
  let minutes = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
  return `${monthNames[newDate.getMonth()]} ${newDate.getDate()}, ${hours}:${minutes} ${am_pm}`;
};

export { getDate, getDay, getDateTime };
