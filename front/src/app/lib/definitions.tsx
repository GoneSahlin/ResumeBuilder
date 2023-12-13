export type Field = {
    name: string;
    label: string;
}

export type Resume = {
    id: string;
    resumeName: string;
    educationIds: Array<number>;
    projectIds: Array<number>;
    researchIds: Array<number>;
    workExperienceIds: Array<number>;
    relatedCourseworkIds: Array<number>;
    technicalSkillsIds: Array<number>;
    updatedAt: number;
}

export interface PdfData {
    pdfUrl: string;
    resumeId: string;
    resumeUpdatedAt: number;
    updatedAt: number;
}