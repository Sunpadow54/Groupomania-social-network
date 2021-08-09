// Posts Roads
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const auth = require('../middleware/auth'); // to protect road (token)

// ----- Import Controlls
const postCtrl = require('../controllers/post');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/', /* auth,  */postCtrl.createPost);
router.put('/:id', /* auth,  */postCtrl.editPost);
router.delete('/:id', /* auth,  */postCtrl.deletePost);
// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;