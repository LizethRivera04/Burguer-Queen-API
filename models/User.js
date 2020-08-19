const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        //delete spaces
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    roles: {
        type: Object,
        default: 'regular',
        admin: {
            type: Boolean
        }
    }

})

module.exports = mongoose.model('User', UserSchema);