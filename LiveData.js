const Parse = require('parse/node');
var Promise = require("bluebird");
const EventEmitter = require("events");


class LiveData extends EventEmitter {


    constructor(liveQueryClass) {
        super();
        Parse.initialize("APPLICATION_ID", "MASTER_KEY");
        Parse.serverURL = "http://localhost:1337/parse";
        // /Parse.liveQueryServerURL = "ws://cryptic-shore-11692.herokuapp.com/parse";

        this.StreamEvents = Parse.Object.extend(liveQueryClass);
        this.query = new Parse.Query(this.StreamEvents);
    }

    equalTo(key, value) {

        this.query.equalTo(key, value);
        return this;
    }

    getSubscription() {
        this.subscription = this.query.subscribe(this.query);
        let sub = this.subscription;
        this.subscription.on('open', () => {
            console.log('connection opened');
            console.log('Will prefetch all the old data from the server and setup the queue.');
            console.log('Listening for streams.');
            //var Iquery = new Parse.Query(StreamEvents); //IStreamEvents TP1536749870296

            try {

                this.query.count().then((total) => {
                    console.log("Data " + total);
                    let i = 0;
                    let promises = [];
                    while (i < Math.ceil(total / 100)) {
                        this.query.skip(i * 100);
                        console.log("Data.skip " + i * 100);

                        promises.push(new Promise((resolve, reject) => {
                            this.query.find().then((data) => {
                                if (data.length > 0) {
                                    data.forEach((eachStream, index) => {
                                        this.emit('data', eachStream);
                                    });

                                    resolve();
                                }
                            }).catch((ex) => {
                                console.log(ex);
                                reject();
                            });
                        }));
                        i++;
                    }

                    Promise.all(promises).then(()=>{
                        sub.on('create', (object) => {
                            this.emit('data', object);
                        });
                    });


                })
            } catch (ex) {
                console.log(ex);
            }
        });
    }


}


module.exports = LiveData;

