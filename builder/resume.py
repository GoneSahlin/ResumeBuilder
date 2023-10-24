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

        # work experience

        # related coursework

        # technical skills


        print(latex)

    def to_txt(self, filename):
        pass

    def to_pdf(self, filename):
        pass