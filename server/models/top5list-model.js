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
        usernameCommentPairs: { type: [Object], required: true },
        viewCount: { type: Number, required: true },
        published: { type: Boolean, required: true },
        publishDate: { type: Date, required: false },
        isCommunity: { type: Boolean, required: true },
        itemScorePairs: { type: Object, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
