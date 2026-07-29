import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MentalModel {
  concept: string;
  plainEnglish: string;
  analogy: string;
}

@Component({
  selector: 'app-mental-model-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mental-model-card">
      <h3 class="card-title">🧠 Mental Model First</h3>
      <p class="card-subtitle">Before touching code, anchor this concept to something you already know.</p>
      <div class="model-table-wrapper">
        <table class="model-table">
          <thead>
            <tr>
              <th>Concept</th>
              <th>Plain English</th>
              <th>Everyday Analogy</th>
            </tr>
          </thead>
          <tbody>
            @for (row of models; track row.concept) {
              <tr>
                <td class="concept-cell"><code>{{ row.concept }}</code></td>
                <td>{{ row.plainEnglish }}</td>
                <td class="analogy-cell">{{ row.analogy }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .mental-model-card {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid #4a4a6a;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 32px;
    }
    .card-title {
      color: #c792ea;
      font-size: 18px;
      margin: 0 0 6px 0;
    }
    .card-subtitle {
      color: #858585;
      font-size: 14px;
      margin: 0 0 20px 0;
    }
    .model-table-wrapper { overflow-x: auto; }
    .model-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    .model-table th {
      background: #252540;
      color: #82aaff;
      padding: 10px 14px;
      text-align: left;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .model-table td {
      padding: 10px 14px;
      border-bottom: 1px solid #2d2d4e;
      color: #cccccc;
    }
    .model-table tr:last-child td { border-bottom: none; }
    .model-table tr:hover td { background: #1e1e3a; }
    .concept-cell code {
      background: #2d2d4e;
      color: #89ddff;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Cascadia Code', monospace;
    }
    .analogy-cell { color: #c3e88d; font-style: italic; }
  `]
})
export class MentalModelCardComponent {
  @Input() models: MentalModel[] = [];
}
