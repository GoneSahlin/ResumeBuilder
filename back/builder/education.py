from string import Template


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

    def create_latex(self):
        latex = Template("\n\\education{$name}{$location}{$start_date -- $end_date}{$major}").substitute(
            name=self.school_name, location=self.location, start_date=self.start_date, end_date=self.end_date, major=self.major)
        
        if self.bullets:
            latex += "\n{\\begin{itemize}"

            for bullet in self.bullets:
                latex += "\n\\item " + bullet
            
            latex += "\n\\end{itemize}}"

        return latex
