<?php
$host = 'localhost';
$dbname = "demo";
$user = "root";
$password = "";

try {
    // 連接資料庫
    $db = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

    // 從資料庫中獲取資料
    $sql = 'SELECT userinfo.name, userinfo.image, userinfo.id AS user_id, userinfo.href, message.content, message.created_at, message.id AS message_id FROM userinfo INNER JOIN 
    message ON userinfo.id = message.m_id ORDER BY message.created_at DESC;';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    // 設定內容類型
    header('Content-Type: text/html; charset=utf-8');
    $index = 0;
    foreach ($rows as $row) {
        $message = htmlspecialchars($row['content']);
        // $date = htmlspecialchars($row['created_at']);

        $DateTime = new DateTime($row['created_at']);
        $currentDateTime = new DateTime();
        $minus = $currentDateTime->diff($DateTime);

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
        $href = $row['href'];
        $photoBlob = $row['image'];
        $mid = $row['message_id'];
        $uid = $row['user_id'];

        // 自動判斷照片格式型態
        $photoMimeType = (new finfo(FILEINFO_MIME_TYPE))->buffer($photoBlob);
        // 轉base64
        $photoBase64 = base64_encode($photoBlob);

        // IMG的src
        $photoSrc = "data:{$photoMimeType};base64,{$photoBase64}";

        echo <<<HTML
        <div class="d-flex justify-content-center mt-4 m-0 test"  data-uid={$uid} data-mid={$mid} id="test">
            <div class="row d-flex justify-content-center m-2 p-2 commentHeadphoto">
                <div class="col-4 d-flex flex-column align-items-center justify-content-center p-3">
                    <img src="{$photoSrc}" alt="">    
                    <a href="{$href}" style="text-decoration: none;color:black">
                        <div class="mt-3">{$username}</div>      
                    </a>

                </div>
                <div class="col-8 p-0 d-flex flex-column">
                    <p class="comment">$message</p>
                    <p id="edit" class="d-flex justify-content-end"></p>
                    <p class="d-flex justify-content-end pe-3">$date</p>
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
