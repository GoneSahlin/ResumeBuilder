import { UseFormRegister, UseFormUnregister } from "react-hook-form";
import { CVSection } from "./cv-section";
import { Field } from "../lib/definitions";

export function Research(register: UseFormRegister<any>, unregister: UseFormUnregister<any>) {
  const fields: Array<Field> = [
    {name: "Title", label: "Research Title:"},
    {name: "Tools", label: "Tools:"},
    {name: "Date", label: "Date:"},
    {name: "Url", label: "Url:"},
  ];

  return (
    <>
      {CVSection("Research", fields, "research", register, unregister)}
    </>
  );
};