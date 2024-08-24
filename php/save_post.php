<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "demo";

// 建立連接
$conn = new mysqli($servername, $username, $password, $dbname);

// 檢查連接
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 獲取表單數據
$title = $_POST['title'];
$content = $_POST['content'];
$meal_time = $_POST['meal_time'];

// 插入文章
$sql = "INSERT INTO blog_posts (title, content, meal_time) VALUES ('$title', '$content', '$meal_time')";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
