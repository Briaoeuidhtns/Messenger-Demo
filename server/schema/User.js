const { Schema, model } = require('mongoose')
const { hash } = require('bcrypt')
const beautifyUnique = require('mongoose-beautiful-unique-validation')

let onlineGetter

const UserSchema = new Schema(
  {
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
      text: true,
    },
    password: {
      type: String,
      required: true,
      // bcrypt format
      match: /\$2[ab]\$\d\d\$[\w./]{53}/,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        delete ret.password
      },
    },
    toObject: {
      transform(_, ret) {
        delete ret.password
      },
    },
  },
  { strictQuery: 'throw' }
)
  .plugin(beautifyUnique)
  .loadClass(
    class {
      get online() {
        return onlineGetter(this._id)
      }

      static fromClaim(claim) {
        return this.findOne({ email: claim.data.email }).exec()
      }
    }
  )
const User = model('User', UserSchema)

/**
 * Set the function to be used to determine if a user id is online
 */
const registerOnlineGetter = (g) => {
  // I can't find a way to just attach this to the model and access it from
  // the getter on the doc, but the store is already global, so it doesn't
  // seem important that this is either
  onlineGetter = g
}

module.exports = { User, UserSchema, registerOnlineGetter }
