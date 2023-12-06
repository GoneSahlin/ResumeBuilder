"use server";

import { currentUser } from "@clerk/nextjs";
import clientPromise from "./mongodb";

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
  const doc = await pdf_urls_col.findOne(filter);

  if (!doc) {
    return [];
  }

  // format pdf_url
  const pdf_urls: Array<string> = doc.pdf_urls.map((pdf_url: string) => {
    return pdf_url as string;
  })

  return pdf_urls;
}