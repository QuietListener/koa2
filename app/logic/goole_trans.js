const translate = require('@vitalets/google-translate-api');

module.exports = function(sentence,toLan){

    return translate(sentence, {to: toLan});

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