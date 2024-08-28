import { user_id, sleep } from "./backstage.js"
$().ready(function () {

    console.log(user_id);
    
    // // 抓分類
    let getClass = index => {
        // fetch('http://localhost/myProj/php/management_menu1.php/getClass') // php
        fetch('http://localhost/MySwallab/public/api/getfoodclass',{
            headers: { 'X-User-Id': user_id }
        }) // laravel
            .then(response => {
                mySmallLoading.classList.remove('d-none');
                return response.json()
                // return response.text()
            }).then(data => {
                // console.log(data);
                let html = '<option disabled selected>請選擇...</option>'
                // console.log(id);
                data.map(({ id, section }) => {
                    // console.log(section);
                    mySmallLoading.classList.add('d-none');
                    html += `<option value=${id}>${section}</option>`
                })
                // console.log(html);

                $(`#className${index}`).html(html);
            })
    }
    getClass(1);


    // fetch取得名更及價錢
    let getDetail = (parts, body) => {
        const headers = {
            'content-type': 'application/x-www-form-urlencoded'
        }
        // return fetch(`http://localhost/myProj/php/management_menu1.php/${parts}`, {
        return fetch(`http://localhost/MySwallab/public/api/${parts}`, {
            // 用post
            method: 'post',
            headers: headers,
            body: body
        }).then(response => {
            return response.json()
            // return response.text()
        })

    }

    // 取的類別後產出餐點名稱
    $('#discountForm').on('change', '.col-4:nth-child(1) select', async function () {
        // console.log(this);
        // console.log(this.value);
        // console.log(this.id);
        let id = this.id.replace(/[^\d]/g, "");
        // console.log('id: ', id);

        // 抓名稱
        const body = new URLSearchParams({ classId: this.value }).toString();
        // console.log(body);
        mySmallLoading.classList.remove('d-none');
        let data = await getDetail('getfoodname', body);
        mySmallLoading.classList.add('d-none');
        console.log(data);
        let myHtml = '<option disabled selected>請選擇...</option>'

        data.forEach(({ id, item_name }) => {
            // console.log(meals_name);
            myHtml += `<option value=${id}>${item_name}</option>`

        });
        // console.log(myHtml);
        $(`#mealName${id}`).html(myHtml);

    })

    // 顯示原始價格
    $('#discountForm').on('change', '.col-4:nth-child(2) select', async function () {
        // console.log(this);
        let id = this.id.replace(/[^\d]/g, "");
        // console.log('id: ', id);
        // let foodId = this.value;
        // console.log(foodId);
        const body = new URLSearchParams({ foodId: this.value }).toString();
        // console.log(body);
        mySmallLoading.classList.remove('d-none');
        // let data = await getDetail('getPrice', body); // php
        let data = await getDetail('getfoodprice', body); // laravel
        mySmallLoading.classList.add('d-none');

        console.log(data);
        let { item_price } = data;
        // console.log(data[0].price);
        $(`#menuPrice${id}`).attr('max', item_price);
        $(`#originalPrice${id}`).text(item_price);
    })

    // 檢查價格是否正確
    $('#discountForm').on('change', '.col-4:nth-child(3) input', async function () {
        // console.log(this);
        let id = this.id.replace(/[^\d]/g, "");
        // console.log(id);
        // let price = $(`#originalPrice${id}`).text();
        let price = parseInt($(`#originalPrice${id}`).text());
        // console.log(price);
        let price1 = price;
        let inputValue = parseInt($(`#${this.id}`).val());
        // console.log(inputValue);
        if (inputValue >= price || inputValue <= 0) {
            $(`#originalPrice${id}`).text('')
            $('#myResult').text('  請輸入正確金額')
            console.log($('#myResult'));
            $(`#${this.id}`).val('')
            
            
            await sleep(3000);
            $('#myResult').text('')
            console.log(2222);
            $(`#originalPrice${id}`).text(price1)
        }
    })




    let index = 1;


    // 檢查日期



    $('#discountForm').on('click', '.col-6:nth-child(4) input', function () {
        let id = this.id.replace(/[^\d]/g, "");
        let nowAttr = new Date().toISOString().slice(0, 16);
        // console.log(now);
        $(`#startTime${id}`).attr('min', nowAttr);
    })

    $('#discountForm').on('change', '.col-6:nth-child(4) input', function () {

        // let startTime = new Date($(`#startTime${index}`).val());
        let startTime = new Date($(`#${this.id}`).val());
        // console.log(this.id); // startTime1
        let id = this.id.replace(/[^\d]/g, "");
        // console.log( id);
        // console.log(startTime);
        let now = new Date();
        if (startTime < now) {
            $(`#startTimeResult${id}`).text('開始時間不能小於當前時間');
            $(`#startTime${id}`).val('');
        } else {
            $(`#startTimeResult${id}`).text('');
            // console.log(this);
            $(`#endTime${id}`).attr('min', $(this).val());
        }

        if ($(`#startTime${id}`).val()) {
            $(`#endTime${id}`).removeAttr('disabled');
        }
    });
    // ============================
    $('#discountForm').on('change', '.col-6:nth-child(5) input', function () {
        // console.log(this.id); // endTime1
        let id = this.id.replace(/[^\d]/g, "");
        // console.log(id);


        let endTime = new Date($(`#${this.id}`).val());
        let startTime = new Date($(`#startTime${id}`).val());
        if (endTime <= startTime) {
            $(`#endTimeResult${id}`).text('結束時間不能小於開始時間');
            $(`#endTime${id}`).val('');
        } else {
            $(`#endTimeResult${id}`).text('');
        }
    })


    // 新增表單
    $('#addDiscount').on('click', function () {
        index++;
        getClass(index)
        // console.log(index);
        let discountForm = `
        <div class="optionContainer mt-20" id="add${index}">
            <div class="newDiscountBtn">
                <h5><b>${index}</b></h5>
                <p><i onclick="removeCon('#add${index}')" class="fa-solid fa-trash-can"></i></p>
            </div>
            <div class="menuContainer row">
                <div class="col-4">
                    <h5>餐點分類 : </h5>
                    <select id="className${index}" name="menuList${index}">
                        <option value="" disabled selected>請選擇...</option>
                        <option value="signature">招牌餐點</option>
                    <option value="individual">個人即享餐</option>
                </select>
                </div>
                <div class="col-4">
                <h5>餐點名稱 : </h5>
                <select id="mealName${index}" name="menuName${index}">
                    <option value="" disabled selected>請選擇...</option>
                    <option value="signature">招牌餐點</option>
                    <option value="individual">個人即享餐</option>
                </select>
                </div>
                <div class="col-4">
                    <h5>價格 : </h5>
                    <input id="menuPrice${index}" type="number" name="menuPrice${index}">
                    <p>原始價格為 : <span id="originalPrice${index}"></span></p>
                </div>
                <div class="col-6">
                    <h5>開始時間 : </h5>
                    <input type="datetime-local" id="startTime${index}" name="startTime${index}"         >
                    <p id="startTimeResult${index}"></p>
                </div>
                <div class="col-6">
                    <h5>結束時間 : </h5>
                    <input type="datetime-local" id="endTime${index}" name="endTime${index}" disabled>
                    <p id="endTimeResult${index}"></p>
                </div>
            </div>
        </div>`;
        if (index <= 5) {
            $('#addList').append(discountForm);
            // console.log(index);
        } else {
            $('#addDiscount').addClass('disable');
        }
    })



    // 傳送表單
    $('#discountBtn').on('click', async event => {
        event.preventDefault();

        let formData = new FormData(discountForm)
        console.log(formData);

        // ==========
        let discounts = [];

        formData.forEach((value, key) => {
            // console.log('value: ', value);
            // console.log('key: ', key);
            let match = key.match(/(\D+)(\d)$/);
            // console.log('match: ', match);
            if (match) {
                let field = match[1];
                let suffix = match[2];
                // console.log('field: ', field);
                // console.log('suffix: ', suffix);
                let discount = discounts.find(d => d.suffix === suffix);
                // console.log('discount: ', discount);
                if (!discount) {
                    discount = { suffix: suffix };
                    // console.log('discount: ', discount);

                    discounts.push(discount);
                    // console.log('discounts: ', discount);

                }

                discount[field] = value;
                // console.log('discount: ', discount);
            }
        })
        discounts = discounts.map(({ suffix, ...rest }) => {
            // console.log('suffix: ', suffix);
            // console.log('rest: ', rest);
            return rest
        })

        console.log('discounts: ', discounts);

        let body = JSON.stringify({ discounts });


        // ==========


        // body = new URLSearchParams(body).toString()
        // let body = JSON.stringify(Object.fromEntries(formData))
        console.log('body', body);

        const headers = {
            'content-type': 'application/json'
        }
        mySmallLoading.classList.remove('d-none');
        let response = await fetch('http://localhost/MySwallab/public/api/discount/insert', {
            method: 'POST',
            headers,  // headers: headers
            body  // body: body
        })
        let result = await response.json()
        mySmallLoading.classList.add('d-none');
        // let result = await response.text()
        console.log(result);
        let { status } = result;
        console.log(status);

        if (status == 'ok') {
            discountForm.reset()
            $('#submitResult').text('儲存成功')
            await sleep(3000);
            $('#submitResult').text('')

        } else if (status == "fail") {
            let { message } = result;
            console.log(message);

            if (message == 'Invalid input data') {
                $('#submitResult').text('儲存失敗')
            } else {
                $('#submitResult').text('表格尚未填寫完成')
            }
        }
    })



})

// 移除


function removeCon(Con) {
    // console.log(Con);
    $(Con).fadeOut(500, function () {
        $(this).remove();
    })
}
