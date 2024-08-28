<?php
$host = 'localhost';
$dbname = "swallab";
$user = "root";
$password = "";


$action = $_GET['action'];

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    switch ($action) {
        //抓文章內文
        case 'collectOK':
            collectOK($db);
            break;
        //抓文章大標題
        case 'collectNO':
            collectNO($db);
            break;
    }

} catch (PDOException $e) {
    echo '文章收藏: ' . $e->getMessage();
}

//新增收藏
function collectOK($db) {
    $sql = 'insert into notesfavorites (m_id,m_n_id,created_at) values (1,10,now())';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');
    print("收藏成功");
    
}
//抓文章大標題
function collectNO($db) {
    $sql = 'delete from notesfavorites where m_id=1';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    print("已取消收藏");
}
