import { user_id, sleep } from "./backstage.js"
// 營業時間
let selectedWeekdays = [];
let selectedHolidays = [];

// 平日
function toggleSelection(day) {
    const index = selectedWeekdays.indexOf(day);
    const element = document.getElementById(day);

    if (index === -1) {
        selectedWeekdays.push(day);
        element.classList.add('selected');
    } else {
        selectedWeekdays.splice(index, 1);
        element.classList.remove('selected');
    }

    const hiddenInput = document.querySelector(`input[name="Weekdays[]"][value="${day}"]`);
    hiddenInput.disabled = index !== -1;
}

// 假日
function toggleHolidaySelection(day) {
    const index = selectedHolidays.indexOf(day);
    const element = document.getElementById(day);

    if (index === -1) {
        // console.log(123);
        selectedHolidays.push(day);
        element.classList.add('selected');
    } else {
        selectedHolidays.splice(index, 1);
        element.classList.remove('selected');
    }

    const hiddenInput = document.querySelector(`input[name="Holidays[]"][value="${day}"]`);
    hiddenInput.disabled = index !== -1;
}

window.toggleSelection = toggleSelection;
window.toggleHolidaySelection = toggleHolidaySelection;

// 平日
for (var i = 0; i <= 24; i++) {
    $('#openTime').append('<option value="' + i + '">' + i + '</option>');
}

// 取得營業時間後更改啟動時間
$('#openTime').change(function () {
    let openTime = $(this).val();
    // console.log(openTime);

    // 若重新選擇，要清除舊資料
    let closeTime = $('#closeTime');
    closeTime.empty();
    closeTime.append('<option disabled selected>小時</option>');

    for (var i = 0; i <= 24; i++) {
        $('#closeTime').append('<option value="' + i + '">' + i + '</option>');
    }

    // 取得打烊時間
    $('#closeTime').change(function () {
        let closeTime = $(this).val();
        // console.log(closeTime);
    })
})

// 假日
for (var i = 0; i <= 24; i++) {
    $('#holidayOpenTime').append('<option value="' + i + '">' + i + '</option>');
}

// 假日打烊時間
$('#holidayOpenTime').change(function () {
    let holidayOpenTime = $(this).val();
    // console.log(holidayOpenTime);

    // 若重新選擇，要清除舊資料
    let holidayCloseTime = $('#holidayCloseTime');
    holidayCloseTime.empty();
    holidayCloseTime.append('<option disabled selected>小時</option>');

    for (var i = 0; i <= 24; i++) {
        $('#holidayCloseTime').append('<option value="' + i + '">' + i + '</option>');
    }

    // 取得打烊時間
    $('#holidayCloseTime').change(function () {
        let holidayCloseTime = $(this).val();
        // console.log(holidayCloseTime);
    })
})
// 新增平日休息時間
$('#addBreakTime').click(function () {
    let breakIndex = $('#myAdd .col-6').length + 1;
    let breakTimeHtml = `
                <div class="col-6 p-20" id="breakTime${breakIndex}">
                    <h5>休息時間 ${breakIndex}</h5>
                    <select name="breakStartTimeHour${breakIndex}" class="breakStartTimeHour">
                        <option disabled selected>小時</option>
                    </select>
                    <span> : </span>
                    <select name="breakStartTimeMin${breakIndex}" class="Min">
                        <option disabled selected>分鐘</option>
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select>
                    <span>-</span>
                    <select name="breakEndTimeHour${breakIndex}" class="breakEndTimeHour">
                        <option disabled selected>小時</option>
                    </select>
                    <span> : </span>
                    <select name="breakEndTimeMin${breakIndex}" class="Min">
                        <option disabled selected>分鐘</option>
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select>
                </div>`;
    $('#myAdd').append(breakTimeHtml);
    // 取得開店時間
    let openTime = $('#openTime').val();
    // 取得打烊時間
    let closeTime = $('#closeTime').val();

    console.log(breakIndex);
    for (var i = parseInt(openTime); i <= parseInt(closeTime); i++) {

        $(`#breakTime${breakIndex} .breakStartTimeHour`).append('<option value="' + i + '">' + i + '</option>');
        $(`#breakTime${breakIndex} .breakEndTimeHour`).append('<option value="' + i + '">' + i + '</option>');
    }
    if (breakIndex == 2) {
        console.log('測試');
        $('#addBreakTime').addClass('disable');

    }
})
// 新增假日休息時間
$('#addHolidayBreakTime').click(function () {
    let breakIndex = $('#myHolidayAdd .col-6').length + 1;
    let breakTimeHtml = `
                <div class="col-6 p-20" id="holidayBreakTime${breakIndex}">
                    <h5>休息時間 ${breakIndex}</h5>
                    <select name="holidayBreakStartTimeHour${breakIndex}" class="holidayBreakStartTimeHour">
                        <option disabled selected>小時</option>
                    </select>
                    <span> : </span>
                    <select name="holidayBreakStartTimeMin${breakIndex}" class="Min">
                        <option disabled selected>分鐘</option>
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select>
                    <span>-</span>
                    <select name="holidayBreakEndTimeHour${breakIndex}" class="holidayBreakEndTimeHour">
                        <option disabled selected>小時</option>
                    </select>
                    <span> : </span>
                    <select name="holidayBreakEndTimeMin${breakIndex}" class="Min">
                        <option disabled selected>分鐘</option>
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select>
                </div>`;
    $('#myHolidayAdd').append(breakTimeHtml);
    // 取得開店時間
    let openTime = $('#holidayOpenTime').val();
    // 取得打烊時間
    let closeTime = $('#holidayCloseTime').val();

    for (var i = parseInt(openTime); i <= parseInt(closeTime); i++) {

        $(`#holidayBreakTime${breakIndex} .holidayBreakStartTimeHour`).append('<option value="' + i + '">' + i + '</option>');
        $(`#holidayBreakTime${breakIndex} .holidayBreakEndTimeHour`).append('<option value="' + i + '">' + i + '</option>');
    }
    if (breakIndex == 2) {
        $('#addHolidayBreakTime').addClass('disable');

    }
})

// 顯示抓到的時間
// $('#result').on('click', function () {
//     // 取得開店時間
//     let openTime = $('#openTime').val();
//     console.log('開店時間' + openTime);
//     // 取得打烊時間
//     let closeTime = $('#closeTime').val();
//     console.log('打烊時間' + closeTime);
//     // 第一個休息時間
//     if (`#breakTime1 .breakStartTimeHour`) {
//         let breakTime1 = $(`#breakTime1 .breakStartTimeHour`).val();
//         console.log('開始休息時間' + breakTime1);
//     }
//     // 第二個休息時間
//     if (`#breakTime2 .breakStartTimeHour`) {
//         let breakTime2 = $(`#breakTime2 .breakStartTimeHour`).val();
//         console.log('開始休息時間' + breakTime2);
//     }
// })



document.getElementById('businessHoursForm').addEventListener('submit', async event => {
    event.preventDefault();
    const headers = {
        'content-type': 'application/json'
    }
    const formData = new FormData(event.target);
    // 抓日期
    const weekdays = formData.getAll('Weekdays[]');
    const holiday = formData.getAll('Holidays[]');

    // 抓營業時間
    const wOpenTimeH = formData.get('weekdayStartTimeHour');
    const wOpenTimeM = formData.get('weekdayStartTimeMin');
    const wCloseTimeH = formData.get('weekdayEndTimeHour');
    const wCloseTimeM = formData.get('weekdayEndTimeMin');
    const hOpenTimeH = formData.get('holidayStartTimeHour');
    const hOpenTimeM = formData.get('holidayStartTimeMin');
    const hCloseTimeH = formData.get('holidayEndTimeHour');
    const hCloseTimeM = formData.get('holidayEndTimeMin');

    const wSBreakTimeH1 = formData.get('breakStartTimeHour1');
    const wSBreakTimeM1 = formData.get('breakStartTimeMin1');
    const wEBreakTimeH1 = formData.get('breakEndTimeHour1');
    const wEBreakTimeM1 = formData.get('breakEndTimeMin1');

    const wBreakTimeH2 = formData.get('breakStartTimeHour2');
    const wBreakTimeM2 = formData.get('breakStartTimeMin2');
    const wEBreakTimeH2 = formData.get('breakEndTimeHour2');
    const wEBreakTimeM2 = formData.get('breakEndTimeMin2');

    const hSBreakTimeH1 = formData.get('holidayBreakStartTimeHour1');
    const hSBreakTimeM1 = formData.get('holidayBreakStartTimeMin1');
    const hEBreakTimeH1 = formData.get('holidayBreakEndTimeHour1');
    const hEBreakTimeM1 = formData.get('holidayBreakEndTimeMin1');

    const hSBreakTimeH2 = formData.get('holidayBreakStartTimeHour2');
    const hSBreakTimeM2 = formData.get('holidayBreakStartTimeMin2');
    const hEBreakTimeH2 = formData.get('holidayBreakEndTimeHour2');
    const hEBreakTimeM2 = formData.get('holidayBreakEndTimeMin2');
    // console.log(weekdays);
    // console.log(holiday);
    // console.log(wOpenTimeH + wOpenTimeM);
    // console.log(wCloseTimeH + wCloseTimeM);


    // const body = JSON.stringify(Object.fromEntries(formData));
    let result = '';
    if (wOpenTimeH && wOpenTimeM && wCloseTimeH && wCloseTimeM && hOpenTimeH && hOpenTimeM && hCloseTimeH && hCloseTimeM) {
        const body = JSON.stringify({
            weekdays,
            holiday,
            wOpeningHours: [wOpenTimeH, wOpenTimeM, wCloseTimeH, wCloseTimeM],
            hOpeningHours: [hOpenTimeH, hOpenTimeM, hCloseTimeH, hCloseTimeM],
            wBreakTime1: [wSBreakTimeH1, wSBreakTimeM1, wEBreakTimeH1, wEBreakTimeM1],
            wBreakTime2: [wBreakTimeH2, wBreakTimeM2, wEBreakTimeH2, wEBreakTimeM2],
            hBreakTime1: [hSBreakTimeH1, hSBreakTimeM1, hEBreakTimeH1, hEBreakTimeM1],
            hBreakTime2: [hSBreakTimeH2, hSBreakTimeM2, hEBreakTimeH2, hEBreakTimeM2],
        })

        console.log(body);
        

        const url = 'http://localhost/MySwallab/public/api/worktime';
        let response = await fetch(url, {
            method: 'POST',
            headers,
            body
        });
        let data = await response.json();
        console.log(data);
        if (data.status == 'ok') {
            result = '存檔成功';
        } else {
            result = '存檔失敗';
        }
    } else {
        result = '表單未填寫完成';
    }

    $('#submitResult').text(result);
    await sleep(3000);
    $('#submitResult').text('');
})
// ===========================
