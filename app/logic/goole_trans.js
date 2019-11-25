const translate = require('@vitalets/google-translate-api');

module.exports = function(sentence){

    return translate(sentence, {to: 'en'});

    // translate('Ik spreek Engels', {to: 'en'}).then(res => {
    //     console.log(res.text);
    //     //=> I speak English
    //     console.log(res.from.language.iso);
    //     //=> nl
    //     return res;
    // }).catch(err => {
    //     console.error(err);
    // });
}