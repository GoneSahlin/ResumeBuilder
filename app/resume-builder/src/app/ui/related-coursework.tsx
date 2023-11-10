import { useState } from "react";
import { Bullets } from "./bullets";
import { UseFormRegister } from "react-hook-form";

export function RelatedCoursework(register: UseFormRegister<any>) {
  const [active, setActive] = useState(false);
  function handleClick() {
    setActive(true);
  }

  return (
    <>
      {active ? (
        <>
          <span>Related Coursework:</span><br />
          <Bullets id={"relatedCoursework"} register={register} /><br />
        </>
      ) : (
        <>
          <button type="button" onClick={handleClick}>Add Related Coursework</button><br />
        </>
      )}
    </>
  );
};