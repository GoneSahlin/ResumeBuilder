import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

export function Educations(register: UseFormRegister<any>) {
  const [count, setCount] = useState(0);

  function addEducation() {
    setCount(count + 1);
  }

  function Education(i: number) {
    return (
      <div key={i}>
        <label>School Name:</label><br />
        <input {...register("schoolName" + i)}></input><br />
        <label>Location:</label><br />
        <input {...register("schoolLocation" + i)}></input><br />
        <label>Start Date:</label><br />
        <input {...register("schoolStartDate" + i)}></input><br />
        <label>End Date:</label><br />
        <input {...register("schoolEndDate" + i)}></input><br />
        <label>Major:</label><br />
        <input {...register("schoolMajor" + i)}></input><br />
      </div>
    );
  };

  const countArray = Array.from(
    {length: count},
    (item, index) => item = index + 1
  );
  
  return (
    <div>
      {[...countArray].map(Education)}
      
      <button type="button" onClick={addEducation}>Add Education</button>
    </div>
  );
}