import { Component, signal, computed, ElementRef, QueryList, ViewChildren, Inject, PLATFORM_ID, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PhotoGalleryComponent } from '../photo-gallery/photo-gallery.component';

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  filterGroup: 'real-estate' | 'aerial' | 'commercial' | 'portrait';
}

export interface StorySection {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  meta: string;
}

export interface CarouselImage {
  id: number;
  title: string;
  category: string;
  url: string;
}

@Component({
  selector: 'media-portfolio',
  standalone: true,
  imports: [PhotoGalleryComponent],
  templateUrl: './portfolio-grid.html'
})
export class PortfolioGridComponent implements AfterViewInit, OnDestroy {
  // 1. Portfolio Grid State
  activeFilter = signal<string>('all');
  allProjects = signal<Project[]>([
    {
      title: 'Architectural Interiors & Lighting',
      category: 'Real Estate Photography',
      description: 'Precision interior and exterior captures emphasizing natural light, dynamic perspective, and spatial balance using wide-angle optics.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      filterGroup: 'real-estate'
    },
    {
      title: 'Cinematic Aerial Property Tours',
      category: 'Aerial & Drone Production',
      description: 'High-resolution 4K aerial mapping, establishing shots, and smooth flight paths capturing scale and surrounding landscapes.',
      image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80',
      filterGroup: 'aerial'
    },
    {
      title: 'Brand Commercial & Social Reels',
      category: 'Social Media & Content',
      description: 'Dynamic short-form video content edited and color-graded for maximum engagement across modern digital platforms.',
      image: '/public/carphoto.jpg',
      filterGroup: 'commercial'
    },
    {
      title: 'Studio & Environmental Headshots',
      category: 'Professional Portraits',
      description: 'Crisp subject framing, natural skin-tone processing via Darktable, and professional lighting for corporate branding.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
      filterGroup: 'portrait'
    }
  ]);

  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const projects = this.allProjects();
    if (filter === 'all') return projects;
    return projects.filter(p => p.filterGroup === filter);
  });

  setFilter(group: string) {
    this.activeFilter.set(group);
  }

  // 2. Sticky Scroll Storytelling State
  activeSection = signal<string>('real-estate');
  @ViewChildren('sectionBlock') sectionBlocks!: QueryList<ElementRef>;
  sections: StorySection[] = [
    {
      id: 'real-estate',
      category: 'Real Estate Photography',
      title: 'Architectural Interiors & Lighting',
      description: 'Precision interior and exterior captures emphasizing natural light, dynamic perspective, and spatial balance using wide-angle optics and deliberate staging.',
      image: 'https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?auto=format&fit=crop&w=1200&q=80',
      meta: 'Sony a6000 • Wide-Angle Optics • Darktable RAW'
    },
    {
      id: 'aerial',
      category: 'Aerial & Drone Production',
      title: 'Cinematic 4K Aerial Perspectives',
      description: 'FAA-certified aerial operations providing stunning high-altitude context, smooth tracking, and immersive property overviews.',
      image: 'https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?auto=format&fit=crop&w=1200&q=80',
      meta: 'Mavic 4 Pro • DaVinci Resolve Studio • 4K Cinematic'
    },
    {
      id: 'commercial',
      category: 'Social Media & Brand Content',
      title: 'High-Retention Video & Reels',
      description: 'Engaging vertical and horizontal motion content engineered for brands, local businesses, and modern digital marketing channels.',
      image: '/photos/carphoto.jpg',
      meta: 'Piedmont Triad, NC • DaVinci Color Grade'
    }
  ];

  setActive(id: string) {
    this.activeSection.set(id);
  }

  // 3. Carousel Stream State (10 Placeholders)
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  @ViewChild('carouselSection') carouselSection!: ElementRef;
  carouselInView = signal<boolean>(false);
  
  carouselImages: CarouselImage[] = [
    { id: 1, title: 'Interior Light Study', category: 'Real Estate', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Aerial Property Overview', category: 'Drone Video', url: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Corporate Headshot Session', category: 'Portraits', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Modern Architectural Exterior', category: 'Real Estate', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
    { id: 5, title: 'Commercial Brand Reel', category: 'Content Creation', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' },
    { id: 6, title: 'Event Media Coverage', category: 'Events', url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80' },
    { id: 7, title: 'Spatial Balance & Wide Optics', category: 'Real Estate', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80' },
    { id: 8, title: 'Cinematic Horizon Sweep', category: 'Drone Video', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
    { id: 9, title: 'Product & Detail Lighting', category: 'Commercial', url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80' },
    { id: 10, title: 'Comprehensive Portfolio Stream', category: 'Production', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' }
  ];

  scrollCarousel(direction: 'left' | 'right') {
    const track = this.carouselTrack.nativeElement;
    const scrollAmount = 420;
    track.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  private sectionObserver!: IntersectionObserver;
  private carouselObserver!: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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

      const carouselOptions = { root: null, rootMargin: '0px 0px -100px 0px', threshold: 0.1 };

      this.carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.carouselInView.set(true);
            this.carouselObserver.disconnect();
          }
        });
      }, carouselOptions);

      if (this.carouselSection) {
        this.carouselObserver.observe(this.carouselSection.nativeElement);
      }
    }
  }

  ngOnDestroy() {
    if (this.sectionObserver) this.sectionObserver.disconnect();
    if (this.carouselObserver) this.carouselObserver.disconnect();
  }
}