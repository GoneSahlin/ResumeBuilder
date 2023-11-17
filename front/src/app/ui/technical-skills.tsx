import { UseFormRegister } from "react-hook-form";
import { BulletSection } from "./bullet-section";

export function TechnicalSkills(props: any) {
  const register: UseFormRegister<any> = props.register;
  const cv: any = props.cv;

  const section = cv["technicalSkills"]

  return (
    <>
      {BulletSection("Technical Skills", "technicalSkills", register, section)}
    </>
  );
};