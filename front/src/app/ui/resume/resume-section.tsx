"use client";

import { Box, Button, Container, Grid, List } from "@mui/material";
import { ResumeItem } from "./resume-item";
import { Dispatch, SetStateAction } from "react";
import { SectionAddMenu } from "./section-add-menu";
import { Resume } from "@/app/lib/definitions";
import { ResumeAction, ResumeActionKind, SectionKind } from "@/app/lib/resume-reducer";

export function ResumeSection({
  resume,
  resumeDispatch,
  cv,
  resumeIdKey,
  cvSectionKey,
  cvNameKey,
  addString,
} : {
  resume: Resume,
  resumeDispatch: Dispatch<ResumeAction>,
  cv: any,
  resumeIdKey: SectionKind,
  cvSectionKey: string,
  cvNameKey: string,
  addString: string,
}) {
  // make array of section ids
  const sectionIds: Array<number> = resume[resumeIdKey as keyof Resume] as Array<number>;

  const indexes: Array<number> = Array.from({length: sectionIds.length}, (item, index) => index);

  const otherItems: Array<any> = cv[cvSectionKey].filter((item: any) => {
    return !(sectionIds.includes(item.id));
  });

  const otherIds: Array<number> = otherItems.map((item: any) => {return item.id})
  const itemStrings: Array<string> = otherItems.map((item: any) => {return item[cvNameKey]})

  const addItem = (id: number) => {
    const action: ResumeAction = {
      type: ResumeActionKind.ADD_ITEM,
      section: resumeIdKey,
      payload: id,
    }
    resumeDispatch(action);
  }

  const moveUp = (i: number) => {
    const action: ResumeAction = {
      type: ResumeActionKind.MOVE_UP_ITEM,
      section: resumeIdKey,
      payload: i,
    }
    resumeDispatch(action);
  }

  const remove = (i: number) => {
    const action: ResumeAction = {
      type: ResumeActionKind.REMOVE_ITEM,
      section: resumeIdKey,
      payload: i,
    }
    resumeDispatch(action);
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