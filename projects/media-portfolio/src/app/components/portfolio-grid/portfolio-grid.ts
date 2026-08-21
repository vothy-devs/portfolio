import { Component, signal, computed, ElementRef, QueryList, ViewChildren, Inject, PLATFORM_ID, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { CloudinaryModule, lazyload, responsive } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { PhotoGalleryComponent } from '../photo-gallery/photo-gallery.component';

export interface StorySection {
  id: string;
  category: string;
  title: string;
  description: string;
  imagePublicId: string; // Cloudinary Public ID reference
  meta: string;
}

@Component({
  selector: 'portfolio-grid',
  standalone: true,
  imports: [CommonModule, CloudinaryModule, PhotoGalleryComponent],
  templateUrl: './portfolio-grid.html',
  styleUrl: './portfolio-grid.css'
})
export class PortfolioGridComponent implements OnInit, AfterViewInit, OnDestroy {
  private cld!: Cloudinary;
  plugins = [lazyload(), responsive()];

  ngOnInit() {
    this.cld = new Cloudinary({
      cloud: {
        cloudName: 'prak-media'
      }
    });
  }

  // Cloudinary Image Helpers for Sections and Headshot
  getCloudinaryImage(publicId: string): CloudinaryImage {
    return this.cld
      .image(publicId)
      .resize(scale().width(1200))
      .format('auto')
      .quality('auto');
  }

  getHeadshotImage(): CloudinaryImage {
    return this.cld
      .image('headshot') // Or your dedicated headshot public ID
      .resize(scale().width(800))
      .format('auto')
      .quality('auto');
  }
getPCMIcon(): CloudinaryImage {
  return this.cld
    .image('PCMIcon')
    .resize(scale().width(50)) // Smaller width suited for header display
    .format('auto')
    .quality('auto');
}

getPCMText(): CloudinaryImage {
  return this.cld
    .image('PCMText')
    .resize(scale().width(75)) // Appropriate width for text logo
    .format('auto')
    .quality('auto');
}

  // Sticky Scroll Storytelling State with Cloudinary Asset IDs
  activeSection = signal<string>('real-estate');
  @ViewChildren('sectionBlock') sectionBlocks!: QueryList<ElementRef>;
  
  sections: StorySection[] = [
    {
      id: 'real-estate',
      category: 'Real Estate Photography',
      title: 'Shaping Space Through Light & Composition',
      description: 'Every room has a narrative. We capture architectural depth, natural textures, and spatial balance using professional framing and precise lighting to showcase properties at their absolute best.',
      imagePublicId: 'photohire',
      meta: 'Currently looking to expand portfolio. Connect for potential free shoot.'
    },
    {
      id: 'aerial',
      category: 'Aerial & Drone Production',
      title: 'Expanding Horizons from Above',
      description: 'Elevate your project with FAA-certified aerial perspectives that provide stunning geographic context, smooth cinematic tracking, and breathtaking property scales.',
      imagePublicId: 'photoM4Drone',
      meta: 'Looking to expand portfolio. Connect for a free consultation.'
    },
    {
      id: 'commercial',
      category: 'Social Media & Brand Content',
      title: 'Motion & Detail That Drives Engagement',
      description: 'From local commercial features to dynamic digital content, we deliver high-retention video and meticulous color grading engineered to stop the scroll and elevate your brand.',
      imagePublicId: 'carphoto',
      meta: 'New and ready to work!'
    }
  ];

  setActive(id: string) {
    this.activeSection.set(id);
  }

  private sectionObserver!: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const sectionOptions = { root: null, rootMargin: '-20% 0px -20% 0px', threshold: 0 };

      this.sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) this.activeSection.set(id);
          }
        });
      }, sectionOptions);

      this.sectionBlocks.forEach((block) => {
        this.sectionObserver.observe(block.nativeElement);
      });
    }
  }

  ngOnDestroy() {
    if (this.sectionObserver) this.sectionObserver.disconnect();
  }
}