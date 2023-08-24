import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePuComponent } from './file-pu.component';

describe('FilePuComponent', () => {
  let component: FilePuComponent;
  let fixture: ComponentFixture<FilePuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilePuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilePuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
