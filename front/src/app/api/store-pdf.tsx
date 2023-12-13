"use server";

import { currentUser } from "@clerk/nextjs";
import clientPromise from "./mongodb";
import { PdfData } from "../lib/definitions";

export async function storePdfData(pdfData: PdfData) {
  const user = await currentUser();
  const userId = user?.id;

  // create doc
  const doc = {
    "userId": userId,
    "pdfUrl": pdfData.pdfUrl,
    "updatedAt": Date.now(),
    "resumeId": pdfData.resumeId,
    "resumeUpdatedAt": pdfData.resumeUpdatedAt,
  }

  // connection
  const client = await clientPromise;
  const db = client.db("resume_builder");
  const resumes_col = db.collection("pdf_urls");

  // replace
  const filter = {"userId": userId, "resumeId": pdfData.resumeId}
  const options = { upsert: true };
  resumes_col.replaceOne(filter, doc, options);
}
