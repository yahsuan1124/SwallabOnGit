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
    case 'sale':
        sale();
        break;

    case 'saveComment':
        saveComment($_POST["userid"], $_POST["restaurantid"], $_POST["star"], $_POST["comment"]);
        break;
    case 'menu':
        menu($_POST["className"], $_POST["restaurant_name"]);
        break;
    case 'allMenu':
        allMenu($_POST["restaurant_name"]);
        break;
    case 'showComment':
        showComment($_POST["r_id"]);
        break;
    case 'star':
        star($_POST["r_id"]);
        break;
    case 'saleMenu':
        saleMenu($_POST["restaurant_name"]);
        break;
    // case 'queryShopCart':
    //     queryShopCart($_POST["userid"], $_POST["restaurantid"]);
    //     break;
    case 'saveShopCart':
        saleMenu($_POST["restaurant_name"]);
        break;
    case 'favorite':
        favorite($_POST["alreadyAdd"], $_POST["m_id"], $_POST["r_id"]);
        break;
    case 'getImg':
        getImg($_POST["restaurant_name"]);
        break;
    default:
        print ("未知的服務");
        break;
}
//收藏
function favorite($alreadyAdd, $m_id, $r_id)
{
    global $db;
    if ($alreadyAdd == 0) {
            // 執行刪除操作
            $sql = "DELETE FROM `restfavorites` WHERE m_id =? and r_id =?";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(1, $m_id, PDO::PARAM_INT);
            $stmt->bindParam(2, $r_id, PDO::PARAM_INT);
            $stmt->execute();

            // 返回操作結果
            header('Content-Type: application/json');
            echo json_encode(["status" => "deleted"]);
    } else {
            // 執行插入操作
            $sql = "INSERT INTO `restfavorites`(`id`, `m_id`, `r_id`) VALUES (DEFAULT,?,?)";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(1, $m_id, PDO::PARAM_INT);
            $stmt->bindParam(2, $r_id, PDO::PARAM_INT);
            $stmt->execute();

            // 返回操作結果
            header('Content-Type: application/json');
            echo json_encode(["status" => "added"]);
    }
}


//取得餐廳資訊
function sale()
{
    //取全域的資料庫配置
    global $db;
    try {
        // 建立資料庫連線
        $sql = "SELECT name, RestInfos.id , address , avg_price , phone , ROUND(AVG(MemberReviews.score), 1) AS score FROM RestInfos 
        left join Users on RestInfos.user_id = Users.id
        left join MemberReviews on RestInfos.id = MemberReviews.r_id
        WHERE r_id = 1
        group by r_id;";
        $stmt = $db->prepare($sql);
        $stmt->execute();

        // 把所有的查詢結果存在 rows 裡
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // // 處理圖片並將其轉換為 base64
        // foreach ($rows as &$row) {
        //     if (isset($row['restaurant_image'])) {
        //         $image = $row['restaurant_image'];

        //         // 確保 $image 是有效的二進制數據
        //         // 這裡假設 $image 是二進制數據，根據實際情況你可能需要用 file_get_contents 讀取文件
        //         $image_base64 = base64_encode($image);

        //         // 更新 $row 以包含 base64 編碼的圖片
        //         $row['restaurant_image'] = $image_base64;
        //     }
        // }

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
//評論
//INSERT INTO `rating` VALUES ('1','1','1',4.1,'嗚哈哈')
function saveComment($userid, $restaurantid, $star, $comment)
{
    global $db;

    try {
        // 插入 MemberReviews 表的数据
        $sql = "INSERT INTO MemberReviews (m_id, r_id, score, created_at) VALUES (?, ?, ?, NOW())";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $userid, PDO::PARAM_STR);
        $stmt->bindParam(2, $restaurantid, PDO::PARAM_STR);
        $stmt->bindParam(3, $star, PDO::PARAM_INT);
        $stmt->execute();


        // 插入 restcomments 表的数据
        $sql = "INSERT INTO restcomments (m_id, r_id, content, created_at) VALUES (?, ?, ?, NOW())";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $userid, PDO::PARAM_STR);
        $stmt->bindParam(2, $restaurantid, PDO::PARAM_STR);
        $stmt->bindParam(3, $comment, PDO::PARAM_STR);
        $stmt->execute();

        echo "Comment successfully added.";
    } catch (PDOException $e) {
        // 錯誤處理
        echo "Error: " . $e->getMessage();
    }
}

function timeAgo($timestamp) {
    $time = time() - strtotime($timestamp);

    if ($time < 60) {
        return $time . '秒前';
    } elseif ($time < 3600) {
        return floor($time / 60) . '分钟前';
    } elseif ($time < 86400) {
        return floor($time / 3600) . '小时前';
    } elseif ($time < 604800) {
        return floor($time / 86400) . '天前';
    } else {
        return date("Y-m-d", strtotime($timestamp));
    }
}

$sql = "SELECT m_id, r_id, content, created_at FROM restcomments WHERE r_id = ?";
$stmt = $db->prepare($sql);
$stmt->bindParam(1, $restaurantid, PDO::PARAM_STR);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($rows as &$row) {
    $row['created_at'] = timeAgo($row['created_at']);
}


// 抓各類別的菜單
function menu($className, $restaurant_name)
{
    //取全域的資料庫配置
    global $db;
    try {
        // 建立資料庫連線
        // 品項名稱，價錢，照片，類別名稱
        $sql = "SELECT item_name , item_price , item_photo , name , section FROM restitems 
        left join RestInfos on restitems.r_id = RestInfos.id
        left join filtclasses on RestInfos.f_c_id = filtclasses.id
        left join Users on RestInfos.user_id = Users.id
        left join filtsectiondemos on RestItems.f_s_d_id = filtsectiondemos.id
         where section = ? and name = ?;";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $className, PDO::PARAM_STR);
        $stmt->bindParam(2, $restaurant_name, PDO::PARAM_STR);
        $stmt->execute();

        // 把所有的查詢結果存在 rows 裡
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);



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
;


//抓全部菜單
function allMenu($restaurant_name)
{
    //取全域的資料庫配置
    global $db;
    try {
        // 建立資料庫連線
        // $sql = "SELECT item_name ,item_price , item_photo , FROM RestItems
        // left join restaurantcategory on restinfos.r_id = restaurantcategory.id
        // left join filtsectiondemos on restitems.f_s_d_id = filtsectiondemos.id
        // where restaurant_name = ?;";
        $sql = "SELECT * FROM users left join RestInfos on Users.id = RestInfos.user_id 
            left join RestItems on RestInfos.id = RestItems.r_id 
            left join filtsectiondemos on RestItems.f_s_d_id = filtsectiondemos.id
            where name = ?;";
        $stmt = $db->prepare($sql);
        // $stmt->bindParam(1, $className, PDO::PARAM_STR);
        $stmt->bindParam(1, $restaurant_name, PDO::PARAM_STR);
        $stmt->execute();

        // 把所有的查詢結果存在 rows 裡
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // foreach ($rows as &$row) {
        //     $imgPath = $row['photo'];
        //     $img = file_get_contents('/Applications' . $imgPath);
        //     // $mimeType = (new finfo(FILEINFO_MIME_TYPE))-buffer($img);
        //     // print($img);
        //     //     // $base64Img = 'data:' . $mineType . ';base64' . base64_encode($img);

        //     $row['photo'] = base64_encode($img);
        // }
        // ;


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
//顯示留言
function showComment($r_id)
{
    //取全域的資料庫配置
    global $db;
    try {
        // 建立資料庫連線
        // $sql = "SELECT Users.avatar, name as userName, content , score , restcomments.created_at_date  , restName FROM restcomments 
        // inner join MemberReviews on restcomments.m_id = MemberReviews.m_id and restcomments.r_id = MemberReviews.r_id
        // left join members on restcomments.m_id = members.id
        // left join Users on members.user_id = Users.id
        // left join(
        // select RestInfos.id , name as restName from RestInfos left join Users on RestInfos.user_id = Users.id
        // )as rest on restcomments.r_id = rest.id
        // where restName = ?
        // order by restcomments.created_at_date desc ;";
        $sql = "SELECT * from users right join members on users.id = members.user_id LEFT JOIN restcomments on members.id = restcomments.m_id where restcomments.r_id = ? order by restcomments.created_at_date desc";
        $stmt = $db->prepare($sql);
        // $stmt->bindParam(1, $className, PDO::PARAM_STR);
        $stmt->bindParam(1, $r_id, PDO::PARAM_INT);
        $stmt->execute();

        // 把所有的查詢結果存在 rows 裡
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);


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
//顯示星星
function star($r_id){
    global $db;
        try {
        // 建立資料庫連線
        $sql = "SELECT * from users left join members on users.id = members.user_id LEFT JOIN memberreviews on members.id = memberreviews.m_id where memberreviews.r_id = ? order by memberreviews.created_at_date desc";
        $stmt = $db->prepare($sql);
        // $stmt->bindParam(1, $className, PDO::PARAM_STR);
        $stmt->bindParam(1, $r_id, PDO::PARAM_INT);
        $stmt->execute();

        // 把所有的查詢結果存在 rows 裡
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);


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

//抓限時優惠的菜單
function saleMenu($restaurant_name)
{
    //取全域的資料庫配置
    global $db;
    try {
        // 建立資料庫連線
        $sql = "SELECT 
        *
        FROM Restinfos 
                   left join Users on RestInfos.user_id = Users.id 
                   left join restitems on RestInfos.id = restitems.r_id
                   left join restdiscount on restitems.id = restdiscount.r_i_id
                   where discount_price is not null and name = ?";
        $stmt = $db->prepare($sql);
        // $stmt->bindParam(1, $className, PDO::PARAM_STR);
        $stmt->bindParam(1, $restaurant_name, PDO::PARAM_STR);
        $stmt->execute();

        // 把所有的查詢結果存在 rows 裡
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // foreach ($rows as &$row) {
        //     $imgPath = $row['photo'];
        //     // $img = file_get_contents('/Applications' . $imgPath);
        //     $img = file_get_contents('/Applications' . $imgPath);
        //     // $mimeType = (new finfo(FILEINFO_MIME_TYPE))-buffer($img);
        //     // print($img);
        //     //     // $base64Img = 'data:' . $mineType . ';base64' . base64_encode($img);

        //     $row['photo'] = base64_encode($img);
        // }
        // ;


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

//查詢購物車
// function queryShopCart($userid, $restaurantid)
// {
//     global $db;

//     try {
//         // 建立 SQL 語句
//         $sql = "SELECT item_name , price , photo , mealsCount FROM shoppingCar left join restaurant on shoppingCar.mealsId = restaurant.id where userid = ? and restaurantid = ?";
//         $stmt = $db->prepare($sql);

//         // 綁定參數 (注意：索引從 1 開始)
//         $stmt->bindParam(1, $userid, PDO::PARAM_INT);
//         $stmt->bindParam(2, $restaurantid, PDO::PARAM_INT);

//         $stmt->execute();
//         // 把所有的查詢結果存在 rows 裡
//         $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

//         foreach ($rows as &$row) {
//             $imgPath = $row['photo'];
//             $img = file_get_contents('/Applications' . $imgPath);
//             // $mimeType = (new finfo(FILEINFO_MIME_TYPE))-buffer($img);
//             // print($img);
//             //     // $base64Img = 'data:' . $mineType . ';base64' . base64_encode($img);

//             $row['photo'] = base64_encode($img);
//         }
//         ;

//         // 返回 JSON 格式的數據
//         header('Content-Type: application/json');
//         echo json_encode($rows);
//     } catch (PDOException $e) {
//         // 錯誤處理
//         echo "Error: " . $e->getMessage();
//     }
// }
// ;












// 加入購物車
function saveShopCart($userid, $restaurantid, $mealsId, $mealsCount)
{
    global $db;

    try {
        // 建立 SQL 語句
        $sql = "INSERT INTO shoppingCart VALUES (?, ?, ?, ? )";
        $stmt = $db->prepare($sql);

        // 綁定參數 (注意：索引從 1 開始)
        $stmt->bindParam(1, $userid, PDO::PARAM_STR);
        $stmt->bindParam(2, $restaurantid, PDO::PARAM_INT);
        $stmt->bindParam(3, $mealsId, PDO::PARAM_INT);
        $stmt->bindParam(4, $mealsCount, PDO::PARAM_INT);

        // 執行 SQL 語句
        $stmt->execute();

        echo "Comment successfully added.";
    } catch (PDOException $e) {
        // 錯誤處理
        echo "Error: " . $e->getMessage();
    }
}
;


//  移除購物車商品
function deleteShopCart($userid, $restaurantid, $star, $comment)
{
    global $db;

    try {
        // 建立 SQL 語句
        $sql = "INSERT INTO rating (userid, restaurantid, rating, comment) VALUES (?, ?, ?, ?)";
        $stmt = $db->prepare($sql);

        // 綁定參數 (注意：索引從 1 開始)
        $stmt->bindParam(1, $userid, PDO::PARAM_STR);
        $stmt->bindParam(2, $restaurantid, PDO::PARAM_STR);
        $stmt->bindParam(3, $star, PDO::PARAM_INT);
        $stmt->bindParam(4, $comment, PDO::PARAM_STR);

        // 執行 SQL 語句
        $stmt->execute();

        echo "Comment successfully added.";
    } catch (PDOException $e) {
        // 錯誤處理
        echo "Error: " . $e->getMessage();
    }
}
;


function getImg($a)
{
    //取全域的資料庫配置
    global $db;
    try {
        // 建立資料庫連線
        $sql = "SELECT avatar from users where name = ?";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $a, PDO::PARAM_STR);
        $stmt->execute();

        // 把所有的查詢結果存在 rows 裡
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

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




// SELECT Users.name, Users.phone, RestInfos.avg_price, RestInfos.address, RestInfos.weekday, RestInfos.weekend, RestInfos.wd_operating, RestInfos.we_operating, RestInfos.wd_close_1, RestInfos.wd_close_2, RestInfos.we_close_1, RestInfos.we_close_2, RestItems.item_name, RestItems.item_price, RestItems.item_photo, filtsectiondemos.section FROM users left join RestInfos on Users.id = RestInfos.user_id left join RestItems on RestInfos.id = RestItems.r_id left join filtsectiondemos on RestItems.f_s_d_id = filtsectiondemos.id;