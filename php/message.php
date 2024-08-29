<?php
$host = 'localhost';
$dbname = "swallab";
$user = "root";
$password = "";
$message = $_POST["message"];  //表單name的message

$uid=1;

try {
    // 建立資料庫連接
    $db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    $sql = "insert into notescomments (content, created_at, updated_at,m_id,m_n_id) VALUES (?, NOW(), NOW(),?,10)";
    $stmt = $db->prepare($sql);

    // 執行
    $stmt->execute([$message,$uid]);
    
    echo "留言：{$message}";
} catch (PDOException $e) {
    // 顯示錯誤信息
    echo "錯誤: " . $e->getMessage();
    error_log("PDO 錯誤訊息: " . $e->getMessage());
}


