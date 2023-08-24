import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileOComponent } from './file-o.component';

describe('FileOComponent', () => {
  let component: FileOComponent;
  let fixture: ComponentFixture<FileOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileOComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
