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

export {isValidDateFormat}
