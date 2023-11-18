import { fetchCV } from "../api/fetch-cv";
import { CVForm } from "../ui/cv/cv-form";
import { Document } from "mongodb";

export default async function Page() {
  const cv = await fetchCV();

  // console.log(cv)

  return (
    <div>
      <CVForm cv={cv} />
    </div>
  );
};





