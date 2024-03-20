import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {  
  aboutMeDescription = `Versatile professional with 10 years working in the software development industry. 
Strong record of excellent teamwork and successful project management. 
Focused on team collaboration and iterative work breakdown while delivering predictable quality working software.`;
jobTitle = 'Developer/Scrum Master';
location = "North Carolina";
yourname = "Vothy Prak"
resumeData = {
  "education": [
    {
      "school": "University of North Carolina - Wilmington",
      "degree": "MBA - Information Systems",
      "graduated": "Current"
    },
    {
      "school": "East Carolina University",
      "degree": "BS - Industrial Systems",
      "graduated": "December 2021"
    }
  ],
  "work": [
    {
      "company": "Fidelity Investments",
      "title": "Scrum Master",
      "years": "July 2022 - Present",
      "description": [
        "Establish Scrum values and practices within the team.",
        "Coach and mentor team members on Agile processes.",
        "Ensure team members are able focus on tasks by removing distractions and roadblocks.",
        "Facilitate Scrum events: Daily Scrum, Sprint Review/Demo, Sprint Retro, Sprint Planning"
      ]
    },
    {
      "company": "Fidelity Investments",
      "title": "Senior Software Engineer in Test",
      "years": "October 2020 - July 2022",
      "description": [
        "Promote deeper collaboration between developer and tester throughout the development lifecycle.",
        "Champion best practices for testing throughout the tribe."
      ]
    },
    {
      "company": "Fidelity Investments",
      "title": "Security Risk Analyst",
      "years": "December 2019 - October 2020",
      "description": [
        "Developed and maintained Jenkins templates that were utilized by application teams for penetration testing."
      ]
    },
    {
      "company": "Fidelity Investments",
      "title": "Senior Software Engineer in Test ",
      "years": "August 2016 - December 2019",
      "description": [
        "Engineered a Protractor framework for testing Angular applications.",
        "Developed CI/CD process utilizing declarative Jenkins pipelines."
      ]
    },
    {
      "company": "Zenergy Technologies",
      "title": "Test Automation Engineer",
      "years": "October 2013 - February 2016",
      "description": [
        "Convert manual test cases into automated scripts within a Java-Selenium framework."
      ]
    }
  ]
}
}
