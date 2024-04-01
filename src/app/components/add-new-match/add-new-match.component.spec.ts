import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMatchComponent } from './add-new-match.component';

describe('AddNewMatchComponent', () => {
  let component: AddNewMatchComponent;
  let fixture: ComponentFixture<AddNewMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AddNewMatchComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(AddNewMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
