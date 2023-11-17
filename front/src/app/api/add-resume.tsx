"use server";

import { currentUser } from "@clerk/nextjs";
import clientPromise from "./mongodb";

export async function addResume(data: any) {
  const user = await currentUser();
  const userId = user?.id;

  const doc = {
    "userId": userId,
    "resumeName": data.resumeName
  }

  // connection
  const client = await clientPromise;
  const db = client.db("resume_builder");
  const resumes = db.collection("resumes");

  // insert
  resumes.insertOne(doc);
}