import { UseFormRegister, UseFormUnregister } from "react-hook-form";
import { CVSection } from "./cv-section";
import { Field } from "../lib/definitions";

export function Projects(register: UseFormRegister<any>, unregister: UseFormUnregister<any>) {
  const fields: Array<Field> = [
    {name: "projectTitle", label: "Project Title:"},
    {name: "projectTools", label: "Tools:"},
    {name: "projectDate", label: "Date:"},
    {name: "projectUrl", label: "Url:"},
  ];
  
  return (
    <>
      {CVSection("Project", fields, "project", register, unregister)}
    </>
  );
};
