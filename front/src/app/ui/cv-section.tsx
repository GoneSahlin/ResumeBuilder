import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Bullets } from "./bullets";
import { Field } from "../lib/definitions";

export function CVSection(sectionName: string, fields: Array<Field>, prefix: string, register: UseFormRegister<any>, section: Array<any>) {
  const initialIds: Array<number> = [];
  for (let i = 0; i < section.length; i++) {
    initialIds.push(i);
  }
  
  const [ids, setIds] = useState<Array<number>>(initialIds);

  function addItem() {
    const nextId = ids.length > 0 ? ids[ids.length - 1] + 1 : 0;

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
                <input defaultValue={section[id][prefix + field.name]} {...register(createInputName(field.name, id))}></input><br />
              </div>
            );
          })}
        </>
        <Bullets id={prefix + id} register={register}/><br />
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