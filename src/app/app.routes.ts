import { Routes } from '@angular/router';
import { ShellLayoutComponent } from './layout/shell-layout.component';
import { teacherGuard } from './core/guards/teacher.guard';

export const routes: Routes = [
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/landing/landing.component').then(m => m.LandingComponent)
      },
      {
        path: 'lesson/1',
        loadComponent: () =>
          import('./pages/lesson/act1/act1.component').then(m => m.Act1Component)
      },
      {
        path: 'lesson/2',
        loadComponent: () =>
          import('./pages/lesson/act2/act2.component').then(m => m.Act2Component)
      },
      {
        path: 'lesson/3',
        loadComponent: () =>
          import('./pages/lesson/act3/act3.component').then(m => m.Act3Component)
      },
      {
        path: 'lesson/4',
        loadComponent: () =>
          import('./pages/lesson/act4/act4.component').then(m => m.Act4Component)
      },
      {
        path: 'lesson/5',
        loadComponent: () =>
          import('./pages/lesson/act5-lab/act5-lab.component').then(m => m.Act5LabComponent)
      },
      {
        path: 'day9/act1',
        loadComponent: () =>
          import('./pages/day9/act1/act1.component').then(m => m.Act1Component)
      },
      {
        path: 'day9/act2',
        loadComponent: () =>
          import('./pages/day9/act2/act2.component').then(m => m.Act2Component)
      },
      {
        path: 'day9/act3',
        loadComponent: () =>
          import('./pages/day9/act3/act3.component').then(m => m.Act3Component)
      },
      {
        path: 'day9/act4',
        loadComponent: () =>
          import('./pages/day9/act4/act4.component').then(m => m.Act4Component)
      },
      {
        path: 'day9/lab',
        loadComponent: () =>
          import('./pages/day9/lab/lab.component').then(m => m.Day9LabComponent)
      },
      {
        path: 'day13/act1',
        loadComponent: () =>
          import('./pages/day13/act1/act1.component').then(m => m.Act1Component)
      },
      {
        path: 'day13/act2',
        loadComponent: () =>
          import('./pages/day13/act2/act2.component').then(m => m.Act2Component)
      },
      {
        path: 'day13/act3',
        loadComponent: () =>
          import('./pages/day13/act3/act3.component').then(m => m.Act3Component)
      },
      {
        path: 'day13/act4',
        loadComponent: () =>
          import('./pages/day13/act4/act4.component').then(m => m.Act4Component)
      },
      {
        path: 'day13/lab',
        loadComponent: () =>
          import('./pages/day13/lab/lab.component').then(m => m.Day13LabComponent)
      },
      {
        path: 'day14/act1',
        loadComponent: () =>
          import('./pages/day14/act1/act1.component').then(m => m.Act1Component)
      },
      {
        path: 'day14/act2',
        loadComponent: () =>
          import('./pages/day14/act2/act2.component').then(m => m.Act2Component)
      },
      {
        path: 'day14/act3',
        loadComponent: () =>
          import('./pages/day14/act3/act3.component').then(m => m.Act3Component)
      },
      {
        path: 'day14/lab',
        loadComponent: () =>
          import('./pages/day14/lab/lab.component').then(m => m.Day14LabComponent)
      },
      {
        path: 'dashboard',
        canActivate: [teacherGuard],
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  }
];
