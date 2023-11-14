"use server";

const example = {
  "firstName": "Zach",
  "lastName": "Sahlin",
  "educationName0": "Gonzaga",
  "educationLocation0": "Spokane, WA",
  "educationStartDate0": "Aug 2019",
  "educationEndDate0": "May 2023",
  "educationMajor0": "CS in Computer Science",
  "phone": "2066077655",
  "github": "GoneSahlin",
  "education0bullet0": "bullet1",
  "education0bullet1": "bullet2",
  "projectTitle0": "Machine Learning for Real Estate",
  "projectTools0": "Python",
  "projectDate0": "Fall 2022 - Spring 2023",
  "projectUrl0": "",
  "projectTitle1": "Stocks AI",
  "projectTools1": "Python, TensorFlow",
  "projectDate1": "Spring 2023",
  "projectUrl1": "",
  "project0bullet0": "ml bullet",
  "researchTitle1": 'Long Span Truss Analysis and Optimization',
  "researchTools1": '',
  "researchDate1": '',
  "researchUrl1": ''
}

export async function cleanData(data: any) {
  console.log(data);
  data = example;

  function cleanSection(labels: Array<string>, bulletPrefix: string) {
    // find ids
    const firstLabels = keys.filter((key) => key.slice(0, labels[0].length) === labels[0]); 
    const ids = firstLabels.map((label) => {return label.slice(labels[0].length)});

    const section: Array<any> = [];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];

      const item: any = {}
      for (let j = 0; j < labels.length; j++) {
        const label = labels[j];
        item[label] = data[label + id];
      }

      const combinedPrefix = bulletPrefix + id;
      const bulletIds = keys.filter((key) => key.slice(0, combinedPrefix.length) === combinedPrefix);
      
      const bullets: Array<string> = [];
      for (let j = 0; j < bulletIds.length; j++) {
        bullets.push(data[bulletIds[j]]);
      }

      item["bullets"] = bullets;
      
      section.push(item);
    }

    return section;
  }

  const keys = (Object.keys(data));

  const educationLabels: Array<string> = [
    "educationName", 
    "educationLocation", 
    "educationStartDate", 
    "educationEndDate", 
    "educationMajor",
  ];
  const educations = cleanSection(educationLabels, "education");

  const projectLabels: Array<string> = [
    "projectTitle",
    "projectTools",
    "projectDate",
    "projectUrl",
  ];
  const projects = cleanSection(projectLabels, "project");

  const researchLabels: Array<string> = [
    "researchTitle1",
    "researchTools1",
    "researchDate1",
    "researchUrl1",
  ];
  const research = cleanSection(researchLabels, "research");

  const workExperienceLabels: Array<string> = [
    "workExperienceTitle",
    "workExperienceEmployer",
    "workExperienceStartDate",
    "workExperienceEndDate",
  ];
  const workExperiences = cleanSection(workExperienceLabels, "workExperience");

  const cleaned: any = {
    "educations": educations,
    "projects": projects,
    "research": research,
    "workExperience": workExperiences,
  };

  // clean contacts
  const contactLabels: Array<string> = [
    "phone",
    "email",
    "github",
    "linkedin",
  ];
  for (let i = 0; i < contactLabels.length; i++) {
    const label = contactLabels[i];
    
    if (keys.includes(label)) {
      cleaned[label] = data[label];
    }
  }

  

  console.log(cleaned);

  return {}
}
