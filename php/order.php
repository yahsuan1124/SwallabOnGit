<?php
$host = "localhost";
$dbname = "swallab";
$user = "root";
$db = new PDO("mysql:host={$host};dbname={$dbname}", $user);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$service = isset($_POST["service"]) ? $_POST["service"] : '';
switch ($service) {
    case 'pickupTime':
        pickupTime($_POST["current_time"]);
        break;
    default:
        print("未知的服務");
        break;
}

//取餐時間
function pickupTime($current_time) {

    global $db;
    $current_day = strtolower(date('l', strtotime($current_time))); 
    
    
    $current_hour = intval(date('H', strtotime($current_time))); 
    
    $current_minute = intval(date('i', strtotime($current_time))); 
    
    
    $sql = "SELECT * FROM restaurant_info WHERE id = 1"; 
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach($rows as $row){
        $is_weekday = in_array($current_day, json_decode($row['weekday']));
        $is_holiday = in_array($current_day, json_decode($row['holiday']));
       


        $wOpeningHours = json_decode($row['wOpeningHours']);
        $hOpeningHours = json_decode($row['hOpeningHours']);

        $opening_hours = $is_weekday ? $wOpeningHours : $hOpeningHours;
        
        
        //營業開始時間
        $start_hour = intval($opening_hours[0]);
        //營業開始時分
        $start_min = intval($opening_hours[1]);
        //營業結束時間
        $closing_hour = intval($opening_hours[2]);
        //營業開始時分
        $closing_min = intval($opening_hours[3]);
        
        

        //超過營業時間的話，最快取餐是隔天的開始營業時間
        //還在營業時間但一小時後會結束營業的話，最快取餐是隔天的開始營業時間
        if ($current_minute >= $closing_min) {
            if ($current_hour + 1 >= $closing_hour) {
                // 返回隔天營業時間
                $current_hour = $start_hour;
                $current_minute = $start_min;
                $a = [
                    'hour' => $current_hour,
                    'minute' => $current_minute
                ];
                
                echo json_encode($a);
            } else {
                $current_hour += 1;
                // 當前小時數小於開門小時數。
                // 當前小時數等於開門小時數，但當前分鐘數小於開門分鐘數。
                if ($current_hour < $start_hour || ($current_hour == $start_hour && $current_minute < $start_min)) {
                    $current_hour = $start_hour;
                    $current_minute = $start_min;
                }
                $a = [
                    'hour' => $current_hour,
                    'minute' => $current_minute
                ];
                
                echo json_encode($a);
            }
        } else {
            if ($current_hour + 1 <= $closing_hour) {
                //加一小時後的時間早於開門時間
                if ($current_hour + 1 < $start_hour || ($current_hour + 1 == $start_hour && $current_minute < $start_min)) {
                    
                    $a = [
                        'hour' => $start_hour,
                        'minute' => $start_min
                    ];
                    
                    echo json_encode($a);
                } else {
                    $current_hour1 = $current_hour + 1;
                    $a = [
                        'hour' => $current_hour1,
                        'minute' => $current_minute
                    ];
                    
                    echo json_encode($a);
                }
            } else {
                $a = [
                    'hour' => $current_hour,
                    'minute' => $current_minute
                ];
                
                echo json_encode($a);
            }
        }
        
    }
    
};

