//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

//----------* CONTROLLER REQUIRE'S *----------//
const userController = require('../controllers/userController');
const registerMiddleware = require('../middlewares/registerMiddleware');
const loginMiddleware = require('../middlewares/loginMiddlaware');
const authMiddlaware = require('../middlewares/authMiddlaware');
const guestMiddlaware = require('../middlewares/guestMiddlaware');

//----------* VARIABLE'S *----------//
// Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });


//----------* USERS ROUTES *----------//
router.get('/register', guestMiddlaware, userController.showRegister);   // Muestra la vista de registro
router.post('/register', upload.any(), registerMiddleware, userController.processRegister);   // Procesa la vista de registro
router.get('/login', guestMiddlaware, userController.showLogin);   // Muestra la vista de login
router.post('/login', loginMiddleware, userController.processLogin);   // Procesa la vista de login
router.get('/profile', authMiddlaware, userController.showProfile);   // Muestra el perfil del usuario
router.get('/logout', authMiddlaware, userController.logout);   // Cierra la sesión


//----------* EXPORTS ROUTER *----------//
module.exports = router;