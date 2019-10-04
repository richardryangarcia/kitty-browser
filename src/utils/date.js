const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const formatDate = utcDate => {
  const date = new Date(utcDate * 1000);
  const month = date && date.getMonth();
  const day = date && date.getDay();
  const year = date && date.getFullYear();

  return `${months[month - 1]} ${day} ${year}`;
};
