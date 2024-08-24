<?php
header("Content-Type: application/json");

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

// 查詢文章
$sql = "SELECT id, title, content, created_at, meal_time FROM blog_posts";
$result = $conn->query($sql);

$posts = [];

if ($result->num_rows > 0) {
    // 輸出每篇文章數據
    while($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
} else {
    echo json_encode(["message" => "No posts found"]);
    exit;
}

$conn->close();

echo json_encode($posts);
?>
