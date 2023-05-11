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


// Define a query to insert the data into the table
$query = "INSERT INTO itineraries (title, dateStart, dateEnd, activities, coordinates) VALUES ('$title', '$start_date', '$end_date', '$activity_json', '$coordinates')";

// Execute the query
$db->exec($query);

// Close the database connection
$db->close();

// Redirect back to the form page
header('Location: http://localhost:5173');
?>
