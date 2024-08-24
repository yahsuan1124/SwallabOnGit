// // icon 替換 start
// function showPopup() {
//     document.getElementById('popup').style.display = 'block';
//     document.getElementById('popupBlog').style.display = 'block';
//     document.getElementById('popupRest').style.display = 'block';
// }

// function hidePopup() {
//     document.getElementById('popup').style.display = 'none';
//     document.getElementById('popupBlog').style.display = 'none';
//     document.getElementById('popupRest').style.display = 'none';
// }

// document.getElementById('popupBlog').addEventListener('click', function () {
//     document.querySelector('.theicon::after').style.content = "\f2e7";
// });

// document.getElementById('popupRest').addEventListener('click', function () {
//     document.querySelector('.theicon::after').style.contetn = "\f518";
// });

// //  icon 替換 end

// 當滑鼠經過時，顯示兩個 icon
document.getElementById("theicon").addEventListener("mouseover", function () {
  console.log(123);
  document.getElementById("popupBR").style.display = "flex";
  document.getElementById("popupBlog").style.display = "flex";
  document.getElementById("popupRest").style.display = "flex";
});

// 當滑鼠離開時，只顯示已選擇的 icon
document.getElementById("theicon").addEventListener("mouseout", function () {
  document.getElementById("popupBlog").style.display = "none";
  document.getElementById("popupRest").style.display = "none";
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

let restIcon = new Theicon("rest", "fa-solid fa-utensils");
let blogIcon = new Theicon("blog", "fa-solid fa-book-open");

window.onload = function () {
  document.getElementById("showicon").className = restIcon.toIcon();
  document.getElementById("popupBlog").addEventListener("click", function () {
    document.getElementById("showicon").className = blogIcon.toIcon();
  });
  document.getElementById("popupRest").addEventListener("click", function () {
    document.getElementById("showicon").className = restIcon.toIcon();
  });
};

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
  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}
// 搜尋框顯示
function fillInput(value) {
  document.getElementById("myInput").value = value;
  document.getElementById("myDropdown").style.display = "none";
  document.getElementById("myInput2").style.display = "block";
}

function fillInput2(value) {
  document.getElementById("myInput2").value = value;
  document.getElementById("myDropdown2").style.display = "none";
  document.getElementById("myInput1").style.display = "block";

  // SQL
  // 'myInput' 和 'myInput2' 的值作為查詢條件
}
// 點擊其他地方隱藏下拉

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
  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}
// 搜尋框顯示
function fillInput(value) {
  document.getElementById("myInput").value = value;
  document.getElementById("myDropdown").style.display = "none";
  document.getElementById("myInput2").style.display = "block";
}

function fillInput2(value) {
  document.getElementById("myInput2").value = value;
  document.getElementById("myDropdown2").style.display = "none";
  document.getElementById("myInput").style.display = "block";

  // SQL
  // 'myInput' 和 'myInput2' 的值作為查詢條件
}
// 點擊其他地方隱藏下拉
window.onclick = function (event) {
  if (!event.target.matches("#myInput")) {
    var dropdown = document.getElementById("myDropdown");
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    }
  }

  if (!event.target.matches("#myInput2")) {
    var dropdown = document.getElementById("myDropdown2");
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    }
  }
};
