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
        path: 'day15/start',
        loadComponent: () =>
          import('./pages/day15/start/start.component').then(m => m.Day15StartComponent)
      },
      {
        path: 'day15/act1',
        loadComponent: () =>
          import('./pages/day15/act1/act1.component').then(m => m.Act1Component)
      },
      {
        path: 'day15/act2',
        loadComponent: () =>
          import('./pages/day15/act2/act2.component').then(m => m.Act2Component)
      },
      {
        path: 'day15/act3',
        loadComponent: () =>
          import('./pages/day15/act3/act3.component').then(m => m.Act3Component)
      },
      {
        path: 'day15/lab',
        loadComponent: () =>
          import('./pages/day15/lab/lab.component').then(m => m.Day15LabComponent)
      },
      {
        path: 'day16/start',
        loadComponent: () =>
          import('./pages/day16/start/start.component').then(m => m.Day16StartComponent)
      },
      {
        path: 'day16/act1',
        loadComponent: () =>
          import('./pages/day16/act1/act1.component').then(m => m.Act1Component)
      },
      {
        path: 'day16/act2',
        loadComponent: () =>
          import('./pages/day16/act2/act2.component').then(m => m.Act2Component)
      },
      {
        path: 'day16/act3',
        loadComponent: () =>
          import('./pages/day16/act3/act3.component').then(m => m.Act3Component)
      },
      {
        path: 'day16/lab',
        loadComponent: () =>
          import('./pages/day16/lab/lab.component').then(m => m.Day16LabComponent)
      },
      {
        path: 'day17/start',
        loadComponent: () =>
          import('./pages/day17/start/start.component').then(m => m.Day17StartComponent)
      },
      {
        path: 'day17/act1',
        loadComponent: () =>
          import('./pages/day17/act1/act1.component').then(m => m.Act1Component)
      },
      {
        path: 'day17/act2',
        loadComponent: () =>
          import('./pages/day17/act2/act2.component').then(m => m.Act2Component)
      },
      {
        path: 'day17/lab',
        loadComponent: () =>
          import('./pages/day17/lab/lab.component').then(m => m.Day17LabComponent)
      },
      {
        path: 'day18/start',
        loadComponent: () =>
          import('./pages/day18/start/start.component').then(m => m.Day18StartComponent)
      },
      {
        path: 'day18/act1',
        loadComponent: () =>
          import('./pages/day18/act1/act1.component').then(m => m.Act1Component)
      },
      {
        path: 'day18/act2',
        loadComponent: () =>
          import('./pages/day18/act2/act2.component').then(m => m.Act2Component)
      },
      {
        path: 'day18/act3',
        loadComponent: () =>
          import('./pages/day18/act3/act3.component').then(m => m.Act3Component)
      },
      {
        path: 'day18/lab',
        loadComponent: () =>
          import('./pages/day18/lab/lab.component').then(m => m.Day18LabComponent)
      },
      {
        path: 'day19/start',
        loadComponent: () =>
          import('./pages/day19/start/start.component').then(m => m.Day19StartComponent)
      },
      {
        path: 'day19/act1',
        loadComponent: () =>
          import('./pages/day19/act1/act1.component').then(m => m.Act1Component)
      },
      {
        path: 'day19/act2',
        loadComponent: () =>
          import('./pages/day19/act2/act2.component').then(m => m.Act2Component)
      },
      {
        path: 'day19/act3',
        loadComponent: () =>
          import('./pages/day19/act3/act3.component').then(m => m.Act3Component)
      },
      {
        path: 'day19/lab',
        loadComponent: () =>
          import('./pages/day19/lab/lab.component').then(m => m.Day19LabComponent)
      },
      {
        path: 'day20/start',
        loadComponent: () =>
          import('./pages/day20/start/start.component').then(m => m.Day20StartComponent)
      },
      {
        path: 'day20/act1',
        loadComponent: () =>
          import('./pages/day20/act1/act1.component').then(m => m.Act1Component)
      },
      {
        path: 'day20/act2',
        loadComponent: () =>
          import('./pages/day20/act2/act2.component').then(m => m.Act2Component)
      },
      {
        path: 'day20/act3',
        loadComponent: () =>
          import('./pages/day20/act3/act3.component').then(m => m.Act3Component)
      },
      {
        path: 'day20/lab',
        loadComponent: () =>
          import('./pages/day20/lab/lab.component').then(m => m.Day20LabComponent)
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
