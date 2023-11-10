import { useState } from "react";
import { UseFormRegister, UseFormUnregister } from "react-hook-form";
import { Bullets } from "./bullets";

export function Educations(register: UseFormRegister<any>, unregister: UseFormUnregister<any>) {
  const [ids, setIds] = useState<Array<number>>([])

  function addEducation() {
    const nextId = ids.length > 0 ? ids[ids.length - 1] + 1 : 0;

    setIds([...ids, nextId])
  }

  function handleRemove(idRemoved: number) {
    setIds(
      ids.filter(id => id !== idRemoved)
    )
    
    unregister("educationName" + idRemoved);
    unregister("educationLocation" + idRemoved);
    unregister("educationStartDate" + idRemoved);
    unregister("educationEndDate" + idRemoved);
    unregister("educationMajor" + idRemoved);
  }

  function Education(id: number) {
    return (
      <div key={id}>
        <span>Education:</span><button type="button" onClick={() => handleRemove(id)}>X</button><br />
        <label>School Name:</label><br />
        <input {...register("educationName" + id)}></input><br />
        <label>Location:</label><br />
        <input {...register("educationLocation" + id)}></input><br />
        <label>Start Date:</label><br />
        <input {...register("educationStartDate" + id)}></input><br />
        <label>End Date:</label><br />
        <input {...register("educationEndDate" + id)}></input><br />
        <label>Major:</label><br />
        <input {...register("educationMajor" + id)}></input><br />
        <Bullets id={"education" + id} register={register} /><br />
      </div>
    );
  };
  
  return (
    <div>
      {[...ids].map(Education)}
      
      <button type="button" onClick={addEducation}>Add Education</button>
    </div>
  );
}