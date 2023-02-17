const meetingController = require("../controllers/meeting_controller");
const express = require("express");
const router = express.Router();
router.post("/meeting/start", meetingController.startMeeting)
router.get("/meeting/join", meetingController.checkMetingExistis);
router.get("/meeting/get", meetingController.getAllmetingUsers);
module.exports = router;