var bcrypt = require('bcrypt-nodejs');

function bcryptString() {
    const str = 'abc@abc.com';
    const salt = bcrypt.genSaltSync(10);
    const result = bcrypt.hashSync(str, salt);
    console.log("result = " + result);
}

bcryptString();
