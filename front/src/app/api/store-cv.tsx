"use server";

import { currentUser } from '@clerk/nextjs';
import { cleanData } from "./clean-data";
import clientPromise from "./mongodb";

export async function storeCV(data: any) {
  // clean data
  const doc = await cleanData(data);

  // add userId to doc
  const user = await currentUser();
  const userId = user?.id;
  doc["userId"] = userId;

  // connection
  const client = await clientPromise;
  const db = client.db("resume_builder");
  const cvs = db.collection("cvs");

  console.log(doc)

  // replace
  const filter = {"userId": userId}
  const options = { upsert: true };
  cvs.replaceOne(filter, doc, options);
}