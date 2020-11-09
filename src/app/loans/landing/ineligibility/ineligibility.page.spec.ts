import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IneligibilityPage } from './ineligibility.page';

describe('IneligibilityPage', () => {
  let component: IneligibilityPage;
  let fixture: ComponentFixture<IneligibilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IneligibilityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IneligibilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
