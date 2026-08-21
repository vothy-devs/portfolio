import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit, OnDestroy {
    terminalLogs = signal<string[]>([
        'Initializing kernel environment...',
        'Mounting Next.js & Angular build cluster...',
        'Syncing Cloudinary media buckets & assets...',
        'Executing deployment pipeline v4.2.0...'
    ]);

    private intervalId: any;

    ngOnInit() {
        const extraLogs = [
            'Running static type check across TypeScript definitions...',
            'Optimizing Tailwind CSS production bundle...',
            'Verifying SSL certificates and routing tables...',
            'Standby: Rebuilding DOM nodes...'
        ];
        
        let index = 0;
        this.intervalId = setInterval(() => {
            if (index < extraLogs.length) {
                this.terminalLogs.update(logs => [...logs, extraLogs[index]]);
                index++;
            }
        }, 2500);
    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}