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
        
    }

} catch (PDOException $e) {
    echo '抓文章出錯: ' . $e->getMessage();
}

//抓文章內文
function getArticle($db) {
    $sql = 'SELECT content FROM membernotes WHERE id = 10;';
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
    $sql = 'SELECT title FROM membernotes WHERE id = 10';
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
    $sql = 'SELECT created_at FROM membernotes WHERE id = 10';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $date = new DateTime($row['created_at']);
            $createTime=$date->format('Y-m-d H:i:s');
            echo $createTime;
        }
    } else {
        echo '文章未找到';
    }
}
//抓文章"用餐時間"
function dinningTime($db) {
    $sql = 'SELECT visited_date FROM membernotes WHERE id = 10';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $date = new DateTime($row['visited_date']);
            $dinningTime=$date->format('Y-m-d  H:i');
            echo $dinningTime;
        }
    } else {
        echo '文章未找到';
    }
}
