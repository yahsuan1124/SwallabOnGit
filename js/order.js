window.onload = function(){
    pickupTime();
}
        function removeProduct(rowId) {
            const productRow = document.getElementById(rowId);
            if (productRow) {
                productRow.remove();
                updateSubtotal();
                
            }
        }
        //更新總計
        function updateSubtotal() {
            //抓所有要計算的Html元素陣列
            var allTotalPrice = document.querySelectorAll('.total-price-forUpdateSubtotal');
            // [
            //     <span>20</span>
            //     <span>310</span>
            //     <span>0</span>
            // ]
            var subtotal = 0;
            //迭代這個陣列去處理每個元素
            //這邊的Element就是一個一個的網頁元素（名字隨便你取）
            allTotalPrice.forEach(Element=>{
                //取值轉換完加總
                subtotal += parseInt(Element.innerHTML.replace('$', ''));
            })

            document.getElementById('subtotal').textContent = `總計: $${subtotal}`;
        }
        function increment(numberSpanId, priceId, totalPriceId) {
            // 獲取數量的 span 元素
            var numberSpan = document.getElementById(numberSpanId);
            // 獲取當前數量並轉換為數字
            var currentNumber = parseInt(numberSpan.innerText);
            // 增加數量
            currentNumber++;
            // 更新數量的 span 元素的文本
            numberSpan.innerText = currentNumber;
            // 在控制台輸出 2
            // console.log(2);
            // 更新總價（這部分取決於你的邏輯，可以省略）
            updateTotalPrice(numberSpanId, priceId, totalPriceId);
        }

        function decrement(numberSpanId, priceId, totalPriceId) {
            // 獲取數量的 span 元素
            var numberSpan = document.getElementById(numberSpanId);
            // 獲取當前數量並轉換為數字
            var currentNumber = parseInt(numberSpan.innerText);
            // 檢查當前數量是否大於 0，以防止數量變為負數
            if (currentNumber > 0) {
                // 減少數量
                currentNumber--;
                // 更新數量的 span 元素的文本
                numberSpan.innerText = currentNumber;
                // 在控制台輸出當前數量
                console.log(currentNumber);
                // 更新總價（這部分取決於你的邏輯，可以省略）
                updateTotalPrice(numberSpanId, priceId, totalPriceId);
            }
        }
        // 更新小計
        function updateTotalPrice(numberSpanId, priceId, totalPriceId) {
            
            // 獲取數量的 span 元素
            var numberSpan = document.getElementById(numberSpanId);
            // 獲取價格元素
            var priceElement = document.getElementById(priceId);
            // 獲取總價的元素
            var totalPriceElement = document.getElementById(totalPriceId);
            // 獲取當前數量和單價
            var currentNumber = parseInt(numberSpan.innerText);
            var price = parseInt(priceElement.innerText);
            // 計算總價
            var totalPrice = currentNumber * price;
            // 更新總價的元素的文本
            totalPriceElement.innerText = `$${totalPrice}`;
            
            //console.log(totalprices);
            updateSubtotal();
        }
        //日期選單
        
        document.addEventListener('DOMContentLoaded', function() {
            let today = new Date();
            
            let dateOptions = [
                today.toLocaleDateString(),
                new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
                new Date(today.setDate(today.getDate() + 1)).toLocaleDateString()
            ];
        
            let dateSelect = document.getElementById('dateSelect');
            let options = dateSelect.getElementsByTagName('option');
        
            for (let i = 0; i < options.length; i++) {
                options[i].textContent = dateOptions[i];
                options[i].value = dateOptions[i];
            }
        
            
            dateSelect.selectedIndex = 0;
        })
//時間選單
function pickupTime() {
    let x = new Date();
    var form = new FormData();
    form.append("service", "pickupTime");
    form.append("current_time", x);  

    $.ajax({
        url: "http://localhost/Swallab/swallab/php/order.php",
        method: "POST",
        data: form,
        processData: false,  
        contentType: false,  
        dataType: "json",
        success: function(response) {
            console.log(response);
            $('#hourSelect').empty();
            // $('#minuteSelect').empty();
            // response.hour
            console.log(response.hour);
            let startHour = response.hour+1;
            let endHour = 24;
            
            for(let i = startHour; i < endHour; i++)
                $('#hourSelect').append($('<option>', {
                    value: i,
                    text: i
                }));
                // console.log(text);
            

                // $('#minuteSelect').append($('<option>', {
                //     value: response.minute,
                //     text: response.minute
                // }));
                
                
                $('#hourSelect').on('change', function() {
                    let selectedHour = parseInt($(this).val());
                    let $minuteSelect = $('#minuteSelect');
                    
                    if (selectedHour === 11) {
                        // 如果选择11时，只允许选择30分，禁用00分
                        $minuteSelect.find('option[value="00"]').prop('disabled', true);
                        $minuteSelect.find('option[value="30"]').prop('disabled', false);
                        $minuteSelect.val('30'); // 自动选择30分
                    } else {
                        // 其他时间允许选择所有分钟选项
                        $minuteSelect.find('option').prop('disabled', false);
                        $minuteSelect.val('00'); // 自动选择00分
                    }
                });
                
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Request failed: " + textStatus + ", " + errorThrown);
        }
    });
}





  
    

        