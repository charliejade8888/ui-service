/*
 * hooks.js
 */
module.exports = function() {

    //increase step timeout
    this.setDefaultTimeout(400 * 1000);

    //do stuff before scenario
    this.Before(function(scenario, callback) {
        browser.manage().window().maximize();
        browser.get("index.html");
        callback();
    });

    //do stuff after scenario
    this.After(function(scenario, callback) {
        callback();
    });

    //do stuff after feature
    this.AfterFeature(function(scenario, callback) {
        //curl -X POST localhost:10000/shutdown
        //browser.get("http://localhost:4444/selenium-server/driver?cmd=shutDownSeleniumServer");
        callback();
    });

//    // Take screenshot if scenario fails
//    this.After(function (scenario, callback) {
//        console.log("After scenario.");
//        if (scenario.isFailed()) {
//          browser.takeScreenshot().then(function (base64png) {
//            var decodedImage = new Buffer(base64png, 'base64').toString('binary');
//            scenario.attach(decodedImage, 'image/png');
//            callback();
//          }, function (err) {
//            callback(err);
//          });
//        } else {
//          callback();
//        }
//     });

}