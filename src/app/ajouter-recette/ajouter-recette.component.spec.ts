import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterRecetteComponent } from './ajouter-recette.component';

describe('AjouterRecetteComponent', () => {
  let component: AjouterRecetteComponent;
  let fixture: ComponentFixture<AjouterRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterRecetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
