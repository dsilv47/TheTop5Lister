const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String, required: true },
        ownerUsername: { type: String, required: true },
        userLikes: { type: [String], required: true },
        userDislikes: { type: [String], required: true },
        /*usernameCommentPairs: { type: [{String, String}], required: true },
        published: { type: Boolean, required: true },
        isCommunity: { type: Boolean, required: true }*/
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
