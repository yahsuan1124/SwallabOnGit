<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: GET, POST, PUT, DELETE, OPTIONS");
header("Content-type: application/json; charset=UTF-8");

$host = 'localhost';
$dbname = 'swallab';
$user = 'root';

try {
    $db = new PDO("mysql:host={$host};dbname={$dbname};", $user);
    for ($i = 1; $i <= 5; $i++) {

        // $discountIndex = 1;
        if (isset($_REQUEST['menuList' . $i]) && isset($_REQUEST['menuName' . $i]) && isset($_REQUEST['menuPrice' . $i]) && isset($_REQUEST['startTime' . $i]) && isset($_REQUEST['endTime' . $i])) {
            $menuList = $_REQUEST['menuList' . $i];
            $menuName = $_REQUEST['menuName' . $i];
            $menuPrice = $_REQUEST['menuPrice' . $i];
            $startTime = $_REQUEST['startTime' . $i];
            $endTime = $_REQUEST['endTime' . $i];
            $sql = "INSERT INTO `discount` ( `class_id`, `name_id`, `d_price`, `d_startTime`, `d_endTime`) VALUES (?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$menuList, $menuName, $menuPrice, $startTime, $endTime]);
            // print("新增優惠項目{$discountIndex}為 : 分類 -> {$menuList} 名稱 -> {$menuName} 折扣價格 -> {$menuPrice} 開始時間 -> {$startTime} 結束時間 -> {$endTime}<br>");
            echo 'ok';
            // $discountIndex++;
        }
    }
} catch (PDOException $error) {
    echo $error;
}
