class Project():
    def __init__(
        self,
        name=None,
        tools=None,
        date=None,
        bullets=[]
        ) -> None:
        self.name = name
        self.tools = tools
        self.date = date
        self.bullets = bullets
