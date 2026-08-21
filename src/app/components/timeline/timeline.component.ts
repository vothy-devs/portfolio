import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RoleDetail {
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
}

interface CompanyGroup {
  company: string;
  logo?: string;
  totalPeriod: string;
  roles: RoleDetail[];
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-12 space-y-10">
      
      <!-- Section Header -->
      <div class="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 class="mt-1 text-3xl font-extrabold text-slate-900 tracking-tight">Professional Experience</h2>
        </div>
      </div>

      <!-- Modern Structural Timeline Track -->
      <div class="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-[11px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-sky-500 before:via-slate-200 before:to-slate-200">
        
        <div *ngFor="let group of groupedRoles(); let i = index" class="relative group">
          
          <!-- Floating Status Node -->
          <div class="absolute -left-[27px] sm:-left-[35px] top-6 h-4 w-4 rounded-full bg-white border-2 border-sky-500 group-hover:scale-125 group-hover:bg-sky-500 transition-all duration-300 flex items-center justify-center z-10 shadow-md shadow-sky-500/20">
            <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
          </div>

          <!-- Main Company Matrix Card -->
          <div class="bg-gradient-to-br from-white via-white to-slate-50/50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm group-hover:shadow-xl group-hover:border-sky-300/60 transition-all duration-300 space-y-6">
            
            <!-- Company Header HUD -->
            <div class="flex flex-wrap justify-between items-center gap-4 pb-5 border-b border-slate-100">
   <div class="flex items-center gap-4">
     <div *ngIf="group.logo" class="flex items-center">
    <img [src]="group.logo" [alt]="group.company + ' logo'" class="h-8 max-w-[130px] object-contain" />
  </div>
  <div>
    <h3 class="text-xl font-extrabold text-slate-900 tracking-tight">{{ group.company }}</h3>
  </div>
</div>
              
              <div class="font-mono text-xs font-bold text-slate-700 bg-slate-100/80 px-4 py-2 rounded-xl border border-slate-200/60 shadow-xs">
                {{ group.totalPeriod }}
              </div>
            </div>

            <!-- Nested Roles: Terminal Sub-entries -->
            <div class="space-y-6 pl-2 sm:pl-4 border-l-2 border-slate-100 group-hover:border-sky-100 transition-colors">
              <div *ngFor="let role of group.roles; let last = last" [class.pb-6]="!last" [class.border-b]="!last" [class.border-slate-100]="!last">
                
                <div class="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <h4 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span class="text-sky-500 font-mono text-sm">#</span> {{ role.role }}
                  </h4>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-mono font-medium text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200/60 shadow-2xs">
                      {{ role.period }}
                    </span>
                    <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                      {{ role.type }}
                    </span>
                  </div>
                </div>

                <div class="text-xs font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                  <svg class="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ role.location }}
                </div>

                <p class="text-slate-600 text-sm font-medium leading-relaxed bg-white/60 p-4 rounded-xl border border-slate-100">
                  {{ role.summary }}
                </p>

              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  `
})
export class TimelineComponent {
  // Replace these Cloudinary placeholder URLs with your exact asset links
  private rawRoles = [
    {
      company: 'Prak Creative Media & Backyard Battles',
      logo: 'https://res.cloudinary.com/prak-media/image/upload/v1787244883/PCMIcon.png',
      role: 'Founder & Operations Lead',
      period: 'JUL 2026 — Present',
      location: 'North Carolina',
      type: 'Full-time',
      summary: 'Directing commercial real estate photography, FAA Part 107 aerial media productions, and live-action tactical entertainment event operations alongside custom web engineering.'
    },
    {
      company: 'Fidelity Investments',
      logo: 'https://res.cloudinary.com/prak-media/image/upload/v1787279025/Fidelity-Investments-1-1.png.webp',
      role: 'Technical Project Manager | Sr. Scrum Master',
      period: 'JUL 2022 — JUN 2026',
      location: 'North Carolina',
      type: 'Full-time',
      summary: 'Directed technical project intake, capacity planning, and cross-functional software execution across a matrixed enterprise environment. Partnered closely with platform architects, full-stack engineers, and product managers to govern end-to-end SDLC execution—spanning CI/CD pipelines, security remediation cycles, and predictable feature delivery.'
    },
    {
      company: 'Fidelity Investments',
      logo: 'https://res.cloudinary.com/prak-media/image/upload/v1787279025/Fidelity-Investments-1-1.png.webp',
      role: 'Sr. Software Engineer in Test (SDET)',
      period: 'OCT 2020 — JUL 2022',
      location: 'North Carolina',
      type: 'Full-time',
      summary: 'Served as the core quality engineering and validation authority across a matrixed organization of seven delivery squads. Owned end-to-end test automation architecture, business requirements validation, and quality governance across frontend and backend systems. Partnered with platform architects, business analysts, and full-stack engineers to translate complex requirements into structured, auditable frameworks that shifted quality left and built release confidence directly into the CI/CD pipeline.'
    },
    {
      company: 'Fidelity Investments',
      logo: 'https://res.cloudinary.com/prak-media/image/upload/v1787279025/Fidelity-Investments-1-1.png.webp',
      role: 'Security Risk Analyst',
      period: 'AUG 2019 — OCT 2020',
      location: 'North Carolina',
      type: 'Full-time',
      summary: 'Directed enterprise security auditing operations and compliance governance across a matrixed delivery organization. Leveraged Splunk and Stash to analyze platform logs, identify compliance vulnerabilities, and safeguard critical systems against PII exposure risks. Collaborated with engineering leads and PMO stakeholders to embed security controls directly into the SDLC without slowing down active development cycles.'
    },
    {
      company: 'Fidelity Investments',
      logo: 'https://res.cloudinary.com/prak-media/image/upload/v1787279025/Fidelity-Investments-1-1.png.webp',
      role: 'Sr. Software Engineer in Test (SDET)',
      period: 'OCT 2016 — AUG 2019',
      location: 'North Carolina',
      type: 'Full-time',
      summary: 'Co-led a large-scale PMO modernization initiative to rewrite Fidelity\'s enterprise test infrastructure, strengthening system scalability and aligning technical architecture with long-term business goals across three business units and four project teams. Partnered with platform architects and engineering managers to modernize core validation frameworks, optimize pipeline execution, and drive testing efficiency.'
    },
    {
      company: 'Zenergy Technologies',
      logo: 'https://res.cloudinary.com/prak-media/image/upload/v1787279026/zenergy-logo.png.webp',
      role: 'Sr. Software Engineer in Test (SDET)',
      period: 'OCT 2013 — AUG 2016',
      location: 'North Carolina',
      type: 'Full-time',
      summary: 'Served as a strategic technical consultant for enterprise clients, designing and deploying custom test automation solutions that aligned quality initiatives with core business objectives and project requirements. Provided both hands-on technical architecture and delivery oversight across client engagements to elevate software quality and operational visibility.'
    },
    {
      company: 'TE Connectivity',
      logo: 'https://res.cloudinary.com/prak-media/image/upload/v1787279026/te-logo.jpg',
      role: 'Assembly Operator III',
      period: 'JAN 2010 — MAY 2013',
      location: 'North Carolina',
      type: 'Full-time',
      summary: 'Applied Lean Manufacturing and 5S methodologies to optimize production workflows, eliminate operational bottlenecks, and drive continuous process improvement across manufacturing operations. Partnered with engineering and quality assurance teams to establish standardized operational controls and elevate overall output quality.'
    }
  ];

  groupedRoles = computed<CompanyGroup[]>(() => {
    const groups: CompanyGroup[] = [];

    for (const role of this.rawRoles) {
      const lastGroup = groups[groups.length - 1];
      const roleDetail: RoleDetail = {
        role: role.role,
        period: role.period,
        location: role.location,
        type: role.type,
        summary: role.summary
      };

      if (lastGroup && lastGroup.company === role.company) {
        lastGroup.roles.push(roleDetail);
        const startParts = role.period.split('—');
        if (startParts.length > 1) {
          const overallStart = startParts[1].trim();
          const currentEnd = lastGroup.totalPeriod.split('—')[0].trim();
          lastGroup.totalPeriod = `${currentEnd} — ${overallStart}`;
        }
      } else {
        groups.push({
          company: role.company,
          logo: role.logo,
          totalPeriod: role.period,
          roles: [roleDetail]
        });
      }
    }
    return groups;
  });
}