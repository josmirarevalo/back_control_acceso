const bcrypt = require('bcrypt');
const crypto = require('crypto');
const generator = require('generate-password');

exports.generatorPassword = (request, response) => {
    const password = generator.generate({
        lenght: 12,
        numbers: true,
        uppercase: true, 
        symbols: true
    });
    return password;
}

exports.comparePassword = (passwordBody, passwordDb) =>{
    return bcrypt.compareSync(passwordBody, passwordDb); 
}

exports.encryptPassword = (password) => {
    return bcrypt.hashSync(password, 10);
    //     .then(hash=>{
    //         console.log(hash);
    //         return hash;
    // }).catch(error=>{
    //     console.warn("Error", error);
    // });
}

exports.encryptPasswordAsync = (password) => {
    const passwordEncrypted = bcrypt.hash(password, 10);
    return passwordEncrypted;
}

exports.generatedToken = () => {
    const token_user_validated = crypto.randomBytes(64).toString('hex');
    return token_user_validated;
}

