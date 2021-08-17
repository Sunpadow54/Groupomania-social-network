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
// ---- Posts roads
router.get('/users', /* authUser, roleAdmin, */adminCtrl.getAllUsers);
router.delete('/users/:id', /* authUser, roleAdmin, */adminCtrl.deleteUser);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;