import { Inputs } from "@/app/cv/page"
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

export function Contacts(register: UseFormRegister<Inputs>) {
  const [contactTypes, setContactTypes] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  function addContact() {
    setOpen(!open);
    setContactTypes([...contactTypes, "phone"]);
  }

  function Contact() {
    return (
      <div>
        <label>Contact</label><br />
        <input {...register("phone")}></input>
      </div>
    )
  }
  
  return (
    <div>
      {contactTypes.map(Contact)}
      <button onClick={handleOpen}>Add Contact</button>
      {open ? (
        <ul>
          <li>
            <button onClick={addContact}>Add Phone Number</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}