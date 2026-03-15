# Lộ trình học tập & Hosting cho GleWorks

> Status: tài liệu này là lộ trình học tập / kế hoạch định hướng. Nó không mô tả trạng thái triển khai hiện tại của repo.

Lộ trình này tận dụng dự án `GleWorks` làm case study thực tế để bạn vừa học vừa xây dựng hệ thống hosting cho chính mình.

---

## 🟢 Giai đoạn 1: Containerizing & K8s Hosting (Tuần 1-2)
*Mục tiêu: Đưa GleWorks lên chạy trên Cluster K3s.*

1. **Production Dockerfile**: Tối ưu hóa Dockerfile hiện có (sử dụng multi-stage build cho Vite + Nginx).
2. **K8s Manifests**: Viết file YAML (Deployment & Service) cụ thể cho GleWorks.
3. **Local Ingress**: Cấu hình để bạn có thể truy cập `gleworks.local` từ trình duyệt máy mình.

---

## 🔵 Giai đoạn 2: Infrastructure with Terraform (Tuần 3)
*Mục tiêu: Quản lý "nhà" cho GleWorks bằng code.*

1. **Project Setup**: Tạo folder `terraform/` trong GleWorks.
2. **K8s Resources**: Dùng Terraform để tạo Namespace `gleworks-prod` và quản lý các giới hạn tài nguyên (Resource Quotas).

---

## 🟡 Giai đoạn 3: Configuration with Ansible (Tuần 4)
*Mục tiêu: Tự động hóa các tác vụ lặp lại.*

1. **Secret Management**: Dùng Ansible Vault để quản lý các biến môi trường nhạy cảm cho GleWorks.
2. **Maintenance**: Viết playbook để backup dữ liệu hoặc update phiên bản K3s.

---

## 🟣 Giai đoạn 4: GitOps with Argo CD (Tuần 5-6)
*Mục tiêu: Quy trình hosting chuyên nghiệp.*

1. **Argo CD Setup**: Cài đặt Argo CD lên K3s.
2. **The Magic**: Kết nối repo GleWorks vào Argo CD. Mỗi khi bạn `git push`, Argo CD sẽ tự động nhận ra thay đổi và cập nhật ứng dụng đang chạy.

---

### 🚀 Hãy bắt đầu ngay với bài đầu tiên:
Bạn có muốn tôi giúp bạn kiểm tra và tối ưu hóa file `Dockerfile` hiện tại của GleWorks để nó "chuẩn chỉnh" cho việc chạy trên Kubernetes không?
