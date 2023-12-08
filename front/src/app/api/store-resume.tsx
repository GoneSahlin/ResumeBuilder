"use server";

import { currentUser } from "@clerk/nextjs";
import clientPromise from "./mongodb";
import { Resume } from "../lib/definitions";
import { ObjectId } from "mongodb";

export async function storeResume(resume: Resume) {
  const user = await currentUser();
  const userId = user?.id;

  // create doc
  const doc = {
    "userId": userId,
    ...resume,
  }

  // connection
  const client = await clientPromise;
  const db = client.db("resume_builder");
  const resumes_col = db.collection("resumes");

  // replace
  const filter = {"_id": ObjectId.createFromHexString(resume.id)}
  const options = { upsert: true };
  resumes_col.replaceOne(filter, doc, options);
}
