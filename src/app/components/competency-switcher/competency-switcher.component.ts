import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-competency-switcher',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="py-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
      <div class="mb-6 space-y-1">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-xs font-bold text-sky-700 shadow-sm">
          <span class="flex h-1.5 w-1.5 rounded-full bg-sky-400"></span>
          Capability Focus
        </div>
        <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Core Competency Lenses</h2>
      </div>
      
      <!-- Tab Navigation -->
      <div class="flex flex-wrap gap-2 mb-6 border-b border-slate-100 pb-4">
        <button 
          *ngFor="let tab of tabs" 
          (click)="activeTab.set(tab.id)"
          [class]="activeTab() === tab.id 
            ? 'bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm' 
            : 'bg-slate-100 text-slate-600 hover:text-slate-900 font-bold text-xs px-4 py-2 rounded-xl transition-all'">
          {{ tab.label }}
        </button>
      </div>

      <!-- Active Tab Content -->
      <div *ngFor="let tab of tabs">
        <div *ngIf="activeTab() === tab.id" class="space-y-6">
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li *ngFor="let point of tab.highlights" class="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span class="text-sky-500 font-bold">✓</span>
              <span class="text-slate-700 text-sm font-medium">{{ point }}</span>
            </li>
          </ul>

          <div class="flex flex-wrap gap-2 pt-2">
            <span *ngFor="let tool of tab.tools" class="text-xs font-bold bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 rounded-lg">
              {{ tool }}
            </span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CompetencySwitcherComponent {
    activeTab = signal<string>('pm');

    tabs = [
        {
            id: 'pm',
            label: 'Project & Portfolio Leadership',
            highlights: [
                'Enterprise intake, capacity estimation, and Jira Align portfolio governance.',
                'Structured Agile syncs reducing delivery variance to ± 2 days target.',
                'Definition of Ready (DoR) implementation increasing sprint completion by 23%.',
                'Cross-functional dependency mapping reducing roadblocks from 3 months to 1 month.'
            ],
            tools: ['Jira Align', 'Agility Health', 'Confluence', 'Miro', 'Portfolio Management']
        },
        {
            id: 'engineering',
            label: 'Full-Stack & Quality Engineering',
            highlights: [
                'Automated test suites in Cypress, Playwright, and RestAssured integrated into CI/CD.',
                'WireMock service virtualization environments accelerating data provisioning lifecycles.',
                'Modern web application development utilizing Angular, React, TypeScript, and REST APIs.',
                'Quality-first architecture shifting validation left across matrixed delivery squads.'
            ],
            tools: ['TypeScript', 'Angular', 'React', 'Cypress', 'Playwright', 'Jenkins', 'REST APIs']
        },
        {
            id: 'governance',
            label: 'Governance & Security',
            highlights: [
                'Led squad zero-day security remediation blueprint adopted across 6 neighboring teams.',
                'Automated compliance triggers in Jenkins across 20+ engineering squads.',
                'Enterprise Splunk logging and PII risk management for audit readiness.',
                'Executive dashboarding transforming status calls into actionable value metrics.'
            ],
            tools: ['Splunk', 'Jenkins CI/CD', 'Security Risk Auditing', 'PII Protection', 'Governance']
        }
    ];
}