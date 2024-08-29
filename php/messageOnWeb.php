<?php
$host = 'localhost';
$dbname = "swallab";
$user = "root";
$password = "";

try {
    // 連接資料庫
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);

    // 從資料庫中獲取資料
    $sql = 'SELECT name,avatar,content,notescomments.created_at as commentsDate,notescomments.updated_at as commentsUpdate,notescomments.id as commentsId,users.id as uid from users left join members on users.id = members.user_id left join notescomments on members.id = notescomments.m_id where m_n_id =10 order by commentsUpdate desc;';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    // 設定內容類型
    header('Content-Type: text/html; charset=utf-8');
    $index = 0;
    foreach ($rows as $row) {
        $message = htmlspecialchars($row['content']);
        $DateTime = new DateTime($row['commentsDate']);  //轉成時間日期格式
        $currentDateTime = new DateTime();
        $minus = $currentDateTime->diff($DateTime);  //兩個時間差，會回傳年月日等等的時間單位差異

        // 時間相差的判斷
        if ($minus->y > 0) {
            $date = $minus->y . ' 年前';
        } elseif ($minus->m > 0) {
            $date = $minus->m . ' 個月前';
        } elseif ($minus->d > 0) {
            $date = $minus->d . ' 天前';
        } elseif ($minus->h > 0) {
            $date = $minus->h . ' 小時前';
        } elseif ($minus->i > 0) {
            $date = $minus->i . ' 分鐘前';
        } else {
            $date = '剛剛';
        }
        $username = $row['name'];
        $photoBlob = $row['avatar'];
        $mid = $row['commentsId'];
        $uid = $row['uid'];

        echo <<<HTML
        <div class="d-flex justify-content-center mt-4 m-0 test"  data-uid={$uid} data-mid={$mid} id="test">
            <div class="row d-flex justify-content-center m-2 p-2 commentHeadphoto">
                <div class="col-4 d-flex flex-column align-items-center justify-content-center p-3">
                    <img src="{$photoBlob}" alt="">    
                    <a href="" style="text-decoration: none;color:black">
                        <div >{$username}</div>      
                    </a>

                </div>
                <div class="col-8 p-0 d-flex flex-column">
                    <p class="comment">$message</p>
                    <p id="edit" class="d-flex justify-content-end"></p>
                    <p class="d-flex justify-content-end me-3">$date</p>
                </div>
                
            </div>
        </div>
        <br>
        HTML;
    }
} catch (PDOException $e) {
    echo '連接失敗: ' . $e->getMessage();
}
?>