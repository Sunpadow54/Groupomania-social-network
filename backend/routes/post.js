// Posts Roads
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = express.Router();

// ---- Import middelwares
const { authUser, authRole } = require('../middleware/auth'); // to protect road (token)
const multer = require('../middleware/multer-config'); // to upload img

// ----- Import Controlls
const postCtrl = require('../controllers/post');


// ============================================================
// ------------------------- ROADS ----------------------------


router.post('/',/* authUser, roleUser, */ /* auth,  */multer, postCtrl.createPost);
router.put('/:id', /* auth,  */postCtrl.editPost);
router.delete('/:id', /* auth,  */postCtrl.deletePost);
router.get('/', /* auth,  */postCtrl.getAllPosts);
router.get('/:id', /* auth,  */postCtrl.getOnePost);
router.post('/:id/vote', /* auth,  */postCtrl.vote);

router.put('/:id/moderate', /* authUser, */ /* authRole('admin'),  *//* auth,  */postCtrl.moderatePost);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;