import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import { CommonModule } from '@angular/common';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-block-wrapper" [class.variant-before]="variant === 'before'" [class.variant-after]="variant === 'after'">
      @if (file || variant) {
        <div class="file-bar">
          @if (variant) {
            <span class="variant-badge">{{ variant === 'before' ? 'BEFORE' : 'AFTER' }}</span>
          }
          @if (file) {
            <span class="file-path">📄 {{ file }}</span>
          }
        </div>
      }
      <div class="code-header">
        <span class="lang-label">{{ lang }}</span>
        <button class="copy-btn" (click)="copy()" [class.copied]="copied">
          {{ copied ? '✅ Copied!' : '📋 Copy' }}
        </button>
      </div>
      <pre><code #codeEl class="language-{{ lang }}">{{ code }}</code></pre>
    </div>
  `,
  styles: [`
    .code-block-wrapper {
      border-radius: 8px;
      overflow: hidden;
      margin: 16px 0;
      border: 1px solid #3e3e42;
    }
    .code-block-wrapper.variant-before { border-color: #7a5a3a; }
    .code-block-wrapper.variant-after { border-color: #3a6b52; }
    .file-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #23232b;
      padding: 7px 14px;
      border-bottom: 1px solid #3e3e42;
    }
    .file-path {
      font-size: 12.5px;
      color: #d7d7d7;
      font-family: 'Cascadia Code', 'Fira Code', monospace;
    }
    .variant-badge {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.8px;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Cascadia Code', 'Fira Code', monospace;
    }
    .variant-before .variant-badge { background: #4a3524; color: #e0a76a; }
    .variant-after .variant-badge { background: #23402f; color: #6ed3a5; }
    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #2d2d30;
      padding: 6px 14px;
      border-bottom: 1px solid #3e3e42;
    }
    .lang-label {
      font-size: 12px;
      color: #858585;
      font-family: 'Cascadia Code', 'Fira Code', monospace;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .copy-btn {
      background: transparent;
      border: 1px solid #3e3e42;
      color: #cccccc;
      padding: 3px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;
    }
    .copy-btn:hover { background: #3e3e42; }
    .copy-btn.copied { border-color: #4ec9b0; color: #4ec9b0; }
    pre {
      margin: 0;
      background: #1e1e1e;
      padding: 16px;
      overflow-x: auto;
    }
    code {
      font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
      font-size: 14px;
      line-height: 1.6;
      background: transparent !important;
    }
  `]
})
export class CodeBlockComponent implements AfterViewInit {
  @Input() code = '';
  @Input() lang = 'html';
  @Input() file = '';
  @Input() variant: 'before' | 'after' | '' = '';
  @ViewChild('codeEl') codeEl!: ElementRef<HTMLElement>;

  copied = false;

  ngAfterViewInit() {
    hljs.highlightElement(this.codeEl.nativeElement);
  }

  copy() {
    navigator.clipboard.writeText(this.code.trim());
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);
  }
}
