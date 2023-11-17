"use client";

import { Button, Container, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { addResume } from "../api/add-resume";
import { useRouter } from "next/navigation";

export type Inputs = {
  resumeName: string
};

export function NewResumeForm({ resumeNames }: {resumeNames: Array<string>}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ shouldUnregister: true });

  const onSubmit = async (data: any) => {
    router.push("/resume")
    addResume(data);    
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Resume Name" defaultValue={"Resume " + (resumeNames.length + 1)}{...register("resumeName")} /><br />

        <Button type="submit">Add Resume</Button>
      </form>
    </Container>
  )
}