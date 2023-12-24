export function getLastUpdate() {
  // Get current date and time
  var currentDate = new Date();

  // Calculate milliseconds in a day
  var millisecondsInADay = 24 * 60 * 60 * 1000;

  // Calculate yesterday's date by subtracting milliseconds in a day from current date
  var yesterdayDate = new Date((currentDate as any) - millisecondsInADay);

  // Set the time to midnight
  yesterdayDate.setHours(0, 0, 0, 0);

  // Return the result
  return yesterdayDate;
}
