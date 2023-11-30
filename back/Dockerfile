FROM public.ecr.aws/lambda/python:3.11

# Copy requirements.txt
COPY src ./src

# Install the specified packages
RUN pip install ./src

# Copy function code
COPY lambdas/lambda_function.py ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "lambda_function.handler" ]