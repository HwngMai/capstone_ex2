renderDSphone = function (dsphone) {
  var contentHTML = "";
  dsphone.forEach((phone) => {
    var contentTr = `<tr>
        <td>${phone.id}</td>
        <td>${phone.name}</td>
        <td>${phone.price}</td>
        <td className='w-25' ><img style="height: 100px" className='img-fluid' src="${phone.img}"></img></td>
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
//**FUNC kiểm tra valid */
function checkIsValid(phone) {
  var isValid =
    //Kiểm tra rỗng tài khoản, tên, email, mật khẩu, lương, giờ làm, lương
    validation.kiemTrarong(
      phone.name,
      "tbName",
      "Tên sản phẩm không được để trống"
    ) &
    validation.kiemTrarong(
      phone.price,
      "tbPrice",
      "Giá sản phẩm không được để trống"
    ) &
    validation.kiemTrarong(
      phone.img,
      "tbImg",
      "URL image không được để trống"
    ) &
    validation.kiemTrarong(
      phone.screen,
      "tbScreen",
      "Màn hình không được để trống"
    ) &
    validation.kiemTrarong(
      phone.backCamera,
      "tbBackCamera",
      "Back Camera không được để trống"
    ) &
    validation.kiemTrarong(
      phone.frontCamera,
      "tbFrontCamera",
      "Front Camera không được để trống"
    ) &
    validation.kiemTrarong(phone.desc, "tbDesc", "Mô tả không được để trống") &
    validation.kiemTrarong(
      phone.type,
      "tbType",
      "Loại sản phẩm không được để trống"
    ) &
    validation.kiemTraMin(
      phone.price,
      0,
      "tbPrice",
      "Vui lòng nhập vào giá trị dương "
    ) &
    validation.kiemTraMin(
      phone.screen,
      0,
      "tbScreen",
      "Vui lòng nhập vào giá trị dương "
    ) &
    validation.kiemTraMin(
      phone.backCamera,
      0,
      "tbBackCamera",
      "Vui lòng nhập vào giá trị dương "
    ) &
    validation.kiemTraMin(
      phone.frontCamera,
      0,
      "tbFrontCamera",
      "Vui lòng nhập vào giá trị dương "
    );
  // validation.kiemTraTrung(phone.name, "tbName", "Tên sản phẩm bị trùng");

  return isValid;
}
function kiemTraTrung(value, idError, mess) {
  axios({
    url: `${BASE_URL}/phone`,
    method: "GET",
  })
    .then(function (res) {
      loadingOff();
      console.log(res);
      let dsPhone = res.data;
      for (i = 0; i < dsPhone.length; i++) {
        // gán biến chứa mảng có giá trị cần so sánh
        let phone = dsPhone[i];
        // nếu giá trị cần tìm khác 0 và bằng giá trị so sánh
        if (value.length != 0 && value == phone.name) {
          // Báo lỗi
          document.getElementById(idError).innerHTML = mess;
          // Trả về false
          console.log(false);
          return false;
        } else {
          console.log(true);
          return true;
        }
      }
    })
    .catch(function (err) {
      loadingOff();
      console.log(err);
      return false;
    });
}
function hideTb(idSpan) {
  document.getElementById(idSpan).innerHTML = "";
}
function hideTbForm() {
  hideTb("tbName");
  hideTb("tbPrice");
  hideTb("tbImg");
  hideTb("tbScreen");
  hideTb("tbBackCamera");
  hideTb("tbFrontCamera");
  hideTb("tbDesc");
  hideTb("tbType");
}
