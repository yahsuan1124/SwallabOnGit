<?php
$host = 'localhost';
$dbname = "demo";
$user = "root";
$password = "";
$message = $_GET["message"];
$dataMid = $_GET["id"];

try {
    // 建立資料庫連接
    $db = new PDO("mysql:host={$host};dbname={$dbname}", $user, $password);
    
    // 設置錯誤模式為異常
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 準備 SQL 語句，使用佔位符
    $sql = "UPDATE message SET content=:message, created_at=now() WHERE m_id=7 AND id=:id";
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
    error_log("PDO Error: " . $e->getMessage()); // 將錯誤寫入日誌
}
?>
