<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: GET, POST, PUT, DELETE, OPTIONS");
header("Content-type: application/json; charset=UTF-8");


$host = 'localhost';
$dbname = 'myprojtest';
$user = 'root';

try {
    $db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $user);
    // $db = new PDO("mysql:host={$host};dbname={$dbname};", $user);
    $parts = explode('/', $_SERVER['REQUEST_URI']);
    // var_dump($parts);

    switch ($parts[4]) {
        case 'getClass':
            $sql = 'SELECT * FROM class';
            $result = $db->query($sql);
            
            $data = [];
            foreach ($result as  $value) {
                $data[] = $value;
            }

            $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);
            echo $myJSON_data;
            
            break;
        
        case 'getClassList':
            // $class_id = $parts[4];
            $classId = $_REQUEST['classId'];
            // echo $class_id;
            // die();
            $sql = "SELECT * FROM restaurant WHERE class = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$classId]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $data = [];
            foreach ($result as  $value) {
                $data[] = $value;
            }

            $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);
            echo $myJSON_data;
            break;
        case 'getPrice':
            // $classId = $parts[4];
            $foodId = $_REQUEST['foodId'];
            // echo $foodId;
            // die();
            $sql = "SELECT * FROM `restaurant` WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$foodId]);
            $result = $stmt->fetchAll();
            
            $data = [];
            foreach ($result as  $value) {
                $data[] = $value;
            }

            $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);
            echo $myJSON_data;
            break;
        case 'getMenuList':
            
            $sql = "SELECT * FROM restaurant LEFT JOIN class on restaurant.class = class.class_num;";
            $result = $db->query($sql);

            
            $data = [];
            foreach ($result as  $value) {
                
                $imagePath = $value['photo'];
                $imageData = file_get_contents($imagePath);
                // echo '<pre>';
                // var_dump($imageData);
                // echo '</pre>';
                // die();
                $mimeType = (new finfo(FILEINFO_MIME_TYPE))->buffer($imageData);
                $base64Image = 'data:' . $mimeType . ';base64,' . base64_encode($imageData);

                $value['photo'] = $base64Image;

                $data[] = $value;
            }

            $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);
            echo $myJSON_data;
            break;
        case 'getEditor':
            $id = $_REQUEST['myFoodId'];
            // echo $id;
            $sql = "SELECT * FROM restaurant WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$id]);
            $result = $stmt->fetchAll();

            
            $data = [];
            foreach ($result as  $value) {
                
                $imagePath = $value['photo'];
                $imageData = file_get_contents($imagePath);
                // echo '<pre>';
                // var_dump($imageData);
                // echo '</pre>';
                // die();
                $mimeType = (new finfo(FILEINFO_MIME_TYPE))->buffer($imageData);
                $base64Image = 'data:' . $mimeType . ';base64,' . base64_encode($imageData);

                $value['photo'] = $base64Image;

                $data[] = $value;
            }

            $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);
            echo $myJSON_data;
            break;
        case 'updateMenu':
            $id = $_REQUEST['id'];
            $updatePrice = $_REQUEST['updatePrice'];
            $updateMealName = $_REQUEST['updateMealName'];
            // echo json_encode(['id' => "{$id}", 'updatePrice' => "{$updatePrice}", 'updateMealName' => "{$updateMealName}"]);
            // die();
            $sql = "UPDATE restaurant SET price = ?, meals_name = ? WHERE id = ?;";
            $stmt = $db->prepare($sql);
            $stmt->execute([$updatePrice, $updateMealName, $id]);
            

            // echo json_encode(['message' => $stmt]);
            echo json_encode(['message' => 'ok']);

            break;
        case 'deleteMenu':
            $id = $_REQUEST['id'];
            $sql = "DELETE FROM restaurant WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$id]);

            // $affect = $stmt->affected_rows;
            // $affectedRows = $stmt->affected_rows;
            // echo json_encode(['message' => $affectedRows]);
            echo json_encode(['message' => 'ok']);

            break;
        
    }
} catch(PDOException $err) {
    echo $err;
}