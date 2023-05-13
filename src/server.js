const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 3001;

const db = new sqlite3.Database('data.db', err => {
	if (err) {
		console.error('Failed to connect to the database:', err);
		return;
	}
	console.log('Connected to the database');
});

app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

// Testing for php
app.get('/hello', (req, res) => {
	// Call the PHP script using the "exec" function
	exec('php /hello.php', (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing PHP script: ${error}`);
			res.status(500).send('Server error');
		} else {
			console.log(`PHP script output: ${stdout}`);
			res.send(stdout);
		}
	});
});

// GET route to retrieve all itineraries
app.get('/data', (req, res) => {
	db.all('SELECT * FROM itineraries', (err, rows) => {
		if (err) {
			console.error('Error retrieving data from the database:', err);
			res.status(500).send('Server error');
		} else {
			res.send(rows);
		}
	});
});

// DELETE route
app.delete('/data/:id', (req, res) => {
	const id = req.params.id;

	db.run('DELETE FROM itineraries WHERE id = ?', id, function (err) {
		if (err) {
			console.error('Error deleting itinerary:', err);
			res.status(500).send('Server error');
		} else {
			if (this.changes > 0) {
				res.sendStatus(204); // Send a success status code (No Content)
			} else {
				res.sendStatus(404); // Send a not found status code
			}
		}
	});
});

// POST route to create a new itinerary
app.post('/data', (req, res) => {
	const { title, dateStart, dateEnd, activities } = req.body;
	// Validate the incoming data if needed

	// Insert the new itinerary into the database
	db.run(
		'INSERT INTO itineraries (title, dateStart, dateEnd, activities) VALUES (?, ?, ?, ?)',
		[title, dateStart, dateEnd, activities],
		function (err) {
			if (err) {
				console.error('Error creating new itinerary:', err);
				res.status(500).send('Server error');
			} else {
				// Retrieve the newly created itinerary from the database
				db.get(
					'SELECT * FROM itineraries WHERE id = ?',
					this.lastID,
					(err, row) => {
						if (err) {
							console.error(
								'Error retrieving newly created itinerary:',
								err
							);
							res.status(500).send('Server error');
						} else {
							res.status(201).send(row);
						}
					}
				);
			}
		}
	);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
