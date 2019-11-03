/**
 * Check if date is valid and in correct format YYYY-MM-DD
 *
 * @param {String} dateString - date string that should be validated
 * @returns {Boolean}
 */
function isValidDateFormat(dateString) {
  // YYYY-MM-DD
  const expectedFormat = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
  const isValid = expectedFormat.test(dateString)
  if (!isValid) return false

  // RegExp above cannot check if date is correct (e.g. february has only 28/29 days)
  const date = new Date(dateString).toISOString().split('T')[0]
  return dateString === date
}

/**
 * This helper returns an array with two dates
 * - first day of a current month
 * - "yesterday" (relative to date parameter)
 *
 * if date parameter is a first day of a month - returned values represent the entire past month
 *
 * @param {Date} date
 * @returns {Array}
 */
function getMonthlyDateRange(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth()
  const day = d.getDate()

  if (day === 1) {
    // return entire previous month
    return [new Date(year, month - 1, day), new Date(year, month, 0)]
  }

  return [new Date(year, month, 1), new Date(year, month, day - 1)]
}

export {isValidDateFormat, getMonthlyDateRange}
