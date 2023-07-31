const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");
const reactionSchema = require("./Reaction")

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: getDate,
        },
        username:{
            type: String,
            required: true,
            ref: "user"
        },
        reactionBody: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

function getDate(date) {
    return dayjs(date).format("MMM/DD/YYYY")
};

thoughtSchema
    .virtual("reactionCount")
    .get(function() {
        return this.reactionBody.length;
    })

const Thought = model("thought", thoughtSchema)

module.exports = Thought;