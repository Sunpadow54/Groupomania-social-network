// Posts Roads
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const { authUser, authRole } = require('../middleware/auth'); // to protect road (token)

// ----- Import Controlls
const postCtrl = require('../controllers/post');


// ============================================================
// ------------------------- ROADS ----------------------------


router.post('/',/* authUser, roleUser, */ /* auth,  */postCtrl.createPost);
router.put('/:id', /* auth,  */postCtrl.editPost);
router.delete('/:id', /* auth,  */postCtrl.deletePost);
router.get('/', /* auth,  */postCtrl.getAllPosts);
router.get('/:id', /* auth,  */postCtrl.getOnePost);

router.put('/moderate/:id', /* authUser, */ /* authRole('admin'),  *//* auth,  */postCtrl.moderatePost);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;