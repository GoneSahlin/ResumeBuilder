import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Bullets } from "./bullets";

export function Projects(register: UseFormRegister<any>) {
  const [count, setCount] = useState(0);

  function addProject() {
    setCount(count + 1);
  }

  function Project(i: number) {
    return (
      <div key={i}>
        <label>Project Title:</label><br />
        <input {...register("projectTitle" + i)}></input><br />
        <label>Tools:</label><br />
        <input {...register("projectTools" + i)}></input><br />
        <label>Date:</label><br />
        <input {...register("projectDate" + i)}></input><br />
        <label>Url:</label><br />
        <input {...register("projectUrl" + i)}></input><br />
        <Bullets id={"project" + i} register={register} /><br />
      </div>
    );
  };

  const countArray = Array.from(
    {length: count},
    (item, index) => item = index
  );
  
  return (
    <div>
      {[...countArray].map(Project)}
      
      <button type="button" onClick={addProject}>Add Project</button>
    </div>
  );
}