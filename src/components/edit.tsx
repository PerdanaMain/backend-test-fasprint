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

const Edit = ({
  kategori,
  sts,
  produk,
}: {
  kategori: Kategori[];
  sts: Status[];
  produk: RelationProduk;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [name, setName] = useState(produk.nama_produk);
  const [nominal, setNominal] = useState(String(produk.harga));
  const [category, setCategory] = useState(produk.kategori.nama_kategori);
  const [status, setStatus] = useState(produk.status.nama_status);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsloading(true);

    // validation form
    if (name === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nama produk tidak boleh kosong",
      });
      setIsloading(false);
      return;
    } else if (nominal === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nominal tidak boleh kosong",
      });
      setIsloading(false);
      return;
    } else if (category === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Kategori tidak boleh kosong",
      });
      setIsloading(false);
      return;
    } else if (status === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Status tidak boleh kosong",
      });
      setIsloading(false);
      return;
    }

    // nominal must be number
    const nominalNumber = Number(nominal);
    if (isNaN(nominalNumber)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nominal harus berupa angka",
      });
      setIsloading(false);
      return;
    }
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Kamu tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Ubah!",
      cancelButtonText: "Tidak, batalkan!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(
            `http://localhost:3000/api/produk/${produk.id_produk}`,
            {
              nama_produk: name,
              harga: nominalNumber,
              kategoriId: Number(category),
              statusId: Number(status),
            }
          );
          if (res.status == 200) {
            Swal.fire({
              title: "Berhasil!",
              text: res.data.message,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              handleModal();

              router.refresh();
            });
          }
        } catch (error: any) {
          Swal.fire({
            title: "Gagal!",
            text: error.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Dibatalkan", "Produk tidak diperbarui", "error");
      }
      setIsloading(false);
    });
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-sm btn-secondary mr-2"
        onClick={handleModal}
      >
        Edit
      </button>

      {/* Modal */}
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-large text-center mb-3">
            Edit Produk {produk.id_produk}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full mt-2">
              <label className="label font-bold">Nama Produk</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Masukkan Nama Produk"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-control w-full mt-2">
              <label className="label font-bold">Nominal</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Enter the nominal"
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
              />
            </div>

            <div className="form-control w-full mt-2">
              <label className="label font-bold">Kategori</label>
              <select
                className="select select-bordered"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={produk.kategori.id_kategori} selected hidden>
                  {produk.kategori.nama_kategori}
                </option>
                {kategori.map((ktg, index) => (
                  <option value={ktg.id_kategori} key={index}>
                    {ktg.nama_kategori}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full mt-2">
              <label className="label font-bold">Status</label>
              <select
                className="select select-bordered"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={produk.status.id_status} selected hidden>
                  {produk.status.nama_status}
                </option>
                {sts.map((s, index) => (
                  <option value={s.id_status} key={index}>
                    {s.nama_status}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action mt-5">
              <button
                type="button"
                className="btn mr-2 w-auto"
                onClick={handleModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {isLoading ? (
                  <div>
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                    Processing...
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* End Modal */}
    </div>
  );
};

export default Edit;
