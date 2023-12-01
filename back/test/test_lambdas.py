import unittest
import subprocess
import time
import json


class TestLambda(unittest.TestCase):
    def test_lambda(self):
        command = "make -C .. start-container"
        p1 = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, stdin=subprocess.PIPE)

        # wait for container to start
        timeout = time.time() + 20
        while True:
            line =  p1.stdout.readline().decode().strip()

            if line:
                print(line)

            # last line should look like this
            # dc6045688a431b4ea7a9373327a3fecdb56f8dccd35df0bc2acbb1280446634c
            # or other 64 digit hex number, so check for a line that matches
            if len(line) == 64:
                if all([x.isdigit() or 'a' <= x <= 'f' for x in line]):
                    break

            # check for timeout
            if time.time() > timeout:
                p1.stdin.close()
                p1.stdout.close()
                p1.terminate()
                self.fail("Process timed out")
        
        # takes a second to setup after last line printed
        time.sleep(1)

        event = {"cv": {"educations":[{"id":"0","educationName":"Gonzaga University","educationLocation":"Spokane, WA","educationStartDate":"August 2019","educationEndDate":"May 2023","educationMajor":"BS in Computer Science, Minor in Applied Mathematics","bullets":["GPA: 3.7, Magna Cum Laude","President’s List: 3 semesters, Dean’s List: 4 semesters"]}],"projects":[{"id":"0","projectTitle":"Machine Learning for Real Estate","projectTools":"Python, SQL, PyTorch, JS, Fast API","projectDate":"Fall 2022 - Spring 2023","projectUrl":"","bullets":["Senior Design Project","Collects data on historical rental prices, crime data, and school scores.","Predicts future rental prices with an LSTM.","Leverages a REST API to connect the web app to the mySQL database.","Displays historical prices and predictions as a web app."]},{"id":"1","projectTitle":"Stock Predictor","projectTools":"Python, TensorFlow, AWS Lambda, AWS EventBridge, selenium","projectDate":"Spring 2023","projectUrl":"https://github.com/GoneSahlin/StocksAI","bullets":["Collects historical and current data from various sources using APIs and web scraping.","Stores and retrieves data on AWS S3. ","Displays predictions on a web app.","Utilizes GitHub Actions for a CI/CD pipeline to test and publish to AWS Lambda."]},{"id":"2","projectTitle":"Image Resizing CDN","projectTools":"Python, AWS CloudFront, AWS Lambda, AWS S3, AWS CDK","projectDate":"Fall 2023","projectUrl":"","bullets":["Automatically resizes, reformats, and caches images using AWS Lambda and AWS CloudFront.","Uses AWS CDK to deploy the stack."]}],"research":[{"id":"0","researchTitle":"Long Span Truss Analysis and Optimization","researchTools":"MATLAB","researchDate":"Spring 2023","researchUrl":"","bullets":["Worked with Dr. Sara Ganzerli and civil engineering students.","Developed a script to analyze and optimize a truss to minimize material use within the load constraints."]}],"workExperience":[{"id":"0","workExperienceTitle":"Teaching Assistant","workExperienceEmployer":"Gonzaga University","workExperienceStartDate":"August 2022","workExperienceEndDate":"May 2023","bullets":["Teaching assistant for Operating Systems, Computer Security, and Internet of Things.","Graded programming and written assignments."]},{"id":"1","workExperienceTitle":"Online Private Instructor","workExperienceEmployer":"iD Tech","workExperienceStartDate":"June 2021","workExperienceEndDate":"August 2022","bullets":["Tutored in 8 different computer science topics, including C++, Java, and Python.","Completed over 200 private lessons.","Formed relationships with long-term clients, and further developed skills in communication and coding.","Collaborated with other instructors to improve teaching methods."]}],"phone":"2066077655","email":"zach@sahlins.net","github":"GoneSahlin","linkedin":"zachsahlin","relatedCoursework":["Algorithms & Abstract Data Structures","Machine Learning & Intelligent Systems","Data Science Algorithms","Operating Systems","Database Management Systems","Programming Languages & Compilers","Linux & DevOps","Natural Language Processing"],"technicalSkills":["Languages: C++, Java, Python, C, SQL","Tools: Git, Linux, Docker, Jupyter, GitHub Actions, Postgres, AWS Lambda, AWS S3","Libraries: TensorFlow, PyTorch, pandas, NumPy, scikit-learn, Matplotlib"],"firstName":"Zach","lastName":"Sahlin"},
                    "resume":{"resumeName":"Resume 1","educationIds":["0"],"projectIds":["2","1","0"],"researchIds":["0"],"workExperienceIds":["0","1"],"relatedCourseworkIds":[],"technicalSkillsIds":[]}}
            
        # call lambda function
        command = f"curl \"http://localhost:9000/2015-03-31/functions/function/invocations\" -d '{json.dumps(event)}'"
        print(command)
        p2 = subprocess.run(command, shell=True, capture_output=True)

        # close pipes
        p1.stdin.close()
        p1.stdout.close()
        
        # end process
        p1.terminate()

        # kill docker container
        subprocess.run(["docker", "kill", "Resume_Builder"])
        subprocess.run(["docker", "remove", "Resume_Builder"])
        
        # check response
        response = p2.stdout.decode()
        print("response:", response)
        # assert "Hello from AWS Lambda using Python3" in response

        # assert response["statusCode"] == 200
        # assert response["body"]
