mongoose = require("mongoose");
const {Schema} = mongoose;
const meetingUser = mongoose.models.MeetingUser || mongoose.model(
    "MeetingUser",
    mongoose.Schema({
        socketId: {
            type: String,
          
        },
        meetingId: {
            type: mongoose.Schema.Types.ObjectId,
                ref: "Meeting"
        },
        UserId: {
            type: String,
            required: true
        },
        joined: {
            type: Boolean,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        isAlive: {
            type: Boolean,
            required: true
        },
        meetingUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MeetingUser"
            }
        ],
        
        },
    {timestaps: true}
    )   
);
module.exports = {meetingUser}
