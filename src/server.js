const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const db = new sqlite3.Database('data.db');

const app = express();

app.use(cors()); // Add this line before your route handler

app.get('/data', (req, res) => {
	db.all('SELECT * FROM itineraries', (err, rows) => {
		if (err) {
			console.error(err);
			res.status(500).send('Server error');
		} else {
			rows.forEach(row => {
				console.log(row); // Log the itineraryData object to the console
			});
			res.send(rows);
		}
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
