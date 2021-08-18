// Profile road
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const auth = require('../middleware/auth'); // to protect road (token)

// ----- Import Controlls
const profileCtrl = require('../controllers/profile');


// ============================================================
// ------------------------- ROADS ----------------------------

router.get('/:userId', /* auth, */ profileCtrl.getProfile);
router.put('/:userId', /* auth, */ profileCtrl.editProfile);
router.delete('/:userId', /* auth,  */profileCtrl.deleteProfile);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;