"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import { Contacts } from "../ui/contacts";
import { Educations } from "../ui/educations";
import { Projects } from "../ui/projects";
import { Research } from "../ui/research";
import { WorkExperiences } from "../ui/work-experience";
import { RelatedCoursework } from "../ui/related-coursework";
import { TechnicalSkills } from "../ui/technical-skills";

export type Inputs = {
  firstName: string
  lastName: string
  phone: number
  email: string
  github: string
  linkedin: string
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label><br />
      <input {...register("firstName", { required: true })} />
      {errors.firstName && <span>This field is required</span>}<br />

      <label>Last Name:</label><br />
      <input {...register("lastName", { required: true })} />
      {errors.lastName && <span>This field is required</span>}<br />

      {Contacts(register)}<br />

      {Educations(register)}<br />

      {Projects(register)}<br />

      {Research(register)}<br />

      {WorkExperiences(register)}<br />

      {RelatedCoursework(register)}<br />

      {TechnicalSkills(register)}<br />

      <input type="submit" value="Submit" /><br /><br />
    </form>
  );
};





