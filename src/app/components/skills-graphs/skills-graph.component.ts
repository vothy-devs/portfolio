import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SkillCategory {
  title: string;
  badge: string;
  skills: string[];
  accentColor: string;
}

@Component({
  selector: 'app-skills-graph',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-8 border-b border-slate-100">
      
      <!-- Section Header -->
      <div class="mb-6 space-y-1">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700 shadow-sm">
          <span class="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          Core Competencies
        </div>
        <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Engineering Leadership & Technical Execution</h2>
      </div>

      <!-- Skills Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          *ngFor="let cat of skillCategories()" 
          class="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 relative overflow-hidden group flex flex-col justify-between">
          
          <div>
            <!-- Top Accent Bar -->
            <div [class]="'absolute top-0 left-0 right-0 h-1 ' + cat.accentColor"></div>

            <!-- Category Badge / Header -->
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {{ cat.badge }}
            </div>

            <div class="text-xl font-extrabold text-slate-900 tracking-tight mb-4 group-hover:text-emerald-700 transition-colors duration-200">
              {{ cat.title }}
            </div>
          </div>

          <!-- Skills List (Strictly Top 4) -->
          <ul class="space-y-2 pt-2 border-t border-slate-100">
            <li *ngFor="let skill of cat.skills" class="text-xs text-slate-600 font-medium flex items-center gap-2">
              <span class="h-1 w-1 rounded-full bg-slate-400"></span>
              {{ skill }}
            </li>
          </ul>

        </div>
      </div>

    </section>
  `
})
export class SkillsGraphComponent {
  skillCategories = signal<SkillCategory[]>([
    {
      title: 'Leadership',
      badge: 'Agile Coaching',
      skills: ['Servant Leadership', 'Cross-Squad Facilitation', 'Impediment Removal', 'Stakeholder Alignment'],
      accentColor: 'bg-sky-500'
    },
    {
      title: 'Delivery',
      badge: 'Empirical Flow',
      skills: ['Sprint Goal Optimization', 'Velocity Tracking', 'Work Breakdown', 'Predictive Burndown Health'],
      accentColor: 'bg-indigo-500'
    },
    {
      title: 'Development',
      badge: 'Scrum Artifacts',
      skills: ['Backlog Refinement', 'Sprint Planning Ceremonies', 'Retrospective Facilitation', 'Release Train Governance'],
      accentColor: 'bg-emerald-500'
    },
    {
      title: 'Quality',
      badge: 'Standards',
      skills: ['Definition of Done (DoD)', 'Definition of Ready (DoR)', 'Continuous Improvement', 'Risk & Dependency Mitigation'],
      accentColor: 'bg-amber-500'
    }
  ]);
}