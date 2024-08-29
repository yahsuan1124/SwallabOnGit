<?php
$host = 'localhost';
$dbname = "swallab";
$user = "root";

//各分類統整的最新文章-圖片

try {
    $db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $user);  
    $sql = 'select main_photo from membernotes order by created_at desc limit 3;';  
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll();

    foreach ($rows as $row) {
        $photoBlob = $row['main_photo'];
        print ($photoBlob) . "\n";
    }



} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>










