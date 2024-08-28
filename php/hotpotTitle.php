<?php
$host = 'localhost';
$dbname = 'swallab';
$user = 'root';

//火鍋的最新文章-標題+日期

try {
    $db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $user);
    $sql = "select title,membernotes.created_at from membernotes left join restinfos on membernotes.r_id=restinfos.id left join filtclasses on filtclasses.id=restinfos.f_c_id where filtclasses.id=1 order by membernotes.created_at desc limit 3";
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
