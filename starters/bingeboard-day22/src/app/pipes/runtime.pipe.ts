import { Pipe, PipeTransform } from '@angular/core';

// Day 17 Act 2 — turns raw minutes ("62") into "1h 2m".
@Pipe({ name: 'runtime' })
export class RuntimePipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (!minutes) return '—';
    const h = Math.floor(minutes / 60), m = minutes % 60;
    return h ? `${h}h ${m ? m + 'm' : ''}`.trim() : `${m}m`;
  }
}
