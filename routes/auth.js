const express = require('express')
const router = express.Router()
const { registerPOST, loginPOST, logoutPOST, addPOST } = require('../controllers/post-controller')
const { registerGET, loginGET, profileGET, addGET, showGET, deleteGET } = require('../controllers/get-controller')
const { isAuth, isNotAuth } = require('../middlewares/auth')

// POST Routes
router.route('/register').post(registerPOST)
router.route('/login').post(loginPOST)
router.route('/logout').post(logoutPOST)
router.route('/add').post(addPOST)

// GET Routes
router.route('/register').get(isNotAuth, registerGET)
router.route('/login').get(isNotAuth, loginGET)
router.route('/profile').get(isAuth, profileGET)
router.route('/add').get(isAuth, addGET)
router.route('/show').get(isAuth, showGET)
router.route('/delete/:id').get(isAuth, deleteGET)

module.exports = router