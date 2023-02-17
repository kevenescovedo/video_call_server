const meetServices = require("./services/meeting_service");
const {MeetingPayloadEnum} =  require("./utils/meeting_payload_enum")
async function joinMeeting(meetingId,socket,payload, meetingServer) {
const {userId, name} = payload;
meetServices.isMeetingPresent(meetingId, async (error, results) => {
    if(error && !results) {
        sendMessage(socket,payload,{type: MeetingPayloadEnum.NOT_FOUND});
    }
    if(results) {
     addUser(socket, {meetingId,userId, name}).then((result) => {
        if(result) {
             sendMessage(socket, {type: MeetingPayloadEnum.JOINED_MEETING, data: {
            userId,
             }})
             broadcastUsers(meetingId,socket,meetingServer, {
                type: MeetingPayloadEnum.USER_JOINED,
                data: {
                    userId,
                    name,
                    ...payload.data
                }
             })
        }
     }, (error) => {
        console.log(error);
     })
    }
})
}
function forwardConnectionRequest(meetingId, scoket, meetingServer, payload) {
    const {userId, otherUserId, name} = payload;
    var model = {
        meetingId: meetingId,
        userId: otherUserId,
    
    }
    meetServices.geetMeetingUser(model, (error,result) => {
        if(result) {
         var sendPayload = JSON.stringify({
            type: MeetingPayloadEnum.CONNECTION_REQUEST,
            data: {
                userId,
                name,
                ...payload.data
            }
    
         })   
         meetingServer.to(result.scoketId).emit('message',sendPayload)
        }
    
    })
    }
    function userLeft(meetingId, scoket, meetingServer, payload) {
        const {userId} = payload;
     
          broadcastUsers(meetingId,scoket,meetingServer,{type:  MeetingPayloadEnum.USER_LEFT, data: {
            userId: userId
          }});
        }

        function endMeeting(meetingId, scoket, meetingServer, payload) {
            const {userId} = payload;
         
              broadcastUsers(meetingId,scoket,meetingServer,{type:  MeetingPayloadEnum.MEETING_ENDED, data: {
                userId: userId
              }});
              meetServices.getALLMeetingUsers(meetingId,(error, result) => {
                for (let i = 0; i < result.length; i++) {
                    const meetingUser = results[i];
                    meetingServer.sockets.connected(meetingUser.socketId).disconnect();
                }
              })
            }
            

          function userLeft(meetingId, scoket, meetingServer, payload) {
        const {userId} = payload;
        var model = {
            meetingId: meetingId,
            userId:userId,
        
        }
        meetServices.geetMeetingUser(model, (error,result) => {
            if(result) {
             var sendPayload = JSON.stringify({
                type: MeetingPayloadEnum.CONNECTION_REQUEST,
                data: {
                    userId,
                    name,
                    ...payload.data
                }
        
             })   
             meetingServer.to(result.scoketId).emit('message',sendPayload)
            }
        
        })
        }
function forwardIceCandidate(meetingId, scoket, meetingServer, payload) {
    const {userId, otherUserId, canditate} = payload;
    var model = {
        meetingId: meetingId,
        userId: otherUserId,
    
    }
    meetServices.geetMeetingUser(model, (error,result) => {
        if(result) {
         var sendPayload = JSON.stringify({
            type: MeetingPayloadEnum.ICECANDIDATE,
            data: {
                userId,
               canditate
                
            }
    
         })   
         meetingServer.to(result.scoketId).emit('message',sendPayload)
        }
    
    })
    }
    function forwardOfferSDP(meetingId, scoket, meetingServer, payload) {
    const {userId, otherUserId, sdp} = payload;
    var model = {
        meetingId: meetingId,
        userId: otherUserId,
    
    }
    meetServices.geetMeetingUser(model, (error,result) => {
        if(result) {
         var sendPayload = JSON.stringify({
            type: MeetingPayloadEnum.OFFER_SDP,
            data: {
                userId,
                sdp
            }
    
         })   
         meetingServer.to(result.scoketId).emit('message',sendPayload)
        }
    
    })
    }
    function forwardAnswerSDP(meetingId, scoket, meetingServer, payload) {
        const {userId, otherUserId, sdp} = payload;
        var model = {
            meetingId: meetingId,
            userId: otherUserId,
        
        }
        meetServices.geetMeetingUser(model, (error,result) => {
            if(result) {
             var sendPayload = JSON.stringify({
                type: MeetingPayloadEnum.ANSWER_SDP,
                data: {
                    userId,
                    sdp
                }
        
             })   
             meetingServer.to(result.scoketId).emit('message',sendPayload)
            }
        
        })
        }
function addUser(socket,{meetingId, userId,name}) {
let promisse = new Promise((resolve, reject) => {
    meetServices.geetMeetingUser({meetingId, userId},(error,results) => {
        if(!results) {
            var model = {
                socketId: socket.id,
                meetId: meetingId,
                userId: userId,
                joined: true,
                name: name,
                isAlive: true
            }
            meetServices.joinMeeting(model, (error, results) => {
                if(results)  {
                    resolve(true);
                } else {
               reject(error)
                }
                
            })
        }
        else {
            meetServices.updateMeetingUser({userId: userId, socketId: socket.id}, (error, results) => {
                if(results)  {
                    resolve(true);
                } else {
               reject(error)
                }
                
            });
        }
    })
});
return promisse;
}
function sendMessage(socket,payload) {
    socket.send(JSON.stringify(payload));
}
function broadcastUsers(meetingId, socket, meetingServer, payload) {
    socket.broadcast.emit("message", JSON.stringify(payload));
}

function forwardEvent(meetingId, scoket, meetingServer, payload) {
    const {userId} = payload;
 
      broadcastUsers(meetingId,scoket,meetingServer,{type:  payload.type, data: {
        userId: userId,
        ...payload.data,
      }});
   
    }
    module.exports = {
        joinMeeting,
        forwardConnectionRequest,
        forwardIceCandidate,
        forwardOfferSDP,
        forwardAnswerSDP,
        userLeft,
        endMeeting,
        forwardEvent
    }