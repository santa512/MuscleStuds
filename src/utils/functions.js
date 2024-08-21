export function convertDate(dat) {
  const dateString = dat;
  const date = new Date(dateString);

  const options = { day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
}
