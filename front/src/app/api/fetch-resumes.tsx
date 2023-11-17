"use server";

import { currentUser } from "@clerk/nextjs";
import clientPromise from "./mongodb";

export async function fetchResumes() {
  // add userId to doc
  const user = await currentUser();
  const userId = user?.id;

  // connection
  const client = await clientPromise;
  const db = client.db("resume_builder");
  const resumes = db.collection("resumes");

  // fetch
  const filter = {"userId": userId};
  const docs = await resumes.find(filter).toArray();

  // format
  const string_fields: Array<string> = ["resumeName"];
  const formatted_docs = docs.map((doc) => {
    const formatted: any = {}
    string_fields.forEach((field) => (formatted[field] = doc[field]))
    return formatted;
  });

  return formatted_docs;
}