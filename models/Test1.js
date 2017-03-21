const db = require('../db');

module.exports = db.defineModel('test1', {
    id: db.ID,
    name: db.BIGINT
});