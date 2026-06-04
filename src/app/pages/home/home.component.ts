import { Title } from '@angular/platform-browser';
import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  roles = [
    'Business Systems Analyst',
    'IT Project Manager',
    'Software Engineer',
    'Commercial Drone Pilot'
  ];
  currentRoleIndex = signal(0);

  isAnimating = signal(true);
  private intervalId: any;

  role = () => this.roles[this.currentRoleIndex()];
  name = signal('Vothy Prak');
  location = signal('North Carolina');

  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Home | Vothy Prak | Technical Analyst');
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