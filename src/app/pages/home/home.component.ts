import { Title } from '@angular/platform-browser';
import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { SkillsGraphComponent } from '../../components/skills-graphs/skills-graph.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TimelineComponent, SkillsGraphComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  roles = [
    'Business Systems Analyst',
    'Technical Project Manager',
    'Software Engineer in Test',
    'Commercial Drone Pilot'
  ];
  currentRoleIndex = signal(0);

  isAnimating = signal(true);
  private intervalId: any;

  role = () => this.roles[this.currentRoleIndex()];
  name = signal('Vothy');
  location = signal('North Carolina');

  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Home | Vothy Prak | Technical Project Manager');
  }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.isAnimating.set(false);

      this.currentRoleIndex.update(index => (index + 1) % this.roles.length);

      setTimeout(() => {
        this.isAnimating.set(true);
      }, 20);

    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}