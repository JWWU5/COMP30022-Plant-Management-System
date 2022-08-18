const mongoose = require ('mongoose')
const bcrypt = require ('bcryptjs')

const schema = new mongoose.Schema({
    userId: { type: String },
    password: { type: String, required: true, minlength: 8 },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    userName: { type: String, required: true},
    dateOfBirth: { type: String, required: true},
    email: { type: String, required: true},
})

//no bcdypt.compare() yet!
schema.methods.verifyPassword = function (password, callback) {
    console.log(typeof (password) + " compared to : " + typeof (this.password))
    console.log(password + " compared to : " + this.password)

    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}

// Password salt factor
const SALT_FACTOR = 10
// Hash password before saving
schema.pre('save', function save(next) {
    console.log("pre!")
    const user = this
    // Go to next if password field has not been modified
    if (!user.isModified('password')) {
        return next()
    }
    // Automatically generate salt, and calculate hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        // Replace password with hash
        user.password = hash
        console.log("password: " + hash)
        next()
    })
})

const User = mongoose.model('user', schema)
module.exports = User