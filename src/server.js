const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

const db = new sqlite3.Database('data.db', err => {
	if (err) {
		console.error('Failed to connect to the database:', err);
		return;
	}
	console.log('Connected to the database');
});

app.use(cors());

app.get('/data', (req, res) => {
	db.all('SELECT * FROM your_table', (err, rows) => {
		if (err) {
			console.error('Error retrieving data from the database:', err);
			res.status(500).send('Server error');
		} else {
			res.send(rows);
		}
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
