import os
from string import Template

from builder.education import Education
from builder.project import Project
from builder.work_experience import WorkExperience


class Resume():
    def __init__(
        self,
        first_name="First",
        last_name="Last",
        phone=None,
        email=None,
        github=None,
        linkedin=None
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
        bullets=[]
        ) -> None:
        self.educations.append(Education(school_name, location, start_date, end_date, major, bullets))

    def add_project(
        self,
        name=None,
        url=None,
        tools=None,
        date=None,
        bullets=[]
        ) -> None:
        self.projects.append(Project(name, url, tools, date, bullets))

    def add_research(
        self,
        name=None,
        url=None,
        tools=None,
        date=None,
        bullets=[]
        ) -> None:
        self.researches.append(Project(name, url, tools, date, bullets))

    def add_work_experience(self,
        title=None,
        employer=None,
        start_date=None,
        end_date=None,
        bullets=[]
        ) -> None:
        self.work_experiences.append(WorkExperience(title, employer, start_date, end_date, bullets))

    def add_related_coursework(self, related_coursework):
        self.related_courseworks.append(related_coursework)

    def add_technical_skill(self, technical_skill):
        self.technical_skills.append(technical_skill)

    def create_latex(self):
        template_filename = os.path.join("lib", "latex_template")
        with open(template_filename, 'r') as template:
            latex = template.read()

        # contacts
        latex += Template("\n\\name{$first}{$last}").substitute(first=self.first_name, last=self.last_name)

        if self.email:
            latex += Template("\n\\email{$email}").substitute(email=self.email)

        if self.phone:
            latex += Template("\n\\mobile{$phone}").substitute(phone=self.phone)

        if self.github:
            latex += Template("\n\\social[github]{$github}").substitute(github=self.github)

        if self.linkedin:
            latex += Template("\n\\social[linkedin]{$linkedin}").substitute(linkedin=self.linkedin)

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

        print(latex)


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