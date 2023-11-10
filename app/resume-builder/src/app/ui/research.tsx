import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Bullets } from "./bullets";

export function Research(register: UseFormRegister<any>) {
  const [count, setCount] = useState(0);

  function addResearch() {
    setCount(count + 1);
  }

  function Research(i: number) {
    return (
      <div key={i}>
        <label>Research Title:</label><br />
        <input {...register("researchTitle" + i)}></input><br />
        <label>Tools:</label><br />
        <input {...register("researchTools" + i)}></input><br />
        <label>Date:</label><br />
        <input {...register("researchDate" + i)}></input><br />
        <label>Url:</label><br />
        <input {...register("researchUrl" + i)}></input><br />
        <Bullets id={"research" + i} register={register} /><br />
      </div>
    );
  };

  const countArray = Array.from(
    {length: count},
    (item, index) => item = index
  );
  
  return (
    <div>
      {[...countArray].map(Research)}
      
      <button type="button" onClick={addResearch}>Add Research</button>
    </div>
  );
}
