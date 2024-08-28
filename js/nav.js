        // 頁面互動 Start（nav.js)
        // 當滑鼠經過時，顯示兩個 icon
        document.getElementById('theicon').addEventListener('mouseover', function () {
            console.log(123);
            document.getElementById('popupBR').style.display = 'flex';
            document.getElementById('popupBlog').style.display = 'flex';
            document.getElementById('popupRest').style.display = 'flex';
        });

        // 當滑鼠離開時，只顯示已選擇的 icon
        document.getElementById('theicon').addEventListener('mouseout', function () {
            document.getElementById('popupBlog').style.display = 'none';
            document.getElementById('popupRest').style.display = 'none';
        });

        // 點擊時，更換顯示的 icon

        class Theicon {
            constructor(type, icon) {
                this.type = type;
                this.icon = icon;
            }
            toIcon(type) {
                console.log(1);
                return this.icon;
            }
        }

        let restIcon = new Theicon("rest", "fa-solid fa-utensils")
        let blogIcon = new Theicon("blog", "fa-solid fa-book-open")

        window.onload = function () {
            document.getElementById('showicon').className = restIcon.toIcon();
            document.getElementById('popupBlog').addEventListener('click', function () {
                document.getElementById('showicon').className = blogIcon.toIcon();
            })
            document.getElementById('popupRest').addEventListener('click', function () {
                document.getElementById('showicon').className = restIcon.toIcon();
            })
        }

        // 搜尋框
        // 點擊輸入框，切換下拉選單的顯示和隱藏
        function myFunction() {
            var dropdown = document.getElementById("myDropdown");
            if (dropdown.style.display === "none") {
                dropdown.style.display = "block";
            } else {
                dropdown.style.display = "none";
            }
        }

        function myFunction2() {
            var dropdown = document.getElementById("myDropdown2");
            if (dropdown.style.display === "none" || dropdown.style.display === "") {
                dropdown.style.display = "block";
                populateDropdown();
            } else {
                dropdown.style.display = "none";
            }
        }

        function populateDropdown() {
            var dropdown = document.getElementById("myDropdown2");
            dropdown.innerHTML = '';


            var googleOption = document.createElement('a');
            googleOption.href = "http://www.google.com";
            googleOption.onclick = function (e) {
                // e.preventDefault();
                window.location.href = "http://www.google.com";
                // window.open("https://www.google.com.tw/")
            };
            googleOption.textContent = '離我最近';
            dropdown.appendChild(googleOption);

            var allOption = document.createElement('a');
            allOption.href = "#";
            allOption.onclick = function (e) {
                e.preventDefault();
                fillInput2('全台中市');
            };
            allOption.textContent = '全台中市';
            dropdown.appendChild(allOption);


            // 從資料庫撈
            fetch('http://localhost:8000/api/filtlocations')
                .then(response => response.json())
                .then(data => {

                    console.log(data);
                    data.forEach(location => {
                        var option = document.createElement('a');
                        option.href = "#";
                        option.onclick = function (e) {
                            e.preventDefault();
                            fillInput2(location.location);
                        };
                        option.textContent = location.location;
                        dropdown.appendChild(option);
                        // updateSearchResults(data);

                    });
                })
                .catch(error => console.error('Error fetching locations:', error));
        }


        // 搜尋框顯示
        // FiltClasses
        function fillInput(value) {
            if (value === '所有類型') {
                document.getElementById('myInput').value = '所有類型';
                document.getElementById('myInput').dataset.value = '';
            } else {
                document.getElementById('myInput').value = value;
                document.getElementById('myInput').dataset.value = value;
            }
            document.getElementById('myDropdown').style.display = "none";
            checkAndTriggerSearch();
        }
        // FiltLocations
        function fillInput2(value) {

            if (value === '全台中市') {
                document.getElementById('myInput2').value = '全台中市';
                document.getElementById('myInput2').dataset.value = '';
            } else {
                document.getElementById('myInput2').value = value;
                document.getElementById('myInput2').dataset.value = value;
            }
            document.getElementById('myDropdown2').style.display = "none";
            checkAndTriggerSearch();
        }


        // 點擊其他地方隱藏下拉
        window.onclick = function (event) {
            if (!event.target.matches('#myInput')) {
                var dropdown = document.getElementById("myDropdown");
                if (dropdown.style.display === "block") {
                    dropdown.style.display = "none";
                }
            }

            if (!event.target.matches('#myInput2')) {
                var dropdown = document.getElementById("myDropdown2");
                if (dropdown.style.display === "block") {
                    dropdown.style.display = "none";
                }
            }
        }
        // document.addEventListener('DOMContentLoaded', function () {
        let searchCount;
        if (searchCount != 0) stop()

        const searchForm = document.querySelector('form[name="search"]');
        const searchTypeIcon = document.getElementById('showicon');
        const categoryInput = document.getElementById('myInput');
        const locationInput = document.getElementById('myInput2');
        // const purpose = document.querySelector('button[data-purpose]');
        const searchButton = document.querySelector('button[type="submit"]');
        const resultsContainer = document.getElementById('searchResults');
        const pastParamContainer = document.getElementById('pastParam');
        // const searchParams = new URLSearchParams();
        const MAX_SEARCHES = 999;
        searchCount = 0;
        console.log(`DOM#${searchCount}`);

        function performSearch() {
            console.log(`start performSearch()#${searchCount}`);
            // debugger;
            if (searchCount >= MAX_SEARCHES) {
                console.log(`已達到最大搜索次數限制${searchCount}`);
                alert('已達到最大搜索次數限制。請刷新頁面以重置。');
                return;
            }

            searchCount++;
            console.log(`執行搜索 #${searchCount}`);

            const searchType = getSearchType();
            const category = document.getElementById('myInput').dataset.value;
            const location = document.getElementById('myInput2').dataset.value;
            let purpose;



            const searchParams = new URLSearchParams();
            searchParams.append('search_type', searchType);
            if (category) searchParams.append('category', category);
            if (location) searchParams.append('location', location);
            // if (purpose) searchParams.append('purpose', purpose);
            if (selectedPurpose) searchParams.append('purpose', selectedPurpose);
            console.log('purpose:', selectedPurpose);

            console.log(`b4 show URL#${searchCount}`);
            searchCount++;

            const apiUrl = `http://localhost:8000/api/search?${searchParams.toString()}`;
            console.log('API URL:', apiUrl);

            console.log(`after defineURL#${searchCount}`);
            searchCount++;

            // 顯示搜尋的 URL
            pastParamContainer.innerHTML = `<p>API URL: ${apiUrl}</p>`;

            console.log(`after show URL&b4 fetch#${searchCount}`);
            searchCount++;

            // 發送 API 請求
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    displayResults(data.filtered, 'filteredResultsTable', 'filteredHeaderRow', 'filteredResultsBody');
                    displayResults(data.all, 'allResultsTable', 'allHeaderRow', 'allResultsBody');
                    updateSearchResults(data);
                })
                .catch(error => {
                    console.error('Fetch catch error:', error);
                    document.getElementById('searchResults').innerHTML = '<p>Fetch 錯誤。</p>';
                });
        }

        function getSearchType() {
            return searchTypeIcon.classList.contains('fa-book-open') ? 'MemberNotes' : 'RestInfos';
        }
        // purpose
        let selectedPurpose = null;

        document.querySelectorAll('.purpose-btn').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                selectedPurpose = this.getAttribute('data-purpose');
                console.log('selectedPurpose:', selectedPurpose);
                performSearch();
            });
        });

        // 二個都有值就 submit
        function checkAndTriggerSearch() {
            const input1 = document.getElementById('myInput').value;
            const input2 = document.getElementById('myInput2').value;
            if (input1 && input2) {
                performSearch();
            }
        }
        categoryInput.addEventListener('change', function () {
            const input1 = document.getElementById('myInput').value;
            const input2 = document.getElementById('myInput2').value;
            if (input1 && input2) {
                performSearch();
            }
        });
        locationInput.addEventListener('change', function () {
            const input1 = document.getElementById('myInput').value;
            const input2 = document.getElementById('myInput2').value;
            if (input1 && input2) {
                performSearch();
            }
        });


        console.log(`after performSearch()#${searchCount}`); // 0
        searchCount++;
        // if (searchCount > MAX_SEARCHES) stop();

        function displayResults(data, tableID, headerRowID, bodyID) {
            console.log(`開始顯示結果#${searchCount}`); //6
            searchCount++;
            // if (searchCount > MAX_SEARCHES) stop();
            const table = document.getElementById(tableID);
            const headerRow = document.getElementById(headerRowID);
            const body = document.getElementById(bodyID);

            headerRow.innerHTML = '';
            body.innerHTML = '';

            if (data.length === 0) {
                body.innerHTML = '<tr><td colspan="100%">沒有找到結果</td></tr>';
                return;
            }

            Object.keys(data[0]).forEach(key => {
                const th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            });

            data.forEach(item => {
                const row = body.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.textContent = value;
                });
            });
        }

        function updateSearchResults(data) {
            for (i = 0; i < data.filtered.length; i++) {
                const searchResultsDiv = document.getElementById('searchResults');

                searchResultsDiv.innerHTML = `
        <p>符合條件的結果數量: ${data.filtered.length}</p>
        <p>其他結果數量: ${data.all.length}</p>
        `;

            }
        }

        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log(`提交後 #${searchCount}`); //1
            searchCount++;
            performSearch();
            return false;
        });

        // 圖標切換邏輯
        document.getElementById('popupBlog').addEventListener('click', function () {
            searchTypeIcon.className = 'fa-solid fa-book-open';
        });

        document.getElementById('popupRest').addEventListener('click', function () {
            searchTypeIcon.className = 'fa-solid fa-utensils';
        });
        // debugger; //NO.2, 然後 DOMContentLoaded

        // });
