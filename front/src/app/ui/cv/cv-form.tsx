"use client";

import { useForm } from "react-hook-form"
import { Contacts } from "./contacts";
import { Educations } from "./educations";
import { Projects } from "./projects";
import { Research } from "./research";
import { WorkExperiences } from "./work-experience";
import { RelatedCoursework } from "./related-coursework";
import { TechnicalSkills } from "./technical-skills";
import { storeCV } from "../../api/store-cv";

export type Inputs = {
  firstName: string
  lastName: string
  phone: number
  email: string
  github: string
  linkedin: string
};

export function CVForm(props: any) {
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
      <Projects register={register} cv={cv} /><br />
      <Research register={register} cv={cv} /><br />
      <WorkExperiences register={register} cv={cv} /><br />
      <RelatedCoursework register={register} cv={cv} /><br />
      <TechnicalSkills register={register} cv={cv} /><br />

      <input type="submit" value="Submit" /><br /><br />
    </form>
  )
}

