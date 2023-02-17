const meeting = require("../models/meeting_model");
const meetingUser = require("../models/meeting_user_model");
async function getALLMeetingUsers(meetId, callback) {
meetingUser.find({meetingId: meetId}).then((response) => {
    return callback(null, response)
}).catch((error) => {
 return callback(error);
})

}
async function startMeeting(params, callback){
  
meetingSchema = new meeting(params)
   meetingSchema.save().then((response) => {
    return callback(null, response)
   }).catch((error) => {
    return callback(error)
})
}
async function joinMeeting(params, callback){
  
    userMeetingModel = new meetingUser(params);
       userMeetingModel.save().then(async (response) => {
        await meeting.findOneAndUpdate({id:  params.meetId}, {$addToSet: {"meetingUsers": userMeetingModel}})
        return callback(null, response)
       }).catch((error) => {
        return callback(error)
    })
    }
    async function isMeetingPresent (meetingId, callback) {
        meeting.findById(meetingId).populate("meetingUsers", "MeetingUser").then((response) => {
             if(!response) callback("Invalid Meeting Id")
             else {
                callback(null,true);
             }
        }).catch((error) => {
            return callback(error)
        });
    }
    async function checkMeetingExists (meetingId, callback) {
        meeting.findById(meetingId, "hostId, hostName, startTime").populate("meetingUsers", "MeetingUser").then((response) => {
             if(!response) callback("Invalid Meeting Id")
             else {
                callback(null,true);
             }
        }).catch((error) => {
            return callback(error)
        })
    }
    
        
    
    async function geetMeetingUser(params, callback) {
        const {meetingId, userId} = params;
        meetingUser.find({meetingId,userId}).then((response) => {
            return callback(null, response[0])
        }).catch((error) => {
            return callback(error)
        })
    }
    async function updateMeetingUser(params, callback) {
        meetingUser.updateOne({userId: params.userId}, {$set: params},{new:true}).then((response) => {
         return callback(null, response)
        }
        ).catch((error) => {
            callback(error)
        });
    }
    async function getUserBySokcetId(params, callback) {
        const  {meetingId,socketId} = params;
        meetingUser.find({meetingId, socketId}).limit(1).then((response) => {
            return callback(null, response)
        }
        ).catch((error) => {
           return callback(error)
        });
    }
    module.exports = {
        startMeeting,
       getALLMeetingUsers,
        joinMeeting,
        checkMeetingExists,
        isMeetingPresent,
        geetMeetingUser,
        updateMeetingUser,
        getUserBySokcetId
    }