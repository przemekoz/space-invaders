import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShipComponent } from './my-ship.component';

describe('MyShipComponent', () => {
  let component: MyShipComponent;
  let fixture: ComponentFixture<MyShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
