import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel {
  title = input.required<string>();

  // the panel's own business - no input, no output
  expanded = signal(true);

  toggle() {
    this.expanded.update(open => !open);
  }
}
