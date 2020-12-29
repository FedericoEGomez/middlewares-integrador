//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {check, validationResult, body} = require('express-validator');


//----------* VARIABLE'S *----------//
const usersFilePath = path.join(__dirname, '../database/users.json');

function getAllUsers() {
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));      
}

function getNewId() {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));  
    return users.pop().id + 1;     
}

function writeUsers(array) {
    const usersJson = JSON.stringify(array, null, " ");
    fs.writeFileSync(usersFilePath, usersJson); 
}


//----------* USERS CONTROLLER *----------//
module.exports = {
    showRegister: (req, res) => {
        return res.render('user/user-register-form');
    },

    processRegister: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('user/user-register-form', {
                errors: errors.errors,
                email : req.body.email
            })
        }
        const users = getAllUsers();
        const passwordHashed = bcrypt.hashSync(req.body.password, 5);
        const user = {
            id: getNewId(),
            email: req.body.email,
            avatar: req.files[0].filename,
            password: passwordHashed,
            retype: passwordHashed
        }
        const usersToSave = [...users,user];
        writeUsers(usersToSave);
        res.redirect('/user/login');
    },

    showLogin: (req, res) => {
        return res.render('user/user-login-form');
    },

    processLogin: (req, res) => {
        // Verifica que no existan errores al hacer el login
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('user/user-login-form', {
                errors: errors.errors,
                email : req.body.email
            })
        }

        // Verifica exista el usuario en la DB
        const email = req.body.email;
		const password = req.body.password;
		const users = getAllUsers();
		const userExist = users.find(user => user.email == email);

        // Ejecuta el login si existe el usuario en la DB y que las contraseñas coincidan
		if (userExist && bcrypt.compareSync(password, userExist.password)) {
            req.session.user = userExist;
            if (req.body.remember) {
                res.cookie('user', userExist.id, { maxAge: 1000 * 60 * 30 });
            }
            return res.redirect('/user/profile');
        }

        // En caso de ser "false", redirecciona al login
        res.redirect('/user/login');
    },

    showProfile: (req, res) => {
        res.render('user/profile');
    },

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('user');
        return res.redirect('/user/login');
    }
}