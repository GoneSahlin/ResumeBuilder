"use server";

import { currentUser } from "@clerk/nextjs";
import clientPromise from "./mongodb";
import { PdfData } from "../lib/definitions";

export async function fetchPdfs() {
  // add userId to doc
  const user = await currentUser();
  const userId = user?.id;

  // connection
  const client = await clientPromise;
  const db = client.db("resume_builder");
  const pdf_urls_col = db.collection("pdf_urls");

  // fetch
  const filter = {"userId": userId};
  const docs = await pdf_urls_col.find(filter).toArray();

  if (!docs) {
    return [];
  }

  return [] as Array<PdfData>;

  // format pdf_url
  // const pdfs: Array<PdfData> = docs.map((doc) => {return doc as PdfData});

  // return pdfs;
}