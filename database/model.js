var db = require('./db').db;

var User = db.Model.extend({
    tableName:'user',
    idAttribute:'id'
});

var Task = db.Model.extend({
    tableName:'task',
    idAttribute:'id'
});

var Status = db.Model.extend({
    tableName:'status',
    idAttribute:'id'
});


module.exports = {
    User: User,
    Task: Task,
    Status: Status
};