<?php
$host = 'localhost';
$dbname = "swallab";
$user = "root";

//燒肉的最新文章-圖片

try {

    $db = new PDO("mysql:host={$host};dbname={$dbname}", $user);  
    $sql = "select main_photo from membernotes left join restinfos on membernotes.r_id=restinfos.id left join filtclasses on filtclasses.id=restinfos.f_c_id where filtclasses.id=2 order by membernotes.created_at desc limit 3;";  

    $stmt = $db->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll();

    foreach ($rows as $row) {
        $photoBlob = $row['main_photo'];
        print ($photoBlob) . "\n";
    }

   
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>