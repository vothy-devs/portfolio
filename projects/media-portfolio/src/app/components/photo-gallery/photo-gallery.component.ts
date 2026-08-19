import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-[#0c0c0e] text-zinc-100 p-6 md:p-12">
      <!-- Header -->
      <div class="max-w-7xl mx-auto mb-10">
        <h1 class="text-2xl font-medium tracking-tight">Media & Photography Gallery</h1>
        <p class="text-sm text-zinc-400 mt-1">A curated collection of recent real estate and creative projects.</p>
      </div>

      <!-- Masonry Gallery Grid with explicit container constraints -->
      <div class="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        <div 
          *ngFor="let photo of photos; trackBy: trackPhoto" 
          (click)="openLightbox(photo)"
          class="break-inside-avoid inline-block w-full mb-4 group relative bg-[#16161a] border border-zinc-800 rounded-xl overflow-hidden cursor-pointer shadow-md hover:border-zinc-600 transition-all duration-300">
          
          <!-- Image Container with background placeholder to prevent layout collapse -->
          <div class="w-full bg-zinc-900/50 overflow-hidden">
            <img 
              [src]="'/photos/' + photo" 
              [alt]="photo"
              loading="lazy"
              class="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
          </div>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
            <span class="text-xs font-mono text-zinc-300 tracking-wider uppercase truncate">{{ photo }}</span>
          </div>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div 
        *ngIf="selectedPhoto" 
        (click)="closeLightbox()"
        class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
        
        <div class="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg flex items-center justify-center" (click)="$event.stopPropagation()">
          <button 
            (click)="closeLightbox()" 
            class="absolute top-4 right-4 z-10 bg-zinc-900/80 text-zinc-300 hover:text-white px-3 py-1.5 rounded-full text-xs font-mono border border-zinc-700 transition-colors">
            ✕ CLOSE
          </button>
          
          <img 
            [src]="'/photos/' + selectedPhoto" 
            [alt]="selectedPhoto"
            class="max-w-full max-h-[85vh] object-contain rounded-lg border border-zinc-800 shadow-2xl"
          />
        </div>
      </div>
    </div>
  `
})
export class PhotoGalleryComponent {
  photos: string[] = [
    'photo001.jpg',
    'photo002.jpg',
    'photo003.jpg',
    'photo004.jpg',
    'photo005.jpg',
    'photo006.jpg',
    'photo007.jpg',
    'photo008.jpg',
    'photo009.jpg',
    'photo010.jpg',
    'photo011.jpg',
    'photo012.jpg',
    'photo013.jpg',
    'photo014.jpg',
    'photo015.jpg',
    'photo016.jpg',
    'photo017.jpg',
    'photo018.jpg',
    'photo019.jpg',
    'photo020.jpg',
  ];

  selectedPhoto: string | null = null;

  openLightbox(photo: string) {
    this.selectedPhoto = photo;
  }

  closeLightbox() {
    this.selectedPhoto = null;
  }

  trackPhoto(index: number, photo: string): string {
    return photo;
  }
}