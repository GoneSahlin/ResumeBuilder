import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

export function Educations(register: UseFormRegister<any>) {
  const [count, setCount] = useState(0);

  function addEducation() {
    setCount(count + 1);
  }
  
  return (
    <div>
      
      <button onClick={addEducation}>Add Education</button>
    </div>
  );
}