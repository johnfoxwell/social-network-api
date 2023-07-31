const { Schema, Types } = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = new Schema(
    {
        reactionID:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280
        },
        username:{
            type: String,
            required: true,
            ref: "user"
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: getDate,
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

function getDate(date) {
    return dayjs(date).format("MMM/DD/YYYY")
};

module.exports = reactionSchema;