import { Component, signal, OnInit, OnDestroy } from '@angular/core';
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

  // 1. Add a signal to track the animation state flag
  isAnimating = signal(true);
  private intervalId: any;

  role = () => this.roles[this.currentRoleIndex()];
  name = signal('Vothy Prak');
  location = signal('Kernersville, NC');

  ngOnInit() {
    this.intervalId = setInterval(() => {
      // 2. Turn animation off
      this.isAnimating.set(false);

      // 3. Move to the next string role target
      this.currentRoleIndex.update(index => (index + 1) % this.roles.length);

      // 4. A tiny 20ms delay lets the browser register the class removal 
      // before we snap it back on to trigger the keyframes again!
      setTimeout(() => {
        this.isAnimating.set(true);
      }, 20);

    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}