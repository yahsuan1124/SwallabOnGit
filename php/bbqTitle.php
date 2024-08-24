<?php
$host = 'localhost';
$dbname = 'demo';
$user = 'root';

//燒肉的最新文章-標題+日期

try {
    $db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $user);
    $sql = "select title, created_at from foodnotes where type = 'bbq' order by created_at desc limit 3;";
    $result = $db->query($sql);

    $data = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }

    echo json_encode($data, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    echo json_encode(['error' => '最新消息內容失敗', 'message' => $e->getMessage()]);
}
?>
