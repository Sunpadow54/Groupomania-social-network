// Comment Roads
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const { authUser, authRole } = require('../middleware/auth'); // to protect road (token)

// ----- Import Controlls
const commentCtrl = require('../controllers/comment');


// ============================================================
// ------------------------- ROADS ----------------------------


router.post('/', authUser, authRole('basic'),commentCtrl.createComment);
router.put('/:id', authUser, authRole('basic'),commentCtrl.editComment);
router.delete('/:id', authUser,authRole('basic'), commentCtrl.deleteComment);
// admin
router.put('/:id/moderate',authUser, authRole('admin'), commentCtrl.moderateComment);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;