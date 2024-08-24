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
    let fans = parseInt($("#fans").text()) + 1;
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


