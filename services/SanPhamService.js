// const BASE_URL = "https://62db6ca0d1d97b9e0c4f3334.mockapi.io";
const BASE_URL = "https://62db6ca5e56f6d82a772852f.mockapi.io";
//**FUNCTION lấy dssv */
function getDSPhone() {
  loadingOn();
  axios({
    url: `${BASE_URL}/phone`,
    method: "GET",
  })
    .then(function (res) {
      loadingOff();
      console.log(res);
      renderDSphone(res.data);
    })
    .catch(function (err) {
      loadingOff();
      console.log(err);
    });
}

//
getDSPhone();
//**FUNCTION xóa phone */
function xoaPhone(id) {
  loadingOn();
  axios({
    url: `${BASE_URL}/phone/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      loadingOff();
      console.log("res: ", res);
      getDSPhone();
    })
    .catch(function (err) {
      loadingOff();
      console.log("err: ", err);
    });
}
//POST là thêm
//PUT là cập nhật
//GET:id lấy thông tin từ id
function themPhone() {
  //Lấy info từ form
  newPhone = layThongTinTuForm();
  //Kiểm tra input
  var isValid =
    // Kiểm tra valid
    checkIsValid(newPhone);
  // kiemTraTrung(newPhone.name, "tbName", "Tên sản phẩm bị trùng");
  console.log(
    'kiemTraTrung(newPhone.name, "tbName", "Tên sản phẩm bị trùng"): ',
    kiemTraTrung(newPhone.name, "tbName", "Tên sản phẩm bị trùng")
  );
  console.log("checkIsValid(newPhone): ", checkIsValid(newPhone));
  // Kiểm tra trùng
  console.log("isValid: ", isValid);
  // Nếu isValid = true
  if (isValid == true) {
    //Thêm mới
    loadingOn();
    axios({
      url: `${BASE_URL}/phone`,
      method: "POST",
      data: newPhone,
    })
      .then(function (res) {
        console.log(res);
        getDSPhone();
        hideModal(myModal);
        loadingOff();
      })
      .catch(function (err) {
        loadingOff();
        console.log(err);
      });
  }
}
//Tạo biến phoneEdit
//**FUNCTION sửa phone */
function capNhatPhone(id) {
  //Reset thông báo - getPhone id - showModal
  hideTbForm();
  getPhone(id);
  showModal(myModal);
}
// Tạo biến chứa index cần tìm để edit
let indexEdit = "";
//**FUNCTION lấy thông tin Phone và show lên form */
function getPhone(id) {
  //Bật loading
  loadingOn();
  axios({
    url: `${BASE_URL}/phone/${id}`,
    method: "GET",
  })
    .then(function (res) {
      //Tắt loading
      loadingOff();
      console.log(res);
      //RenderPhone lên form
      renderPhone(res.data);
      phoneEdit = res.data;
      console.log("phoneEdit: ", phoneEdit);
      indexEdit = phoneEdit.id;
      console.log("indexEdit: ", indexEdit);
      togEnable("btnSuaPhone");
      togDisable("btnThemPhone");
    })
    .catch(function (err) {
      loadingOff();
      console.log(err);
    });
}
//**FUNCTION cập nhật */

function suaPhone() {
  // lấy thông tin đã sửa
  loadingOn();
  newPhone = layThongTinTuForm();
  console.log("newPhone: ", newPhone);
  // Kiểm tra valid
  var isValid = checkIsValid(newPhone);
  console.log("checkIsValid(newPhone): ", checkIsValid(newPhone));
  // Kiểm tra trùng
  // validation.kiemTraTrung(newPhone.name, "tbName", "Tên sản phẩm bị trùng");
  console.log("isValid: ", isValid);
  // Nếu isValid = true
  if (isValid == true) {
    axios({
      url: `${BASE_URL}/phone/${indexEdit}`,
      method: "PUT",
      data: newPhone,
    })
      .then(function (res) {
        loadingOff();
        console.log("res: ", res);
        getDSPhone();
        hideModal(myModal);
        // Enable thêm phone và Disable ô sửa
        togEnable("btnThemPhone");
        togDisable("btnSuaPhone");
        resetThongTin();
      })
      .catch(function (err) {
        loadingOff();
        console.log("err: ", err);
      });
  }
}
//**FUNCTION tìm kiếm phone */
function searchPhone() {
  loadingOn();
  axios({
    url: `${BASE_URL}/phone`,
    method: "GET",
  })
    .then(function (res) {
      //Tắt loading
      loadingOff();
      console.log(res);
      // Tạo biến chứa input - tên cần tìm
      let nameSearch = document.getElementById("txtSearch").value;
      // Tìm index trong mảng theo tên
      let indexSearch = searchNameForIndex(res.data, nameSearch);
      //Show thông tin lên form
      if (indexSearch != -1) {
        getPhone(indexSearch);
        // togDisable("txtMaSV");
        showModal(myModal);
        togDisable("btnThemPhone");
        togEnable("btnSuaPhone");
        resetInput("txtSearch");
      } else {
        alert(` Không tìm thấy ${nameSearch}`);
        resetThongTin();
        resetInput("txtSearch");
      }
    })
    .catch(function (err) {
      loadingOff();
      console.log(err);
    });
}
// 1. get toàn bộ dsphone
// 2. tìm phone.name = input
// 3. trả về phone.id = codeEdit
// 4. show thông tin phone[codeEdit] lên form
// 5. Cập nhật phone[codeEdit]
//**FUNC rs form */
function resetForm() {
  console.log("model show");
  resetThongTin();
  togDisable("btnSuaPhone");
  togEnable("btnThemPhone");
  hideTbForm();
}
