import mysql from 'mysql'

var pool = mysql.createPool({

	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'Bookstore'
});

module.exports = pool;
