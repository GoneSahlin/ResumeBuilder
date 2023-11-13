from builder.resume import Resume


def create_my_resume() -> Resume:
    resume = Resume(
        "Zach",
        "Sahlin",
        "206-607-7655",
        "zach@sahlins.net",
        "GoneSahlin",
        "zach-sahlin")

    resume.add_education(
        "Gonzaga University",
        "Spokane, WA",
        "August 2019",
        "May 2023",
        "BS in Computer Science, Minor in Applied Mathematics",
        ["Graduated Magna Cum Laude", "President's List: 3 semesters, Dean's List: 4 semesters"])

    resume.add_project(
        "Machine Learning for Real Estate",
        None,
        "Python, SQL, PyTorch, JS, Fast API",
        "Fall 2022 - Spring 2023",
        ["Senior Design Project", "Collects data on historical rental prices, crime data, and school scores.",
         "Predicts future rental prices with an LSTM.", "Leverages a REST API to connect the web app to the mySQL database.",
         "Displays historical prices and predictions as a web app."])
    
    resume.add_project(
        "Stock Predictor",
        "https://github.com/GoneSahlin/StocksAI",
        "Python, TensorFlow, AWS Lambda, AWS EventBridge, selenium",
        "Spring 2023",
        ["Collects historical and current data from various sources using APIs and web scraping.",
         "Stores and retrieves data on AWS S3.",
         "Uses an LSTM to predict weekly percentage increase.",
         "Displays predictions on a web app.",
         "Utilizes GitHub Actions for a CI/CD pipeline to test and publish to AWS Lambda."])
    
    resume.add_project(
        "Image Resizing CDN",
        None,
        "Python, AWS CloudFront, AWS Lambda, AWS S3, AWS CDK",
        "Fall 2023",
        ["Automatically resizes, reformats, and caches images using AWS Lambda and AWS CloudFront.",
         "Uses AWS CDK to deploy the stack."]
    )

    resume.add_research(
        "Long Span Truss Analysis and Optimization",
        None,
        "MATLAB",
        "Spring 2023",
        ["Worked with Dr. Sara Ganzerli and civil engineering students.",
         "Developed a script to analyze and optimize a truss to minimize material use within the load constraints."])

    resume.add_work_experience(
        "Teaching Assistant",
        "Gonzaga University",
        "August 2022",
        "May 2023",
        ["Teaching assistant for Operating Systems, Computer Security, and Internet of Things.",
         "Graded programming and written assignments."])
    
    resume.add_work_experience(
        "Online Private Instructor",
        "iD Tech",
        "June 2021",
        "August 2022",
        ["Tutored in 8 different computer science topics, including C++, Java, and Python.",
         "Completed over 200 private lessons.",
         "Formed relationships with long-term clients, and developed further skills in communication and coding.",
         "Collaborated with other instructors to improve teaching methods."])
    
    related_courseworks = [
        "Algorithms & Abstract Data Structures",
        "Machine Learning & Intelligent Systems",
        "Data Science Algorithms",
        "Operating Systems",
        "Database Management Systems",
        "Programming Languages & Compilers",
        "Linux & DevOps",
        "Natural Language Processing"]
    
    for related_coursework in related_courseworks:
        resume.add_related_coursework(related_coursework)

    technical_skills = [
        "Languages: C++, Java, Python, C, SQL",
        "Tools: Git, Linux, Docker, Jupyter, GitHub Actions, Postgres, AWS Lambda, AWS S3"
        "Libraries: TensorFlow, PyTorch, pandas, NumPy, scikit-learn, Matplotlib"
    ]

    for technical_skill in technical_skills:
        resume.add_technical_skill(technical_skill)

    return resume
