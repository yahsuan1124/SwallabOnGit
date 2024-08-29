document.getElementById("top").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 追蹤按鈕+粉絲人數改變
$(".follow").click(function () {
  if ($(this).html() == "+ 追蹤") {
    $(this).html("追蹤中");
    $(this).css({
      "background-color": "rgb(229,166,122)",
      "color": "white",
    });
    let fans = parseInt($("#fans").text()) + 1;  //文字轉數字
    $("#fans").text(fans);
  } else if ($(this).html() == "追蹤中") {
    $(this).text("+ 追蹤");
    $(this).css({
      "background-color": "",
      "color": "", 
    });
    let fans = parseInt($("#fans").text()) - 1;
    $("#fans").text(fans);
  }
});

window.onload=()=>{
  //作者名字
  fetch("../php/author.php?action=authorName")
    .then(function (response) {
      console.log(response);
      return response.text();
    })
    .then(function (html) {
      console.log(html);
      $("#authorName").html(html);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });

  //作者頭貼
  fetch("../php/author.php?action=headphoto")
    .then(function (response) {
      console.log(response);
      return response.text();
    })
    .then(function (html) {
      console.log(html);
      $("#headphoto").attr("src", html);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });

  //追蹤人數track
  fetch("../php/author.php?action=track")
    .then(function (response) {
      console.log(response);
      return response.text();
    })
    .then(function (html) {
      console.log(html);
      $("#track").html(html);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });

  //粉絲人數fans
  fetch("../php/author.php?action=fans")
    .then(function (response) {
      console.log(response);
      return response.text();
    })
    .then(function (html) {
      console.log(html);
      $("#fans").html(html);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });

  //個人簡介
  fetch("../php/author.php?action=bio")
    .then(function (response) {
      console.log(response);
      return response.text();
    })
    .then(function (html) {
      console.log(html);
      $("#bio").html(html);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });

  //作者之前的食記
  fetch("../php/author.php?action=history")
    .then(function (response) {
      console.log(response);
      return response.text();
    })
    .then(function (html) {
      console.log(html);
      $("#history").html(html);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}
