
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

// 自己的
// const user = localStorage.getItem('user');
// const role = localStorage.getItem('role');
// =========================
const user = info.r_id;
const role = info.role;
const name = info.name;
localStorage.setItem('user_id', user);
localStorage.setItem('role', user);
$('#userName').text(name);
console.log(name);

if (!user || role != 'admin') {
    // window.location.href = 'http://localhost/swallab/Swallab/login/login.html';
    window.location.href = 'http://localhost/MySwallab/public/login';
};

export const user_id = localStorage.getItem('user_id');
console.log('user_id : ', user_id);

// 登出
$('#logout').on('click', async () => {
    localStorage.clear();
    // window.location.href = 'http://localhost/swallab/Swallab/login/login.html';
    window.location.href = 'http://localhost/MySwallab/public/login';
})

// 間隔時間控制
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}