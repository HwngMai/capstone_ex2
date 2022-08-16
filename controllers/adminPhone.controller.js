renderDSphone = function (dsphone) {
  var contentHTML = "";
  dsphone.forEach((phone) => {
    var contentTr = `<tr>
        <td>${phone.id}</td>
        <td>${phone.name}</td>
        <td>${phone.price}</td>
        <td className='w-25' ><img  style="height: 100px" className='img-fluid' src="${phone.img}"></img></td>
        <td>${phone.desc}</td>
        <td> 
        <button onclick="xoaPhone('${phone.id}')" class="btn btn-danger"> Xóa </button>
        <button onclick="capNhatPhone('${phone.id}')" class="btn btn-warning"> Sửa </button>
        </td>
            </tr>`;
    contentHTML += contentTr;
  });
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
};
//**FUNCTION BẬT LOADING */
function loadingOn() {
  document.getElementById("loading").style.display = "flex";
}
function loadingOff() {
  document.getElementById("loading").style.display = "none";
}
// FUNCTION disable ô input và btn
function togDisable(id) {
  const btn = document.getElementById(id);
  btn.disabled = true;
}
function togEnable(id) {
  const btn = document.getElementById(id);
  btn.disabled = false;
}

//**FUNCTION lấy thông tin từ form */
function layThongTinTuForm() {
  // lấy các giá trị từ input người dùng
  // const code = document.getElementById("code").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const img = document.getElementById("img").value;
  const screen = document.getElementById("screen").value;
  const backCamera = document.getElementById("backCamera").value;
  const frontCamera = document.getElementById("frontCamera").value;
  const desc = document.getElementById("desc").value;
  const type = document.getElementById("type").value;
  //đưa về 1 mảng mới theo cấu tạo của model SinhVien từ model.js
  return new Phone(
    // code,
    name,
    price,
    img,
    screen,
    backCamera,
    frontCamera,
    desc,
    type
  );
}

//**FUNCTION show thông tin từ id lên form */
let renderPhone = function (phone) {
  // document.getElementById("code").value = phone.code;
  document.getElementById("name").value = phone.name;
  document.getElementById("price").value = phone.price;
  document.getElementById("img").value = phone.img;
  document.getElementById("screen").value = phone.screen;
  document.getElementById("backCamera").value = phone.backCamera;
  document.getElementById("frontCamera").value = phone.frontCamera;
  document.getElementById("desc").value = phone.desc;
  document.getElementById("type").value = phone.type;
};

//**FUNCTION reset input */
function resetThongTin() {
  // document.getElementById("code").value = "";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("img").value = "";
  document.getElementById("screen").value = "";
  document.getElementById("backCamera").value = "";
  document.getElementById("frontCamera").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("type").value = "";
}
function resetInput(id) {
  document.getElementById(id).value = "";
}
//**FUNCTION tìm kiếm id theo tên trong mảng trả về id */
searchNameForIndex = function (dsPhone, nameSearch) {
  for (i = 0; i < dsPhone.length; i++) {
    if (nameSearch == dsPhone[i].name) {
      return dsPhone[i].id;
    }
  }
  return -1;
};
//**FUNC show modal */
function showModal(id) {
  $(id).modal("show");
}
//**FUNC show modal */
function hideModal(id) {
  $(id).modal("hide");
}
