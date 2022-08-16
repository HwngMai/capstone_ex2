//model.js là file chứa các khuôn mẫu cho obj(khuôn mẫu = các lớp đối tượng)
//khai báo khuôn mẫu cho obj SinhVien
function Phone(name, price, img, screen, backCamera, frontCamera, desc, type) {
  this.name = name;
  this.price = price;
  this.img = img;
  this.screen = screen;
  this.backCamera = backCamera;
  this.frontCamera = frontCamera;
  this.desc = desc;
  this.type = type;
}
