"use client";

import { Box, Button, Container, Grid, List } from "@mui/material";
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
  const sectionIds: Array<number> = resumes[activeResume][resumeIdKey];
  const indexes: Array<number> = Array.from({length: sectionIds.length}, (item, index) => index);

  const otherItems: Array<any> = cv[cvSectionKey].filter((item: any) => {
    return !(sectionIds.includes(item.id));
  });

  const otherIds: Array<number> = otherItems.map((item: any) => {return item.id})
  const itemStrings: Array<string> = otherItems.map((item: any) => {return item[cvNameKey]})

  const addItem = (id: number) => {
    const newResume: any = {...resumes[activeResume]}
    newResume[resumeIdKey] = [...newResume[resumeIdKey], id];
    setResumes([...resumes.slice(0, activeResume), newResume, ...resumes.slice(activeResume + 1)])
  }

  const moveUp = (i: number) => {
    const newResume: any = {...resumes[activeResume]}
    const tmp: number = newResume[resumeIdKey][i];
    newResume[resumeIdKey][i] = newResume[resumeIdKey][i - 1];
    newResume[resumeIdKey][i - 1] = tmp;
    setResumes([...resumes.slice(0, activeResume), newResume, ...resumes.slice(activeResume + 1)])
  }

  const remove = (i: number) => {
    const newResume: any = {...resumes[activeResume]}
    newResume[resumeIdKey] = [...newResume[resumeIdKey].slice(0, i), ...newResume[resumeIdKey].slice(i + 1)]
    setResumes([...resumes.slice(0, activeResume), newResume, ...resumes.slice(activeResume + 1)])
  }

  return (
    <>
      <List>
        {indexes.map((i) => {
          // find name
          const name: string = cv[cvSectionKey].filter((item: any) => {return item.id === sectionIds[i]})[0][cvNameKey];
          return (
            <ResumeItem
              key={i}
              name={name}
              upArrow={i > 0}
              downArrow={i < indexes.length - 1}
              moveUp={() => moveUp(i)}
              moveDown={() => moveUp(i + 1)}
              remove={() => remove(i)}
            />
          );
        })}
      </List>
      {otherIds.length > 0 ? (
        <SectionAddMenu addString={addString} ids={otherIds} itemStrings={itemStrings} addItem={addItem}/>
      ) : (<></>)}
    </>      
  );
}