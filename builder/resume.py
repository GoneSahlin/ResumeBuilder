from builder.contacts import Contacts
from builder.education import Education
from builder.project import Project
from builder.work_experience import WorkExperience


class Resume():
    def __init__(self) -> None:
        self.name = ""
        self.contacts = Contacts()
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
        tools=None,
        date=None,
        bullets=[]
        ) -> None:
        self.projects.append(Project(name, tools, date, bullets))

    def add_research(
        self,
        name=None,
        tools=None,
        date=None,
        bullets=[]
        ) -> None:
        self.researches.append(Project(name, tools, date, bullets))

    def add_work_experience(self,
        title=None,
        employer=None,
        start_date=None,
        end_date=None,
        bullets=[]
        ) -> None:
        self.work_experiences.append(WorkExperience(title, employer, start_date, end_date, bullets))

    def to_txt(self, filename):
        pass

    def to_pdf(self, filename):
        pass
