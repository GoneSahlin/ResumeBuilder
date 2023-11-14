import { UseFormRegister } from "react-hook-form";
import { CVSection } from "./cv-section";
import { Field } from "../lib/definitions";

export function Projects(register: UseFormRegister<any>) {
  const fields: Array<Field> = [
    {name: "Title", label: "Project Title:"},
    {name: "Tools", label: "Tools:"},
    {name: "Date", label: "Date:"},
    {name: "Url", label: "Url:"},
  ];
  
  return (
    <>
      {CVSection("Project", fields, "project", register)}
    </>
  );
};
