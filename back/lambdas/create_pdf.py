from builder.resume import from_cv_and_ids

def lambda_handler(event, context):
  # event = json.loads(event)

  cv = event["cv"]
  resume = event["resume"]

  formatted_resume = from_cv_and_ids(cv, resume)

    

  # return response
  return {
      "statusCode": 200,
      "body": ""
  }
