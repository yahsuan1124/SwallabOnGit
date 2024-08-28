import { user_id } from "./backstage.js"

// let getUser = async () => {
//     const url = 'http://localhost/MySwallab/public/user_id'
//     let response = await fetch(url);
//     let data = await response.json();
//     // console.log(data);
//     return data
// }

// let info = await getUser();
// console.log(info.role);

const headers = {
    'content-type': 'application/json',
    'X-User-Id': user_id
}
// console.log(headers);


// 訂單狀況總和
let getSumOfOrders = status => {
    const url = `http://localhost/MySwallab/public/api/sumoforders/${status}`;
    return fetch(url, {
        headers
    })
        .then(response => response.json());
}

// 顯示訂單
let showOrders = status => {
    const url = `http://localhost/MySwallab/public/api/order/${status}`;
    return fetch(url, {
        headers
    })
        .then(response => response.json());
}

// status = 1
let status1 = async () => {
    let data = await getSumOfOrders(1);
    // console.log(data);
    const { count } = data;
    count ? count : 0
    document.getElementById('status1').innerText = count
}
// status = 2
let status2 = async () => {
    let data = await getSumOfOrders(2);
    // console.log(data);
    const { count } = data;
    count ? count : 0
    document.getElementById('status2').innerText = count
}
status1()
status2()

// 顯示status1的訂單
let showOrders1 = async () => {
    let data = await showOrders(1);
    // console.log(data);

    $('#myOrders1').empty();
    let html = '';
    // data.forEach(({ id, booking_date, booking_time, created_at, details, members: { users: { name, phone } } }) => {
    //     if (members && members.users) {
    //         let { users: { name, phone } } = members;
    //         console.log(name, phone);
    //     } else {
    //         console.log("members 或 users 不存在");
    //     }
    // });
    data.forEach(({ id, booking_date, booking_time, created_at, details, members: { users: { name, phone } } }) => {
        // console.log(details);
        
        try {
            booking_time = JSON.parse(booking_time);
        } catch (e) {
            return;
        }

        let [h, m] = booking_time;
        let myDate = new Date(created_at)
        // console.log(myDate);
        let month = String(myDate.getMonth() + 1).padStart(2, '0');
        let day = String(myDate.getDate()).padStart(2, '0');
        let hours = String(myDate.getHours()).padStart(2, '0');
        let minutes = String(myDate.getMinutes()).padStart(2, '0');
        myDate = `${month}/${day} ${hours}:${minutes}`

        booking_date = new Date(booking_date)
        // console.log(booking_date);
        let bMonth = String(booking_date.getMonth() + 1).padStart(2, '0');
        let bDay = String(booking_date.getDate()).padStart(2, '0');
        booking_date = `${bMonth}/${bDay}`


        html += `<div class="optionContainer">
                    <div class="item d-flex justify-content-between">
                        <h4>${name}</h4>
                        <p>電話 : ${phone}</p>
                        <p>下單時間 : ${myDate}</p>
                        <h4>取餐時間 : ${booking_date} ${h}:${m}</h4>
                    </div>
                    <div class="itemContainer row">
                        <div class="col-9 row">
                            <div class="col-6">品項</div>
                            <div class="col-6">數量</div>`
        // console.log(details);
        details.forEach(({ item_name, item_qty }) => {
            html += `
                    <div class="col-6">${item_name}</div>
                    <div class="col-6">${item_qty}</div>
                    `
        });
        html += `</div>
                        <div class="col">
                            <div class="myButton">
                                <p class="check-btn" data-orderId="${id}">接受訂單</p>
                                <p class="cancel-btn">取消訂單</p>
                            </div>

                        </div>
                    </div>
                </div>`

        // console.log('html : ' , html);
        // console.log('-----------------------------------');
    });
    html == '' ? html = '<div style="text-align: center">目前沒有訂單</div>' : html
    $('#myOrders1').append(html)
}
showOrders1()
// 顯示status2的訂單
let showOrders2 = async () => {
    let data = await showOrders(2);
    // console.log(data); // []


    $('#myOrders2').empty();
    let html = '';
    data.forEach(({ id, booking_date, booking_time, created_at, details, members: { users: { name, phone } } }) => {

        booking_time = JSON.parse(booking_time);
        booking_time = Array.from(new Set(booking_time));
        let [h, m] = booking_time;

        let myDate = new Date(created_at)
        // console.log(myDate);
        let month = String(myDate.getMonth() + 1).padStart(2, '0');
        let day = String(myDate.getDate()).padStart(2, '0');
        let hours = String(myDate.getHours()).padStart(2, '0');
        let minutes = String(myDate.getMinutes()).padStart(2, '0');
        myDate = `${month}/${day} ${hours}:${minutes}`

        booking_date = new Date(booking_date)
        // console.log(booking_date);
        let bMonth = String(booking_date.getMonth() + 1).padStart(2, '0');
        let bDay = String(booking_date.getDate()).padStart(2, '0');
        booking_date = `${bMonth}/${bDay}`


        html += `<div class="optionContainer">
                    <div class="item d-flex justify-content-between">
                        <h4>${name}</h4>
                        <p>電話 : ${phone}</p>
                        <p>下單時間 : ${myDate}</p>
                        <h4>取餐時間 : ${booking_date} ${h}:${m}</h4>
                    </div>
                    <div class="itemContainer row">
                        <div class="col-9 row">
                            <div class="col-6">品項</div>
                            <div class="col-6">數量</div>`
        console.log(details);
        details.forEach(({ item_name, item_qty }) => {
            html += `
                    <div class="col-6">${item_name}</div>
                    <div class="col-6">${item_qty}</div>
                    `
        });
        html += `</div>
                        <div class="col">
                            <div class="myButton">
                                <p class="done-btn" data-orderId="${id}">備餐完成</p>
                            </div>

                        </div>
                    </div>
                </div>`

        // console.log('html : ' , html);
        // console.log('-----------------------------------');
    });
    html == '' ? html = '<div style="text-align: center">目前沒有訂單</div>' : html
    $('#myOrders2').append(html)
}
showOrders2()

// 按下接受訂單按鈕
$('#myOrders1').on('click', '.check-btn', async function () {
    console.log(this);
    let orderId = this.dataset.orderid;
    console.log(orderId);

    // let body = new URLSearchParams({ orderId }).toString();
    const url = `http://localhost/MySwallab/public/api/order/update/${orderId}/2`;
    let response = await fetch(url);
    let result = await response.json();
    // let result = await response.text();
    console.log(result);
    const { status } = result;
    console.log(status);

    if (status == 'ok') {
        showOrders1();
        status1()
        status2()
    }
})

// 按下背餐完成按鈕
$('#myOrders2').on('click', '.done-btn', async function () {
    console.log(this);
    let orderId = this.dataset.orderid;
    console.log(orderId);

    // let body = new URLSearchParams({ orderId }).toString();
    const url = `http://localhost/MySwallab/public/api/order/update/${orderId}/3`;
    let response = await fetch(url);
    let result = await response.json();
    // let result = await response.text();
    console.log(result);
    const { status } = result;
    console.log(status);

    if (status == 'ok') {
        showOrders2();
        status1()
        status2()
    }
})

// 取得接單狀況
let orderStatus = async () => {
    let data = await showOrders('status');
    // console.log(data);
    let { status } = data;
    status = status == 0 ? '恢復接單' : '暫停接單';
    // console.log(status);
    
    $('#orderStatus').text('')
    $('#orderStatus').text(status)
}
orderStatus();

// 接單狀況
$('#orderStatus').on('click', async () => {
    await showOrders('changestatus');
    orderStatus()
})
// document.addEventListener("DOMContentLoaded", function () {
//     const stopOrderBtn = document.getElementById("stopOrder");
//     const recoverOrderBtn = document.getElementById("recoverOrder");

//     // 檢查 localStorage 中的按鈕狀態
//     const orderStatus = localStorage.getItem("orderStatus");

//     if (orderStatus === "stopped") {
//         stopOrderBtn.classList.add("d-none");
//         recoverOrderBtn.classList.remove("d-none");
//     } else {
//         stopOrderBtn.classList.remove("d-none");
//         recoverOrderBtn.classList.add("d-none");
//     }

//     stopOrderBtn.addEventListener("click", function () {
//         stopOrderBtn.classList.add("d-none");
//         recoverOrderBtn.classList.remove("d-none");
//         localStorage.setItem("orderStatus", "stopped");
//     });

//     recoverOrderBtn.addEventListener("click", function () {
//         recoverOrderBtn.classList.add("d-none");
//         stopOrderBtn.classList.remove("d-none");
//         localStorage.setItem("orderStatus", "running");
//     });
// });
// ================================