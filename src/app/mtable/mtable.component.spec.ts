
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtableComponent } from './mtable.component';

describe('MtableComponent', () => {
  let component: MtableComponent;
  let fixture: ComponentFixture<MtableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MtableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
