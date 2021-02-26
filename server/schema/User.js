const { Schema, model } = require('mongoose')
const { hash } = require('bcrypt')
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    // https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
    match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // bcrypt format
    match: /\$2[ab]\$\d\d\$[\w./]{53}/,
  },
})
UserSchema.plugin(beautifyUnique)

const User = model('User', UserSchema)

module.exports = { User, UserSchema }
