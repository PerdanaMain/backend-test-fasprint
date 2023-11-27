import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  
  // kategories
  await prisma.kategori.createMany({
    data:[
      {
        id_kategori: 1,
        nama_kategori: 'Fashion',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_kategori: 2,
        nama_kategori: 'Makanan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_kategori: 3,
        nama_kategori: 'Minuman',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  })

  // status
  await prisma.status.createMany({
    data:[
      {
        id_status: 1,
        nama_status: 'Bisa Dijual',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_status: 2,
        nama_status: 'Tidak Bisa Dijual',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  })



  // produk
  await prisma.produk.createMany({
    data: [
      {
        id_produk: 1,
        nama_produk: 'Baju',
        harga: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
        kategoriId: 1,
        statusId: 1,
      },
      {
        id_produk: 2,
        nama_produk: 'Celana',
        harga: 200000,
        createdAt: new Date(),
        updatedAt: new Date(),
        kategoriId: 1,
        statusId: 1,
      },
      {
        id_produk: 3,
        nama_produk: 'Sepatu',
        harga: 300000,
        createdAt: new Date(),
        updatedAt: new Date(),
        kategoriId: 1,
        statusId: 1,
      },
      {
        id_produk: 4,
        nama_produk: 'Jaket',
        harga: 400000,
        createdAt: new Date(),
        updatedAt: new Date(),
        kategoriId: 1,
        statusId: 1,
      },
      {
        id_produk: 5,
        nama_produk: 'Topi',
        harga: 500000,
        createdAt: new Date(),
        updatedAt: new Date(),
        kategoriId: 1,
        statusId: 2,
      },
    ]
  })


  
}

// run main
main()
.then(async() => {
  await prisma.$disconnect();
})
.catch(async(e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
})