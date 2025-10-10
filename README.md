* Tạo page bên trong features, mỗi trang tương ứng với một folder, muốn kiểu builder/a/b thì lồng folder vào nhau muốn gom thành nhóm dùng pattern ( )
* Mỗi page có cấu trúc sau: index.astro, các component
* Trong index chứa RootLayout (layout tổng để render tailwind) mọi component con render ở trong layout này
* Lưu ý khi xây component có sử dụng hook state của react
```
<RootLayout>
    <Section client:only="react"/>
</RootLayout>
```
luôn đặt client:only="react" ở page đó 
