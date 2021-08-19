// Moderators Roads
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const { authUser } = require('../middleware/auth'); // to protect road (token)

// ----- Import Controlls
const adminCtrl = require('../controllers/admin');


// ============================================================
// ------------------------- ROADS ----------------------------


router.get('/users', /* authUser, roleAdmin, */adminCtrl.getAllUsers);
router.get('/users/:userId', /* authUser, roleAdmin, */adminCtrl.getAllHidden)
router.put('/users/:userId/ban', /* authUser, roleAdmin, */adminCtrl.banUser);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;