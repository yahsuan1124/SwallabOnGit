<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: GET, POST, PUT, DELETE, OPTIONS");
header("Content-type: application/json; charset=UTF-8");

$host = "localhost";
$dbname = "swallab";
$user = "root";
$db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $user);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$service = isset($_POST["service"]) ? $_POST["service"] : '';




switch ($service) {
    case 'getRestaurantInfo':
        getRestaurantInfo($_POST["categoryName"]);
        break;
    //  範例 
    case 'getSaleInfo':
        getSaleInfo($_POST["categoryName"]);
        break;
    default:
        print("未知的服務");
        break;
}
//取得一般的全部餐廳
//$a＝上面的$_POST["categoryName"]
function getRestaurantInfo($a) {
    //取全域的資料庫配置
    global $db;
    try {
        $sql = "";
        // 建立資料庫連線
        if ($a=='最高評分') {
            //  類別名稱圖片分數
           $sql = "SELECT restclass , name , avatar , score , avg(score) as a FROM Restinfos 
           left join Users on RestInfos.user_id = Users.id left join MemberReviews on RestInfos.id = MemberReviews.r_id
           left join filtclasses on RestInfos.f_c_id =  filtclasses.id 
           group by name
           order by score desc";
           $stmt = $db->prepare($sql);
           $stmt->execute();
        
       } else {
           $sql = "SELECT restclass , name , avatar , score , avg(score) as a  FROM Restinfos 
           left join Users on RestInfos.user_id = Users.id left join MemberReviews on RestInfos.id = MemberReviews.r_id
           left join filtclasses on RestInfos.f_c_id =  filtclasses.id 
            WHERE restclass = ? 
            group by name 
            order by score desc";
            
           $stmt = $db->prepare($sql);
           $stmt->execute([$a]);
        
       }
       


        // 把所有的查詢結果存在 rows 裡
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // 處理圖片並將其轉換為 base64
        

        // 返回 JSON 格式的數據
        header('Content-Type: application/json');
        echo json_encode($rows);

    } catch (PDOException $e) {
        // 更正錯誤處理
        error_log($e->getMessage());
        header('Content-Type: application/json');
        echo json_encode(["error" => "資料庫錯誤"]);
    }
}
//取得限時優惠
function getSaleInfo($a) {
    //取全域的資料庫配置
    global $db;
    try {
        // 如果最高評分的話取全部分類的
        // 如果不是的話 取該分類的限時優惠
        if($a=='最高評分'){
            //餐廳名，分數，均消，就價錢，新價錢，結束時間
            $sql = "SELECT 
            name , item_name , score , avg_price, item_price , discount_price , end_time , item_photo
            FROM Restinfos 
                       left join Users on RestInfos.user_id = Users.id left join MemberReviews on RestInfos.id = MemberReviews.r_id
                       left join filtclasses on RestInfos.f_c_id =  filtclasses.id
                       left join restitems on RestInfos.id = restitems.r_id
                       left join restdiscount on restitems.id = restdiscount.r_i_id
                       where discount_price is not null
            group by name
            order by score desc;";
            $stmt = $db->prepare($sql);
            $stmt->execute();

        }else{
            $sql = "SELECT 
            restclass , name , item_name , score , avg_price, item_price , discount_price , end_time , item_photo
            FROM Restinfos 
                       left join Users on RestInfos.user_id = Users.id left join MemberReviews on RestInfos.id = MemberReviews.r_id
                       left join filtclasses on RestInfos.f_c_id =  filtclasses.id
                       left join restitems on RestInfos.id = restitems.r_id
                       left join restdiscount on restitems.id = restdiscount.r_i_id
            where restclass = ? and discount_price is not null
            group by name
            order by score desc";
            $stmt = $db->prepare($sql);
            $stmt->execute([$a]); 
        }

        

        // 把所有的查詢結果存在 rows 裡
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // // 處理圖片並將其轉換為 base64
        // foreach ($rows as &$row){
        //     $imgPath = $row['photo'];
        //     $img = file_get_contents('/Applications' . $imgPath);
        //     // $mimeType = (new finfo(FILEINFO_MIME_TYPE))-buffer($img);
        //     // print($img);
        // //     // $base64Img = 'data:' . $mineType . ';base64' . base64_encode($img);

        //     $row['photo'] = base64_encode($img);
        // };

        // 返回 JSON 格式的數據
        header('Content-Type: application/json');
        echo json_encode($rows);

    } catch (PDOException $e) {
        // 更正錯誤處理
        error_log($e->getMessage());
        header('Content-Type: application/json');
        echo json_encode(["error" => "資料庫錯誤"]);
    }
}

