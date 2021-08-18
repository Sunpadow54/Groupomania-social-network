// Profile road
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const auth = require('../middleware/auth'); // to protect road (token)
const { userSignUpRules, validateSignUp } = require('../middleware/validate');

// ----- Import Controlls
const profileCtrl = require('../controllers/profile');


// ============================================================
// ------------------------- ROADS ----------------------------

router.get('/:userId', /* auth, */ profileCtrl.getProfile);
router.put('/:userId', /* auth, */userSignUpRules(), validateSignUp, profileCtrl.editProfile);
router.delete('/:userId', /* auth,  */profileCtrl.deleteProfile);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;