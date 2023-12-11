"use client";

import { Button, Container, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { Resume } from "@/app/lib/definitions";
import { ObjectId } from "mongodb";
import { newResume } from "@/app/api/new-resume";
import { ResumeAction, ResumeState } from "@/app/lib/resume-reducer";

export type Inputs = {
  resumeName: string
};

export interface NewResumeFormProps {
  resumeState: ResumeState;
  resumeDispatch: Dispatch<ResumeAction>;
  setAddResumeActive: Dispatch<SetStateAction<boolean>>;
  updatePdfUrls: (resumes: Array<Resume>) => void;
}

export function NewResumeForm(props: NewResumeFormProps) {
  const { resumeState, resumeDispatch, setAddResumeActive, updatePdfUrls } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ shouldUnregister: true });

  const resumes: Array<Resume> = resumeState.resumes;

  const onSubmit = async (data: any) => {
    await newResume(data.resumeName);

    // const newResumes = [...resumes, newResume];
    // updatePdfUrls(newResumes);

    // setResumes(newResumes);
    setAddResumeActive(false);
  };

  const defaultResumeName = () => {
    let i = resumes.length + 1;
    let name = "Resume " + i;
    const resumeNames = resumes.map((resume) => {return resume.resumeName});

    while (resumeNames.includes(name)) {
      name = "Resume " + ++i
    }

    return name;
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Resume Name" defaultValue={defaultResumeName()}{...register("resumeName")} /><br />

        <Button type="submit">Add Resume</Button>
      </form>
    </Container>
  )
}
