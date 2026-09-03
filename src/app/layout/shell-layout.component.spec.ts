import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ShellLayoutComponent } from './shell-layout.component';
import { AuthService } from '../core/services/auth.service';
import { ProgressService } from '../core/services/progress.service';

@Component({ template: '', standalone: true })
class DummyComponent {}

describe('ShellLayoutComponent — day accordion', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellLayoutComponent],
      providers: [
        provideRouter([
          { path: 'lesson/:id', component: DummyComponent },
          { path: 'day9/:act', component: DummyComponent },
          { path: '', component: DummyComponent }
        ]),
        {
          provide: AuthService,
          useValue: { isLoggedIn: false, uid: null, displayName: 'Guest', photoUrl: null, error: signal(null) }
        },
        {
          provide: ProgressService,
          useValue: { completedSteps: signal(new Set<string>()) }
        }
      ]
    }).compileComponents();
  });

  async function createAt(url: string) {
    const router = TestBed.inject(Router);
    await router.navigateByUrl(url);
    const fixture = TestBed.createComponent(ShellLayoutComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, component: fixture.componentInstance, router };
  }

  it('exposes one group per teaching day, driven by data (not hardcoded template links)', async () => {
    const { component } = await createAt('/');
    expect(component.dayGroups.map(d => d.id)).toEqual(['day1', 'day5', 'day9', 'day13', 'day14', 'day15', 'day16', 'day17', 'day18', 'day19', 'day20', 'day21']);
    expect(component.dayGroups.find(d => d.id === 'day1')?.items.length).toBe(5);
    expect(component.dayGroups.find(d => d.id === 'day5')?.items.length).toBe(5);
    expect(component.dayGroups.find(d => d.id === 'day9')?.items.length).toBe(5);
    expect(component.dayGroups.find(d => d.id === 'day13')?.items.length).toBe(5);
    expect(component.dayGroups.find(d => d.id === 'day14')?.items.length).toBe(4);
    expect(component.dayGroups.find(d => d.id === 'day15')?.items.length).toBe(5);
    expect(component.dayGroups.find(d => d.id === 'day16')?.items.length).toBe(5);
    expect(component.dayGroups.find(d => d.id === 'day17')?.items.length).toBe(4);
    expect(component.dayGroups.find(d => d.id === 'day18')?.items.length).toBe(5);
    expect(component.dayGroups.find(d => d.id === 'day19')?.items.length).toBe(5);
    expect(component.dayGroups.find(d => d.id === 'day20')?.items.length).toBe(5);
    expect(component.dayGroups.find(d => d.id === 'day21')?.items.length).toBe(5);
  });

  it('auto-expands only the day group matching the initial route', async () => {
    const { component } = await createAt('/day9/act3');
    expect(component.isExpanded('day9')).toBe(true);
    expect(component.isExpanded('day5')).toBe(false);
  });

  it('auto-expands the other day on navigation without collapsing a manually-opened day (additive-only)', async () => {
    const { component, router, fixture } = await createAt('/day9/act1');
    expect(component.isExpanded('day9')).toBe(true);

    component.toggleDay('day5'); // student manually opens Day 5 too
    expect(component.isExpanded('day5')).toBe(true);

    await router.navigateByUrl('/lesson/2');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    // Day 9 must remain open — auto-expand is additive and never auto-collapses.
    expect(component.isExpanded('day9')).toBe(true);
    expect(component.isExpanded('day5')).toBe(true);
  });

  it('toggleDay lets a student manually collapse an expanded day', async () => {
    const { component } = await createAt('/day9/act1');
    expect(component.isExpanded('day9')).toBe(true);

    component.toggleDay('day9');
    expect(component.isExpanded('day9')).toBe(false);

    component.toggleDay('day9');
    expect(component.isExpanded('day9')).toBe(true);
  });

  it('renders a clickable header per day and nested links only while expanded', async () => {
    const { fixture, component } = await createAt('/');
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('.day-group-header').length).toBe(12);
    // Nothing matches "/" so all groups start collapsed.
    expect(component.isExpanded('day5')).toBe(false);
    expect(component.isExpanded('day9')).toBe(false);
    expect(el.querySelectorAll('.day-items').length).toBe(0);

    component.toggleDay('day9');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const day9Links = Array.from(el.querySelectorAll('.day-items a')).map(a => a.getAttribute('href'));
    expect(day9Links).toEqual([
      '/day9/act1', '/day9/act2', '/day9/act3', '/day9/act4', '/day9/lab'
    ]);
  });
});
