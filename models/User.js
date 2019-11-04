//npm i "bcrypt-nodejs", expecially with windows bcryptjs will cause problems with your machine that may permanently damage it.
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Simple user Schema that captures the email and a password.
//email is currently the associated username in passport.
//If you want to use another alias, change the setting in your config
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//This is a custom method that will check if an unhashed password entered by the user can be compared to the hashed password
userSchema.validPassword = (password) => { return bcrypt.compareSync(password, this.password); };
//This is a hook prototype to the userSchema
//Hooks are automatic methods that run during the carious phases of the User Model lifecycle
//This Hook will automatically hash a User's password before the User is created
userSchema.pre("beforeCreate", user => { user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null); });

const User = mongoose.model('User', userSchema);
module.exports = User;