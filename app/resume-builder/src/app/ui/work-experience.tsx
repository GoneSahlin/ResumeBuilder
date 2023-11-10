import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Bullets } from "./bullets";

export function WorkExperiences(register: UseFormRegister<any>) {
  const [count, setCount] = useState(0);

  function addWorkExperience() {
    setCount(count + 1);
  }

  function WorkExperience(i: number) {
    return (
      <div key={i}>
        <label>Title:</label><br />
        <input {...register("workExperienceTitle" + i)}></input><br />
        <label>Employer:</label><br />
        <input {...register("workExperienceEmployer" + i)}></input><br />
        <label>Start Date:</label><br />
        <input {...register("workExperienceStartDate" + i)}></input><br />
        <label>End Date:</label><br />
        <input {...register("workExperienceEndDate" + i)}></input><br />
        <Bullets id={"workExperience" + i} register={register} /><br />
      </div>
    );
  };

  const countArray = Array.from(
    {length: count},
    (item, index) => item = index
  );
  
  return (
    <div>
      {[...countArray].map(WorkExperience)}
      
      <button type="button" onClick={addWorkExperience}>Add Work Experience</button>
    </div>
  );
}