window.onload = function () {
  //最新文章1+2 ==>標題+日期 ==> 用id
  $.ajax({
    url: "http://localhost/swallabTest/GetNewTitle",
    method: "GET",
  })
    .done(function (mytitle) {
      console.log(mytitle);

      $("#title1").text(mytitle[0].comment);
      $("#title2").text(mytitle[1].comment);
      $("#title3").text(mytitle[2].comment);

      //指定日期格式
      function formatDate(dateString) {
        const date = new Date(dateString);
        console.log(date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
      }

      $("#date1").text(formatDate(mytitle[0].date));
      $("#date2").text(formatDate(mytitle[1].date));
      $("#date3").text(formatDate(mytitle[2].date));

    })
    .fail(function (cat) {
      console.log("2.最新文章fail:", cat);
    })
    .always(function () {
      console.log("3.always:最新文章");
    });

  //最新文章的照片1+2
  let newTitle = document.querySelectorAll(".newTitle");

  fetch(`../php/newTitle.php`)
    .then((response) => response.json())
    .then((images) => {
      images.forEach((imgData, index) => {
        if (index < newTitle.length) {
          let imgURL = `data:${imgData.mime_type};base64,${imgData.image}`;
          newTitle[index].src = imgURL;
        }
      });
    })
    .catch((error) => {
      console.error("失敗", error);
    });


  //下面應該改完了


  //card的照片+標題+瀏覽人數
  let cardTop = document.getElementById("cardTop");

  fetch("../php/download.php", {
    method: "POST",
  })
    .then((response) => response.text())
    .then((text) => {
      cardTop.innerHTML = text;
    })
    .catch((error) => {
      console.error("獲取圖片失敗", error);
    });
}

