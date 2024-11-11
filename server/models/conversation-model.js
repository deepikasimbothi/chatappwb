
import { Schema, model } from "mongoose";

const conversatioinSchema = new Schema({

    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }]

},{
    timestamps: true})

    const Conversation = model('Conversation', conversatioinSchema)
    export default Conversation