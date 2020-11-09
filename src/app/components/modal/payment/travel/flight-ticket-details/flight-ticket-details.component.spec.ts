import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTicketDetailsComponent } from './flight-ticket-details.component';

describe('FlightTicketDetailsComponent', () => {
  let component: FlightTicketDetailsComponent;
  let fixture: ComponentFixture<FlightTicketDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightTicketDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
