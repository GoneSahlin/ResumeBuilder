"use client";

import { Button } from "@mui/material";
import { ResumeItem } from "./resume-item";
import { Dispatch, SetStateAction } from "react";
import { SectionAddMenu } from "./section-add-menu";
import { Resume } from "@/app/lib/definitions";

export function ResumeSection({
  resumes,
  setResumes,
  activeResume,
  cv,
  resumeIdKey,
  cvSectionKey,
  cvNameKey,
  addString,
} : {
  resumes: Array<any>,
  setResumes: Dispatch<SetStateAction<any[]>>,
  activeResume: number,
  cv: any,
  resumeIdKey: string,
  cvSectionKey: string,
  cvNameKey: string,
  addString: string,
}) {
  const sectionIds: Array<string> = resumes[activeResume][resumeIdKey];
  const indexes: Array<number> = Array.from({length: sectionIds.length}, (item, index) => index);

  const otherItems: Array<number> = cv[cvSectionKey].filter((item: any) => {
    return !(item.id in sectionIds);
  });

  const otherIds: Array<number> = otherItems.map((item: any) => {return item.id})
  const itemStrings: Array<string> = otherItems.map((item: any) => {return item[cvNameKey]})

  const addItem = (id: number) => {
    const newResume: any = {...resumes[activeResume]}
    newResume[resumeIdKey] = [...newResume[resumeIdKey], id];
    setResumes([...resumes.slice(0, activeResume), newResume, ...resumes.slice(activeResume + 1)])
  }

  return (
    <>
      {indexes.map((i) => {
        // find name
        const name: string = cv[cvSectionKey].filter((item: any) => {return item.id === sectionIds[i]})[0][cvNameKey];
        return (
          <div key={i}>
            <ResumeItem name={name} />
          </div>
        );
      })}
      {otherIds.length > 0 ? (
        <SectionAddMenu addString={addString} ids={otherIds} itemStrings={itemStrings} addItem={addItem}/>
      ) : (<></>)}
    </>
  );
}