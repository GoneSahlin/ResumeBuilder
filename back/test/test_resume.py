import unittest

from builder.resume import Resume
from builder.my_resume import create_my_resume
from builder.resume import from_cv_and_ids

class TestResume(unittest.TestCase):
    def test_init(self):
        resume = Resume()

    def test_add_education(self):
        resume = Resume()

        resume.add_education(
            "Gonzaga University",
            "Spokane, WA",
            "August 2019",
            "May 2023",
            "BS in Computer Science, Minor in Applied Mathematics",
            ["Graduated Magna Cum Laude", "President's List: 3 semesters, Dean's List: 4 semesters"])
        
        assert len(resume.educations) == 1
        assert len(resume.educations[0].bullets) == 2
        
    def test_add_project(self):
        resume = Resume()

        resume.add_project(
            "Machine Learning for Real Estate",
            None,
            "Python, SQL, PyTorch, JS, Fast API",
            "Fall 2022 - Spring 2023",
            ["Senior Design Project", "Collects data on historical rental prices, crime data, and school scores.",
             "Predicts future rental prices with an LSTM.", "Leverages a REST API to connect the web app to the mySQL database.",
             "Displays historical prices and predictions as a web app."]
        )

        assert len(resume.projects) == 1
        assert len(resume.projects[0].bullets) == 5

    def test_add_research(self):
        resume = Resume()

        resume.add_research(
            "Long Span Truss Analysis and Optimization",
            None,
            "MATLAB",
            "Spring 2023",
            ["Worked with Dr. Sara Ganzerli and civil engineering students.",
            "Developed a script to analyze and optimize a truss to minimize material use within the load constraints."])

        assert len(resume.researches) == 1
        assert len(resume.researches[0].bullets) == 2

    def test_add_work_experience(self):
        resume = Resume()

        resume.add_work_experience(
        "Teaching Assistant",
        "Gonzaga University",
        "August 2022",
        "May 2023",
        ["Teaching assistant for Operating Systems, Computer Security, and Internet of Things.",
         "Graded programming and written assignments."])
        
        assert len(resume.work_experiences) == 1
        assert len(resume.work_experiences[0].bullets) == 2

    def test_create_latex(self):
        resume = create_my_resume()

        latex = resume.create_latex()

        print(latex)

        assert latex

    def test_from_cv_and_ids(self):
        cv = {"educations":[{"id":"0","educationName":"Gonzaga University","educationLocation":"Spokane, WA","educationStartDate":"August 2019","educationEndDate":"May 2023","educationMajor":"BS in Computer Science, Minor in Applied Mathematics","bullets":["GPA: 3.7, Magna Cum Laude","President’s List: 3 semesters, Dean’s List: 4 semesters"]}],"projects":[{"id":"0","projectTitle":"Machine Learning for Real Estate","projectTools":"Python, SQL, PyTorch, JS, Fast API","projectDate":"Fall 2022 - Spring 2023","projectUrl":"","bullets":["Senior Design Project","Collects data on historical rental prices, crime data, and school scores.","Predicts future rental prices with an LSTM.","Leverages a REST API to connect the web app to the mySQL database.","Displays historical prices and predictions as a web app."]},{"id":"1","projectTitle":"Stock Predictor","projectTools":"Python, TensorFlow, AWS Lambda, AWS EventBridge, selenium","projectDate":"Spring 2023","projectUrl":"https://github.com/GoneSahlin/StocksAI","bullets":["Collects historical and current data from various sources using APIs and web scraping.","Stores and retrieves data on AWS S3. ","Displays predictions on a web app.","Utilizes GitHub Actions for a CI/CD pipeline to test and publish to AWS Lambda."]},{"id":"2","projectTitle":"Image Resizing CDN","projectTools":"Python, AWS CloudFront, AWS Lambda, AWS S3, AWS CDK","projectDate":"Fall 2023","projectUrl":"","bullets":["Automatically resizes, reformats, and caches images using AWS Lambda and AWS CloudFront.","Uses AWS CDK to deploy the stack."]}],"research":[{"id":"0","researchTitle":"Long Span Truss Analysis and Optimization","researchTools":"MATLAB","researchDate":"Spring 2023","researchUrl":"","bullets":["Worked with Dr. Sara Ganzerli and civil engineering students.","Developed a script to analyze and optimize a truss to minimize material use within the load constraints."]}],"workExperience":[{"id":"0","workExperienceTitle":"Teaching Assistant","workExperienceEmployer":"Gonzaga University","workExperienceStartDate":"August 2022","workExperienceEndDate":"May 2023","bullets":["Teaching assistant for Operating Systems, Computer Security, and Internet of Things.","Graded programming and written assignments."]},{"id":"1","workExperienceTitle":"Online Private Instructor","workExperienceEmployer":"iD Tech","workExperienceStartDate":"June 2021","workExperienceEndDate":"August 2022","bullets":["Tutored in 8 different computer science topics, including C++, Java, and Python.","Completed over 200 private lessons.","Formed relationships with long-term clients, and further developed skills in communication and coding.","Collaborated with other instructors to improve teaching methods."]}],"phone":"2066077655","email":"zach@sahlins.net","github":"GoneSahlin","linkedin":"zachsahlin","relatedCoursework":["Algorithms & Abstract Data Structures","Machine Learning & Intelligent Systems","Data Science Algorithms","Operating Systems","Database Management Systems","Programming Languages & Compilers","Linux & DevOps","Natural Language Processing"],"technicalSkills":["Languages: C++, Java, Python, C, SQL","Tools: Git, Linux, Docker, Jupyter, GitHub Actions, Postgres, AWS Lambda, AWS S3","Libraries: TensorFlow, PyTorch, pandas, NumPy, scikit-learn, Matplotlib"],"firstName":"Zach","lastName":"Sahlin"}
        ids = {"resumeName":"Resume 1","educationIds":["0"],"projectIds":["2","1","0"],"researchIds":["0"],"workExperienceIds":["0","1"],"relatedCourseworkIds":["1", "3"],"technicalSkillsIds":["1", "2"]}
        
        resume: Resume = from_cv_and_ids(cv, ids)

        assert resume.first_name == "Zach"
        assert resume.last_name == "Sahlin"
        assert len(resume.educations) == 1
        assert resume.educations[0].school_name == "Gonzaga University"
        assert len(resume.projects) == 3
        assert resume.projects[0].name == "Image Resizing CDN"
        assert len(resume.researches) == 1
        assert resume.researches[0].name == "Long Span Truss Analysis and Optimization"
        assert len(resume.work_experiences) == 2
        assert resume.work_experiences[1].title == "Online Private Instructor"
        assert len(resume.work_experiences[1].bullets) == 4
        assert len(resume.related_courseworks) == 2
        assert len(resume.technical_skills) == 2
