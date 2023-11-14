"use server";

export async function cleanData(data: any) {
  console.log(data);
  const keys = (Object.keys(data))

  // educations
  const educations = [{"educationName": data["educationName" + 0]}]

  console.log(educations);

  return {}
}
