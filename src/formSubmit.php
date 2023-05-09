<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Get the form data
  $title = $_POST['title'];
  $dateStart = $_POST['date-start'];
  $dateEnd = $_POST['date-end'];
  $description = $_POST['description'];

  // Perform any processing or validation you need here
  // ...

  // Print the form data as a response
  echo "Received form data:\n";
  echo "Title: " . $title . "\n";
  echo "Start Date: " . $dateStart . "\n";
  echo "End Date: " . $dateEnd . "\n";
  echo "Description: " . $description . "\n";
} else {
  echo "Invalid request";
}
?>
