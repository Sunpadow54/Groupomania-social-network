// Profile road
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const { authUser, authRole } = require('../middleware/auth'); // to protect road (token)
const { userSignUpRules, validateSignUp } = require('../middleware/validate');

// ----- Import Controlls
const profileCtrl = require('../controllers/profile');


// ============================================================
// ------------------------- ROADS ----------------------------

router.get('/:userId', authUser, authRole('basic'), profileCtrl.getProfile);
router.put('/:userId', authUser, authRole('basic'), userSignUpRules(), validateSignUp, profileCtrl.editProfile);
router.delete('/:userId', authUser, authRole('basic'), profileCtrl.deleteProfile);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;