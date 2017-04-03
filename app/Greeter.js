// Greeter.js
var text = require('./resources/text.json');
import "../static/css/application.css"

module.exports = function() {
    var greet = document.createElement('div');
    greet.textContent = "来自 resources/text.json "+text.greetText;
    return greet;
};