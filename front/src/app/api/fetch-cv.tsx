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

  // fetch
  const filter = {"userId": userId};
  const doc = await cvs.findOne(filter);

  if (!doc) {
    return {};
  }

  // format cv
  const cv: any = {};

  const string_fields: Array<string> = ["firstName", "lastName", "phone", "email", "github", "linkedin"];
  string_fields.map((field) => {
    cv[field] = doc[field] ? doc[field] : "";
  });

  const array_fields: Array<string> = ["educations", "projects", "research", "workExperience", "relatedCoursework", "technicalSkills"];
  array_fields.map((field) => {
    cv[field] = doc[field] ? doc[field] : [];
  });

  return cv;
}