import sys

from builder.resume import Resume


def handler(event, context):
    return 'Hello from AWS Lambda using Python' + sys.version + '!'
