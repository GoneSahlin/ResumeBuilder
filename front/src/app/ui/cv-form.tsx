"use client";

import { useForm } from "react-hook-form"
import { Contacts } from "../ui/contacts";
import { Educations } from "../ui/educations";
import { Projects } from "../ui/projects";
import { Research } from "../ui/research";
import { WorkExperiences } from "../ui/work-experience";
import { RelatedCoursework } from "../ui/related-coursework";
import { TechnicalSkills } from "../ui/technical-skills";
import { storeCV } from "../api/store-cv";

export type Inputs = {
  firstName: string
  lastName: string
  phone: number
  email: string
  github: string
  linkedin: string
};

export function CVForm(props: any) {
// export function CVForm(cv: any) {
  const cv = props.cv;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ shouldUnregister: true });
  const onSubmit = async (data: any) => storeCV(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label><br />
      <input defaultValue={cv["firstName"]} {...register("firstName", { required: true })} />
      {errors.firstName && <span>This field is required</span>}<br />

      <label>Last Name:</label><br />
      <input defaultValue={cv["lastName"]} {...register("lastName", { required: true })} />
      {errors.lastName && <span>This field is required</span>}<br />

      <br />

      <Contacts register={register} cv={cv} /><br />
      <Educations register={register} cv={cv} /><br />
      {/* {Educations(register, cv)}<br /> */}
      {/* {Projects(register)}<br />
      {Research(register)}<br />
      {WorkExperiences(register)}<br /> */}
      {/* {RelatedCoursework(register)}<br />
      {TechnicalSkills(register)}<br /> */}

      <input type="submit" value="Submit" /><br /><br />
    </form>
  )
}

