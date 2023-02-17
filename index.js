const express = require("express");
const app = express();
const mongoose =  require("mongoose");
const {MONGO_DB_CONFIG} = require("./config/app_config");
const {initMeetingServer} = require("./meeting-server");

const http = require("http");
const server = http.createServer(app);
initMeetingServer(server)
mongoose.Promise = global.Promise;
mongoose.connect( MONGO_DB_CONFIG.DB, {
useNewUrlParser: true,
useUnifiedTopology: true
}).then((response)=> {
    console.log("Database connect!!!")
}, (error) => {
   console.log(error);
console.log("Database can not  be connected")
});
app.use(express.json());
app.use("/api", require("./routes/app_route"))
app.listen(process.env.port || 8000, function () {
    console.log("Ready to Go")
})