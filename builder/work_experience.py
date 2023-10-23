class WorkExperience():
    def __init__(
        self,
        title=None,
        employer=None,
        start_date=None,
        end_date=None,
        bullets=[]
        ) -> None:
        self.title = title
        self.employer = employer
        self.start_date = start_date
        self.end_date = end_date
        self.bullets = bullets
