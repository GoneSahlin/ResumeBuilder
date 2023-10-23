import unittest

from builder.resume import Resume


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
