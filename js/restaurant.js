//畫面onload時call兩隻api

window.onload = function (){
    restaurantInfo('最高評分');
    sale('最高評分');
}
 // top
document.getElementById("top").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
    });
  });



//抓餐廳資訊
function restaurantInfo(b) {
    
    var parameters = {
        service: 'getRestaurantInfo',
        categoryName: b
    };

    $.ajax({
        url: 'http://localhost/Swallab/swallab/php/restaurant.php',
        method: 'POST',
        data: parameters,
        dataType: 'json'
    }).done(function(responseData) {
        var container = $('#restaurant-cards-container');
        container.empty(); // 清空現有的卡片

        // 限制最多顯示 12 個卡片
        var maxItems = 12;
        var itemsToShow = responseData.slice(0, maxItems);

        //顯示餐廳資訊
        var restaurantDetail = responseData;

        itemsToShow.forEach(function(item) {
            // 創建卡片元素
            var cardHtml = `
                <div class="col-4 mb-4">
                    <div class="card overflow-hidden">
                        <a href="./detail.html">
                            <div class="card-body">
                                <img src="${item.avatar}" alt="" class="img-fluid">
                            </div>
                        </a>
                        <div class="card-footer">
                            <div>
                                <p>${item.name}</p>
                                <i class="fa-solid fa-star"></i>
                                <span>${item.score}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // 將卡片插入容器
            container.append(cardHtml);
        });
        restaurantDetail.forEach(function(item){
            var detail = `

            `
        })
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('AJAX 請求失敗:', textStatus, errorThrown);
    });
}

//抓限時優惠的餐廳資訊
function sale (a){
    
    var parameters = {
        service: 'getSaleInfo',
        categoryName: a
    };

    $.ajax({
        url: 'http://localhost/Swallab/swallab/php/restaurant.php',
        method: 'POST',
        data: parameters,
        dataType: 'json'
    }).done(function(responseData) {
        var container = $('#sale-container');
        container.empty(); // 清空現有的卡片

        // 限制最多顯示 5 個卡片
        var maxItems = 5;
        var itemsToShow = responseData.slice(0, maxItems);

        itemsToShow.forEach(function(item) {
            console.log("1",item);
            var saleEndTime = new Date(item.end_time);
            // 創建卡片元素
            var salecardHtml = `
            <div class="card position-relative">
                <div class="card-body">
                <img src="http://localhost/MySwallab/public/${item.item_photo}" class="img-fluid">
                </div>
                <span class="countDown">倒數<span class="countDownTime me-1" data-end-time="${saleEndTime.toISOString()}"></span>
                    小時<span>!!</span>
                </span>
                <div class="mt-3" style="text-align: center;">
                    ${item.name}
                    <div class="name mt-2">${item.item_name}</div>
                    <div class="d-flex mt-2" style="justify-content: center;">
                        <div class="fs-20 ">$</div>
                        <div class="price me-2" id="price-1" style="text-decoration: line-through;">${item.item_price}</div>
                        <b><i><div class="fs-20 ml-5" style="color: red;font-size: 20px;">$</div></i></b>
                        <b><i><div class="price pb-3" id="price-1" style="color: red;font-size: 20px;">${item.discount_price}</div></i></b>
                        
                    </div>
                </div>
                
            </div>
            `;

            // 將卡片插入容器
            container.append(salecardHtml);
        });
        updateCountdown();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('AJAX 請求失敗:', textStatus, errorThrown);
    });
    
}
//限時優惠的倒數
function updateCountdown() {
    document.querySelectorAll('.countDownTime').forEach(function(element) {
        var endTime = new Date(element.getAttribute('data-end-time'));
        var now = new Date();
        var timeDiff = endTime - now;

        if (timeDiff > 0) {
            var hours = Math.floor(timeDiff / (1000 * 60 * 60));
            // var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            // var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            element.textContent = `${hours}`;
        } else {
            element.textContent = '已結束';
        }
    });
}    