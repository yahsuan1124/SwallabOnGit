<?php
$host = 'localhost';
$dbname = "swallab";
$user = "root";
$password = "";

//card：火鍋熱門排行

try {
    // 連接資料庫
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);

    // 從資料庫中獲取資料
    $sql = 'select title,main_photo,count from membernotes left join restinfos on membernotes.r_id=restinfos.id left join filtclasses on filtclasses.id=restinfos.f_c_id where filtclasses.id=1 order by membernotes.count desc limit 12;';
    $stmt = $db->query($sql, PDO::FETCH_ASSOC);
    $rows = $stmt->fetchAll();

    // 設定內容類型
    header('Content-Type: text/html; charset=utf-8');

    foreach ($rows as $row) {
        $comment = htmlspecialchars($row['title']); 
        $viewNumber = htmlspecialchars($row['count']); 
        $photoBlob = $row['main_photo'];

        // // 自動判斷照片格式型態
        // $photoMimeType = (new finfo(FILEINFO_MIME_TYPE))->buffer($photoBlob);
        // // 轉base64
        // $photoBase64 = base64_encode($photoBlob);

        // // IMG的src
        // $photoSrc = "data:{$photoMimeType};base64,{$photoBase64}";

        echo <<<HTML
        <div class="col-4 mb-4">
          <div class="card overflow-hidden">
            <div class="card-body p-0">
              <a href="../foodNotes/demohotpot.html">
                <img src="{$photoBlob}" alt="" class="img-fluid notesImage" />
              </a>
            </div>
            <div class="card-footer align-items-center">
              <p class="ellipsis notesTitle">{$comment}</p>
              <div class="fixed-bottom-center">
                <div class="d-flex align-items-center justify-content-center">
                  <img src="../images/other/eye.png" alt="" />
                  <p class="m-0 viewNumber">{$viewNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        HTML;
    }
} catch (PDOException $e) {
    echo '連接失敗: ' . $e->getMessage();
}
?>
