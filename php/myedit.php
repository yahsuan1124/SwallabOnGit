<?php
$host = 'localhost';
$dbname = "swallab";
$user = "root";
$password = "";
$dataMid = $_GET["id"];

try {
    // 連接資料庫
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);

    // 從資料庫中獲取資料
    $sql = "SELECT * from notescomments where id =$dataMid;";
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();
   
    // 設定內容類型
    header('Content-Type: text/html; charset=utf-8');
    foreach ($rows as $row) {
        $messageId =$row['content']; 
        print $messageId;
    }
} catch (PDOException $e) {
    echo '連接失敗: ' . $e->getMessage();
}
?>
