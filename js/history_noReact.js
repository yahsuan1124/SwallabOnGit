// // 全域變數
// let currentTab = 'all';
// let currentPage = 1;
// const itemsPerPage = 4;
// let isLoading = false; // 新增：用於控制 loadItems 的執行

// // DOM 元素
// const activityList = document.getElementById('activity-list');
// const loadMoreButton = document.getElementById('load-more');
// const tabButtons = document.querySelectorAll('.tab-button');

// // 事件監聽器
// tabButtons.forEach(button => {
//     count();
//     button.addEventListener('click', () => switchTab(button.dataset.tab));
//     console.log('事件監聽器：tabButtons = ' + button.dataset.tab);
//     console.log('isLoading:' + isLoading)
// });

// // 載入
// // console.clear();
// // window.addEventListener('load', () => {
// //     // document.addEventListener('DOMContentLoaded', () => {
// //     if (!window.hasFetched) {
// //         fetchItems();
// //         window.hasFetched = true; // 確保只調用一次
// //         console.log('window.isLoading'+window.isLoading);
// //         console.log('window.hasFetched'+window.hasFetched);
// //     } else{
// //         return;
// //     }
// // });
// let endpoint;
// async function fetchItems() {
//     count(); // 呼叫 count 函數
//     console.log(window.countNumber); // 顯示 countNumber 的值

//     // 初始化 endpoint 變數的值
//     switch (currentTab) {
//         case 'all':
//             endpoint = `${API_BASE_URL}/api/member-activity/all`;
//             console.log('Switch all');
//             break;
//         case 'orders':
//             endpoint = `${API_BASE_URL}/api/member-activity/OrderInfos`;
//             console.log('Switch orders');
//             break;
//         case 'notes':
//             endpoint = `${API_BASE_URL}/api/member-activity/MemberNotes`;
//             console.log('Switch notes');
//             break;
//         case 'comments':
//             endpoint = `${API_BASE_URL}/api/member-activity/Comments`;
//             console.log('Switch comments');
//             break;
//         case 'favorites':
//             endpoint = `${API_BASE_URL}/api/member-activity/Favorites`;
//             console.log('Switch favorites');
//             break;
//         default:
//             endpoint = `${API_BASE_URL}/api/member-activity/all`;
//             console.log('Switch default');
//             break;
//     }

//     const requestURL = `${endpoint}?page=${currentPage}&limit=${itemsPerPage}`;

//     // if (window.countNumber > 1) return; // 當 countNumber 大於 1 時，停止執行
//     if (window.hasFetched) return
//     else {
//         try {
//             const response = await fetch(requestURL);
//             if (!response.ok || window.hasFetched) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             console.log(data);

//         } catch (error) {
//             console.error('Fetch error:', error);
//         }
//     }
// }
// fetchItems();

// 原本的程式碼

// Global variables



//載入
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOMContentLoaded event fired');
//     log('DOMContentLoaded event fired');
//     loadAllTabItems();
//     // 給加載一些時間,然後檢查
//     // setTimeout(checkInitialLoad, 1000);
// });


window.LoadCount = 0;
console.log('LoadCount', window.LoadCount);
function setupEventListeners() {
    tabButtons.forEach(button => {
        button.removeEventListener('click', tabClickHandler);
        button.addEventListener('click', tabClickHandler);
    });
}

function tabClickHandler(event) {
    const tab = event.target.dataset.tab;
    switchTab(event, tab);
}

// 在 DOMContentLoaded 事件中调用
// document.addEventListener('DOMContentLoaded', () => {
//     if(window.LoadCount == 0)
//     setupEventListeners();
//     loadAllTabItems();
// });


// function domReady(fn) {
//     if (document.readyState === "complete" || document.readyState === "interactive") {
//         setTimeout(fn, 1);
//     } else {
//         document.addEventListener("DOMContentLoaded", fn);
//     }
// }

// 使用 domReady 函數
// domReady(() => {
//     console.log('DOM is ready');
//     log('DOM is ready');
//     loadItems();
//     setTimeout(checkInitialLoad, 2000);
// });

// 全域
let isLoading = false;
let currentTab = 'all';
let currentPage = 1;
let lastLoadedPage;
let hasMoreItems;
const itemsPerPage = 4;

// 計數器除錯用
function count() {
    if (window.countNumber === undefined) {
        window.countNumber = 0; // 初始化 countNumber
    }
    window.countNumber += 1; // 根據需要增加
    console.log('目前執行了' + window.countNumber + '次');
}
window.hasFetched = false; // 初始化 hasFetched

// 除錯器 by AI
function log(message, data = {}) {
    const timestamp = new Date().toISOString();

    // 將數據轉換為字符串，處理循環引用
    const stringifyData = (obj) => {
        const seen = new WeakSet();
        return JSON.stringify(obj, (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return "[Circular]";
                }
                seen.add(value);
            }
            return value;
        }, 2);
    };

    // 格式化數據
    const formattedData = Object.entries(data).map(([key, value]) => {
        let formattedValue;
        if (typeof value === 'object' && value !== null) {
            formattedValue = stringifyData(value);
        } else {
            formattedValue = String(value);
        }
        return `${key}: ${formattedValue}`;
    }).join('\n');

    // 輸出到控制台
    console.log(`[${timestamp}] ${message}\n${formattedData}`);
}



// 確認初始化
function checkInitialLoad() {
    log('Checking initial load');
    if (activityList.children.length === 0) {
        log('No items loaded on initial load');
        activityList.innerHTML = '<p>沒有可顯示的項目。請檢查網絡連接或重新加載頁面。</p>';
    } else {
        log('Items successfully loaded', { itemCount: activityList.children.length });
    }
}

// 設置 API 基礎 URL
const API_BASE_URL = 'http://localhost:8000/api';

//  CSRF 
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// 設置 fetch headers
const fetchOptions = {
    headers: {
        'X-CSRF-TOKEN': csrfToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'access-control-allow-origin': '*',
    },
};

// DOM elements
const activityList = document.getElementById('activity-list');
const loadMoreButton = document.getElementById('load-more');
const tabButtons = document.querySelectorAll('.tab-button');

// Event listeners
tabButtons.forEach(button => {
    count();
    console.log('161');
    button.addEventListener('click', () => switchTab(button.dataset.tab));
    console.log('事件監聽器：tabButtons = ' + button.dataset.tab);
});

loadMoreButton.addEventListener('click', loadMoreItems);

// Event listeners by AI
// function setupEventListeners() {
//     tabButtons.forEach(button => {
//         button.removeEventListener('click', () => switchTab(button.dataset.tab));
//         button.addEventListener('click', () => switchTab(button.dataset.tab));
//         log('Added event listener to tab button', { tab: button.dataset.tab });
//     });

//     loadMoreButton.removeEventListener('click', loadMoreItems);
//     loadMoreButton.addEventListener('click', loadMoreItems);
//     log('Added event listener to load more button');
// }



// Switch tab function
// function switchTab(tab) {
//     log('Switching tab', { to: tab });

//     count();
//     console.log('switchTab' + currentTab);
//     currentTab = tab;
//     currentPage = 1;
//     tabButtons.forEach(button => {
//         button.classList.toggle('active', button.dataset.tab === tab);
//     });
//     activityList.innerHTML = '';
//     loadItems();
// }
// Switch tab function by AI


function switchTab(tab) {
    window.LoadCount = 0; // 救援投手==
    if (currentTab === tab) return;

    console.log('Switching to tab:', tab);
    log('Switching tab', { from: currentTab, to: tab });
    // if (currentTab === tab) {
    //     log('Already on this tab, not switching');
    //     return;
    // }
    currentTab = tab;
    currentPage = 1;
    hasMoreItems = true; // 重置 hasMoreItems
    lastLoadedPage = 0; // 重置最後加載的頁面
    activityList.innerHTML = '';
    console.log(activityList.innerHTML);
    count();
    console.log(activityList);
    console.log('210' + currentTab);
    if (tab === 'all' && window.LoadCount == 0) {
        loadAllTabItems();
        console.log('呼叫 loadAllTabItems');
    } else {
        // if(window.LoadCount != 0) return;
        loadItems();
    }
    tabButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.tab === tab);
    });
}

// 0329
// function switchTab(tab) {
//     if (currentTab === tab) return;

//     log('Switching tab', { from: currentTab, to: tab });
//     currentTab = tab;
//     currentPage = 1;
//     activityList.innerHTML = '';
//     loadItems();

//     tabButtons.forEach(button => {
//         button.classList.toggle('active', button.dataset.tab === tab);
//     });
// }

// LoadItems function
// async function loadItems() {
//     log('Starting loadItems');

//     count();
//     try {
//         let endpoint;
//         switch (currentTab) {
//             case 'all':
//                 endpoint = `${API_BASE_URL}/api/member-activity/all`;
//                 break;
//             case 'orders':
//                 endpoint = `${API_BASE_URL}/api/member-activity/OrderInfos`;
//                 break;
//             case 'notes':
//                 endpoint = `${API_BASE_URL}/api/member-activity/MemberNotes`;
//                 break;
//             case 'comments':
//                 endpoint = `${API_BASE_URL}/api/member-activity/Comments`;
//                 break;
//             case 'favorites':
//                 endpoint = `${API_BASE_URL}/api/member-activity/Favorites`;
//                 break;
//             default:
//                 endpoint = `${API_BASE_URL}/api/member-activity/all`;
//         }


//         // console.log(next_page_url);
//         const response = await fetch(`${endpoint}?page=${currentPage}&limit=${itemsPerPage}`);
//         // data.next_page_url = false;
//         const data = await response.json();
//         console.log('接收到' + response);
//         console.log('剛解析完' + data);
//         console.log('Received data:', JSON.stringify(data, null, 2));


//         let items;
//         if (currentTab === 'all') {
//             count();
//             // console.log('items'+items);
//             items = [
//                 ...data.orders.map(item => ({ ...item, type: 'order' })),
//                 ...data.notes.map(item => ({ ...item, type: 'note' })),
//                 ...data.comments.map(item => ({ ...item, type: 'comment' })),
//                 ...data.favorites.map(item => ({ ...item, type: 'favorite' }))
//             ];
//         } else {
//             items = data.data;
//         }

//         items.forEach(item => {
//             const itemElement = createItemElement(item);
//             activityList.appendChild(itemElement);
//         });

//         // loadMoreButton.style.display = data.next_page_url ? 'block' : 'none';
//     } catch (error) {
//         console.error('Error loading items:', error);
//     } finally {
//         console.log('isFinally');
//         isLoading = false;
//     }
// }

// LoadItems function by AI
// async function loadItems() {
//     log('Entering loadItems', { currentPage, isLoading, lastLoadedPage });

//     if (isLoading || currentPage === lastLoadedPage) {
//         log('Exiting loadItems early', { reason: isLoading ? 'Already loading' : 'Page already loaded' });
//         return;
//     }

//     isLoading = true;
//     lastLoadedPage = currentPage;

//     try {
//         let endpoint;
//         switch(currentTab) {
//             case 'all':
//                 endpoint = `${API_BASE_URL}/member-activity/all`;
//                 break;
//             case 'orders':
//                 endpoint = `${API_BASE_URL}/member-activity/OrderInfos`;
//                 break;
//             case 'notes':
//                 endpoint = `${API_BASE_URL}/member-activity/MemberNotes`;
//                 break;
//             case 'comments':
//                 endpoint = `${API_BASE_URL}/member-activity/Comments`;
//                 break;
//             case 'favorites':
//                 endpoint = `${API_BASE_URL}/member-activity/Favorites`;
//                 break;
//             default:
//                 throw new Error(`Invalid tab: ${currentTab}`);
//         }

//         log('Fetching items', { endpoint, page: currentPage, limit: itemsPerPage });
//         const response = await fetch(`${endpoint}?page=${currentPage}&limit=${itemsPerPage}`);
//         console.log('response' + response);
//         const data = await response.json();
//         log('Received data', { dataLength: JSON.stringify(data).length, data: data });    
//         if (currentTab === 'all') {
//             items = [
//                 ...(data.OrderInfos || []),
//                 ...(data.MemberNotes || []),
//                 ...(data.Comments || []),
//                 ...(data.Favorites || [])
//             ];
//         } else {
//             items = Array.isArray(data) ? data : (data.data || []);
//         }
//         console.log(items);
//         log('Processed items', { itemCount: items.length, items: items });

//         if (!Array.isArray(items)) {
//             throw new Error('Processed items is not an array');
//         }

//         items.forEach(item => {
//             try {
//                 const itemElement = createItemElement(item);
//                 if (itemElement instanceof Element) {
//                     activityList.appendChild(itemElement);
//                 } else {
//                     log('Invalid item element', { item });
//                 }
//             } catch (error) {
//                 log('Error appending item element', { error: error.message, item });
//             }
//         });

//         loadMoreButton.style.display = items.length < itemsPerPage ? 'none' : 'block';
//         log('Updated UI', { loadMoreVisible: loadMoreButton.style.display === 'block' });
//     } catch (error) {
//         console.log('Error loading items:', error);
//         log('Error in loadItems', { error: error.message });
//         activityList.innerHTML += '<p>加載數據時發生錯誤。請稍後再試。</p>';
//     } finally {
//         isLoading = false;
//         log('Exiting loadItems', { isLoading });
//     }
// }




// let hasMoreItems = true;
function checkHasMoreItems(data, currentTab) {
    if (currentTab === 'all') {
        const totalItems = (data.orders?.data?.length || 0) +
            (data.notes?.data?.length || 0) +
            (data.comments?.data?.length || 0) +
            (data.favorites?.data?.length || 0);
        return totalItems === 16;
    } else {
        return data.current_page < data.last_page;
    }
}

// 全部顯示
let loadAllTabItemsPromise = null;
// 後衛
window.LoadCount++;
console.log(window.LoadCount);
// if (window.LoadCount !=0 ){stop()}


async function loadAllTabItems() {
    if (loadAllTabItemsPromise && window.LoadCount != 0) {
        console.log('LoadCount in function', window.LoadCount);
        console.log('loadAllTabItems already in progress, waiting for it to complete');
        return loadAllTabItemsPromise;
    }

    loadAllTabItemsPromise = (async () => {
        console.log('LoadCount', window.LoadCount);

        window.LoadCount++;
        console.log('LoadCount', window.LoadCount);

        console.log('Loading All Tab Items');
        const allTabContent = document.getElementById('activity-list');
        if (!allTabContent) return;
        window.LoadCount++;
        console.log('LoadCount', window.LoadCount);

        allTabContent.innerHTML = '<p>正在加載數據...</p>';
        try {
            // 後衛
            window.LoadCount++;
            console.log(window.LoadCount);
            if (window.LoadCount != 0) { stop() } // 最佳守門員 = =

            window.LoadCount++;
            console.log('LoadCount', window.LoadCount);



            const response = await fetch(`${API_BASE_URL}/member-activity/all?page=1&limit=16`);
            const data = await response.json();
            console.log('All tab data:', data);

            renderAllTabItems(data, allTabContent);

        } catch (error) {
            window.LoadCount++;
            console.log(window.LoadCount);
            // // if (window.LoadCount != 0) return;

            console.error('Error loading all tab items:', error);

            allTabContent.innerHTML = '<p>加載數據時發生錯誤。請稍後再試。</p>';
        } finally {
            console.log('LoadCount', window.LoadCount);

            loadAllTabItemsPromise = null;
        }
    })();
    // 後衛
    window.LoadCount++;
    console.log(window.LoadCount);
    // if (window.LoadCount !=0 ){stop()}
    return loadAllTabItemsPromise;
}
loadAllTabItems();

function renderAllTabItems(data, container) {
    window.LoadCount++;
    console.log(window.LoadCount);
    // if (window.LoadCount != 0) return;

    container.innerHTML = '';
    const allItems = [
        ...(data.orders || []).map(item => ({ ...item, type: 'order' })),
        ...(data.notes || []).map(item => ({ ...item, type: 'note' })),
        ...(data.comments || []).map(item => ({ ...item, type: 'comment' })),
        ...(data.favorites || []).map(item => ({ ...item, type: 'favorite' }))
    ];

    window.LoadCount++;
    console.log(window.LoadCount);
    // if (window.LoadCount != 0) return;

    if (allItems.length === 0) {
        window.LoadCount++;
        console.log(window.LoadCount);
        // if (window.LoadCount != 0) return;

        container.innerHTML = '<p>沒有可顯示的項目。</p>';
        return;
    }

    allItems.forEach(item => {
        window.LoadCount++;
        console.log(window.LoadCount);
        // if (window.LoadCount != 0) return;

        const itemElement = createItemElement(item);
        container.appendChild(itemElement);
    });
}

function renderAllTabItems(data, container) {
    // 後衛
    window.LoadCount++;
    console.log(window.LoadCount);
    if (window.LoadCount != 0) { stop() }
    // if (window.LoadCount != 0) return;
    container.innerHTML = '';
    const allItems = [
        ...(data.orders || []).map(item => ({ ...item, type: 'order' })),
        ...(data.notes || []).map(item => ({ ...item, type: 'note' })),
        ...(data.comments || []).map(item => ({ ...item, type: 'comment' })),
        ...(data.favorites || []).map(item => ({ ...item, type: 'favorite' }))
    ];

    if (allItems.length === 0) {
        container.innerHTML = '<p>沒有可顯示的項目。</p>';
        return;
    }

    allItems.forEach(item => {
        // 後衛
        window.LoadCount++;
        console.log(window.LoadCount);
        // if (window.LoadCount != 0){stop()}
        const itemElement = createItemElement(item);
        container.appendChild(itemElement);
    });
}

// 後衛
window.LoadCount++;
console.log(window.LoadCount);
// if (window.LoadCount != 0){stop()} // 守門員 2

function renderAllTabItems(data, container) {
    // 後衛
    window.LoadCount++;
    console.log(window.LoadCount);
    // if (window.LoadCount != 0){stop()}

    container.innerHTML = '';
    const allItems = [
        ...(data.orders || []).map(item => ({ ...item, type: 'order' })),
        ...(data.notes || []).map(item => ({ ...item, type: 'note' })),
        ...(data.comments || []).map(item => ({ ...item, type: 'comment' })),
        ...(data.favorites || []).map(item => ({ ...item, type: 'favorite' }))
    ];

    if (allItems.length === 0) {
        // 後衛
        window.LoadCount++;
        console.log(window.LoadCount);
        // if (window.LoadCount != 0){stop()}
        container.innerHTML = '<p>沒有可顯示的項目。</p>';
        return;
    }
    // 後衛
    window.LoadCount++;
    console.log(window.LoadCount);
    // if (window.LoadCount != 0){stop()}
    allItems.forEach(item => {
        // 後衛
        window.LoadCount++;
        console.log(window.LoadCount);
        // if (window.LoadCount != 0){stop()}
        const itemElement = createAllTabItemElement(item);
        container.appendChild(itemElement);
    });
    // 後衛
    window.LoadCount++;
    console.log(window.LoadCount);
    // if (window.LoadCount != 0){stop()}
}
window.LoadCount++;
console.log(window.LoadCount);
// if (window.LoadCount != 0){stop()}
function createAllTabItemElement(item) {
    // 後衛
    window.LoadCount++;
    console.log(window.LoadCount);
    // if (window.LoadCount != 0){stop()}
    const itemElement = document.createElement('div');
    itemElement.classList.add('all-tab-item');
    // 後衛
    window.LoadCount++;
    console.log(window.LoadCount);
    // if (window.LoadCount != 0){stop()}
    let content = '';
    switch (item.type) {

        case 'order':
            content = createAllTabOrderHTML(item);
            break;
        case 'note':
            content = createAllTabNoteHTML(item);
            break;
        case 'comment':
            content = createAllTabCommentHTML(item);
            break;
        case 'favorite':
            content = createAllTabFavoriteHTML(item);
            break;
        default:
            content = `<p>Unknown item type</p>`;
    }
    // 後衛
    window.LoadCount++;
    console.log(window.LoadCount);
    if (window.LoadCount != 0) { stop() }

    itemElement.innerHTML = content;
    return itemElement;
}
// 後衛
window.LoadCount++;
console.log(window.LoadCount);
// if (window.LoadCount > 60){stop()}
// function createAllTabOrderHTML(item) {

//     const restaurantName = item.rest_infos?.name || 'Unknown Restaurant';
//     const restaurantImage = item.rest_infos?.main_photo || '';
//     return `
//         <div class="activity-image">
//             <img src="${restaurantImage}" alt="${restaurantName}">
//         </div>
//         <div class="activity-content">
//             <div class="activity-title">${restaurantName}</div>
//             <div class="activity-info">訂單編號: ${item.o_s_id}</div>
//             <div class="activity-info">預訂日期: ${item.booking_date || ''} ${item.booking_time || ''}</div>
//             <div class="activity-info">創建時間: ${item.created_at_date || ''} ${item.created_at_time || ''}</div>
//             <button class="activity-button">檢視內容</button>
//         </div>
//     `;
// }
function createAllTabOrderHTML(order) {
    const element = document.createElement('div');
    element.className = 'row mt-5 myRecordsTemp align-self-center';
    element.innerHTML = `
        <div class="col-2">
            <div class="myRecordsContainer align-self-center">
                <img class="activity-image" src="${order.restaurant_image}" alt="${order.restaurant_name}" />
            </div>
        </div>
        <div class="col-1"></div>
        <div class="col-5">
            <div class="activity-title">
                <div>訂單狀態：已完成</div>
                <a href="#"><span>${order.restaurant_name}</span></a>
            </div>
            <div class="row myRecordsInfo container">
                ${order.items.map(item => `
                    ${item.item_qty}份 ${item.item_price}的 ${item.item_name} <br />
                `).join('')}
                <a href="" class="me-0">more...</a>
            </div>
        </div>
        <div class="col-1 align-items-center">
            <div><span>$${order.total_price} </span></div>
        </div>
        <div class="col-2 myRecordsBtn">
            <div><span>${order.created_at_date}</span></div>
            <button class="activity-button">再次訂購</button>
        </div>
        <div class="col-1"></div>
    `;
    return element;
}

function createAllTabNoteHTML(item) {
    return `
        <div class="activity-image">
            <img src="${item.main_photo || ''}" alt="${item.title || 'Note'}">
        </div>
        <div class="activity-content">
            <div class="activity-title">${item.title || 'Untitled Note'}</div>
            <div class="activity-info">${item.rest_infos?.name || 'Unknown Restaurant'}</div>
            <div class="activity-info">創建時間: ${item.created_at_date || ''} ${item.created_at_time || ''}</div>
            <button class="activity-button">查看食記</button>
        </div>
    `;
}

function createAllTabCommentHTML(item) {
    const isRestaurantComment = item.rest_infos;
    const title = isRestaurantComment ? item.rest_infos?.name : item.member_notes?.title;
    const image = isRestaurantComment ? item.rest_infos?.main_photo : item.member_notes?.main_photo;
    return `
        <div class="activity-image">
            <img src="${image || ''}" alt="${title || 'Comment'}">
        </div>
        <div class="activity-content">
            <div class="activity-title">${title || 'Unknown Title'}</div>
            <div class="activity-info">${item.content || 'No comment'}</div>
            <div class="activity-info">評分: ${item.score || 'N/A'}</div>
            <div class="activity-info">創建時間: ${item.created_at_date || ''} ${item.created_at_time || ''}</div>
            <div class="activity-buttons">
                <button class="edit-button" data-id="${item.id}">編輯</button>
                <button class="delete-button" data-id="${item.id}">刪除</button>
            </div>
        </div>
    `;
}

function createAllTabFavoriteHTML(item) {
    const isRestaurantFavorite = item.rest_infos;
    const title = isRestaurantFavorite ? item.rest_infos?.name : item.member_notes?.title;
    const image = isRestaurantFavorite ? item.rest_infos?.main_photo : item.member_notes?.main_photo;

    return `
        <div class="activity-image">
            <img src="${image || ''}" alt="${title || 'Favorite'}">
        </div>
        <div class="activity-content">
            <div class="activity-title">${title || 'Unknown Title'}</div>
            <div class="activity-info">${isRestaurantFavorite ? '口袋名單' : '食記書籤'}</div>
            <div class="activity-info">創建時間: ${item.created_at_date || ''} ${item.created_at_time || ''}</div>
            <button class="remove-favorite" data-id="${item.id}">移除收藏</button>
        </div>
    `;
}


async function loadItems() {
    // 確定流程
    log('loadItems() Entering loadItems', { currentTab, currentPage, isLoading, hasMoreItems });
    count();
    console.log('365');
    if (isLoading || !hasMoreItems) return;

    isLoading = true;
    try {
        let endpoint;
        switch (currentTab) {
            case 'all':
                endpoint = `${API_BASE_URL}/member-activity/all`;
                break;
            case 'orders':
                endpoint = `${API_BASE_URL}/member-activity/OrderInfos`;
                break;
            case 'notes':
                endpoint = `${API_BASE_URL}/member-activity/MemberNotes`;
                break;
            case 'comments':
                endpoint = `${API_BASE_URL}/member-activity/Comments`;
                break;
            case 'favorites':
                endpoint = `${API_BASE_URL}/member-activity/Favorites`;
                break;
            default:
                throw new Error(`Invalid tab: ${currentTab}`);
        }
        console.log('endpoint' + endpoint);
        console.log('currentTab' + currentTab);
        // 
        log('Before Fetch: About to fetch', { endpoint, url: `${endpoint}?page=${currentPage}&limit=4` });
        const response = await fetch(`${endpoint}?page=${currentPage}&limit=4`);
        const data = await response.json();
        log('After Fetch: Received data', { dataLength: JSON.stringify(data).length, data: data });
        console.log(data);
        let items;
        if (currentTab === 'all') {
            log('if( currentTab === "all"): Processing all tab data');
            items = [
                ...(data.orders?.data || []).map(item => ({ ...item, type: 'order' })),
                ...(data.notes?.data || []).map(item => ({ ...item, type: 'note' })),
                ...(data.comments?.data || []).map(item => ({ ...item, type: 'comment' })),
                ...(data.favorites?.data || []).map(item => ({ ...item, type: 'favorite' }))
            ];
            log('Processed items for all tab', { itemCount: items.length, items: items });
            console.log(items); //找不到
            renderItems(data.data);
            hasMoreItems = items.length === 16; // 4 types * 4 items per page
        } else {
            log('Except tab "all":', { dataLength: data.data.length, data: data.data });
            console.log(data.data); //找得到
            renderItems(data.data);
            hasMoreItems = checkHasMoreItems(data, currentTab);

            // hasMoreItems = data.current_page < data.last_page;
            // console.log(hasMoreItems);
        }
        // if (items && items.length > 0) {
        //     renderItems(items);
        // } else {
        //     activityList.innerHTML = '<p>沒有可顯示的項目。</p>';
        // }
        currentPage++;

        loadMoreButton.style.display = hasMoreItems ? 'block' : 'none';
    } catch (error) {
        console.error('Error loading items:', error);
        activityList.innerHTML += '<p>加載數據時發生錯誤。請稍後再試。</p>';
    } finally {
        isLoading = false;
        console.log('finally')
    }
}
// 後衛
window.LoadCount++;
console.log(window.LoadCount);
// if (window.LoadCount != 0){stop()}


// 0329
// async function loadItems() {
//     log('loadItems() Entering loadItems', { currentTab, currentPage, isLoading });
//     if (isLoading) return;

//     isLoading = true;
//     try {
//         if (currentTab === 'all') {
//             await loadAllItems();
//         } else {
//             let endpoint = `${API_BASE_URL}/member-activity/${currentTab}`;
//             const response = await fetch(`${endpoint}?page=${currentPage}&limit=4`);
//             const data = await response.json();
//             log('Received data', { data });

//             if (data.data && data.data.length > 0) {
//                 renderItems(data.data);
//             } else {
//                 activityList.innerHTML = '<p>沒有可顯示的項目。</p>';
//             }
//         }
//     } catch (error) {
//         console.error('Error loading items:', error);
//         activityList.innerHTML = '<p>加載數據時發生錯誤。請稍後再試。</p>';
//     } finally {
//         isLoading = false;
//     }
// }


function renderItems(items) {
    log('Entering renderItems():', { itemCount: items.length });
    // console.log('Entering renderItems');
    // console.log('Items to render:', items);

    if (!Array.isArray(items)) {
        log('Error: renderItems received non-array', { items });
        return;
    }

    items.forEach((item, index) => {
        log(`Processing item ${index}`, { item });

        // console.log(`Processing item ${index}:`);
        if (item && typeof item === 'object') {
            // console.log(`About to call createItemElement for item ${index}`);
            const itemElement = createItemElement(item);
            log(`Created element for item ${index}`, { element: itemElement.outerHTML });
            // console.log(`Finished createItemElement for item ${index}, result:`, itemElement);
            activityList.appendChild(itemElement);
        } else {
            log(`Invalid item at index ${index}`, { item });
            // console.warn('Invalid item in renderItems:', item);
        }
    });
    log('Finished renderItems');

    // console.log('Finished renderItems');
}

// 0329
// function renderItems(items) {
//     log('Entering renderItems', { itemCount: items.length });

//     items.forEach((item, index) => {
//         const itemElement = createItemElement(item);
//         activityList.appendChild(itemElement);
//     });
// }


// 處理不同的數據結構
function createItemElement(item) {
    log('Entering createItemElement():', { item });

    const itemElement = document.createElement('div');
    console.log('4. Created itemElement');

    itemElement.classList.add('activity-item');
    console.log('5. Added class to itemElement');

    let content = '';
    console.log('6. Initialized content');

    console.log('6a. About to enter try block');
    try {
        console.log('7. Entering try block');
        const itemType = item.type || inferItemType(item);
        log('Inferred item type', { itemType, item });
        console.log('8. Inferred item type:', itemType);

        switch (itemType) {
            case 'order':
                console.log('9. Creating order HTML');
                content = createOrderHTML(item);
                break;
            case 'note':
                console.log('9. Creating note HTML');
                content = createNoteHTML(item);
                break;
            case 'comment':
                console.log('9. Creating comment HTML');
                content = createCommentHTML(item);
                break;
            case 'favorite':
                console.log('9. Creating favorite HTML');
                content = createFavoriteHTML(item);
                break;
            default:
                console.warn('9. Unknown item type:', itemType, item);
                log('Unknown item type', { itemType, item });
                content = `<p>Unknown item type</p>`;
        }
        console.log('10. Content created:', content);
        log('Created content', { content });

        itemElement.innerHTML = content;
        console.log('11. Set innerHTML of itemElement');
    } catch (error) {
        console.error('12. Error in createItemElement', error);
        log('Error in createItemElement', { error: error.message, item });

        itemElement.textContent = 'Error creating item element';
    }

    console.log('13. Returning itemElement');
    return itemElement;
}

// 0329
// function createItemElement(item) {
//     log('Creating item element', { item });

//     const itemElement = document.createElement('div');
//     itemElement.classList.add('activity-item');

//     let content = '';
//     switch (item.type) {
//         case 'order':
//             content = createOrderHTML(item);
//             break;
//         case 'note':
//             content = createNoteHTML(item);
//             break;
//         case 'comment':
//             content = createCommentHTML(item);
//             break;
//         case 'favorite':
//             content = createFavoriteHTML(item);
//             break;
//         default:
//             content = `<p>Unknown item type</p>`;
//     }

//     itemElement.innerHTML = content;
//     return itemElement;
// }

function inferItemType(item) {
    console.log('Entering inferItemType');
    if (item.o_s_id) return 'order';
    if (item.title && item.content) return 'note';
    if (item.content && item.score) return 'comment';
    if (item.rest_infos || item.member_notes) return 'favorite';
    console.log('Unknown item type:', item);
    return 'unknown';
}

// 更新其他函數以匹配新的 API 路徑
activityList.addEventListener('click', async (e) => {
    count();
    console.log('477');
    console.log(e);
    if (e.target.classList.contains('edit-button')) {
        const id = e.target.dataset.id;
        // 實現編輯功能
        console.log('Edit item with id:', id);
    } else if (e.target.classList.contains('delete-button')) {
        const id = e.target.dataset.id;
        if (confirm('確定要刪除這條評論嗎？')) {
            try {
                // 根據評論類型選擇正確的 API 端點
                const endpoint = item.type === 'RestComment'
                    ? `/api/member-activity/RestComments/${id}`
                    : `/api/member-activity/NotesComments/${id}`;
                await fetch(endpoint, { method: 'DELETE' });
                e.target.closest('.activity-item').remove();
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    } else if (e.target.classList.contains('remove-favorite')) {
        const id = e.target.dataset.id;
        if (confirm('確定要移除這個收藏嗎？')) {
            try {
                // 根據收藏類型選擇正確的 API 端點
                const endpoint = item.type === 'RestFavorite'
                    ? `/api/member-activity/RestFavorites/${id}`
                    : `/api/member-activity/NotesFavorites/${id}`;
                await fetch(endpoint, { method: 'DELETE' });
                e.target.closest('.activity-item').remove();
            } catch (error) {
                console.error('Error removing favorite:', error);
            }
        }
    }
});

// Load more items function
function loadMoreItems() {
    count();
    console.log('516');
    log('Loading more items', { currentPage });
    currentPage++;
    loadItems();
}


// Create HTML for different item types
function createOrderHTML(item) {
    console.log('Entering createOrderHTML');
    const restaurantName = item.rest_infos?.name || 'Unknown Restaurant';
    const restaurantImage = item.rest_infos?.main_photo || '';

    return `
        <div class="activity-image">
            <img src="${restaurantImage}" alt="${restaurantName}">
        </div>
        <div class="activity-content">
            <div class="activity-title">${restaurantName}</div>
            <div class="activity-info">訂單編號: ${item.o_s_id}</div>
            <div class="activity-info">預訂日期: ${item.booking_date || ''} ${item.booking_time || ''}</div>
            <div class="activity-info">創建時間: ${item.created_at_date || ''} ${item.created_at_time || ''}</div>
            <button class="activity-button">檢視內容</button>
        </div>
    `;
}

function createNoteHTML(item) {
    console.log('Entering createNoteHTML');
    return `
        <div class="activity-image">
            <img src="${item.main_photo || ''}" alt="${item.title || 'Note'}">
        </div>
        <div class="activity-content">
            <div class="activity-title">${item.title || 'Untitled Note'}</div>
            <div class="activity-info">${item.rest_infos?.name || 'Unknown Restaurant'}</div>
            <div class="activity-info">創建時間: ${item.created_at_date || ''} ${item.created_at_time || ''}</div>
            <button class="activity-button">查看食記</button>
        </div>
    `;
}

function createCommentHTML(item) {
    console.log('Entering createCommentHTML');
    const isRestaurantComment = item.rest_infos;
    const title = isRestaurantComment ? item.rest_infos?.name : item.member_notes?.title;
    const image = isRestaurantComment ? item.rest_infos?.main_photo : item.member_notes?.main_photo;

    return `
        <div class="activity-image">
            <img src="${image || ''}" alt="${title || 'Comment'}">
        </div>
        <div class="activity-content">
            <div class="activity-title">${title || 'Unknown Title'}</div>
            <div class="activity-info">${item.content || 'No comment'}</div>
            <div class="activity-info">評分: ${item.score || 'N/A'}</div>
            <div class="activity-info">創建時間: ${item.created_at_date || ''} ${item.created_at_time || ''}</div>
            <div class="activity-buttons">
                <button class="edit-button" data-id="${item.id}">編輯</button>
                <button class="delete-button" data-id="${item.id}">刪除</button>
            </div>
        </div>
    `;
}

function createFavoriteHTML(item) {
    console.log('Entering createFavoriteHTML');
    const isRestaurantFavorite = item.rest_infos;
    const title = isRestaurantFavorite ? item.rest_infos?.name : item.member_notes?.title;
    const image = isRestaurantFavorite ? item.rest_infos?.main_photo : item.member_notes?.main_photo;

    return `
        <div class="activity-image">
            <img src="${image || ''}" alt="${title || 'Favorite'}">
        </div>
        <div class="activity-content">
            <div class="activity-title">${title || 'Unknown Title'}</div>
            <div class="activity-info">${isRestaurantFavorite ? '口袋名單' : '食記書籤'}</div>
            <div class="activity-info">創建時間: ${item.created_at_date || ''} ${item.created_at_time || ''}</div>
            <button class="remove-favorite" data-id="${item.id}">移除收藏</button>
        </div>
    `;
}

// Event delegation for dynamic buttons
activityList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit-button')) {
        const id = e.target.dataset.id;
        // Implement edit functionality
        console.log('Edit item with id:', id);
    } else if (e.target.classList.contains('delete-button')) {
        const id = e.target.dataset.id;
        if (confirm('確定要刪除這條評論嗎？')) {
            try {
                await fetch(`/api/comments/${id}`, { method: 'DELETE' });
                e.target.closest('.activity-item').remove();
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    } else if (e.target.classList.contains('remove-favorite')) {
        const id = e.target.dataset.id;
        if (confirm('確定要移除這個收藏嗎？')) {
            try {
                await fetch(`/api/favorites/${id}`, { method: 'DELETE' });
                e.target.closest('.activity-item').remove();
            } catch (error) {
                console.error('Error removing favorite:', error);
            }
        }
    }
});
// 後衛
window.LoadCount++;
console.log(window.LoadCount);
// if (window.LoadCount != 0){stop()}