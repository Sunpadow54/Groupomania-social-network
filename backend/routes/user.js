// User Roads
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const auth = require('../middleware/auth'); // to protect road (token)

// ----- Import Controlls
const userCtrl = require('../controllers/user');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/signup', /* limiter, userSignUpRules(), validateSignUp ,*/ userCtrl.signup);
router.post('/login', /* limiter, */ userCtrl.login);
router.put('/edit', /* auth, */ userCtrl.edit);
router.delete('/delete', /* auth,  */userCtrl.delete);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;