<?php
$host = 'localhost';
$dbname = "demo";
$user = "root";
$password = "";
$message = $_POST["message"];  //表單name的message

$uid=7;
try {
    // 建立資料庫連接
    $db = new PDO("mysql:host={$host};dbname={$dbname}", $user, $password);
    
    // 設置錯誤模式為異常
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 準備 SQL 語句
    $sql = "insert into message (content, created_at,m_id) VALUES (?, NOW(),?)";
    $stmt = $db->prepare($sql);

    // 執行 SQL 語句
    $stmt->execute([$message,$uid]);

    echo "留言：{$message}";
} catch (PDOException $e) {
    // 顯示錯誤信息
    echo "錯誤: " . $e->getMessage();
    error_log("PDO Error: " . $e->getMessage()); // 將錯誤寫入日誌
}


