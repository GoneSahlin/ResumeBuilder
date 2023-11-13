from string import Template


class WorkExperience():
    def __init__(
        self,
        title="",
        employer="",
        start_date="",
        end_date="",
        bullets=[]
        ) -> None:
        self.title = title
        self.employer = employer
        self.start_date = start_date
        self.end_date = end_date
        self.bullets = bullets

    def create_latex(self):
        latex = Template("\n\\entry{$employer}{$title}{$start_date -- $end_date}").substitute(
            employer=self.employer, title=self.title, start_date=self.start_date, end_date=self.end_date)

        if self.bullets:
            latex += "\n{\\begin{itemize}"

            for bullet in self.bullets:
                latex += "\n\\item " + bullet
            
            latex += "\n\\end{itemize}}"

        return latex
