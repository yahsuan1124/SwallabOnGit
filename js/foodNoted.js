document.getElementById("top").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function showLoading(){
  $("#myLoading").css("display","block")
  console.log("顯示loading");
  
}
function hideLoading() {
  $("#myLoading").css("display", "none");
  console.log("隱藏loading");
}
showLoading();
//網頁載入-最熱門
window.onload = function () {
  
  ///最新文章1+2 ==>標題+日期 ==> 用id
  $.ajax({
    url: "../php/hotTitle.php",
    method: "POST",
    dataType: "json",
  })
    .done(function (mytitle) {
      console.log(mytitle); //陣列

      // 顯示評論
      $("#title1").text(mytitle[0].title);
      $("#title2").text(mytitle[1].title);
      $("#title3").text(mytitle[2].title);

      // 指定日期格式
      function formatDate(dateString) {
        console.log(dateString)
        const date = new Date(dateString);
        console.log(date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
      }

      // 顯示日期
      $("#date1").text(formatDate(mytitle[0].created_at));
      $("#date2").text(formatDate(mytitle[1].created_at));
      $("#date3").text(formatDate(mytitle[2].created_at));
    })
    .fail(function (cat) {
      console.log("2.最新文章fail:", cat);
    })

  //最新文章的照片1+2
  let newTitle = document.querySelectorAll(".newTitle");

  fetch(`../php/hotImageTitle.php`)
    .then((response) => response.text())
    .then((images) => {
      const imageUrls = images.trim().split("\n"); //頭尾去空白，再去換行
      console.log(imageUrls);  //陣列
      imageUrls.forEach((imgUrl, index) => {
        if (index < newTitle.length) {
          newTitle[index].src = imgUrl.trim(); //每個照片頭尾去空白
        }
      });
    })
    .catch((error) => {
      console.error("失敗", error);
    });


  //card的照片+標題+瀏覽人數
  let cardTop = document.getElementById("cardTop");

  fetch("../php/hot.php", {
    method: "POST",
  })
    .then((response) => response.text())
    .then((text) => {
      cardTop.innerHTML = text;
      hideLoading();
    })
    .catch((error) => {
      console.error("獲取圖片失敗", error);
    });
};

//熱門排行
$("#hot").on("click",function(){
  //最新文章1+2 ==>標題+日期 ==> 用id
  $.ajax({
    url: "../php/hotTitle.php",
    method: "POST"
  })
    .done(function (mytitle) {
      console.log(mytitle);

      // 顯示評論
      $("#title1").text(mytitle[0].title);
      $("#title2").text(mytitle[1].title);
      $("#title3").text(mytitle[2].title);

      // 指定日期格式
      function formatDate(dateString) {
        const date = new Date(dateString);
        console.log(date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
      }

      // 顯示日期
      $("#date1").text(formatDate(mytitle[0].created_at));
      $("#date2").text(formatDate(mytitle[1].created_at));
      $("#date3").text(formatDate(mytitle[2].created_at));
    })
    .fail(function (cat) {
      console.log("2.最新文章fail:", cat);
    })
    .always(function () {
      console.log("3.always:最新文章");
    });

  //最新文章的照片1+2
  let newTitle = document.querySelectorAll(".newTitle");

  fetch(`../php/hotImageTitle.php`)
    .then((response) => response.text())
    .then((images) => {
      const imageUrls = images.trim().split("\n"); // 按行分割獲取的字符串
      imageUrls.forEach((imgUrl, index) => {
        if (index < newTitle.length) {
          newTitle[index].src = imgUrl.trim(); // 設置每個圖片元素的 src
        }
      });
    })
    .catch((error) => {
      console.error("失敗", error);
    });


  //card的照片+標題+瀏覽人數
  let cardTop = document.getElementById("cardTop");

  fetch("../php/hot.php", {
    method: "POST",
  })
    .then((response) => response.text())
    .then((text) => {
      cardTop.innerHTML = text;
    })
    .catch((error) => {
      console.error("獲取圖片失敗", error);
    });
})

//火鍋排行
$("#hotpot").on("click",function(){
  //最新文章1+2 ==>標題+日期 ==> 用id
  $.ajax({
    url: "../php/hotpotTitle.php",
    method: "POST",
    dataType: "json",
  })
    .done(function (mytitle) {
      console.log(mytitle);

      // 顯示評論
      $("#title1").text(mytitle[0].title);
      $("#title2").text(mytitle[1].title);
      $("#title3").text(mytitle[2].title);

      // 指定日期格式
      function formatDate(dateString) {
        const date = new Date(dateString);
        console.log(date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
      }

      // 顯示日期
      $("#date1").text(formatDate(mytitle[0].created_at));
      $("#date2").text(formatDate(mytitle[1].created_at));
      $("#date3").text(formatDate(mytitle[2].created_at));
    })
    .fail(function (cat) {
      console.log("2.最新文章fail:", cat);
    })
    .always(function () {
      console.log("3.always:最新文章");
    });

  //最新文章的照片1+2
  let newTitle = document.querySelectorAll(".newTitle");

  fetch(`../php/hotpotImageTitle.php`)
    .then((response) => response.text())
    .then((images) => {
      const imageUrls = images.trim().split("\n"); // 按行分割獲取的字符串
      imageUrls.forEach((imgUrl, index) => {
        if (index < newTitle.length) {
          newTitle[index].src = imgUrl.trim(); // 設置每個圖片元素的 src
        }
      });
    })
    .catch((error) => {
      console.error("失敗", error);
    });

  //card的照片+標題+瀏覽人數
  let cardTop = document.getElementById("cardTop");

  fetch("../php/hotpot.php", {
    method: "POST",
  })
    .then((response) => response.text())
    .then((text) => {
      cardTop.innerHTML = text;
    })
    .catch((error) => {
      console.error("獲取圖片失敗", error);
    });
})

//燒肉排行
$("#bbq").on("click",function(){
  //最新文章1+2 ==>標題+日期 ==> 用id
  $.ajax({
    url: "../php/bbqTitle.php",
    method: "POST",
    dataType: "json",
  })
    .done(function (mytitle) {
      console.log(mytitle);

      // 顯示評論
      $("#title1").text(mytitle[0].title);
      $("#title2").text(mytitle[1].title);
      $("#title3").text(mytitle[2].title);

      // 指定日期格式
      function formatDate(dateString) {
        const date = new Date(dateString);
        console.log(date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
      }

      // 顯示日期
      $("#date1").text(formatDate(mytitle[0].created_at));
      $("#date2").text(formatDate(mytitle[1].created_at));
      $("#date3").text(formatDate(mytitle[2].created_at));
    })
    .fail(function (cat) {
      console.log("2.最新文章fail:", cat);
    })
    .always(function () {
      console.log("3.always:最新文章");
    });

  //最新文章的照片1+2
  let newTitle = document.querySelectorAll(".newTitle");

  fetch(`../php/bbqImageTitle.php`)
    .then((response) => response.text())
    .then((images) => {
      const imageUrls = images.trim().split("\n"); // 按行分割獲取的字符串
      imageUrls.forEach((imgUrl, index) => {
        if (index < newTitle.length) {
          newTitle[index].src = imgUrl.trim(); // 設置每個圖片元素的 src
        }
      });
    })
    .catch((error) => {
      console.error("失敗", error);
    });

  //card的照片+標題+瀏覽人數
  let cardTop = document.getElementById("cardTop");

  fetch("../php/bbq.php", {
    method: "POST",
  })
    .then((response) => response.text())
    .then((text) => {
      cardTop.innerHTML = text;
    })
    .catch((error) => {
      console.error("獲取圖片失敗", error);
    });
})

//拉麵排行
$("#ramen").on("click", function () {
  //最新文章1+2 ==>標題+日期 ==> 用id
  $.ajax({
    url: "../php/ramenTitle.php",
    method: "POST",
    dataType: "json",
  })
    .done(function (mytitle) {
      console.log(mytitle);

      // 顯示評論
      $("#title1").text(mytitle[0].title);
      $("#title2").text(mytitle[1].title);
      $("#title3").text(mytitle[2].title);

      // 指定日期格式
      function formatDate(dateString) {
        const date = new Date(dateString);
        console.log(date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
      }

      // 顯示日期
      $("#date1").text(formatDate(mytitle[0].created_at));
      $("#date2").text(formatDate(mytitle[1].created_at));
      $("#date3").text(formatDate(mytitle[2].created_at));
    })
    .fail(function (cat) {
      console.log("2.最新文章fail:", cat);
    })
    .always(function () {
      console.log("3.always:最新文章");
    });

  //最新文章的照片1+2
  let newTitle = document.querySelectorAll(".newTitle");

  fetch(`../php/ramenImageTitle.php`)
    .then((response) => response.text())
    .then((images) => {
      const imageUrls = images.trim().split("\n"); // 按行分割獲取的字符串
      imageUrls.forEach((imgUrl, index) => {
        if (index < newTitle.length) {
          newTitle[index].src = imgUrl.trim(); // 設置每個圖片元素的 src
        }
      });
    })
    .catch((error) => {
      console.error("失敗", error);
    });

  //card的照片+標題+瀏覽人數
  let cardTop = document.getElementById("cardTop");

  fetch("../php/ramen.php", {
    method: "POST",
  })
    .then((response) => response.text())
    .then((text) => {
      cardTop.innerHTML = text;
    })
    .catch((error) => {
      console.error("獲取圖片失敗", error);
    });
});

//居酒屋排行
$("#beer").on("click",function(){
  //最新文章1+2 ==>標題+日期 ==> 用id
  $.ajax({
    url: "../php/beerTitle.php",
    method: "POST",
    dataType: "json",
  })
    .done(function (mytitle) {
      console.log(mytitle);

      // 顯示評論
      $("#title1").text(mytitle[0].title);
      $("#title2").text(mytitle[1].title);
      $("#title3").text(mytitle[2].title);

      // 指定日期格式
      function formatDate(dateString) {
        const date = new Date(dateString);
        console.log(date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
      }

      // 顯示日期
      $("#date1").text(formatDate(mytitle[0].created_at));
      $("#date2").text(formatDate(mytitle[1].created_at));
      $("#date3").text(formatDate(mytitle[2].created_at));
    })
    .fail(function (cat) {
      console.log("2.最新文章fail:", cat);
    })
    .always(function () {
      console.log("3.always:最新文章");
    });

  //最新文章的照片1+2
  let newTitle = document.querySelectorAll(".newTitle");

  fetch(`../php/beerImageTitle.php`)
    .then((response) => response.text())
    .then((images) => {
      const imageUrls = images.trim().split("\n"); // 按行分割獲取的字符串
      imageUrls.forEach((imgUrl, index) => {
        if (index < newTitle.length) {
          newTitle[index].src = imgUrl.trim(); // 設置每個圖片元素的 src
        }
      });
    })
    .catch((error) => {
      console.error("失敗", error);
    });

  //card的照片+標題+瀏覽人數
  let cardTop = document.getElementById("cardTop");

  fetch("../php/beer.php", {
    method: "POST",
  })
    .then((response) => response.text())
    .then((text) => {
      cardTop.innerHTML = text;
    })
    .catch((error) => {
      console.error("獲取圖片失敗", error);
    });
})

//甜點排行
$("#dessert").on("click", function () {
  //最新文章1+2 ==>標題+日期 ==> 用id
  $.ajax({
    url: "../php/dessertTitle.php",
    method: "POST",
    dataType: "json",
  })
    .done(function (mytitle) {
      console.log(mytitle);

      // 顯示評論
      $("#title1").text(mytitle[0].title);
      $("#title2").text(mytitle[1].title);
      $("#title3").text(mytitle[2].title);

      // 指定日期格式
      function formatDate(dateString) {
        const date = new Date(dateString);
        console.log(date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
      }

      // 顯示日期
      $("#date1").text(formatDate(mytitle[0].created_at));
      $("#date2").text(formatDate(mytitle[1].created_at));
      $("#date3").text(formatDate(mytitle[2].created_at));
    })
    .fail(function (cat) {
      console.log("2.最新文章fail:", cat);
    })
    .always(function () {
      console.log("3.always:最新文章");
    });

  //最新文章的照片1+2
  let newTitle = document.querySelectorAll(".newTitle");

  fetch(`../php/dessertImageTitle.php`)
    .then((response) => response.text())
    .then((images) => {
      const imageUrls = images.trim().split("\n"); // 按行分割獲取的字符串
      imageUrls.forEach((imgUrl, index) => {
        if (index < newTitle.length) {
          newTitle[index].src = imgUrl.trim(); // 設置每個圖片元素的 src
        }
      });
    })
    .catch((error) => {
      console.error("失敗", error);
    });

  //card的照片+標題+瀏覽人數
  let cardTop = document.getElementById("cardTop");

  fetch("../php/dessert.php", {
    method: "POST",
  })
    .then((response) => response.text())
    .then((text) => {
      cardTop.innerHTML = text;
    })
    .catch((error) => {
      console.error("獲取圖片失敗", error);
    });
});