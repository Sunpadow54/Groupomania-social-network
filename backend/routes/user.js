// User Roads
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
/* const limiter = require('../middleware/limiter-config');
const { userSignUpRules, validateSignUp } = require('../middleware/validate'); */
// ----- Import Controlls
const userCtrl = require('../controllers/user');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/signup', /* limiter, userSignUpRules(), validateSignUp ,*/ userCtrl.signup);
router.post('/login', /* limiter, */ userCtrl.login);
router.put('/edit', /* auth, */ userCtrl.edit);
router.delete('/delete', /* auth, */ userCtrl.delete);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;