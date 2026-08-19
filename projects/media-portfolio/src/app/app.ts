import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white font-sans">

      <!-- Main Dynamic Content Outlet -->
      <main>
        <router-outlet />
      </main>
    </div>
  `
})
export class App {}