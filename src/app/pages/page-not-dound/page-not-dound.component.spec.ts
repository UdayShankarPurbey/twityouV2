import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotDoundComponent } from './page-not-dound.component';

describe('PageNotDoundComponent', () => {
  let component: PageNotDoundComponent;
  let fixture: ComponentFixture<PageNotDoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotDoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageNotDoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
