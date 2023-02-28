// @ts-nocheck
require('dotenv').config({ path: `${process.cwd()}/.env` })
const { TOKEN_KEY: sig } = process.env
const jwt = require('jsonwebtoken')
const { validate, v4, v5 } = require('uuid')

const genAPIKey = (ip) => jwt.sign({ userid: v5(v4(), "6ba7b812-9dad-11d1-80b4-00c04fd430c8"), ip }, sig, { algorithm: 'HS512' })

/**
 * 
 * @param {*} key 
 * @returns {boolean}
 */

const verifyAPIKey = (key) => validate(jwt.verify(key, sig, { algorithms: ['HS512'] }).userid)

module.exports = {
    genAPIKey,
    verifyAPIKey
}