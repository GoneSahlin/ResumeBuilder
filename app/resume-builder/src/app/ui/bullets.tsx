import { Dispatch, SetStateAction, useState } from "react";
import { UseFormRegister } from "react-hook-form";

export function Bullets({
  id,
  register,
}: {
  id: string;
  register: UseFormRegister<any>;
}) {
  const [count, setCount] = useState(0);

  function addBullet() {
    setCount(count + 1)
  };

  function Bullet(i: number) {
    return (
      <div key={i}>
        <input {...register(id + "bullet" + i)}></input>
      </div>
    );
  };

  const countArray = Array.from(
    {length: count},
    (item, index) => item = index
  );

  return (
    <div>
      {count > 0 ? (
        <div>
          <span>Bullet Points:</span>
          {[...countArray].map(Bullet)}
        </div>
      ) : null}
      <button type="button" onClick={addBullet}>Add Bullet Point</button>
    </div>
  );
};