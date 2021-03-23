const { Schema, model, ObjectId } = require('mongoose')
const { User } = require('./User')
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const ConversationSchema = new Schema(
  {
    members: {
      type: [{ type: ObjectId, ref: User }],
      required: true,
      // Ensure the members list is unique and predictable
      validate: [
        {
          validator: (val) =>
            val.reduce(
              ([isSorted, prev], cur) => [
                isSorted == null || (isSorted && prev <= cur),
                cur,
              ],
              []
            )[0],
          msg: '{PATH} is not sorted in ascending order',
        },
        {
          validator: (val) => new Set(val).size === val.length,
          msg: '{PATH} values are not unique',
        },
        {
          validator: (val) => val.length >= 2,
          msg: '{PATH} must have at least two members',
        },
      ],
      set: (val) => [...new Set(val)].sort(),
    },
  },
  { strictQuery: 'throw' }
)
  .plugin(beautifyUnique)
  .loadClass(
    class {
      static findOrCreate(query) {
        return this.findOneAndUpdate(query, {}, { upsert: true, new: true })
      }
    }
  )

const Conversation = model('Conversation', ConversationSchema)

module.exports = { Conversation, ConversationSchema }
