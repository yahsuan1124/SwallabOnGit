


// 立刻調用
(function () {
    // 載入完成後才做其他事
    document.addEventListener('DOMContentLoaded', function () {
        // window.location.href = '/search_results?' + searchParams.toString();
        console.log = function () {
            var args = Array.prototype.slice.call(arguments);
            localStorage.setItem('debug_log', localStorage.getItem('debug_log') + JSON.stringify(args) + '\n');
        };
        // 
        const form = document.querySelector('form[name="search"]');
        const csrfInput = document.createElement('input');
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const theicon = document.getElementById('theicon');
        const searchForm = document.querySelector('form[name="search"]');
        const searchTypeInput = document.getElementById('search_type');
        const categoryInput = document.getElementById('myInput');
        const locationInput = document.getElementById('myInput2');
        const csrfMeta = document.querySelector('meta[name="csrf-token"]');
        const purposeButtons = document.querySelectorAll('.filter_btn');

        const searchParams = new URLSearchParams();
        searchParams.append('search_type', searchType);
        if (category) searchParams.append('category', category);
        if (location) searchParams.append('location', location);
        if (selectedPurpose) searchParams.append('purpose', selectedPurpose);

        if (form && csrfMeta) {
            const csrfToken = csrfMeta.getAttribute('content');
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = csrfToken;
            form.appendChild(csrfInput);
        }
        if (theicon) {
            theicon.addEventListener('click', function () {
                searchTypeInput.value = searchTypeInput.value === 'RestInfos' ? 'MemberNotes' : 'RestInfos';
            });
        }

        window.fillInput = function (value) {
            if (categoryInput) categoryInput.value = value;
        };

        window.fillInput2 = function (value) {
            if (locationInput) locationInput.value = value;
        };

        if (searchForm) {
            searchForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(this);

                const searchParams = new URLSearchParams();
                searchParams.append('search_type', formData.get('search_type'));
                searchParams.append('category', categoryInput ? categoryInput.value : '');
                searchParams.append('location', locationInput ? locationInput.value : '');

                window.location.href = '/search_results.html?' + searchParams.toString();
            });
        }
        // 種類
        purposeButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                const purpose = this.getAttribute('data-purpose');
                const searchType = document.getElementById('search_type').value;
                const category = document.getElementById('myInput').value;
                const location = document.getElementById('myInput2').value;

                const searchParams = new URLSearchParams();
                searchParams.append('search_type', searchType);
                searchParams.append('category', category);
                searchParams.append('location', location);
                searchParams.append('purpose', purpose);

                window.location.href = '/search_results.html?' + searchParams.toString();
            });
        });
        // 如果在搜索結果頁面，加載並顯示結果
        if (window.location.pathname === '/search_results.html') {
            const urlParams = new URLSearchParams(window.location.search);
            const searchType = urlParams.get('search_type');
            const category = urlParams.get('category');
            const location = urlParams.get('location');

            fetch(`/search?search_type=${searchType}&category=${category}&location=${location}`)
                .then(response => response.json())
                .then(data => {
                    const headerRow = document.getElementById('headerRow');
                    const resultsBody = document.getElementById('resultsBody');

                    if (headerRow && resultsBody) {
                        // 創建表頭
                        if (data.length > 0) {
                            Object.keys(data[0]).forEach(key => {
                                const th = document.createElement('th');
                                th.textContent = key;
                                headerRow.appendChild(th);
                            });
                        }

                        // 填充數據
                        data.forEach(item => {
                            const row = document.createElement('tr');
                            Object.values(item).forEach(value => {
                                const td = document.createElement('td');
                                td.textContent = value;
                                row.appendChild(td);
                            });
                            resultsBody.appendChild(row);
                        });
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    });

    // purposes
    let selectedPurpose = null;

    document.querySelectorAll('.purpose-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            selectedPurpose = this.getAttribute('data-purpose');
            performSearch();
        });
    });
})();