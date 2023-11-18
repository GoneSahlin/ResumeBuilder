import { UseFormRegister } from "react-hook-form";
import { BulletSection } from "./bullet-section";

export function RelatedCoursework(props: any) {
  const register: UseFormRegister<any> = props.register;
  const cv: any = props.cv;

  const section = cv["relatedCoursework"];

  return (
    <>
      {BulletSection("Related Coursework", "relatedCoursework", register, section)}
    </>
  );
};