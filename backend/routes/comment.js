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


router.post('/', authUser, commentCtrl.createComment);
router.put('/:id', authUser, commentCtrl.editComment);
router.delete('/:id', authUser, commentCtrl.deleteComment);

router.put('/:id/moderate', /* authUser, */ /* authRole('admin'),  *//* auth,  */commentCtrl.moderateComment);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;