"use server";

import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";

export async function deleteResume(resumeId: string) {
  console.log(resumeId.toString(), resumeId)
  // connection
  const client = await clientPromise;
  const db = client.db("resume_builder");
  const col = db.collection("resumes");

  // create filter
  const filter = {"_id": ObjectId.createFromHexString(resumeId)}

  // delete resume
  await col.deleteOne(filter);
}
