import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Achievement {
    category: string;
    title: string;
    description: string;
    tags?: string[];
}

interface ExperienceRole {
    company: string;
    role: string;
    period: string;
    location: string;
    type: string;
    summary: string;
    achievements: Achievement[];
}

@Component({
    selector: 'app-timeline',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="py-8 space-y-8">
      
      <!-- Section Header & Filter Pills -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 mb-2">
            <span class="flex h-1.5 w-1.5 rounded-full bg-sky-500"></span>
            Career Roadmap
          </div>
          <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Experience Timeline</h2>
        </div>

        <!-- Dynamic Category Filters -->
        <div class="flex flex-wrap items-center gap-1.5">
          <button 
            *ngFor="let filter of filters"
            (click)="activeFilter.set(filter)"
            [class]="activeFilter() === filter 
              ? 'bg-slate-900 text-white font-bold text-xs px-3.5 py-1.5 rounded-full transition-all shadow-sm' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium text-xs px-3.5 py-1.5 rounded-full transition-all'">
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Vertical Timeline Track -->
      <div class="relative ml-3 sm:ml-6 border-l-2 border-slate-200 pl-6 sm:pl-8 space-y-12">
        
        <div *ngFor="let role of filteredRoles(); let i = index" class="relative group">
          
          <!-- Timeline Node Point -->
          <div class="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-white border-2 border-slate-300 group-hover:border-sky-500 group-hover:scale-125 transition-all duration-200 flex items-center justify-center">
            <span class="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-sky-500 transition-colors"></span>
          </div>

          <!-- Timeline Card -->
          <div class="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm group-hover:shadow-md group-hover:border-slate-300 transition-all duration-200">
            
            <!-- Metadata Header -->
            <div class="flex flex-wrap justify-between items-start gap-2 mb-3">
              <div>
                <span class="text-xs font-bold text-sky-600 tracking-wider uppercase">{{ role.company }}</span>
                <h3 class="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">{{ role.role }}</h3>
              </div>
              
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
                  {{ role.period }}
                </span>
                <span class="text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                  {{ role.type }}
                </span>
              </div>
            </div>

            <p class="text-xs font-medium text-slate-400 mb-4">{{ role.location }}</p>
            <p class="text-slate-600 text-sm font-medium leading-relaxed mb-6">{{ role.summary }}</p>

            <!-- Key Milestones & Achievements -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Key Highlights & Impact</h4>
              <div class="grid grid-cols-1 gap-3">
                <div 
                  *ngFor="let item of role.achievements" 
                  class="bg-slate-50 rounded-xl p-4 border border-slate-100/80 hover:border-slate-200 transition-colors">
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <span class="text-xs font-bold text-slate-900">{{ item.title }}</span>
                    <span class="text-[10px] font-extrabold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded">
                      {{ item.category }}
                    </span>
                  </div>
                  <p class="text-slate-600 text-xs font-medium leading-relaxed">{{ item.description }}</p>
                  
                  <!-- Skill Badges -->
                  <div *ngIf="item.tags && item.tags.length" class="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-200/40">
                    <span *ngFor="let tag of item.tags" class="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  `
})
export class TimelineComponent {
    activeFilter = signal<string>('All');
    filters = ['All', 'Predictable Delivery', 'Security', 'Automation', 'Governance'];

    roles = signal<ExperienceRole[]>([
        {
            company: 'Fidelity Investments',
            role: 'Technical Project Manager / Sr. Scrum Master',
            period: '2022 — 2026',
            location: 'Durham, NC',
            type: 'Full-time',
            summary: 'Directed technical project intake, portfolio budgets, and cross-functional software execution across matrixed enterprise engineering squads.',
            achievements: [
                {
                    category: 'Predictable Delivery',
                    title: 'Squad Delivery Variance Compression',
                    description: 'Reduced sprint delivery variance from a chronic 14-day delay down to ± 2 days of target through refined capacity planning and Definition of Ready (DoR) gates.',
                    tags: ['Jira Align', 'Agility Health', 'Capacity Modeling']
                },
                {
                    category: 'Security',
                    title: 'Zero-Day Vulnerability Blueprint',
                    description: 'Pioneered zero-day security rollout completed within a single quarter, adopted across six neighboring delivery teams.',
                    tags: ['Splunk', 'Audit Compliance', 'CI/CD Security']
                },
                {
                    category: 'Governance',
                    title: 'Cross-Team Dependency Resolution',
                    description: 'Compressed critical cross-squad dependency delays from 3 months to 1 month through technical dependency mapping.',
                    tags: ['Confluence', 'Miro', 'Risk Mitigation']
                }
            ]
        },
        {
            company: 'Fidelity Investments',
            role: 'Sr. Software Engineer in Test (SDET)',
            period: '2020 — 2022',
            location: 'Durham, NC',
            type: 'Full-time',
            summary: 'Quality validation authority across seven squads owning end-to-end automation architecture and CI/CD pipeline quality gates.',
            achievements: [
                {
                    category: 'Automation',
                    title: 'CI/CD Regression Pipeline',
                    description: 'Designed automated regression test suites in Cypress, Playwright, and RestAssured integrated directly into Jenkins execution pipelines.',
                    tags: ['TypeScript', 'Cypress', 'Playwright', 'Jenkins']
                },
                {
                    category: 'Predictable Delivery',
                    title: 'Service Virtualization Framework',
                    description: 'Deployed WireMock mock environments unblocking parallel dev/test streams and accelerating data provisioning lifecycles.',
                    tags: ['WireMock', 'REST APIs', 'Service Virtualization']
                }
            ]
        }
    ]);

    filteredRoles = computed(() => {
        const filter = this.activeFilter();
        const allRoles = this.roles();

        if (filter === 'All') return allRoles;

        return allRoles.map(role => ({
            ...role,
            achievements: role.achievements.filter(a => a.category === filter)
        })).filter(role => role.achievements.length > 0);
    });
}