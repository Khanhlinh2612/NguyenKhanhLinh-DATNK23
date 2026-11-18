## 1. Giới thiệu dự án

**Klinh Beauty** là dự án xây dựng website kinh doanh mỹ phẩm trực tuyến, hướng đến việc cung cấp giao diện mua sắm thân thiện, dễ sử dụng và hỗ trợ khách hàng tìm kiếm, lựa chọn sản phẩm phù hợp.

Dự án được phát triển bằng ReactJS kết hợp với Vite, sử dụng Tailwind CSS và CSS để xây dựng giao diện người dùng.

## 2. Công nghệ sử dụng

| Công nghệ | Vai trò |
|---|---|
| ReactJS | Xây dựng giao diện người dùng |
| Vite | Công cụ khởi tạo và chạy dự án |
| JavaScript | Ngôn ngữ lập trình |
| Tailwind CSS 3.4.17 | Hỗ trợ thiết kế giao diện |
| CSS | Tùy chỉnh bố cục và giao diện |
| Axios | Thư viện hỗ trợ gửi HTTP request |
| React Router DOM | Hỗ trợ điều hướng giữa các trang |
| LocalStorage | Lưu trữ dữ liệu trên trình duyệt |
| npm | Quản lý các thư viện |

## 3. Yêu cầu môi trường

- Hệ điều hành: macOS, Windows hoặc Linux.
- Node.js: Phiên bản tương thích với Vite đang sử dụng.
- npm: Được cài đặt kèm Node.js.
- Visual Studio Code hoặc IDE tương đương.
- Trình duyệt web: Google Chrome, Microsoft Edge hoặc Safari.

Kiểm tra môi trường bằng các lệnh:

```bash
node -v
npm -v
```

## 4. Cài đặt dự án

### Bước 1: Tải mã nguồn

Clone repository từ GitHub:

```bash
git clone https://github.com/Khanhlinh2612/NguyenKhanhLinh-DATNK23.git
```

Di chuyển vào thư mục dự án:

```bash
cd NguyenKhanhLinh-DATNK23
```

### Bước 2: Cài đặt thư viện

Chạy lệnh:

```bash
npm install
```

Lệnh này sẽ cài đặt các thư viện được khai báo trong `package.json`.

### Bước 3: Khởi chạy dự án

Chạy lệnh:

```bash
npm run dev
```

Sau khi khởi động thành công, Vite sẽ hiển thị địa chỉ truy cập trên Terminal. Theo cấu hình mặc định, địa chỉ thường là:

```text
http://localhost:5173
```

Mở địa chỉ này trên trình duyệt để sử dụng website.

## 5. Các chức năng chính

Website Klinh Beauty hiện được xây dựng với các chức năng:

- Hiển thị danh sách sản phẩm mỹ phẩm.
- Tìm kiếm và lọc sản phẩm.
- Xem thông tin chi tiết sản phẩm.
- Đăng ký và đăng nhập giao diện người dùng.
- Quản lý danh sách sản phẩm yêu thích.
- Thêm sản phẩm vào giỏ hàng.
- Thực hiện quy trình đặt hàng.
- Hỗ trợ phương thức thanh toán khi nhận hàng (COD) và chuyển khoản.
- Theo dõi và quản lý trạng thái đơn hàng.
- Đánh giá sản phẩm sau khi hoàn thành đơn hàng.
- Giao diện quản trị hỗ trợ theo dõi đơn hàng và trạng thái thanh toán.

**Lưu ý:** Phiên bản hiện tại sử dụng dữ liệu lưu trữ trên trình duyệt bằng LocalStorage. Các chức năng Backend, API và cơ sở dữ liệu tập trung chưa được tích hợp.

## 6. Cấu trúc thư mục

```text
Klinh_Beauty/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── style.css
│
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

*Lưu ý: Cấu trúc thư mục `src/` có thể được điều chỉnh theo mã nguồn thực tế của dự án.*

## 7. Xây dựng phiên bản triển khai

Để tạo bản build phục vụ triển khai, chạy:

```bash
npm run build
```

Sau khi hoàn tất, Vite tạo thư mục `dist/` chứa các tệp đã được tối ưu hóa.

Để xem thử bản build:

```bash
npm run preview
```

## 8. Tác giả

**Dự án:** Phân tích và thiết kế website mỹ phẩm Klinh Beauty.

**Mục đích:** Đồ án tốt nghiệp.

**Repository:** https://github.com/Khanhlinh2612/NguyenKhanhLinh-DATNK23

---

© 2026 Klinh Beauty. All rights reserved.