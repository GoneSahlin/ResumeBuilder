import { UseFormRegister, UseFormUnregister } from "react-hook-form";
import { CVSection } from "./cv-section";
import { Field } from "../lib/definitions";

export function WorkExperiences(register: UseFormRegister<any>, unregister: UseFormUnregister<any>) {
  const fields: Array<Field> = [
    {name: "Title", label: "School Name:"},
    {name: "Employer", label: "Employer:"},
    {name: "StartDate", label: "Start Date:"},
    {name: "EndDate", label: "End Date:"},
  ];

  return (
    <>
      {CVSection("Work Experience", fields, "workExperience", register, unregister)}
    </>
  );
};