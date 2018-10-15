var User = require('../models/user');
var mongoose = require('../node_modules/mongoose');

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true
};

const mongoURI = 'mongodb://localhost:27017/autoclick';

mongoose.connect(mongoURI, option).then(function () {
    var users = [
        new User({
            name: "Alejandro",
            apellPat: "Gomez",
            apellMat: "Lopez",
            email: "is693667@iteso.mx",
            username: "coptos",
            password: "1234"
        }),
        new User({
            name: "Alejandro",
            apellPat: "Gomez",
            apellMat: "Lopez",
            email: "is693667@iteso.mx",
            username: "coptos",
            password: "1234"
        }),
    ];

    var done = 0;
    for (var i = 0; i < users.length; i++) {
        users[i].save(function (err, result) {
            done++;
            if (done === users.length) {
                exit();
            }
            if(err){
                console.log(err);
            }
        });
    }

}, function (err) {
    console.log(err);
});

function exit() {
    mongoose.disconnect();
}