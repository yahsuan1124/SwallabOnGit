import { user_id, sleep } from "./backstage.js"
$().ready(function () {
    console.log('使用第二個JS中的 user_id:', user_id);


    // 顯示 tags
    let getTags = async selectedTags => {
        const url = 'http://localhost/MySwallab/public/api/showtags';
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data);
        $('.tagsContainer').html('');
        data.forEach(({ id, purpose }) => {
            let checkbox = $('<input>')
                .attr('type', 'checkbox')
                .attr('id', `tag-${id}`)
                .attr('name', 'tags[]')
                .attr('value', id);

            let label = $('<label>')
                .attr('for', `tag-${id}`)
                .text(purpose);

            let container = $('<span>')
                .append(checkbox)
                .append(label);

            $('.tagsContainer').append(container)

            // label.on('click', function() {
            //     // console.log(this);
            //     $(this).toggleClass('tags-select')
            // })

            if (selectedTags.includes(id)) {
                checkbox.prop('checked', true);
                label.addClass('tags-select');
            }

            label.on('click', function () {
                checkbox.prop('checked', !checkbox.prop('checked'));
            });
        });
    }

    $('.tagsContainer').on('click', 'label', function () {
        const checkbox = $(this).prev('input[type=checkbox]');
        checkbox.prop('checked', !checkbox.prop('checked'));
        $(this).toggleClass('tags-select');

        // 調試信息
        console.log('Updated checkbox status:', checkbox.attr('id'), checkbox.is(':checked'));
    });


    // 取得分類
    let getRestClass = async selectedClass => {
        const url = 'http://localhost/MySwallab/public/api/restaurantClass';
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data);
        let myHtml = '<option disabled selected>請選擇...</option>';
        data.forEach(({ id, restclass }) => {
            // console.log(id);
            // console.log(name);
            myHtml += `<option value=${id} ${id == selectedClass ? 'selected' : ''}>${restclass}</option>`
        });
        $('#restaurantClassification').html(myHtml);
    }

    // 顯示已輸入過的資訊
    let getInfo = async () => {
        // 編號一號

        const url = `http://localhost/MySwallab/public/api/restaurantinfo/${user_id}`;
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data);
        let { users, address, avg_price, f_c_id, filt_purposes } = data;
        if ({ users }) {
            // console.log(restaurant_name);
            // console.log(own[0].name);
            $('#restaurantName').attr('value', users.name);
            if (users.phone) {
                $('#restaurantTel').attr('value', users.phone);
                $('#restaurantAddress').attr('value', address);
                $('#restaurantAverage').attr('value', avg_price);
            }

            if (filt_purposes) {
                filt_purposes.forEach(({ id }) => {
                    $(`#tag-${id}`).prop('checked', true);
                    $(`#tag-${id}`).siblings('label').addClass('tags-select')
                })
            }

            // 取得資訊後在執行 getRestClass 和 getTags
            await getRestClass(f_c_id);

            await getTags(filt_purposes.map(tag => tag.id))
        }
    }

    (async () => {
        mySmallLoading.classList.remove('d-none');
        await getInfo();
        mySmallLoading.classList.add('d-none');
    })()

    // 表單更新
    document.getElementById('restaurantInfo').addEventListener('submit', async event => {
        event.preventDefault();
        const headers = {
            // 'content-type': 'application/x-www-form-urlencoded'
            'content-type': 'application/json',
            'X-User-Id': user_id
        }

        console.log(headers);
        
        const url = 'http://localhost/MySwallab/public/api/restaurantinfo/update'
        // const body = new FormData(restaurantInfo);
        const formData = new FormData(event.target);
        // let restaurantName = formData.get('restaurantName');
        // let restaurantTel = formData.get('restaurantTel');
        // let restaurantAddress = formData.get('restaurantAddress');
        // let restaurantAverage = formData.get('restaurantAverage');
        // let restaurantClassification = formData.get('restaurantClassification');

        const data = Object.fromEntries(formData.entries());
        data['tags'] = formData.getAll('tags[]');
        const body = JSON.stringify(data);
        // const body = JSON.stringify(Object.fromEntries(formData));
        console.log(body);

        let result = '';
        if (restaurantName && restaurantTel && restaurantAddress && restaurantAverage && restaurantClassification) {
            mySmallLoading.classList.remove('d-none');
            let response = await fetch(url, {
                method: 'POST',
                headers,
                body
            })
            let data = await response.json();
            // let data = await response.text();
            mySmallLoading.classList.add('d-none');
            console.log(data);
            let { status } = data;
            if (status == 'ok') {
                result = '存檔成功';
            } else {
                result = '存檔失敗';
            }
        } else {
            result = '表格尚未填寫完成';
        }

        $('#submitResult').text(result);
        await sleep(3000);
        $('#submitResult').text('')
    })


})