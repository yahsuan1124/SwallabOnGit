// CKEditor

let editorInstance;

ClassicEditor
    .create(document.querySelector('#editor'), {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'imageUpload'],
        ckfinder: {
            uploadUrl: 'http://localhost/MySwallab/public/api/upload' // 設置文件上傳 URL
        }
    })
    .then(editor => {
        editorInstance = editor;
    })
    .catch(error => {
        console.error(error);
    });

// 時間控制
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// 顯示要傳送的圖片
document.getElementById('titleImage').addEventListener('change', function (event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let img = document.createElement('img');
            img.src = event.target.result;

            // Clear the previous image
            let preview = document.getElementById('photoResult');
            preview.innerHTML = '';
            preview.appendChild(img);
        }
        reader.readAsDataURL(file);
    }

});

// 傳送表單
$('#editorBtn').on('click', async event => {
    event.preventDefault();

    if (!editorInstance) {
        console.error('CKEditor instance is not ready.');
        return;
    }

    // 取得 CKEditor 的內容
    const editorContent = editorInstance.getData();

    const url = 'http://localhost/MySwallab/public/api/submit';
    const body = new FormData(myBlog);

    // 將 CKEditor 加入 body
    body.append('editor', editorContent);

    let response = await fetch(url, {
        method: 'POST',
        body
    });
    let result = await response.json();
    console.log(result);
    const {status} = result;
    let mySubmitResult = '';
    if (status == 'ok') {
        mySubmitResult = '存檔成功';
    } else {
        mySubmitResult = '存檔失敗';
    }
    $('#mySubmitResult').text(mySubmitResult);
        await sleep(2500);
        $('#mySubmitResult').text('');
        myBlog.reset();
})

// 實際用餐時間不能大於今天
let nowTime = new Date().toISOString().slice(0, 16)
// console.log(nowTime);
$('#eatTime').attr('max', nowTime)

// 檢查實際用餐時間是否有小於現在時間
$('#eatTime').on('change', async function () {
    let eatTime = new Date($(`#${this.id}`).val())
    // console.log(eatTime);

    let now = new Date();

    if (eatTime > now) {
        $('#eatTimeResult').css('display', 'block');
        $('#eatTime').val('');
        await sleep(2500);
        $('#eatTimeResult').css('display', 'none');
    }
})


// 抓所有餐廳名稱，並存到陣列
let restaurantName = [];
let getRestaurantName = async () => {
    const url = 'http://localhost/MySwallab/public/api/getrestaurantname';
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    data.map(element => {
        // console.log(element);
        let { name } = element
        // console.log(restaurant_name);
        restaurantName = [name, ...restaurantName]

        // console.log('111', restaurantName);

    });
}

// 把陣列變成全域
let allRestaurantName = async () => {
    await getRestaurantName();
    return restaurantName;
}

allRestaurantName().then()

$('#restaurantName').on('compositionupdate', event => {
    // console.log(event);
    // console.log(event.originalEvent.data);
    // console.log(restaurantName);
    let name = restaurantName.filter(name => {
        // console.log(event.originalEvent.data.indexOf(name));
        // return event.originalEvent.data.indexOf(name) >= 0;
        for (let char of event.originalEvent.data) {
            if (name.indexOf(char) >= 0) {
                return true;
            }
            return false
        }
    })
    // console.log('name', name);
    $('#result').css('display', 'block');
    $('#result').empty();
    if (name.length > 0) {
        $.each(name, function (index, item) {
            $('#result').append('<li>' + item + '</li>');
        })
    } else {
        $('#result').append('<li>沒有此店家</li>');
    }

    $('#result').on('click', 'li', function () {
        let selectedText = $(this).text();
        $('#restaurantName').val(selectedText);
        $('#result').empty();
        $('#result').css('display', 'none');
    });
})
