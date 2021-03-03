const { Schema, model, ObjectId } = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const MessageSchema = new Schema(
  { content: String, from: ObjectId, to: ObjectId },
  { timestamps: true }
)
  .plugin(beautifyUnique)
  .loadClass(class ConversationClass {})

const Message = model('Message', MessageSchema)

module.exports = { Message, MessageSchema }
