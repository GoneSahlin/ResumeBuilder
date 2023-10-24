from string import Template


class Project():
    def __init__(
        self,
        name="",
        url="",
        tools="",
        date="",
        bullets=[]
        ) -> None:
        self.name = name
        self.url = url
        self.tools = tools
        self.date = date
        self.bullets = bullets

    def create_latex(self):
        latex = Template("\n\\project{$title}{$url}{$tools}{$date}").substitute(
            title=self.name, url=self.url, tools=self.tools, date=self.date)
        
        if self.bullets:
            latex += "\n{\\begin{itemize}"

            for bullet in self.bullets:
                latex += "\n\\item " + bullet
            
            latex += "\n\\end{itemize}}"

        return latex
