const LiveData = require('./LiveData');

const listen = new LiveData('StreamEvents')
listen.equalTo('TripID', 'TP1536756521977')
listen.getSubscription();
listen.on('data', (info) => {
    console.log(JSON.stringify(info));
});