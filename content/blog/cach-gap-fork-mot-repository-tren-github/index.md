---
title: Cách gắp (fork) một repository trên Github
date: '2015-03-19T22:12:03.284Z'
tags: ['how-to']
---

Đây là bản Việt hoá của [link gốc](https://help.github.com/articles/fork-a-repo/) từ Github:

1 bản gắp (fork) là 1 bản sao của một repository (tạm dịch là một kho lệnh, ở bài này mình sẽ viết là repo cho ngắn). Gắp giúp bạn thoải mái thí nghiệm một repo (thay đổi code, xoá các phần thừa bạn muốn, v.v..) mà không ảnh hưởng tới bản gốc ban đầu.

Thông thường, các bản gắp cũng được sử dụng để đề xuất các thay đổi tới chương trình (bao gồm mã nguồn bạn vừa gắp về) của người khác, hoặc là sử dụng các đoạn code của người khác viết sẵn để bắt đầu thiết kế ý tưởng của riêng bạn.

### Đề xuất thay đổi tới chương trình của người khác

Một ví dụ tiêu biểu cho việc gắp để đề xuất thay đổi là sửa lỗi phần mềm. Thay vì chỉ ghi lại vấn đề của một lỗi mà bạn vừa thấy, bạn có thể:

- Gắp chương trình về
- Sửa lỗi
- Đề xuất nhập mã code (pull request) tới chủ chương trình
  Nếu chủ chương trình thấy việc sửa lỗi của bạn là phù hợp, họ sẽ kéo đoạn sửa của bạn vào chương trình gốc!

### Sử dụng chương trình của người khác để bắt đầu thiết kế ý tưởng của riêng bạn.

Điều thú vị nhất của "mã nguồn mở" là bằng việc chia sẻ code, ta có thể cùng nhau xây dựng những phần mềm tốt hơn, đáng tin cậy hơn.

Khi bạn tạo một repo công khai từ bản gắp từ một chương trình của người khác, hãy chắc chắn rằng chương trình đã bao gồm một tập tin chứa Giấy phép (LICENSE file) để cho bạn biết bạn được chia sẻ chương trình của bạn với người khác như thế nào (khi sử dụng chương trình có sẵn của họ).

Để biết thêm thông tin về mã nguồn mở, đặc biệt là làm sao để tạo và duy trì một dự án mã nguồn mở, bạn có thể đọc "Open Source Guides" (tiếng Anh) để giúp bạn có thể tạo nên một cộng đồng mã nguồn mở lành mạnh, bằng cách đề xuất những điều nên làm để tạo và duy trì repo cho dự án mã nguồn mở của bạn.

I. Gắp một repo mẫu

Việc gắp một repo rất đơn giản, chỉ bao gồm 2 bước. Sau đây mình sẽ sử dụng một repo mẫu để thực hành nhé!

Vào Github, truy cập repo `octocat/Spoon-Knife`

Tại góc trên bên phải trang web, click "Fork"
Vậy là bạn đã xong rồi đó! Bây giờ là bạn đã có một bản gắp của repo gốc `octocat/Spoon-Knife`

II. Giữ cho bản gắp của bạn luôn được cập nhật

Có thể bạn sẽ cần gắp một chương trình để đề xuất thay đổi tới `upstream` repo (repo gốc). Trong trường hợp này, bạn nên có thói quen thường xuyên đồng bộ bản gắp của bạn với bản gốc. Để làm điều này, bạn cần sử dụng dòng lệnh Git. Bạn có thể tiếp tục thực hành cài đặt việc đồng bộ từ repo `octocat/Spoon-Knife` mà bạn vừa mới gắp!

Cài đặt gitNếu bạn vẫn chưa cài đặt git thì bạn nên làm ngay bây giờ. Đây là [link hướng dẫn](http://rogerdudler.github.io/git-guide/index.vi.html):  (hiện tại bạn chỉ cần tải về git và càt đặt)
Tạo một bản sao về máy tính của bạn từ bản gắpBây giờ, bạn đã có bản gắp của repo Spoon-Knife, nhưng bạn chưa có những tập tin của repo đó trong máy của bạn. Hãy tạo một bản sao từ bản gắp về máy tính.
Tại trang Github, đi tới bản gắp của bạn
Dưới tên repo, nhấn "Clone or download" 
Tại phần "Clone with HTTPs", sao chép URL của repo 
Đối với máy tính Windows, mở Git Bash (trình git mà bạn đã cài đặt ở bên trên hướng dẫn này), đối với Linux và macOS, mở Terminal.
Gõ `git clone` và sau đó dán URL mà bạn đã sao chép ở trên. Dòng lệnh sẽ như dưới đây (YOUR-USERNAME là tên người dùng github của bạn)

```bash
$ git clone https://github.com/YOUR-USERNAME/Spoon-Knife
Nhấn Enter. Bản sao về máy tính của bạn sẽ được tải về.
$ git clone https://github.com/YOUR-USERNAME/Spoon-Knife
Cloning into `Spoon-Knife`...
remote: Counting objects: 10, done.
remote: Compressing objects: 100% (8/8), done.
remove: Total 10 (delta 1), reused 10 (delta 1)
Unpacking objects: 100% (10/10), done.
```

Bây giờ là bạn đã có bản sao từ bản gắp repo Spoon-Knife!

Cài đặt Git để đồng bộ bản gắp với bản gốc từ repo Spoon-Knife 
Khi bạn gắp một chương trình về để đề xuất thay đổi tới bản gốc, bạn cần cấu hình cho Git để lấy các cập nhật từ bản gốc (gọi là upstream) về bản sao của bạn.

Tại Github, đi tới repo gốc octocat/Spoon-Knife.
Làm tương tự như bước 2 (Nhấn nút Clone or download và copy URL của repo gốc đó)
Mở Gitbash (Windows) hoặc Terminal (macOS, Linux)
Điều hướng tới thư mục mà chứa bản gắp mà bạn vừa tạo từ bước 2.

- Để đi tới thư mục gốc, chỉ cần gõ `cd`
- Để liệt kê danh sách các tập tin và thư mục tại thư mục bạn đang ở, gõ `ls`
- Để tới một trong những thư mục trong danh sách trên, gõ `cd <tên-thư-mục-bạn-muốn-tới>`
- Để quay lại thư mục mẹ, gõ `cd ..`
  Gõ `git remote -v` và Enter. Bạn sẽ thấy cấu hình hiện tại của repo gắp của
  bạn:

```bash
  $ git remote -v
origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
```

Gõ "git remote add upstream" và sau đó dán URL của repo gốc mà bạn vừa lấy ở
trên và Enter, dòng lệnh nên như thế này:

```bash
$ git remote add upstream https://github.com/octocat/Spoon-Knife.git
```

Để kiểm tra xem repo gốc đã có thông tin trong bản gắp của bạn, gõ "git remote
-v" thêm lần nữa. Bạn sẽ nhìn thấy URL của bản gắp là origin và URL của bản
gốc là upstream:

```bash
$ git remote -v
origin https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
```
