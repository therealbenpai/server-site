module.exports = {
    failedStatus: (message, previous_data = {}) => ({ status: 'failed', reason: `${message}`, received: true, ...previous_data })
}