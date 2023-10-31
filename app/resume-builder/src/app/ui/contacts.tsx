import { Inputs } from "@/app/cv/page"
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";


const contactTypes: { [name: string]: {[item: string]: string}} = {
  "phone": {addString: "Add Phone Number", labelString: "Phone Number:", inputType: "text"},
  "email": {addString: "Add Email", labelString: "Email:", inputType: "email"},
  "github": {addString: "Add GitHub URL", labelString: "GitHub URL:", inputType: "url"},
  "linkedin": {addString: "Add LinkedIn URL", labelString: "LinkedIn URL:", inputType: "url"}
}

export function Contacts(register: UseFormRegister<Inputs>) {
  const [otherContactTypes, setOtherContactTypes] = useState<string[]>(Object.keys(contactTypes))
  const [contactTypesUsed, setContactTypesUsed] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  function addContact(name: string) {
    setOpen(!open);
    setContactTypesUsed([...contactTypesUsed, name]);

    // remove item from otherContactTypes
    const index = otherContactTypes.indexOf(name);
    otherContactTypes.splice(index, 1);
    setOtherContactTypes(otherContactTypes);
  }

  function Contact(name: string) {
    const labelString = contactTypes[name].labelString;
    return (
      <div>
        <label>{labelString}</label><br />
        <input {...register("phone")}></input>
      </div>
    )
  }
  
  return (
    <div>
      {contactTypesUsed.map(Contact)}
      <button onClick={handleOpen}>Add Contact</button>
      {open ? (
        <ul>
          <li>
            {otherContactTypes.map((x) => {
              const addString: string = contactTypes[x].addString;
              return (
                <div>
                  <button onClick={() => addContact(x)}>{addString}</button><br />
                </div>
              );
            })}
          </li>
        </ul>
      ) : null}
    </div>
  );
}