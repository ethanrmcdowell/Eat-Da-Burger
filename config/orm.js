const connection = require("./connection.js");

const printQuestionMarks = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

const objToSql = (ob) => {
    let arr = [];
    for (let key in ob) {
        let value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

let orm = {
    selectAll: (tableInput, cb) => {
        let query = "SELECT * FROM " + tableInput + ";";
        connection.query(query, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (cols, vals, cb) => {
        let query = "INSERT INTO burgers";
        query += " (";
        query += cols.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(vals.length);
        query += ") ";

        console.log(query);

        connection.query(query, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (objColVals, condition, cb) => {
        let query = "UPDATE burgers";
        query += " SET ";
        query += objToSql(objColVals);
        query += " WHERE ";
        query += condition;

        console.log(query);

        connection.query(query, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}



module.exports = orm;