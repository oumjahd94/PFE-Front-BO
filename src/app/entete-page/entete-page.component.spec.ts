import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntetePageComponent } from './entete-page.component';

describe('EntetePageComponent', () => {
  let component: EntetePageComponent;
  let fixture: ComponentFixture<EntetePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntetePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntetePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
