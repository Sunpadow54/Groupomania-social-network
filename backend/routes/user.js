// User Roads
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const { userSignUpRules, validateSignUp } = require('../middleware/validate');

// ----- Import Controlls
const userCtrl = require('../controllers/user');


// ============================================================
// ------------------------- ROADS ----------------------------


router.post('/signup', /* limiter,*/ userSignUpRules(), validateSignUp , userCtrl.signup);
router.post('/login', /* limiter, */ userCtrl.login);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;