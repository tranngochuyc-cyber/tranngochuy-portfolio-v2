# PROGRESS — `tranngochuy-portfolio-v2` (Bản nâng cấp hướng Nhà tuyển dụng)

## ĐỌC NHANH
- **Mục tiêu:** Nâng cấp portfolio của Trần Ngọc Huy chuẩn nhà tuyển dụng (giữ bản sắc đại dương `0 m → 11.000 m`, chỉ 1 ảnh chân dung đầu trang), trưng bày 3 video edit nổi bật từ `G:\My Drive\Portfolio` theo giá trị mang lại, nâng cấp ảnh & demo Study Space Finder, thay game bằng **SKY SLING** kiểu Angry Birds, bỏ phần Multi-Agent và sửa triệt để lỗi giao diện/icon/animation.
- **Vị trí dự án mới (không ghi đè bản cũ):** `D:\folder lv\folder IT\code\video_AI\tranngochuy-portfolio-v2` (nhánh git `v2-recruiter-upgrade`).
- **Trạng thái hiện tại:** **HOÀN TẤT & ĐÃ XÁC MINH 2×2 CÂN ĐỐI.** Đã bổ sung video dọc thứ 4 (`media/video-b2b-social-proof.mp4`) và sắp xếp lưới `.reels-grid` dạng 2×2 đối xứng (không còn khoảng trống bên phải ở cả `900px` lẫn `1440px`, `0` lỗi console/network). Server xem trước chạy tại `http://127.0.0.1:8765/`.
- **Bước kế:** Chờ bạn tải lại trang xem bản mới hoặc báo thêm hạng mục cần tinh chỉnh / xuất bản.

## Nhật ký
- **2026-11-23 16:03** — Bổ sung video thứ 4 từ `G:\My Drive\Portfolio\ads.mp4` (`media/video-b2b-social-proof.mp4` 5.1 MB + poster) và chuyển `.reels-grid` sang lưới 2×2 cân đối (`repeat(2, minmax(0,1fr))`, thẻ ngang `205px 1fr` trên desktop `>1040px`, thẻ dọc 2 cột trên `661–1040px`). Kiểm thử trình duyệt `900×900` & `1440×900`: ĐẠT (`16/16` request OK, Video 4 phát mượt, `0` lỗi console).
- **2026-11-23 14:31** — Phân tích xong CV mẫu `nguyenhoangdan` và trang live cũ `tranngochuy-portfolio`.
- **2026-11-23 14:34** — Clone repo gốc vào `D:\folder lv\folder IT\code\video_AI\tranngochuy-portfolio-v2`, nhánh `v2-recruiter-upgrade`.
- **2026-11-23 14:54** — Hoàn thiện & kiểm thử vòng 1 (`4/4` ĐẠT: sửa reveal mobile, navbar tablet `<=1040px`, inline code, vignette chân dung).
- **2026-11-23 15:06** — Quét 7 video tại `G:\My Drive\Portfolio`, chọn 3 video nổi bật và đa dạng nhất (`talking_head_01.mp4`, `claude_review.mp4`, `Ads_childcare.mp4`), nén bản web nhẹ (`~1.6–3.5 MB`, `faststart`) + trích poster sắc nét vào `media/`, xóa 2 video cũ ở vòng 1.
- **2026-11-23 15:14** — Nâng cấp giao diện Study Space Finder tại `demos/study-space-finder/index.html` kèm 3 ảnh nội thất mới (`hero-cafe.jpg`, `space-library.jpg`, `space-coworking.jpg`) và chụp lại `media/studyspace.jpg`, `media/studyspace-2.jpg`. Dựng mới game vật lý kiểu Angry Birds (**SKY SLING**, 3 loại chim, 3 màn chơi, 3 chất liệu gỗ/kính/đá, Web Audio SFX) tại `demos/sky-sling/index.html` và chụp thực tế `media/skysling.jpg`, `media/skysling-2.jpg`.
- **2026-11-23 15:23** — Cập nhật `index.html` (3 video Drive + Antigravity viết theo giá trị mang lại, 7 dự án, bỏ hoàn toàn Multi-Agent & Tàn Tro Mùa Gặt, sửa nguyên nhân lệch icon `.qnav-ic` do selector `.qnav-item span` đè `display:block`). Kiểm thử trực quan vòng 2 Desktop `1440×900` + Mobile `390×844`: **5/5 ĐẠT**, `0` lỗi console, `0` tràn ngang.
