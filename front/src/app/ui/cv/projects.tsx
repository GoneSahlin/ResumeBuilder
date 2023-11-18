import { UseFormRegister } from "react-hook-form";
import { CVSection } from "./cv-section";
import { Field } from "../../lib/definitions";

export function Projects(props: any) {
  const register: UseFormRegister<any> = props.register;
  const cv: any = props.cv;

  const fields: Array<Field> = [
    {name: "Title", label: "Project Title:"},
    {name: "Tools", label: "Tools:"},
    {name: "Date", label: "Date:"},
    {name: "Url", label: "Url:"},
  ];

  const section = cv["projects"];
  
  return (
    <>
      {CVSection("Project", fields, "project", register, section)}
    </>
  );
};
