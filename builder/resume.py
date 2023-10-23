from contacts import Contacts
from education import Education
from project import Project
from work_experience import WorkExperience


class Resume():
    def __init__(self):
        self.name = ""
        self.contacts = Contacts()
        self.educations = []
        self.projects = []
        self.researches = []
        self.work_experiences = []
        self.related_courseworks = []
        self.technical_skills = []

    def add_education(self):
        self.educations.append(Education())

    def add_project(self):
        self.projects.append(Project())

    def add_research(self):
        self.researches.append(Project())

    def add_work_experience(self):
        self.work_experiences.append(WorkExperience())

    def to_txt(self, filename):
        pass

    def to_pdf(self, filename):
        pass
