# FROM public.ecr.aws/lambda/python:3.11
FROM public.ecr.aws/lambda/provided:al2023

# Copy src folder
COPY src ./src

# install python
RUN dnf install python3 -y

# Install the specified packages
RUN pip install ./src
RUN pip install awslambdaric
RUN pip install boto3

# Install TexLive
RUN dnf install texlive-latex -y
RUN dnf install texlive-moderncv -y
RUN dnf install texlive-multirow -y
RUN dnf install texlive-arydshln -y
RUN dnf install texlive-ec -y
RUN dnf install texlive-fontawesome5 -y

# Copy function code
COPY lambdas/create_pdf.py ${LAMBDA_TASK_ROOT}

# Entrypoint
ENTRYPOINT [ "/usr/bin/python3", "-m", "awslambdaric" ]

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "create_pdf.lambda_handler" ]
