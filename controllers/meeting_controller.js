const meetingServices = require("../services/meeting_service");
exports.startMeeting = (req, res, next) => {
const {hostId, hostName} = req.body;
var model = {
    hostId: hostId,
    hostName: hostName,
    startTime : Date.now()

}
meetingServices.startMeeting(model, (error, results) => {
if(error) {
    return next(error);
}
res.status.send({message: "Success", data: results.id})
})
}
exports.checkMetingExistis = (req, res, next) => {
 const {meetingId}  = req.query;
 meetingServices.checkMeetingExists(meetingId,(error,results) => {
   if(error)  {
    return next(error);
   }
   return res.status(200).send({message: "Success", data: results});
 })  
}
exports.getAllmetingUsers = (req,res,next) => {
    const {meetingId} = req.query;
   meetingServices.getALLMeetingUsers(meetingId,(error, results) => {
    if(error) {
        return next(error);
    }
    return res.status(200).send({message: "Success", data: results});
   }) 
}