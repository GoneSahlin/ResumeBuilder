import { useState } from "react";
import { Bullets } from "./bullets";
import { UseFormRegister } from "react-hook-form";

export function BulletSection(title: string, prefix: string, register: UseFormRegister<any>, section: any) {
  const [active, setActive] = useState(section.length > 0);
  function handleClick() {
    setActive(true);
  }

  function handleRemove() {
    setActive(false);
  }

  return (
    <>
      {active ? (
        <>
          <span>{title}:</span><button type="button" onClick={handleRemove}>X</button><br />
          <Bullets id={prefix} register={register} defaultValues={section}/><br />
        </>
      ) : (
        <>
          <button type="button" onClick={handleClick}>Add {title}</button><br />
        </>
      )}
    </>
  );
};