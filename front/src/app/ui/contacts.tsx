// import { Inputs } from "@/app/cv/page"
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

const contactTypes: { [name: string]: {[item: string]: string}} = {
  "phone": {addString: "Add Phone Number", labelString: "Phone Number:", inputType: "text"},
  "email": {addString: "Add Email", labelString: "Email:", inputType: "email"},
  "github": {addString: "Add GitHub Profile", labelString: "GitHub Profile:", inputType: "url"},
  "linkedin": {addString: "Add LinkedIn Profile", labelString: "LinkedIn Profile:", inputType: "url"}
};

export function Contacts(props: any) {
  const register: UseFormRegister<any> = props.register;
  const cv: any = props.cv;

  const [otherContactTypes, setOtherContactTypes] = useState<string[]>(Object.keys(contactTypes));
  const [contactTypesUsed, setContactTypesUsed] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  function addContact(name: string) {
    setOpen(!open);
    setContactTypesUsed([...contactTypesUsed, name]);

    // remove item from otherContactTypes
    setOtherContactTypes(
      otherContactTypes.filter(type => type !== name)
    )
  };

  function handleRemove(name: string) {
    setContactTypesUsed(
      contactTypesUsed.filter(type => type !== name)
    )

    setOtherContactTypes([...otherContactTypes, name])
  };

  // activate initial contacts from cv
  otherContactTypes.map((type) => {
    if (type in cv) {
      addContact(type);
    }
  });

  function Contact(name: string) {
    const labelString = contactTypes[name].labelString;
    return (
      <div key={name}>
        <label>{labelString}</label><button type="button" onClick={() => handleRemove(name)}>X</button><br />
        <input defaultValue={cv[name]}{...register(name)}></input>
      </div>
    );
  };
  
  return (
    <div>
      {contactTypesUsed.map(Contact)}
      {otherContactTypes.length > 0 ? (
        <button type="button" onClick={handleOpen}>Add Contact</button>
      ) : null}
      {open ? (
        <ul>
          {otherContactTypes.map((x) => {
            const addString: string = contactTypes[x].addString;
            return (
              <li key={x + "li"}>
                <button type="button" onClick={() => addContact(x)}>{addString}</button><br />
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}