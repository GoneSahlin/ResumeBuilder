import { Dispatch, SetStateAction, useState } from "react";
import { UseFormRegister } from "react-hook-form";

export function Bullets({
  i,
  register,
}: {
  i: number;
  register: UseFormRegister<any>;
}) {
  const [count, setCount] = useState(0);

  function addBullet() {
    setCount(count + 1)
  };

  function Bullet(j: number) {
    return (
      <div key={j}>
        <input {...register(i + "bullet" + j)}></input>
      </div>
    );
  };

  const countArray = Array.from(
    {length: count},
    (item, index) => item = index
  );

  return (
    <div>
      {count}
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