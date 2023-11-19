import { Resume } from "@/app/lib/definitions"
import { List } from "@mui/material";
import { Dispatch, SetStateAction } from "react"
import { ResumeItem } from "./resume-item";
import { SectionAddMenu } from "./section-add-menu";

export function BulletResumeSection({
  resumes,
  setResumes,
  activeResume,
  cv,
  cvSectionKey,
  resumeIdKey,
  addString,
} : {
  resumes: Array<any>,
  setResumes: Dispatch<SetStateAction<any[]>>,
  activeResume: number,
  cv: any,
  cvSectionKey: string,
  resumeIdKey: string,
  addString: string,
}) {
  const sectionIds: Array<number> = resumes[activeResume][resumeIdKey];
  const indexes: Array<number> = Array.from({length: sectionIds.length}, (item, index) => index);

  const otherIds: Array<any> = cv[cvSectionKey].map((val: string, i: number) => {return !sectionIds.includes(i) ? (i) : (null)}).filter((x: any) => {return x !== null});
  const otherStrings: Array<string> = otherIds.map((i: number) => {return cv[cvSectionKey][i]})

  console.log(otherIds, otherStrings);

  const addItem = (id: number) => {
    const newResume: any = {...resumes[activeResume]}
    newResume[resumeIdKey] = [...newResume[resumeIdKey], id];
    setResumes([...resumes.slice(0, activeResume), newResume, ...resumes.slice(activeResume + 1)])
  }

  const moveUp = (i: number) => {
    const newResume: any = {...resumes[activeResume]};
    const tmp: number = newResume[resumeIdKey][i];
    newResume[resumeIdKey][i] = newResume[resumeIdKey][i - 1];
    newResume[resumeIdKey][i - 1] = tmp;
    setResumes([...resumes.slice(0, activeResume), newResume, ...resumes.slice(activeResume + 1)]);
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
          const name: string = cv[cvSectionKey][sectionIds[i]]
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
        <SectionAddMenu addString={addString} ids={otherIds} itemStrings={otherStrings} addItem={addItem}/>
      ) : (<></>)}
    </>
  )
}