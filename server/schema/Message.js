const { Schema, model, ObjectId } = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
const { Conversation } = require('./Conversation')
const { User } = require('./User')

const MessageSchema = new Schema(
  {
    content: String,
    from: { type: ObjectId, ref: User, required: true },
    to: { type: ObjectId, ref: Conversation, required: true },
  },
  { timestamps: true },
  { strictQuery: 'throw' }
).plugin(beautifyUnique)

const Message = model('Message', MessageSchema)

module.exports = { Message, MessageSchema }
