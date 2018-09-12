const Parse = require('parse/node');

Parse.initialize("APPLICATION_ID", "MASTER_KEY");
Parse.serverURL = "http://localhost:1337/parse";
// /Parse.liveQueryServerURL = "ws://cryptic-shore-11692.herokuapp.com/parse";

let StreamEvents = Parse.Object.extend('StreamEvents');
var query = new Parse.Query(StreamEvents);
query.equalTo('TripID', 'TP1536752229197');
//var IStreamEvents = Parse.Object.extend("StreamEvents");


let subscription = query.subscribe(query);

subscription.on('open', () => {
    console.log('connection opened');
    console.log('Will prefetch all the old data from the server and setup the queue.');
    console.log('Listening for streams.');
    //var Iquery = new Parse.Query(StreamEvents); //IStreamEvents TP1536749870296

    try {
        query.find().then((data) => {
            console.log("Data " + data.length)
            console.log(JSON.stringify(data))

        }).catch((ex) => { console.log(ex) });
    } catch (ex) {
        console.log(ex);
    }
});



subscription.on('close', () => {
    console.log('connection closed');
});

subscription.on('error', (error) => {
    console.log(error);
});

subscription.on('create', (object) => {
    console.log('object created' + JSON.stringify(object));
});

subscription.on('update', (object) => {
    console.log('object updated' + JSON.stringify(object));
});

subscription.on('enter', (object) => {
    console.log('object entered' + JSON.stringify(object));
});

subscription.on('leave', (object) => {
    console.log('object left' + JSON.stringify(object));
});



