// 取得文章內文
let getContent = async id => {
    const url = `http://localhost/MySwallab/public/api/getnote/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    return data;
}

let myDate = mydate => {
    let myDate = new Date(mydate);
    let years = myDate.getFullYear();
    let month = String(myDate.getMonth() + 1).padStart(2, '0');
    let date = String(myDate.getDate()).padStart(2, '0');
    let hour = String(myDate.getHours()).padStart(2, '0')
    let minutes = String(myDate.getMinutes()).padStart(2, '0')
    return `${years}-${month}-${date} ${hour} : ${minutes}`;
}


let showBlog = async blogId => {
    let data = await getContent(blogId);
    let { content, created_at, per_cost, visited_date, title,
        members: { users: { id, name: memberName, avatar } },
        rest_infos: { address, weekday, weekend, wd_operating, we_operating,
            users: { phone, name: restName } }
    } = data;
    // console.log(weekday);
    wd_operating = JSON.parse(wd_operating);
    // console.log(wd_operating[0]);
    wd_operating = `${wd_operating[0]} : ${wd_operating[1]} ~ ${wd_operating[2]} : ${wd_operating[3]}`
    we_operating = JSON.parse(we_operating);
    we_operating = `${we_operating[0]} : ${we_operating[1]} ~ ${we_operating[2]} : ${we_operating[3]}`

    visited_date = myDate(visited_date)
    // console.log(visited_date);

    created_at = myDate(created_at)
    // console.log(created_at);

    const englishToChinese = {
        "monday": "一",
        "tuesday": "二",
        "wednesday": "三",
        "thursday": "四",
        "friday": "五",
        "saturday": "六",
        "sunday": "日"
    };
    let convert = arrDay => {
        const chineseDays = arrDay.map(day => englishToChinese[day]);

        return `${chineseDays.join('、')}`;
    }
    weekday = JSON.parse(weekday)
    weekday = convert(weekday)

    weekend = JSON.parse(weekend)
    weekend = convert(weekend)

    $("#title").text(title);
    $('#createdTime').text(created_at);
    $('#visitedTime').text(visited_date);

    $('#memberName').text(memberName);
    $('#memberPhoto').attr('src', avatar);
    $('.card.author').attr('data-id', id);

    $('#content').html(content)

    $('#restName').text(restName);
    $('#per_cost').text(per_cost);
    $('#phone').text(phone);
    $('#address').text(address);
    $('#wd_operating').text('週 ' + weekday + ' ' + wd_operating)
    $('#we_operating').text('週 ' + weekend + ' ' + we_operating)

}

// 取得id
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

showBlog(id)