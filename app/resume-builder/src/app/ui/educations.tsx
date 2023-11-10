import { UseFormRegister } from "react-hook-form";
import { CVSection } from "./cv-section";
import { Field } from "../lib/definitions";

export function Educations(register: UseFormRegister<any>) {
  const fields: Array<Field> = [
    {name: "Name", label: "School Name:"},
    {name: "Location", label: "Location:"},
    {name: "StartDate", label: "Start Date:"},
    {name: "EndDate", label: "End Date:"},
    {name: "Major", label: "Major:"},
  ];

  return (
    <>
      {CVSection("Education", fields, "education", register)}
    </>
  );
};