"use client";

import { Box, Button, Container, Grid, List } from "@mui/material";
import { ResumeItem } from "./resume-item";
import { Dispatch, SetStateAction } from "react";
import { SectionAddMenu } from "./section-add-menu";
import { Resume } from "@/app/lib/definitions";
import { ResumeAction, ResumeActionKind, ResumeState, SectionKind } from "@/app/lib/resume-reducer";

export function ResumeSection({
  resumeState,
  resumeDispatch,
  cv,
  resumeIdKey,
  cvSectionKey,
  cvNameKey,
  addString,
  bulletSection,
} : {
  resumeState: ResumeState,
  resumeDispatch: Dispatch<ResumeAction>,
  cv: any,
  resumeIdKey: SectionKind,
  cvSectionKey: string,
  cvNameKey: string,
  addString: string,
  bulletSection: boolean,
}) {
  const addItem = (id: number) => {
    const action: ResumeAction = {
      type: ResumeActionKind.ADD_ITEM,
      section: resumeIdKey,
      payload: id,
    }
    resumeDispatch(action);
  }
  const resume = resumeState.resume;
  
  // make array of section ids
  const sectionIds: Array<number> = resume[resumeIdKey as keyof Resume] as Array<number>;

  const indexes: Array<number> = Array.from({length: sectionIds.length}, (item, index) => index);

  // declare otherIds itemStrings, and names differently for bullet section and normal section
  let otherIds: Array<number>;
  let itemStrings: Array<string>;
  let names: Array<string>;
  if (bulletSection) {
    // item strings for bullet section
    otherIds = cv[cvSectionKey].map((val: string, i: number) => {return !sectionIds.includes(i) ? (i) : (null)}).filter((x: any) => {return x !== null});
    itemStrings = otherIds.map((i: number) => {return cv[cvSectionKey][i]})
    names = indexes.map((i) => {return cv[cvSectionKey][sectionIds[i]]})
  } else {
    // item strings for normal section
    const otherItems: Array<any> = cv[cvSectionKey].filter((item: any) => {
      return !(sectionIds.includes(item.id));
    });
  
    otherIds = otherItems.map((item: any) => {return item.id})
    itemStrings = otherItems.map((item: any) => {return item[cvNameKey]})
    names = indexes.map((i) => {return cv[cvSectionKey].filter((item: any) => {return item.id === sectionIds[i]})[0][cvNameKey]});
  }

  return (
    <>
      <List>
        {indexes.map((i) => {
          return (
            <ResumeItem
              key={i}
              resumeDispatch={resumeDispatch}
              resumeIdKey={resumeIdKey}
              i={i}
              indexesLength={indexes.length}
              name={names[i]}              
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
