// Comment Roads
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const auth = require('../middleware/auth'); // to protect road (token)

// ----- Import Controlls
const commentCtrl = require('../controllers/comment');


// ============================================================
// ------------------------- ROADS ----------------------------


router.post('/', /* auth,  */commentCtrl.createComment);
router.put('/:id', /* auth,  */commentCtrl.editComment);
router.delete('/:id', /* auth,  */commentCtrl.deleteComment);

router.put('/moderate/:id', /* authUser, */ /* authRole('admin'),  *//* auth,  */commentCtrl.moderateComment);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;