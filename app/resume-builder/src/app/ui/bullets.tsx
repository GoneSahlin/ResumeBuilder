import { Dispatch, SetStateAction, useState } from "react";
import { UseFormRegister } from "react-hook-form";

export function Bullets(i: number, bulletCounts: Array<number>, setBulletCounts: Dispatch<SetStateAction<any[]>>, register: UseFormRegister<any>) {
  
  function addBullet() {
    bulletCounts[i]++;
    setBulletCounts(bulletCounts);
  };

  function Bullet(j: number) {
    return (
      <div key={j}>
        <input {...register(i + "bullet" + j)}></input>
      </div>
    );
  };

  // const countArray = Array.from(
  //   {length: bulletCount},
  //   (item, index) => item = index + 1
  // );

  return (
    <div>
      Bullet Points:
      {/* {[...countArray].map(Bullet)} */}
      <button type="button" onClick={addBullet}>Add Bullet Point</button>
    </div>
  );
};