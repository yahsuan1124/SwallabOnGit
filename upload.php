<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$host = "localhost";
$dbname = "demo";
$user = "root";
$pwd = null;  

//下面是一般上傳圖檔blob
// 檢查文件是否成功上傳
// if ($_FILES['fname']['error'] === UPLOAD_ERR_OK) {
//     // 連接到數據庫
//     $db = new mysqli($host, $user, $pwd, $dbname);

//     // 獲取文件信息
//     $fname = $_FILES['fname']['tmp_name'];
//     $image = file_get_contents($fname);
//     $mime_type = (new finfo(FILEINFO_MIME_TYPE))->buffer($image);
    

//     try {
//         // 構建SQL查詢語句
//         // $sql = "INSERT INTO test (image) VALUES (?)";
//         $sql = "UPDATE test SET image=? WHERE id=1";

//         // 準備和執行SQL查詢
//         $stmt = $db->prepare($sql);
//         $stmt->bind_param('b', $image);  // 使用 'b' 參數類型來表示BLOB
//         $stmt->send_long_data(0, $image);
//         $stmt->execute();

//         print("ok");
//     } catch (mysqli_sql_exception $e) {
//         print($e);
//     } finally {
//         // 關閉數據庫連接
//         $stmt->close();
//         $db->close();
//     }
// } else {
//     print("文件上傳失敗");
// }



//下面是base64上傳的方式

if ($_FILES['fname']['error'] === UPLOAD_ERR_OK) {
    
    $db = new mysqli($host, $user, $pwd, $dbname);

    
    $fname = $_FILES['fname']['tmp_name'];
    $image = file_get_contents($fname);
    $base64_image = base64_encode($image);  //轉base64

    try {
        
        $sql = "UPDATE test SET test=? WHERE id=2";

        
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $base64_image);  // "s"，字串
        $stmt->execute();

        print("ok");
    } catch (mysqli_sql_exception $e) {
        print($e);
    } finally {
        // 關閉數據庫連接
        $stmt->close();
        $db->close();
    }
} else {
    print("文件上傳失敗");
}
?>



