import subprocess
import os
import json
import base64

from builder.resume import from_cv_and_ids


def lambda_handler(event, context):
    if "body" in event:
        body = json.loads(event["body"])
        cv = body["cv"]
        resume = body["resume"]
    else:
        cv = event["cv"]
        resume = event["resume"]

    formatted_resume = from_cv_and_ids(cv, resume)

    latex = formatted_resume.create_latex()

    # latex = """\documentclass[12pt, letterpaper]{article}\\title{My first LaTeX document}\\author{Hubert Farnsworth\\thanks{Funded by the Overleaf team.}}\date{August 2022}\\begin{document}\\maketitleWe have now added a title, author and date to our first \\LaTeX{} document!\\end{document}"""

    directories = ["/tmp/input", "/tmp/output"]
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)

    input_path = "/tmp/input/resume.tex"
    with open(input_path, 'w') as outfile:
        outfile.write(latex)

    bin = "pdflatex"
    bash_command = [bin,
                    "-output-directory", "/tmp/output", "-interaction=nonstopmode",
                    input_path]
    process = subprocess.Popen(bash_command, stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(output)
    print(error)
    pdf_path = "/tmp/output/resume.pdf"
    print(pdf_path)

    # read output file
    with open(pdf_path, 'rb') as pdf_file:
        pdf_bytes = pdf_file.read()

    # return response
    return {
        "statusCode": 200,
        "body": base64.b64encode(pdf_bytes).decode('utf-8')
    }
