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
        path: 'dashboard',
        canActivate: [teacherGuard],
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  }
];
