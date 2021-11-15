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


router.post('/', authUser, authRole('basic'), multer, postCtrl.createPost);
router.put('/:id', authUser, authRole('basic'), multer,postCtrl.editPost);
router.delete('/:id', authUser, authRole('basic'), postCtrl.deletePost);
router.get('/', authUser, authRole('basic'), postCtrl.getAllPosts);
router.get('/:id', authUser, authRole('basic'), postCtrl.getOnePost);
router.post('/:id/vote', authUser, authRole('basic'), postCtrl.vote);
// admin
router.put('/:id/moderate', authUser, authRole('admin'),postCtrl.moderatePost);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;