import { fetchCV } from "../api/fetch-cv";
import clientPromise from "../api/mongodb";
import { CVForm } from "../ui/cv-form";


export default async function Page() {
  const cv = await fetchCV();


  return (
    <div>
      <CVForm cv={cv} />
    </div>
  );
};





