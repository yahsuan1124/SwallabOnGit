import { user_id } from "./backstage.js"
// 訂單狀況總和
let getSumOfOrders = status => {
    const url = `http://localhost/MySwallab/public/api/sumoforders/${status}`;
    return fetch(url)
        .then(response => response.json());
}

// 顯示訂單
let showOrders = status => {
    const url = `http://localhost/MySwallab/public/api/order/${status}`;
    return fetch(url)
        .then(response => response.json());
}

// status = 1
let status1 = (async () => {
    let data = await getSumOfOrders(1);
    // console.log(data);
    const { count } = data;
    count ? count : 0
    document.getElementById('status1').innerText = count
})()
// status = 2
let status2 = (async () => {
    let data = await getSumOfOrders(2);
    // console.log(data);
    const { count } = data;
    count ? count : 0
    document.getElementById('status2').innerText = count
})()
