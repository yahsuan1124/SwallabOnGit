<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 接收平日選擇
    if (isset($_POST["myWeekdays"])) {
        $selectedWeekdays = $_POST["myWeekdays"];
        echo "選擇的星期(平日)： " . implode(", ", $selectedWeekdays) . "<br>";
    }
    if (isset($_POST["myHolidays"])) {
        $selectedHolidays = $_POST["myHolidays"];
        echo "選擇的星期(假日)： " . implode(", ", $selectedHolidays) . "<br>";
    }

    // 平日
    if(isset($_POST["weekdayStartTimeHour"]) && isset($_POST["weekdayStartTimeMin"])){
        $weekdayStartTimeHour = $_POST["weekdayStartTimeHour"];
        $weekdayStartTimeMin = $_POST["weekdayStartTimeMin"];
        echo "平日開始時間： " . $weekdayStartTimeHour . ":" . $weekdayStartTimeMin . "<br>";
    }
    
    if(isset($_POST["weekdayEndTimeHour"]) && isset($_POST["weekdayEndTimeMin"])){
        $weekdayEndTimeHour = $_POST["weekdayEndTimeHour"];
        $weekdayEndTimeMin = $_POST["weekdayEndTimeMin"];
        echo "平日結束時間： " . $weekdayEndTimeHour . ":" . $weekdayEndTimeMin . "<br>";
    }
    // 休息時間
    $breakIndex = 1;
    while(isset($_POST["breakStartTimeHour" . $breakIndex]) && isset($_POST["breakStartTimeMin" . $breakIndex]) && isset($_POST["breakEndTimeHour" . $breakIndex]) && isset($_POST["breakEndTimeMin" . $breakIndex])) {
        $breakStartTimeHour = $_POST["breakStartTimeHour" . $breakIndex];
        $breakStartTimeMin = $_POST["breakStartTimeMin" . $breakIndex];
        $breakEndTimeHour = $_POST["breakEndTimeHour" . $breakIndex];
        $breakEndTimeMin = $_POST["breakEndTimeMin" . $breakIndex];
        echo "平日休息時間 {$breakIndex}： " . $breakStartTimeHour . ":" . $breakStartTimeMin . " - " . $breakEndTimeHour . ":" . $breakEndTimeMin . "<br>";
        $breakIndex++;
    }
    // 假日
    if(isset($_POST["holidayStartTimeHour"]) && isset($_POST["holidayStartTimeMin"])){
        $holidayStartTimeHour = $_POST["holidayStartTimeHour"];
        $holidayStartTimeMin = $_POST["holidayStartTimeMin"];
        echo "假日開始時間： " . $holidayStartTimeHour . ":" . $holidayStartTimeMin . "<br>";
    }

    if(isset($_POST["holidayEndTimeHour"]) && isset($_POST["holidayEndTimeMin"])){
        $holidayEndTimeHour = $_POST["holidayEndTimeHour"];
        $holidayEndTimeMin = $_POST["holidayEndTimeMin"];
        echo "假日結束時間： " . $holidayEndTimeHour . ":" . $holidayEndTimeMin . "<br>";
    }
    // 休息時間
    $breakIndex = 1;
    while(isset($_POST["holidayBreakStartTimeHour" . $breakIndex]) && isset($_POST["holidayBreakStartTimeMin" . $breakIndex]) && isset($_POST["holidayBreakEndTimeHour" . $breakIndex]) && isset($_POST["holidayBreakEndTimeMin" . $breakIndex])) {
        $holidayBreakStartTimeHour = $_POST["holidayBreakStartTimeHour" . $breakIndex];
        $holidayBreakStartTimeMin = $_POST["holidayBreakStartTimeMin" . $breakIndex];
        $holidayBreakEndTimeHour = $_POST["holidayBreakEndTimeHour" . $breakIndex];
        $holidayBreakEndTimeMin = $_POST["holidayBreakEndTimeMin" . $breakIndex];
        echo "平日休息時間 {$breakIndex}： " . $holidayBreakStartTimeHour . ":" . $holidayBreakStartTimeMin . " - " . $holidayBreakEndTimeHour . ":" . $holidayBreakEndTimeMin . "<br>";
        $breakIndex++;
    }
}
