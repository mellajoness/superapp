import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FdDetailPage } from './fd-detail.page';

describe('FdDetailPage', () => {
  let component: FdDetailPage;
  let fixture: ComponentFixture<FdDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FdDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
