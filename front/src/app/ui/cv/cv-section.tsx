import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Bullets } from "./bullets";
import { Field } from "../lib/definitions";

export function CVSection(sectionName: string, fields: Array<Field>, prefix: string, register: UseFormRegister<any>, section: Array<any>) {
  const initialIds: Array<number> = section.map((item) => {return item.id});
  
  const [ids, setIds] = useState<Array<number>>(initialIds);

  function addItem() {
    let nextId = 0;
    while (nextId in ids) {
      nextId++;
    }

    setIds([...ids, nextId])
  }

  function createInputName (name: string, id: number) {
    return prefix + name + id;
  }

  function handleRemove(idRemoved: number) {
    setIds(
      ids.filter(id => id !== idRemoved)
    );    
  };

  function Item(id: number) {
    return (
      <div key={id}>
        <span>{sectionName}:</span><button type="button" onClick={() => handleRemove(id)}>X</button><br />
        <>
          {fields.map((field) => {
            return (
              <div key={field.name}>
                <label>{field.label}</label><br />
                <input defaultValue={id in section ? section[id][prefix + field.name] : ""} {...register(createInputName(field.name, id))}></input><br />
              </div>
            );
          })}
        </>
        <Bullets id={prefix + id} register={register} defaultValues={id in section ? section[id]["bullets"] : []} /><br />
      </div>
    );
  };
  
  return (
    <div>
      {[...ids].map(Item)}
      
      <button type="button" onClick={addItem}>Add {sectionName}</button>
    </div>
  );
}