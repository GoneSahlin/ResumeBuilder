import { UseFormRegister } from "react-hook-form";
import { CVSection } from "./cv-section";
import { Field } from "../lib/definitions";

export function WorkExperiences(props: any) {
  const register: UseFormRegister<any> = props.register;
  const cv: any = props.cv;
  
  const fields: Array<Field> = [
    {name: "Title", label: "Title:"},
    {name: "Employer", label: "Employer:"},
    {name: "StartDate", label: "Start Date:"},
    {name: "EndDate", label: "End Date:"},
  ];

  const section = cv["workExperience"];

  return (
    <>
      {CVSection("Work Experience", fields, "workExperience", register, section)}
    </>
  );
};