import { useState } from "react";
import { UseFormRegister, UseFormUnregister } from "react-hook-form";
import { Bullets } from "./bullets";
import { Field } from "../lib/definitions";

export function CVSection(sectionName: string, fields: Array<Field>, register: UseFormRegister<any>, unregister: UseFormUnregister<any>) {
  const [ids, setIds] = useState<Array<number>>([])

  function addItem() {
    const nextId = ids.length > 0 ? ids[ids.length - 1] + 1 : 0;

    setIds([...ids, nextId])
  }

  function createInputName (name: string, id: number) {
    // formats input name to camelCase
    return name + id;
  }

  function handleRemove(idRemoved: number) {
    setIds(
      ids.filter(id => id !== idRemoved)
    )
    
    // unregister fields
    fields.map(field => {
      unregister(createInputName(field.name, idRemoved));
    });
  }

  function Item(id: number) {
    return (
      <div key={id}>
        <span>{sectionName}:</span><button type="button" onClick={() => handleRemove(id)}>X</button><br />
        <>
          {fields.map((field) => {
            return (
              <div key={field.name}>
                <label>{field.label}</label><br />
                <input {...register(createInputName(field.name, id))}></input><br />
              </div>
            );
          })}
        </>
        <Bullets id={sectionName + id} register={register} /><br />
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