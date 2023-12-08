"use server";

import { currentUser } from "@clerk/nextjs";
import clientPromise from "./mongodb";
import { Resume } from "../lib/definitions";
import { ObjectId } from "mongodb";

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
  const docs = await resumes_col.find(filter).toArray();

  if (!docs) {
    return [];
  }

  // format resumes
  const resumes: Array<Resume> = docs.map((doc) => {
    const resume: Resume = {
      id: (doc._id as ObjectId).toHexString(),
      resumeName: doc.resumeName,
      educationIds: doc.educationIds,
      projectIds: doc.projectIds,
      researchIds: doc.researchIds,
      workExperienceIds: doc.workExperienceIds,
      relatedCourseworkIds: doc.relatedCourseworkIds,
      technicalSkillsIds: doc.technicalSkillsIds, 
    };

    return resume;
  });

  return resumes;
}
