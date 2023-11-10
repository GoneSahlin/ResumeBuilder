import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Bullets } from "./bullets";

export function Educations(register: UseFormRegister<any>) {
  const [count, setCount] = useState(0);

  function addEducation() {
    setCount(count + 1);
  }

  function Education(i: number) {
    return (
      <div key={i}>
        <label>School Name:</label><br />
        <input {...register("educationName" + i)}></input><br />
        <label>Location:</label><br />
        <input {...register("educationLocation" + i)}></input><br />
        <label>Start Date:</label><br />
        <input {...register("educationStartDate" + i)}></input><br />
        <label>End Date:</label><br />
        <input {...register("educationEndDate" + i)}></input><br />
        <label>Major:</label><br />
        <input {...register("educationMajor" + i)}></input><br />
        <Bullets id={"education" + i} register={register} /><br />
      </div>
    );
  };

  const countArray = Array.from(
    {length: count},
    (item, index) => item = index
  );
  
  return (
    <div>
      {[...countArray].map(Education)}
      
      <button type="button" onClick={addEducation}>Add Education</button>
    </div>
  );
}