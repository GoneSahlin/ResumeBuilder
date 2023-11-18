"use server";

import { currentUser } from "@clerk/nextjs";
import clientPromise from "./mongodb";
import { Resume } from "../lib/definitions";

export async function storeResumes(resumes: Array<Resume>) {
  const user = await currentUser();
  const userId = user?.id;

  // create doc
  const doc = {
    "userId": userId,
    "resumes": resumes,
  }

  // connection
  const client = await clientPromise;
  const db = client.db("resume_builder");
  const resumes_col = db.collection("resumes");

  // replace
  const filter = {"userId": userId}
  const options = { upsert: true };
  resumes_col.replaceOne(filter, doc, options);
}