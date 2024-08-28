<?php
$host = 'localhost';
$dbname = "swallab";
$user = "root";

//拉麵的最新文章-圖片

try {
    $db = new PDO("mysql:host={$host};dbname={$dbname}", $user);  
    $sql = "select main_photo from membernotes left join restinfos on membernotes.r_id=restinfos.id left join filtclasses on filtclasses.id=restinfos.f_c_id where filtclasses.id=3 order by membernotes.created_at desc limit 3;";  
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll();

    foreach ($rows as $row) {
        $photoBlob= $row["main_photo"];
        print($photoBlob)."\n";
    }

    // if (count($rows) != 0) {
    //     $images = [];
    //     foreach ($rows as $row) {
    //         $image = $row['main_photo'];
    //         $mime_type = (new finfo(FILEINFO_MIME_TYPE))->buffer($image);
    //         $images[] = [
    //             'mime_type' => $mime_type,
    //             'image' => base64_encode($image)  // base64轉照片
    //         ];
    //     }
    //     header('Content-Type: application/json');
    //     echo json_encode($images);
    // } 
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>