import { UseFormRegister } from "react-hook-form";
import { CVSection } from "./cv-section";
import { Field } from "../lib/definitions";

export function Educations(props: any) {
  const register: UseFormRegister<any> = props.register;
  const cv: any = props.cv;
  
  const fields: Array<Field> = [
    {name: "Name", label: "School Name:"},
    {name: "Location", label: "Location:"},
    {name: "StartDate", label: "Start Date:"},
    {name: "EndDate", label: "End Date:"},
    {name: "Major", label: "Major:"},
  ];

  const section = cv["educations"];
  
  return (
    <>
      {CVSection("Education", fields, "education", register, section)}
    </>
  );
};