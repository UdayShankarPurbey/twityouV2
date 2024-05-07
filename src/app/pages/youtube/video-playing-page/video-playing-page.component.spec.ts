import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayingPageComponent } from './video-playing-page.component';

describe('VideoPlayingPageComponent', () => {
  let component: VideoPlayingPageComponent;
  let fixture: ComponentFixture<VideoPlayingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoPlayingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
