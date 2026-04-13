import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaList } from './idea-list';

describe('IdeaList', () => {
  let component: IdeaList;
  let fixture: ComponentFixture<IdeaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaList],
    }).compileComponents();

    fixture = TestBed.createComponent(IdeaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
