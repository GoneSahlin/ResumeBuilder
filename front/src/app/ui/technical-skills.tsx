import { UseFormRegister } from "react-hook-form";
import { BulletSection } from "./bullet-section";

export function TechnicalSkills(register: UseFormRegister<any>) {
  return (
    <>
      {BulletSection("Technical Skills", "technicalSkills", register)}
    </>
  );
};