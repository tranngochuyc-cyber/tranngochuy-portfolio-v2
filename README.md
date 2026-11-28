# PORTFOLIO v2 — TRẦN NGỌC HUY

**Software Engineering (50%) · Quality Engineering (25%) · AI Engineering (25%) · Game & Edit Video / Motion Graphics**

🌐 **Xem trực tiếp (GitHub Pages):** https://tranngochuyc-cyber.github.io/tranngochuy-portfolio-v2/

> **Lưu ý:** Đây là repository phiên bản nâng cấp độc lập (`tranngochuy-portfolio-v2`), **không ghi đè** lên trang gốc [`tranngochuy-portfolio`](https://github.com/tranngochuyc-cyber/tranngochuy-portfolio).

## Cấu trúc 5 phần chính

1. **Trang chủ (`index.html`):** Hero tổng quan cùng ảnh chân dung `media/avatar-huy.jpg`, tỷ trọng định hướng `50/25/25`, bản đồ 4 trang nhánh cân đối `2×2` và thanh mở nhanh bản CV in PDF A4 / Liên hệ.
2. **Giới thiệu (`profile.html`):** Khối thông tin cá nhân kèm ảnh chân dung thứ 2 (`media/huy-profile.jpg`), nền tảng học tập CNTT tại Đại học Lạc Hồng (`25CT113`, Biên Hòa, Đồng Nai), định hướng phát triển và 4 nhóm kỹ năng thực hành.
3. **Dự án của tôi (`projects.html`):** Gộp trọn 7 dự án kỹ thuật/học thuật và 5 sản phẩm Edit Video & Motion Graphics kèm bộ lọc 6 nhóm (`Tất cả`, `Edit Video & Motion`, `Web & Full-stack`, `Game`, `AI & Kiểm thử`, `Học thuật & Nhóm`) và quy trình thực hiện 4 bước cho từng dự án:
   - **Web & Full-stack (3):** BIỂN 3D (`Three.js`), Indieverse (`250 game + Supabase`), Study Space Finder (`demos/study-space-finder/index.html`).
   - **Game (1):** SKY SLING — Game Vật Lý Ná Thun (`demos/sky-sling/index.html`).
   - **AI & Kiểm thử (1):** Hệ thống AI Code Review 7 Tầng.
   - **Học thuật & Nhóm (2):** Đồ án Hệ quản trị CSDL (SQL Server 2014 — Quản lý Giải Bóng Đá), Nhóm 3 (Trưởng nhóm 6 tuần) & Bài thi Review Game.
   - **Edit Video & Motion (5):** Before/After Talking-Head, Motion Explainer Claude Opus 5.5, Commercial Ad Dịch vụ & Giáo dục, Talking-Head Apple Style và Antigravity 2.0 (`16:9`, `60fps`).
4. **Kinh nghiệm (`experience.html`):** 4 mốc thực chiến (Trưởng nhóm Nhóm 3, phụ trách lõi SQL Server 2014, phát triển Web/Game 2D độc lập, sản xuất Video & Motion) cùng 4 cách tổ chức công việc & kiểm soát chất lượng.
5. **Triết lý sống (`philosophy.html`):** Tuyên ngôn cốt lõi, 4 nguyên tắc sống & làm việc (Minh chứng thật, Kỷ luật kiểm chứng, Ghi chép mạch lạc, Cầu thị làm lại cho đạt chuẩn) và chặng đường tiếp theo.

*Trang bổ trợ:* `contact.html` (kênh liên hệ, mã QR GitHub, form soạn mail), `cv.html` (bản CV tổng hợp 1 trang chuẩn in PDF A4), `video.html` (chuyển hướng tương thích ngược sang `projects.html?cat=video`).

## Chạy xem trước cục bộ

```powershell
python -m http.server 8765 --bind 127.0.0.1 --directory "D:\folder lv\folder IT\code\video_AI\tranngochuy-portfolio-v2"
```
Truy cập `http://127.0.0.1:8765/` trên trình duyệt.
