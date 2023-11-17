"use client";

import { Button, Container, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

export type Inputs = {
  resumeName: string
};

export function NewResumeForm({
  resumes,
  setResumes,
  setAddResumeActive,
}:{
  resumes: Array<any>,
  setResumes: Dispatch<SetStateAction<any[]>>,
  setAddResumeActive: Dispatch<SetStateAction<boolean>>,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ shouldUnregister: true });

  const onSubmit = async (data: any) => {
    const newResume: any = {"resumeName": data.resumeName}
    setResumes([...resumes, newResume]);
    setAddResumeActive(false);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Resume Name" defaultValue={"Resume " + (resumes.length + 1)}{...register("resumeName")} /><br />

        <Button type="submit">Add Resume</Button>
      </form>
    </Container>
  )
}