"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import { Kategori, Status } from "@prisma/client";

type RelationProduk = {
  id_produk: number;
  nama_produk: string;
  harga: number;
  createdAt: Date;
  updatedAt: Date;
  kategori: {
    id_kategori: number;
    nama_kategori: string;
  };
  status: {
    id_status: number;
    nama_status: string;
  };
};

const Delete = ({ produk }: { produk: RelationProduk }) => {
  const router = useRouter();

  const handleModal = () => {
    Swal.fire({
      title: `Are you sure to delete ${produk.nama_produk}?`,
      text: "Data yang anda hapus tidak bisa kembali!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:3000/api/produk/${produk.id_produk}`
        );
        if (response.status === 200) {
          Swal.fire(
            "Deleted!",
            "Your imaginary file has been deleted.",
            "success"
          );
          router.refresh();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-sm btn-error"
        onClick={handleModal}
      >
        Delete
      </button>
    </div>
  );
};

export default Delete;
