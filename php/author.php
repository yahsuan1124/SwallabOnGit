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
        //抓作者名字
        case 'authorName':
            authorName($db);
            break;
        //抓作者頭貼
        case 'headphoto':
            headphoto($db);
            break;
        //抓追蹤人數
        case 'track':
            track($db);
            break;
        //抓粉絲人數
        case 'fans':
            fans($db);
            break;
        //抓個人簡介
        case 'bio':
            bio($db);
            break;
        //抓之前的食記
        case 'history':
            history($db);
            break;
    }


} catch (PDOException $e) {
    echo '抓文章出錯: ' . $e->getMessage();
}

//作者名字
function authorName($db) {
    $sql = 'SELECT users.name from users left join members on users.id=members.user_id left join membernotes on members.id =membernotes.m_id where membernotes.id=10';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $name = $row['name'];
            echo $name;
        }
    } else {
        echo '作者名字失敗';
    }
}

//作者頭貼
function headphoto($db)
{
    $sql = 'SELECT users.avatar from users left join members on users.id=members.user_id left join membernotes on members.id =membernotes.m_id where membernotes.id=10';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $avatar = $row['avatar'];
            echo $avatar;
        }
    } else {
        echo '作者頭貼失敗';
    }
}

//追蹤人數
function track($db)
{
    $sql = 'SELECT members.sum_tracking from members left join users on users.id=members.user_id left join membernotes on members.id =membernotes.m_id where membernotes.id=10;';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $track = $row['sum_tracking'];
            echo $track;
        }
    } else {
        echo '追蹤人數失敗';
    }
}

//粉絲人數
function fans($db)
{
    $sql = 'SELECT members.sum_fans from members left join users on users.id=members.user_id left join membernotes on members.id =membernotes.m_id where membernotes.id=10;';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $fans = $row['sum_fans'];
            echo $fans;
        }
    } else {
        echo '粉絲人數失敗';
    }
}

//個人簡介
function bio($db)
{
    $sql = 'SELECT members.bio from members left join membernotes on membernotes.m_id=members.id where membernotes.id=10';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $bio = $row['bio'];
            echo $bio;
        }
    } else {
        echo '個人簡介失敗';
    }
}

//之前的食記
function history($db)
{
    $sql = 'SELECT membernotes.text,membernotes.main_photo,users.name,membernotes.href from membernotes left join restinfos on membernotes.r_id=restinfos.id left join users on users.id =restinfos.user_id where membernotes.m_id=4;';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/html; charset=utf-8');

    if ($rows) {
        foreach ($rows as $row) {
            $text = $row['text'];
            $main_photo = $row['main_photo'];
            $name = $row['name'];
            $href = $row['href'];
            echo <<<HTML
                <div class="d-flex justify-content-center mt-4 m-0">
                    <div class="row d-flex justify-content-center m-2 p-0 foodNotes-bg">
                        <img src="{$main_photo}" alt="" class="col-5 m-4" />
                        <div class="col-7 d-flex align-items-center">
                            <div class="p-4">
                                <h4 class="mb-4">{$name}</h4>
                                <a href="{$href}" style="text-decoration: none;">
                                    <div class="ellipsis-6 history">
                                        {$text}
                                    </div>
                                </a>
                            
                            </div>
                        </div>
                    </div>
                </div>
                HTML;
        }
    } else {
        echo '粉絲人數失敗';
    }
}