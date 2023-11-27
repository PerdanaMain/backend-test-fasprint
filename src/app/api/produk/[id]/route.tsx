import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Produk } from "@prisma/client";

const prisma = new PrismaClient();

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // get request body
    const { nama_produk, harga, kategoriId, statusId }: Produk =
      await req.json();

    // update produk
    const updateProduk = await prisma.produk.update({
      where: {
        id_produk: Number(params.id),
      },
      data: {
        nama_produk,
        harga,
        kategoriId,
        statusId,
      },
    });

    // return response
    return NextResponse.json(
      {
        message: "Produk berhasil diupdate",
        status: true,
        data: updateProduk,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // delete produk
    await prisma.produk.delete({
      where: {
        id_produk: Number(params.id),
      },
    });

    // return response
    return NextResponse.json(
      {
        message: "Produk berhasil dihapus",
        status: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
