const express = require("express")
const router = express.Router()
const { login, dashboard } = require('../controller/main.js')
const authorizationMiddleware = require('../middleware/auth.js')

router.route('/login').post(login)
router.route('/dashboard').get(authorizationMiddleware, dashboard)

module.exports = router