import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Project {
  title: string;
  category: string;
  categoryClass: string;
  subtitle: string;
  description: string;
  tags: string[];
  filterGroup: string; // Used to match our active button selections
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
  private http = inject(HttpClient);

  // Storage arrays
  allProjects = signal<Project[]>([]);
  activeFilter = signal<string>('all');

  // Dynamic Computed Signal: Automatically updates the grid layout whenever the user clicks a filter pill!
  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const projects = this.allProjects();

    if (filter === 'all') return projects;
    return projects.filter(p => p.filterGroup === filter);
  });

  ngOnInit() {
    // 🚨 Added leading slash '/' to guarantee Angular hits the public assets directly instead of the active route
    this.http.get<Project[]>('assets/data/projects.json').subscribe({
      next: (data) => this.allProjects.set(data),
      error: (err) => console.error('Failed to load project registry:', err)
    });
  }

  setFilter(group: string) {
    this.activeFilter.set(group);
  }
}