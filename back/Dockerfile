FROM public.ecr.aws/lambda/python:3.11

# Copy requirements.txt
COPY builder ${LAMBDA_TASK_ROOT}

# Install the specified packages
RUN pip install -e back

# Copy function code
COPY lambdas/create_pdf.py ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "create_pdf.handler" ]