const Parse = require('parse/node');

Parse.initialize("APPLICATION_ID", "MASTER_KEY");
Parse.serverURL = "http://localhost:1337/parse";

let TripStream = Parse.Object.extend("StreamEvents");

let now = new Date();
const tevents = ['start', 'stop', 'running'];
const TripID = 'TP' + now.getFullYear() + ("0" + (now.getMonth() + 1)).slice(-2) + ("0" + now.getDate()).slice(-2) + now.getHours() + now.getMinutes() + now.getSeconds() + now.getMilliseconds()

setInterval(() => {

    let tripStream = new TripStream();
    tripStream.set("TripID", TripID);
    tripStream.set("bearing", Math.floor((Math.random() * 100) + 1));
    tripStream.set("drivingHours", 0);
    tripStream.set("elapsedTime", 0);
    tripStream.set("g", Math.random().toString(36).substring(7));
    tripStream.set("km", getRandomInRange(0, 3, 10));
    tripStream.set("l", [getRandomInRange(-180, 180, 6), getRandomInRange(-180, 180, 6)]);
    tripStream.set("speed", Math.random());
    tripStream.set("stopElapsedTime", 0);
    tripStream.set("stops", Math.floor((Math.random() * 1) + 1));
    tripStream.set("timestamp", Date.now());
    tripStream.set("tripEvent", tevents[[Math.floor(Math.random() * tevents.length)]]);


    tripStream.save(null, {
        success: function (gameScore) {
            console.log('New object created with objectId: ' + gameScore.id);
        },
        error: function (gameScore, error) {
            console.log('Failed to create new object, with error code: ' + error.message);
        }
    });

}, 500);



function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}