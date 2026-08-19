import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioGrid } from './portfolio-grid';

describe('PortfolioGrid', () => {
  let component: PortfolioGrid;
  let fixture: ComponentFixture<PortfolioGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
