import { UseFormRegister } from "react-hook-form";
import { BulletSection } from "./bullet-section";

export function RelatedCoursework(register: UseFormRegister<any>) {
  return (
    <>
      {BulletSection("Related Coursework", "relatedCoursework", register)}
    </>
  );
};