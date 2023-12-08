"use server";

import { currentUser } from "@clerk/nextjs";
import clientPromise from "./mongodb";

export async function storeResumes(pdfUrls: Array<string>) {
  const user = await currentUser();
  const userId = user?.id;

  // create doc
  const doc = {
    "userId": userId,
    "pdfUrls": pdfUrls,
  }

  // connection
  const client = await clientPromise;
  const db = client.db("resume_builder");
  const resumes_col = db.collection("pdf_urls");

  // replace
  const filter = {"userId": userId}
  const options = { upsert: true };
  resumes_col.replaceOne(filter, doc, options);
}
