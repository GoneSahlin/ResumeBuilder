import { useState } from "react";
import { Bullets } from "./bullets";
import { UseFormRegister } from "react-hook-form";

export function TechnicalSkills(register: UseFormRegister<any>) {
  const [active, setActive] = useState(false);
  function handleClick() {
    setActive(true);
  }

  return (
    <>
      {active ? (
        <>
          <span>Technical Skills:</span><br />
          <Bullets id={"technicalSkills"} register={register} /><br />
        </>
      ) : (
        <>
          <button type="button" onClick={handleClick}>Add Technical Skills</button><br />
        </>
      )}
    </>
  );
};