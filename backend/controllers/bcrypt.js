<<<<<<< HEAD
// becrypt and compare password
const bcrypt = require("bcrypt");
async function bcryptPassword(passcode)
{
    try {
        const salt = await bcrypt.genSalt(10); // Await for salt generation
        const hash = await bcrypt.hash(passcode, salt); // Await for password hashing
        return hash;
    } 
    catch (err) {
        console.error('Error hashing password:', err);
    }
}

async function comparePassword(passcode,hash){
    let res;
    res = await bcrypt.compare(passcode,hash);
    return res;
}
module.exports={
    bcryptPassword,
    comparePassword 
}
=======
// becrypt and compare password
const bcrypt = require("bcrypt");
async function bcryptPassword(passcode)
{
    try {
        const salt = await bcrypt.genSalt(10); // Await for salt generation
        const hash = await bcrypt.hash(passcode, salt); // Await for password hashing
        return hash;
    } 
    catch (err) {
        console.error('Error hashing password:', err);
    }
}

async function comparePassword(passcode,hash){
    let res;
    res = await bcrypt.compare(passcode,hash);
    return res;
}
module.exports={
    bcryptPassword,
    comparePassword 
}
>>>>>>> 905a393c54e3e76e6e3e8bc3db8c2645aa1ad8a7
