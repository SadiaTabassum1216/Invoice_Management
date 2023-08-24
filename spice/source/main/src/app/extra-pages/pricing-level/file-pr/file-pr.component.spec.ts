import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePrComponent } from './file-pr.component';

describe('FilePrComponent', () => {
  let component: FilePrComponent;
  let fixture: ComponentFixture<FilePrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilePrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilePrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
