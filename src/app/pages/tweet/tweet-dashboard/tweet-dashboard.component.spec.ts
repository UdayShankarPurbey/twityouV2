import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetDashboardComponent } from './tweet-dashboard.component';

describe('TweetDashboardComponent', () => {
  let component: TweetDashboardComponent;
  let fixture: ComponentFixture<TweetDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TweetDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TweetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
