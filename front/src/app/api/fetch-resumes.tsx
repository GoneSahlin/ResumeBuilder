"use server";

import { currentUser } from "@clerk/nextjs";
import clientPromise from "./mongodb";
import { Resume } from "../lib/definitions";

export async function fetchResumes() {
  // add userId to doc
  const user = await currentUser();
  const userId = user?.id;

  // connection
  const client = await clientPromise;
  const db = client.db("resume_builder");
  const resumes_col = db.collection("resumes");

  // fetch
  const filter = {"userId": userId};
  const doc = await resumes_col.findOne(filter);

  if (!doc) {
    return [];
  }

  // format resume
  const resumes: Array<Resume> = doc.resumes.map((resume: Resume) => {
    return resume as Resume;
  })

  return resumes;
}