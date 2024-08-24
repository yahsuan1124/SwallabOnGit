<?php
$host = 'localhost';
$dbname = "demo";
$user = "root";
$password = "";


$action = $_GET['action'];

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    switch ($action) {
        //抓文章內文
        case 'getArticle':
            getArticle($db);
            break;
        //抓文章大標題
        case 'getTitle':
            getTitle($db);
            break;
        //抓文章"發布"時間
        case 'createTime':
            createTime($db);
            break;
        //抓文章"用餐"時間
        case 'dinningTime':
            dinningTime($db);
            break;
        //抓文章下面"餐廳名字"
        case 'restaurant':
            restaurant($db);
            break;
        //抓文章下面"均消"
        case 'avg':
            avg($db);
            break;
        //抓文章下面"電話"
        case 'tel':
            tel($db);
            break;
        //抓文章下面"地址"
        case 'address':
            address($db);
            break;
        //抓文章下面"營業時間"
        case 'openTime':
            openTime($db);
            break;
    }

} catch (PDOException $e) {
    echo '抓文章出錯: ' . $e->getMessage();
}

//抓文章內文
function getArticle($db) {
    $sql = 'SELECT content FROM article WHERE id = 1';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $content = $row['content'];
            echo $content;
        }
    } else {
        echo '文章未找到';
    }
}
//抓文章大標題
function getTitle($db) {
    $sql = 'SELECT title FROM article WHERE id = 1';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $title = $row['title'];
            echo $title;
        }
    } else {
        echo '文章未找到';
    }
}
//抓文章"發布時間"
function createTime($db) {
    $sql = 'SELECT createTime FROM article WHERE id = 1';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $date = new DateTime($row['createTime']);
            $createTime=$date->format('Y-m-d H:i:s');
            echo $createTime;
        }
    } else {
        echo '文章未找到';
    }
}
//抓文章"用餐時間"
function dinningTime($db) {
    $sql = 'SELECT dinningTime FROM article WHERE id = 1';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $date = new DateTime($row['dinningTime']);
            $dinningTime=$date->format('Y-m-d  H:i');
            echo $dinningTime;
        }
    } else {
        echo '文章未找到';
    }
}
//抓文章下面"餐廳名字"
function restaurant($db) {
    $sql = 'SELECT restaurant FROM article WHERE id = 1';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $restaurant =$row['restaurant'];
            echo $restaurant;
        }
    } else {
        echo '文章未找到';
    }
}
//抓文章下面"均消"
function avg($db) {
    $sql = 'SELECT avg FROM article WHERE id = 1';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $avg =$row['avg'];
            echo $avg;
        }
    } else {
        echo '文章未找到';
    }
}
//抓文章下面"電話"
function tel($db) {
    $sql = 'SELECT tel FROM article WHERE id = 1';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $tel =$row['tel'];
            echo $tel;
        }
    } else {
        echo '文章未找到';
    }
}
//抓文章下面"地址"
function address($db) {
    $sql = 'SELECT address FROM article WHERE id = 1';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $address =$row['address'];
            echo $address;
        }
    } else {
        echo '文章未找到';
    }
}
//抓文章下面"營業時間"
function openTime($db) {
    $sql = 'SELECT openTime FROM article WHERE id = 1';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $openTime =$row['openTime'];
            echo $openTime;
        }
    } else {
        echo '文章未找到';
    }
}