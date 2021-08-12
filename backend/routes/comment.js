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
// ---- Posts roads
router.post('/', /* auth,  */commentCtrl.createComment);
router.put('/:id', /* auth,  */commentCtrl.editComment);
router.delete('/:id', /* auth,  */commentCtrl.deleteComment);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;