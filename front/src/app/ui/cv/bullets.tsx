import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

export function Bullets({
  id,
  register,
  defaultValues,
}: {
  id: string;
  register: UseFormRegister<any>;
  defaultValues: Array<string>;
}) {
  const initialIds: Array<number> = []
  for (let i = 0; i < defaultValues.length; i++) {
    initialIds.push(i);
  }
  const [bulletIds, setBulletIds] = useState<Array<number>>(initialIds);

  function createInputName(bulletId: number) {
    return id + "bullet" + bulletId
  }

  function addBullet() {
    const nextId = bulletIds.length > 0 ? bulletIds[bulletIds.length - 1] + 1 : 0;

    setBulletIds([...bulletIds, nextId])
  };

  function handleRemoveClick(bulletIdRemoved: number) {
    setBulletIds(
      bulletIds.filter(bulletId => bulletId !== bulletIdRemoved)
    );
  };

  function Bullet(bulletId: number) {
    return (
      <div key={bulletId}>
        <input defaultValue={defaultValues[bulletId]}{...register(createInputName(bulletId))}></input>
        <button type="button" onClick={() => handleRemoveClick(bulletId)}>X</button>
      </div>
    );
  };

  return (
    <div>
      {bulletIds.length > 0 ? (
        <div>
          <span>Bullet Points:</span>
          {[...bulletIds].map(Bullet)}
        </div>
      ) : null}
      <button type="button" onClick={addBullet}>Add Bullet Point</button>
    </div>
  );
};