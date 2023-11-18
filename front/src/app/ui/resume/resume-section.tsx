"use client";

import { Button } from "@mui/material";
import { ResumeItem } from "./resume-item";
import { Dispatch, SetStateAction } from "react";

export function ResumeSection({
  resumes,
  setResumes,
  activeResume,
  cv,
  resumeIdKey,
  cvSectionKey,
  addString,
} : {
  resumes: Array<any>,
  setResumes: Dispatch<SetStateAction<any[]>>,
  activeResume: number,
  cv: any,
  resumeIdKey: string,
  cvSectionKey: string,
  addString: string,
}) {
  const sectionIds: Array<string> = resumes[activeResume][resumeIdKey]
  const indexes: Array<number> = Array.from({length: sectionIds.length}, (item, index) => index);
  // const indexes: Array<number> = Array.from({length: sectionIds.length}, (item, index) => index);

  const handleAdd = () => {}
  
  return (
    <>
      {indexes.map((i) => {
        const name: string = cv[cvSectionKey].filter((item: any) => {return item.id === i})
        return (
          <ResumeItem key={i} name={name} />
        );
      })}
      <Button onClick={handleAdd}>{addString}</Button>
    </>
  );
}