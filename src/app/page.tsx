import { PrismaClient } from "@prisma/client";
import Add from "../components/add";
import Edit from "../components/edit";
import Delete from "@/components/delete";

const prisma = new PrismaClient();
const getProduk = async () => {
  const produk = await prisma.produk.findMany({
    select: {
      id_produk: true,
      nama_produk: true,
      harga: true,
      kategori: true,
      status: true,
    },
    where: {
      statusId: 1,
    },
    orderBy: {
      id_produk: "desc",
    },
  });
  return produk;
};

const getKategori = async () => {
  const kategori = await prisma.kategori.findMany({
    select: {
      id_kategori: true,
      nama_kategori: true,
    },
  });
  return kategori;
};
const getStatus = async () => {
  const status = await prisma.status.findMany({
    select: {
      id_status: true,
      nama_status: true,
    },
  });
  return status;
};

const Page = async () => {
  const [produk, kategori, status] = await Promise.all([
    getProduk(),
    getKategori(),
    getStatus(),
  ]);

  return (
    <div>
      <div className="mb-2">
        <Add kategori={kategori} sts={status} />
      </div>
      <table className="table w-full">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Kategori</th>
            <th>Status</th>
            <th className="tag-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((p, index) => (
            <tr key={p.id_produk} className="text-center">
              <td>{index + 1}</td>
              <td>{p.nama_produk}</td>
              <td>Rp. {p.harga.toLocaleString("id-ID")}</td>
              <td>{p.kategori.nama_kategori}</td>
              <td>{p.status.nama_status}</td>
              <td className="flex justify-center">
                <Edit kategori={kategori} sts={status} produk={p} />
                <Delete produk={p} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
