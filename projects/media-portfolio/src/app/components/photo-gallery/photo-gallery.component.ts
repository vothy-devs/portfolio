import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudinaryModule, lazyload, responsive } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { thumbnail, scale } from '@cloudinary/url-gen/actions/resize';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule, CloudinaryModule],
  template: `
    <div class="min-h-screen bg-[#0c0c0e] text-zinc-100 p-6 md:p-12">
      <!-- Header -->
      <div class="max-w-7xl mx-auto mb-10">
        <h1 class="text-2xl font-medium tracking-tight">Media & Photography Gallery</h1>
        <p class="text-sm text-zinc-400 mt-1">A curated collection of recent real estate and creative projects.</p>
      </div>

      <!-- Masonry Gallery Layout -->
      <div class="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <div 
          *ngFor="let photoId of photos; trackBy: trackPhoto" 
          (click)="openLightbox(photoId)"
          class="break-inside-avoid w-full group relative bg-[#16161a] border border-zinc-800 rounded-xl overflow-hidden cursor-pointer shadow-md hover:border-zinc-600 transition-all duration-300">
          
          <!-- Cloudinary Optimized Thumbnail Image (Preserving Original Aspect Ratios) -->
          <div class="w-full bg-zinc-900/50 overflow-hidden">
            <advanced-image 
              [cldImg]="getThumbnailImage(photoId)"
              [plugins]="plugins"
              class="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
          </div>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
            <span class="text-xs font-mono text-zinc-300 tracking-wider uppercase truncate">{{ photoId }}</span>
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
          
          <!-- Cloudinary Full-Resolution Optimized Image for Lightbox -->
          <advanced-image 
            [cldImg]="getLightboxImage(selectedPhoto)"
            class="max-w-full max-h-[85vh] object-contain rounded-lg border border-zinc-800 shadow-2xl"
          />
        </div>
      </div>
    </div>
  `
})
export class PhotoGalleryComponent implements OnInit {
  private cld!: Cloudinary;

  plugins = [lazyload(), responsive()];

  ngOnInit() {
    this.cld = new Cloudinary({
      cloud: {
        cloudName: 'prak-media'
      }
    });
  }

  photos: string[] = [
    'photo001', 'photo002', 'photo003', 'photo004', 'photo005',
    'photo006', 'photo007', 'photo008', 'photo009', 'photo010',
    'photo011', 'photo012', 'photo013', 'photo014', 'photo015',
    'photo016', 'photo017', 'photo018', 'photo019', 'photo020', 'Yzma2_2'
  ];

  selectedPhoto: string | null = null;

  getThumbnailImage(publicId: string): CloudinaryImage {
    // Using a width limit instead of a strict square thumbnail 
    // preserves the vertical/horizontal diversity for true masonry layout.
    return this.cld
      .image(publicId)
      .resize(scale().width(600))
      .format('auto')
      .quality('auto');
  }

  getLightboxImage(publicId: string): CloudinaryImage {
    return this.cld
      .image(publicId)
      .resize(scale().width(1600).height(1200))
      .format('auto')
      .quality('auto');
  }

  openLightbox(photoId: string) {
    this.selectedPhoto = photoId;
  }

  closeLightbox() {
    this.selectedPhoto = null;
  }

  trackPhoto(index: number, photoId: string): string {
    return photoId;
  }
}