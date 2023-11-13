import os
import subprocess

from builder.my_resume import create_my_resume


def main():
    resume = create_my_resume()

    latex = resume.create_latex()

    filename = os.path.join("lib", "resume.tex")
    with open(filename, 'w') as outfile:
        outfile.write(latex)

    subprocess.run(["pdflatex", "-output-directory", "lib", "lib/resume.tex"])


if __name__ == '__main__':
    main()
