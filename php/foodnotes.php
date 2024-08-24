<?php
// =========== 要有.htaccess 檔案才可以執行 =================
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: GET, POST, PUT, DELETE, OPTIONS");
header("Content-type: application/json; charset=UTF-8");


$host = 'localhost';
$dbname = 'demo';
$user = 'root';

try {
    $db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $user);
    $parts = explode('/', $_SERVER['REQUEST_URI']);
    // var_dump($parts);

    switch($parts[2]){
        //抓食記標題+瀏覽人數-->成功
        case "Getcontent":
            $sql = 'select comment,viewNumber from foodnotes;';
            $result = $mydb->query($sql);
            $data = [];
            while($row = $result->fetch_object()){
                $data[] = $row;
            }

            $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);
            echo $myJSON_data;
            break;
        
        // 失敗!!
        case "GetImage":
            $sql = 'select image from foodnotes';
            $result = $mydb->query($sql);
            // var_dump($result);
            
            $data = [];
            while($row = $result->fetch_object()){
                $data[] = $row;
            }
            echo $row;
            
            // $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);
            // echo $myJSON_data;
            break;


        case "GetNewTitle":
            $sql = 'select comment,date from newtitle;';
            $result = $mydb->query($sql);
            $data = [];
            while($row = $result->fetch_object()){
                $data[] = $row;
            }

            $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);
            echo $myJSON_data;
            break;







        case "GetAll":
            $student_id =  $parts[3];

            $sql = 'select image from foodnotes where foodnotes_id=?';
            $stmt = $mydb->prepare($sql);
            $stmt->bind_param("b",$student_id);
            $stmt->execute();

            $result = $stmt->get_result();
            $data = [];
            while($row = $result->fetch_object()){
                $data[] = $row;
            }

            $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);
            echo $myJSON_data;
            break;
            

        case "PostImage":
            $student_name = $_GET['student_name'];

            $sql = 'SELECT image FROM foodnotes WHERE student_name = ?;';
            $stmt = $mydb->prepare($sql);
            $stmt->bind_param('s', $student_name);
            $stmt->execute();
            $result = $stmt->get_result();

            $images = [];
            while ($row = $result->fetch_assoc()) {
                $images[] = $row['image'];
            }

            echo json_encode($images);
             break;
            

        case "DeleteStudent":
            $output = json_decode(file_get_contents('php://input'), true);
            $student_id = $output['student_id'];

            $sql = '這裡-請在這裡寫出對應的SQL指令';      
            $stmt = $mydb->prepare($sql);
            $stmt->bind_param('i', $student_id);
            $stmt->execute();

            echo json_encode(["message"=>"delete: ". $student_id . " --- OK"]);
            break;
    }
} catch(PDOException $err) {
    echo $err;
}