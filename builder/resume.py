from builder.education import Education
from builder.project import Project
from builder.work_experience import WorkExperience


class Resume():
    def __init__(
        self,
        name="First Last",
        phone=None,
        email=None,
        github=None,
        linkedin=None
        ) -> None:
        self.name = name
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

    def build_latex(self):
        pass

    def to_txt(self, filename):
        pass

    def to_pdf(self, filename):
        pass