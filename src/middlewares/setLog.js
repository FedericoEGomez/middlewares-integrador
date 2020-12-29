//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');

//----------* VARIABLE'S *----------//
const usersFilePath = path.join(__dirname, '../database/users.json');
function getAllUsers() {
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));      
}

//----------* MIDDLEWARE *----------//
module.exports = (req, res, next) => {
    if (req.cookies.user && !req.session.user) {
        const users = getAllUsers();
        const userFound = users.find(user => user.id == req.cookies.user);
        req.session.user = userFound;
    }
    return next();
}