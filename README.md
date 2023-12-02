# Resume Builder

Web app for building a resume!

## Instructions
### Running Web App
`make run-dev`

### Testing Lambda Container Image Locally
From [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/images-test.html).

Install AWS Lambda Runtime Interface Emulator:  
`mkdir -p ~/.aws-lambda-rie &&     curl -Lo ~/.aws-lambda-rie/aws-lambda-rie https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie &&     chmod +x ~/.aws-lambda-rie/aws-lambda-rie`

Then:  
`make test-lambdas`

### Deploying Image to ECR
Create a new ECR repository, then follow push commands, except modify the build image command to match that in `make build-image`.