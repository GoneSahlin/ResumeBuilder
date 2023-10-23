class Education():
    def __init__(
        self,
        school_name=None,
        location=None,
        start_date=None,
        end_date=None,
        major=None,
        bullets=[]
    ) -> None:
        self.school_name = school_name
        self.location = location
        self.start_date = start_date
        self.end_date = end_date
        self.major = major
        self.bullets = bullets
