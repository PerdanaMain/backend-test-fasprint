# Ini Merupakan directory untuk penyimpanan project backend-test

note:
`Project ini dibuat menggunakan framework NextJS`
`Data produk tidak menggunakan API yang disediakan oleh fastprint, karena Username dan Password yang diberikan tidak valid`
`Project ini menggunakan rest api untuk komunikasi data antara frontend dan backend`

### API Documentation

`Create Product : POST http://localhost:3000/api/produk/`
`Update Product : PUT http://localhost:3000/api/produk/:id`
`Delete Product : DELETE http://localhost:3000/api/produk/:id`

## Project setup

`Pastikan anda sudah menginstall nodejs dan npm`
`Clone project ini`
`Buka terminal dan arahkan ke directory project ini`
`Jalankan perintah npm install`
`Ikuti langkah pada bagian Prisma Setup`
`Buka browser dan ketikkan http://localhost:3000/`

## Prisma Setup

`Sesuaikan database MySQL yang akan digunakan pada file .env`
`Jalankan perintah npx prisma migrate dev `
`Jalankan perintah npx prisma generate`
`Jalankan perintah npx prisma db seed `
