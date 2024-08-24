<?php
$host = 'localhost';
$dbname = "demo";
$user = "root";
$password = "";
$dataMid = $_GET["id"];

try {
    // 連接資料庫
    $db = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

    // 從資料庫中獲取資料
    $sql = "SELECT * FROM message WHERE id =$dataMid;";
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();
   
    // 設定內容類型
    header('Content-Type: text/html; charset=utf-8');
    // print_r($rows);
    foreach ($rows as $row) {
        $messageId =($row['content']); 
        print $messageId;
    }
} catch (PDOException $e) {
    echo '連接失敗: ' . $e->getMessage();
}
?>
