<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['upload'])) {
    $response = [];
    if (empty($_FILES['upload']['name'])) {
        $response = [
            'uploaded' => false,
            'error' => [
                'message' => 'No file uploaded.'
            ]
        ];
    } else {
        $file = $_FILES['upload'];
        $fileName = uniqid() . "_" . basename($file['name']); // 確保文件名唯一
        $fileTmpName = $file['tmp_name'];
        $uploadDir = "upload/"; // 檔案存放路徑
        $uploadFile = $uploadDir . $fileName;

        // 確保上傳目錄存在且具有寫入權限
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (move_uploaded_file($fileTmpName, $uploadFile)) {
            $response = [
                'uploaded' => true,
                'url' => $uploadFile
            ];
        } else {
            $response = [
                'uploaded' => false,
                'error' => [
                    'message' => 'Failed to move uploaded file.'
                ]
            ];
        }
    }

    echo json_encode($response);
    exit;
} else {
    echo json_encode([
        'uploaded' => false,
        'error' => [
            'message' => 'Invalid request method or no file uploaded.'
        ]
    ]);
    exit;
}
?>




?>
