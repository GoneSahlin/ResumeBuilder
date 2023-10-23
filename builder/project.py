class Project():
    def __init__(
        self,
        name=None,
        url=None,
        tools=None,
        date=None,
        bullets=[]
        ) -> None:
        self.name = name
        self.url = url
        self.tools = tools
        self.date = date
        self.bullets = bullets
