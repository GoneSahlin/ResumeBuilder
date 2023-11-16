"use server";

import { currentUser } from '@clerk/nextjs';
import clientPromise from "./mongodb";

export async function fetchCV() {
  // add userId to doc
  const user = await currentUser();
  const userId = user?.id;

  // connection
  const client = await clientPromise;
  const db = client.db("resume_builder");
  const cvs = db.collection("cvs");

  const filter = {"userId": userId};
  const cv = cvs.findOne(filter);

  return cv;
}