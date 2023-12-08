"use server";

import { currentUser } from "@clerk/nextjs";
import clientPromise from "./mongodb";
import { Resume } from "../lib/definitions";
import { ObjectId } from "mongodb";
import { storeResume } from "./store-resume";

export async function newResume(resumeName: string) {
  const newResume: Resume = {
    "id": (new ObjectId()).toHexString(),
    "resumeName": resumeName,
    "educationIds": [],
    "projectIds": [],
    "researchIds": [],
    "workExperienceIds": [],
    "relatedCourseworkIds": [],
    "technicalSkillsIds": [],
  };
  
  storeResume(newResume);
}
