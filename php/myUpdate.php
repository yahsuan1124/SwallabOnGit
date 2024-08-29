<?php
$host = 'localhost';
$dbname = "swallab";
$user = "root";
$password = "";
$message = $_GET["message"];
$dataMid = $_GET["id"];

try {
    // 建立資料庫連接
    $db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $user, $password);
    
   
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "UPDATE notescomments SET content=:message, updated_at=now() WHERE m_id=1 and id=:id ";
    $stmt = $db->prepare($sql);

    // 綁定參數
    $stmt->bindParam(':message', $message);
    $stmt->bindParam(':id', $dataMid);

    // 執行 SQL 語句
    $stmt->execute();

    echo "留言：{$message}";
} catch (PDOException $e) {
    // 顯示錯誤信息
    echo "錯誤: " . $e->getMessage();
    error_log("PDO 錯誤: " . $e->getMessage()); 
}
?>
