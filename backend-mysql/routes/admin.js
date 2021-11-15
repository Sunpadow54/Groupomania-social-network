// Moderators Roads
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const { authUser, authRole } = require('../middleware/auth'); // to protect road (token)

// ----- Import Controlls
const adminCtrl = require('../controllers/admin');


// ============================================================
// ------------------------- ROADS ----------------------------


router.get('/users', authUser, authRole('admin'), adminCtrl.getAllUsers);
router.get('/users/:userId', authUser, authRole('admin'), adminCtrl.getAllHidden)
router.put('/users/:userId/ban', authUser, authRole('admin'), adminCtrl.banUser);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;