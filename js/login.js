// 判斷是否登入
let getUser = async () => {
    const url = 'http://localhost/MySwallab/public/user_id'
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    return data
}

let info = await getUser();
console.log(info);

const user = info.r_id;
console.log(user);
// 判斷是否登日後，顯示哪個按鈕
if (user) {
    $('#login').addClass('d-none');
    $('#logout').removeClass('d-none');
} else {
    $('#login').removeClass('d-none');
    $('#logout').addClass('d-none');
}
const role = info.role;
const name = info.name;
localStorage.setItem('user_id', user);
localStorage.setItem('role', user);
$('#userName').text(name);
console.log(name);

// 登入
$('#login').on('click', () => {
    const redirectUrl = window.location.href;
    console.log(redirectUrl);
    
    window.location.href = `http://localhost/MySwallab/public/login?redirectUrl=${encodeURIComponent(redirectUrl)}`;
})
// 登出
$('#logout').on('click' , () => {
    localStorage.clear();
})