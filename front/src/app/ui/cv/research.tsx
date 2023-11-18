import { UseFormRegister } from "react-hook-form";
import { CVSection } from "./cv-section";
import { Field } from "../../lib/definitions";

export function Research(props: any) {
  const register: UseFormRegister<any> = props.register;
  const cv: any = props.cv;
  
  const fields: Array<Field> = [
    {name: "Title", label: "Research Title:"},
    {name: "Tools", label: "Tools:"},
    {name: "Date", label: "Date:"},
    {name: "Url", label: "Url:"},
  ];

  const section = cv["research"];

  return (
    <>
      {CVSection("Research", fields, "research", register, section)}
    </>
  );
};