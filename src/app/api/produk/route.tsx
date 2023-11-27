import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient, Produk } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    // get request body
    const { nama_produk, harga, kategoriId, statusId }: Produk =
      await req.json();

    // if nama_produk is exist
    const produk = await prisma.produk.findFirst({
      where: {
        nama_produk,
      },
    });

    // if nama_produk is exist, throw error
    if (produk) {
      return NextResponse.json(
        {
          message: "Produk sudah ada",
          status: false,
        },
        { status: 409 }
      );
    }

    // create new produk
    const newProduk = await prisma.produk.create({
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
        message: "Produk berhasil ditambahkan",
        status: true,
        data: newProduk,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
