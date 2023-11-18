export type Field = {
    name: string;
    label: string;
}

export type Resume = {
    resumeName: string;
    educationIds: Array<number>;
    projectIds: Array<number>;
    researchIds: Array<number>;
    workExperienceIds: Array<number>;
    relatedCourseworkIds: Array<number>;
    technicalSkillsIds: Array<number>; 
}
