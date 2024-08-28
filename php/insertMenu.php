<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: GET, POST, PUT, DELETE, OPTIONS");
header("Content-type: application/json; charset=UTF-8");


$host = 'localhost';
$dbname = 'swallab';
$user = 'root';

// 餐廳編號
$r_id = 1;
$price = $_REQUEST['foodPrice'];
$meals_name = $_REQUEST['foodName'];
$className = $_REQUEST['classification'] ?? null;
$addClass = $_REQUEST['addClass'];

$class = $className ? $className : $addClass;
// die($class);

// 圖片處裡
$src = $_FILES['foodPhoto']['tmp_name'];
// die($src);
$uniqid = uniqid();
$dst = "/xampp/image/{$uniqid}";
// die($dst);

if (move_uploaded_file($src, $dst)) {
    
    try {
        $db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $user);
    
        // 若新增分類
        if (isset($className)) {
            // die('已存在分類');
            $sql = "INSERT INTO restaurant(r_id, class, meals_name, price, photo) VALUES (?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$r_id, $class, $meals_name, $price, $dst]);
            echo 'class exist ok';
        } else {
            // die('新增分類');
            // 啟動交易
            $db->beginTransaction();
    
            // 寫入class
            $sql1 = "INSERT INTO class(className) VALUES (?)";
            $stmt1 = $db->prepare($sql1);
            $stmt1->execute([$class]);
    
            // 取得id
            $insertId = $db->lastInsertId();
            // echo $insertId;
    
            // 寫入restaurant
            $sql2 = "INSERT INTO restaurant(r_id, class, meals_name, price, photo) VALUES (?, ?, ?, ?, ?)";
            $stmt2 = $db->prepare($sql2);
            $stmt2->execute([$r_id, $insertId, $meals_name, $price, $dst]);
    
            // 完成交易
            $db->commit();
            echo 'insert class and menu ok';
        }
    } catch (PDOException $error) {
        // 返回交易
        $db->rollBack();
        echo "Fail: ", $error->getMessage();
    }
} else {
    echo ($_FILES['foodPhoto']['error']);
}
// die($dst);
