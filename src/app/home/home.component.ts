import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  aboutMeDescription = `Versatile professional with 10 years working in the software development industry. 
    Strong record of excellent teamwork and successful project management. 
    Focused on team collaboration and iterative work breakdown while delivering predictable quality working software.`;
  jobTitle = 'Developer/Scrum Master';
  location = "North Carolina";
  yourname = "Vothy Prak"
}
