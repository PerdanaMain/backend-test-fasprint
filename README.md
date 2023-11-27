# Ini Merupakan directory untuk penyimpanan project backend-test

`Note`

1. project ini dibuat menggunakan framework NextJS
2. data produk tidak menggunakan API yang disediakan oleh fastprint, karena Username dan Password yang diberikan tidak valid
3. project ini menggunakan rest api untuk komunikasi data antara frontend dan backend

### API Documentation

1. Create Product : POST http://localhost:3000/api/produk/
2. Update Product : PUT http://localhost:3000/api/produk/:id
3. Delete Product : DELETE http://localhost:3000/api/produk/:id

## Project setup

1. Pastikan anda sudah menginstall nodejs dan npm
2. Clone project ini
3. Buka terminal dan arahkan ke directory project ini
4. Jalankan perintah npm install
5. Ikuti langkah pada bagian Prisma Setup
6. Buka browser dan ketikkan http://localhost:3000/

## Prisma Setup

1. Sesuaikan database MySQL yang akan digunakan pada file .env
2. Jalankan perintah npx prisma migrate dev
3. Jalankan perintah npx prisma generate
4. Jalankan perintah npx prisma db seed
