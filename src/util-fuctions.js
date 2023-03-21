/**
 * @param {String} message 
 * @param previous_data 
 * @returns {{status: String, reason: String, received: Boolean} & previous_data}
 */
const failedStatus = (message, previous_data = {}) => ({ status: 'failed', reason: `${message}`, received: true, ...previous_data })

module.exports = {
    failedStatus
}