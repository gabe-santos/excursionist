<?php
// Get the form data
$title = $_POST['title'];
$start_date = $_POST['date-start'];
$end_date = $_POST['date-end'];
$description = $_POST['description'];
$coordinates = $_POST['coordinates'];

$activity_arr = explode("\n", $description); // Split the string into an array

$activity_json = json_encode($activity_arr); // convert to json string

// Open the database file
$db = new SQLite3('../data.db');

// Check for errors
if (!$db) {
    echo 'Failed to open database: ' . $db->lastErrorMsg();
    exit();
}

// Define a prepared statement to insert the data into the table
$stmt = $db->prepare('INSERT INTO itineraries (title, dateStart, dateEnd, activities, coordinates) VALUES (:title, :start_date, :end_date, :activity_json, :coordinates)');
$stmt->bindValue(':title', $title, SQLITE3_TEXT);
$stmt->bindValue(':start_date', $start_date, SQLITE3_TEXT);
$stmt->bindValue(':end_date', $end_date, SQLITE3_TEXT);
$stmt->bindValue(':activity_json', $activity_json, SQLITE3_TEXT);
$stmt->bindValue(':coordinates', $coordinates, SQLITE3_TEXT);

// Execute the prepared statement
$result = $stmt->execute();

// Close the prepared statement and the database connection
$stmt->close();
$db->close();

// Redirect back to the form page
header('Location: http://localhost:5173');
?>
