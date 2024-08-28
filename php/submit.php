<?php
$title = $_REQUEST['title'];
$content = $_REQUEST['editor'];
// 使用 PDO 或 MySQLi 將 $content 保存到數據庫

$host = 'localhost';
$dbName = 'swallab';
$user = 'root';

try {
    $db = new PDO("mysql:host={$host};dbname={$dbName};charset=utf8mb4;", $user);
    $sql = "insert into ckeditor (title, content) values (?, ?)";
    $stmt = $db->prepare($sql);
    $stmt->execute([$title, $content]);
} catch (PDOException $error) {
    echo $error;
}

echo $content;
?>
