import os
from string import Template

from builder.education import Education
from builder.project import Project
from builder.work_experience import WorkExperience
from builder.utils import clean_latex


class Resume:
    def __init__(
        self,
        first_name="First",
        last_name="Last",
        phone=None,
        email=None,
        github=None,
        linkedin=None,
    ) -> None:
        self.first_name = first_name
        self.last_name = last_name
        self.phone = phone
        self.email = email
        self.github = github
        self.linkedin = linkedin

        self.educations = []
        self.projects = []
        self.researches = []
        self.work_experiences = []
        self.related_courseworks = []
        self.technical_skills = []

    def add_education(
        self,
        school_name=None,
        location=None,
        start_date=None,
        end_date=None,
        major=None,
        bullets=[],
    ) -> None:
        self.educations.append(
            Education(school_name, location, start_date, end_date, major, bullets)
        )

    def add_project(
        self, name=None, url=None, tools=None, date=None, bullets=[]
    ) -> None:
        self.projects.append(Project(name, url, tools, date, bullets))

    def add_research(
        self, name=None, url=None, tools=None, date=None, bullets=[]
    ) -> None:
        self.researches.append(Project(name, url, tools, date, bullets))

    def add_work_experience(
        self, title=None, employer=None, start_date=None, end_date=None, bullets=[]
    ) -> None:
        self.work_experiences.append(
            WorkExperience(title, employer, start_date, end_date, bullets)
        )

    def add_related_coursework(self, related_coursework):
        self.related_courseworks.append(related_coursework)

    def add_technical_skill(self, technical_skill):
        self.technical_skills.append(technical_skill)

    def create_latex(self):
        template_filename = os.path.join("lib", "latex_template")
        with open(template_filename, "r") as template:
            latex = template.read()

        # contacts
        latex += Template(
            "\n\\firstname{$first}\n\\lastname{$last}\n\\listfiles"
        ).substitute(first=self.first_name, last=self.last_name)

        if self.email:
            latex += Template("\n\\email{$email}").substitute(email=self.email)

        if self.phone:
            latex += Template("\n\\mobile{$phone}").substitute(phone=self.phone)

        if self.github:
            latex += Template("\n\\social[github]{$github}").substitute(
                github=self.github
            )

        if self.linkedin:
            latex += Template("\n\\social[linkedin]{$linkedin}").substitute(
                linkedin=self.linkedin
            )

        # start of document
        latex += "\n\\begin{document}\n\\maketitle\n\\vspace*{-10mm}"

        # education
        if self.educations:
            latex += "\n\\vspace*{-2mm}"
            latex += "\n\\section{EDUCATION}"

            for education in self.educations:
                latex += education.create_latex()

        # projects
        if self.projects:
            latex += "\n\\vspace*{-2mm}"
            latex += "\n\\section{PROJECTS}"

            for project in self.projects:
                latex += project.create_latex()

        # research
        if self.researches:
            latex += "\n\\vspace*{-2mm}"
            latex += "\n\\section{RESEARCH}"

            for research in self.researches:
                latex += research.create_latex()

        # work experience
        if self.work_experiences:
            latex += "\n\\vspace*{-2mm}"
            latex += "\n\\section{WORK EXPERIENCE}"

            for work_experience in self.work_experiences:
                latex += work_experience.create_latex()

        # related coursework and technical skills
        if self.related_courseworks and self.technical_skills:
            latex += "\n\\begin{multicols}{2}"
            latex += self.create_related_courseworks_latex()

            latex += "\n\\columnbreak"

            latex += self.create_technical_skills_latex()

            latex += "\n\\end{multicols}"
        elif self.related_courseworks:
            latex += self.create_related_courseworks_latex()
        elif self.technical_skills:
            latex += self.create_technical_skills_latex()

        # end document
        latex += "\n\\end{document}"

        # clean latex
        latex = clean_latex(latex)

        return latex

    def create_related_courseworks_latex(self):
        latex = "\n\\section{RELATED COURSEWORK}"
        latex += "\n{\\begin{itemize}"

        for related_coursework in self.related_courseworks:
            latex += "\n\\item " + related_coursework
        latex += "\n\\end{itemize}}"

        return latex

    def create_technical_skills_latex(self):
        latex = "\n\\section{TECHNICAL SKILLS}"
        latex += "\n{\\begin{itemize}"

        for technical_skill in self.technical_skills:
            latex += "\n\\item " + technical_skill
        latex += "\n\\end{itemize}}"

        return latex

    def to_txt(self, filename):
        pass

    def to_pdf(self, filename):
        pass


def from_cv_and_ids(cv, resume_ids):
    resume = Resume(first_name=cv["firstName"], last_name=cv["lastName"])

    if "phone" in cv:
        resume.phone = cv["phone"]
    if "email" in cv:
        resume.email = cv["email"]
    if "github" in cv:
        resume.github = cv["github"]
    if "linkedin" in cv:
        resume.github = cv["linkedin"]

    for education_id in resume_ids["educationIds"]:
        education = [item for item in cv["educations"] if item["id"] == education_id][0]

        resume.add_education(
            school_name=education["educationName"],
            location=education["educationLocation"],
            start_date=education["educationStartDate"],
            end_date=education["educationEndDate"],
            major=education["educationMajor"],
            bullets=education["bullets"],
        )

    for project_id in resume_ids["projectIds"]:
        project = [item for item in cv["projects"] if item["id"] == project_id][0]

        resume.add_project(
            name=project["projectTitle"],
            url=project["projectUrl"],
            tools=project["projectTools"],
            date=project["projectDate"],
            bullets=project["bullets"],
        )

    for research_id in resume_ids["researchIds"]:
        research = [item for item in cv["research"] if item["id"] == research_id][0]

        resume.add_research(
            name=research["researchTitle"],
            url=research["researchUrl"],
            tools=research["researchTools"],
            date=research["researchDate"],
            bullets=research["bullets"],
        )

    for work_experience_id in resume_ids["workExperienceIds"]:
        work_experience = [
            item for item in cv["workExperience"] if item["id"] == work_experience_id
        ][0]

        resume.add_work_experience(
            title=work_experience["workExperienceTitle"],
            employer=work_experience["workExperienceEmployer"],
            start_date=work_experience["workExperienceStartDate"],
            end_date=work_experience["workExperienceEndDate"],
            bullets=work_experience["bullets"],
        )

    for related_coursework_id in resume_ids["relatedCourseworkIds"]:
        related_coursework = [
            value
            for i, value in enumerate(cv["relatedCoursework"])
            if i == int(related_coursework_id)
        ][0]

        resume.add_related_coursework(related_coursework)

    for technical_skill_id in resume_ids["technicalSkillsIds"]:
        techincal_skill = [
            value
            for i, value in enumerate(cv["technicalSkills"])
            if i == int(technical_skill_id)
        ][0]

        resume.add_technical_skill(techincal_skill)

    return resume
