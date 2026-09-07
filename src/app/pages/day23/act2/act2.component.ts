import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day23-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 23 · Act 2 of 3</span>
        <h1>🔧 Testing Pipes, and a Real TDD Cycle</h1>
        <p class="subtitle">A pipe is a pure function wearing a decorator. Then: write the failing test first, on purpose, and watch the whole red-green cycle happen for real.</p>
      </div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Angular's <a href="https://angular.dev/guide/testing" target="_blank" rel="noopener">testing guide</a> and Kent Beck's original write-up on <a href="https://en.wikipedia.org/wiki/Test-driven_development" target="_blank" rel="noopener">test-driven development</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Test an existing pipe's <code>transform()</code> directly, then use a real red-green TDD cycle to add one new case to <code>TimeAgoPipe</code>.</li><li><strong>Why It Matters:</strong> Pipes look like template syntax, but <code>transform()</code> is just a method — testing it needs exactly as much ceremony as testing any other pure function, which is to say, almost none.</li><li><strong>Build Steps:</strong> Test <code>RuntimePipe</code> directly, no <code>TestBed</code> → write a failing spec for a week-scale <code>TimeAgoPipe</code> case → watch it fail → implement the fix → watch it pass.</li><li><strong>Expected Outcome:</strong> A full <code>RuntimePipe</code> spec covering its edge cases, and one <code>TimeAgoPipe</code> case you added by writing the test before the code.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 2 (Testing Pipes, and a Real TDD Cycle)</p><p><strong>Next step:</strong> Act 3 (Debug It — Three Tests That Lie)</p><p><strong>Time:</strong> About 30 minutes.</p></section>

      <app-lesson-step stepId="d23-act2-runtime-pipe-tests" [stepNumber]="1" title="RuntimePipe — a Pure Function in a Decorator's Clothing">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p><code>RuntimePipe</code> has shipped since Day 17. Its <code>&#64;Pipe</code> decorator is what lets a template write <code>{{ "{{ show.runtime | runtime }}" }}</code> — but the decorator is irrelevant to the test. <code>transform()</code> is a plain method: construct the class with <code>new</code>, call the method, check the string that comes back.</p>
        <app-code-block lang="typescript" [code]="runtimePipeSource" />
        <p>Four boundary-shaped cases are worth a spec each: nothing, zero, minutes-only, and hours-with-minutes.</p>
        <app-code-block lang="typescript" [code]="runtimePipeSpec" />
        <div class="think-about-it"><p class="tai-q">Why does the <code>0</code> case deserve its own test, separate from <code>null</code>/<code>undefined</code>?</p></div>
        <app-collapsible icon="✅" label="Show Answer — 0 is a real, valid runtime that still needs the fallback"><p><code>!minutes</code> is true for <code>null</code>, <code>undefined</code>, <em>and</em> <code>0</code> — all three take the same "—" branch. A shorter test suite might only check <code>null</code> and assume <code>0</code> behaves the same way "because it's falsy too." But a show with a genuinely unknown runtime of <code>0</code> is a real, plausible API response, not just a type-system edge case — it deserves its own named test so a future refactor that changes the null check (say, to <code>minutes == null</code>) gets caught immediately if it silently breaks the zero case.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A passing <code>runtime.pipe.spec.ts</code> with at least four cases, none of them using <code>TestBed</code>.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d23-act2-tdd-timeago-weeks" [stepNumber]="2" title="TDD, for Real — Adding a Week-Scale Case to TimeAgoPipe">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p><code>TimeAgoPipe</code> currently caps out at days — a show added 200 days ago reads "200 days ago," which is technically correct and practically useless. Test-driven development means writing the failing test <em>first</em>, before the fix exists, so let's actually do that instead of just talking about it.</p>
        <p><strong>Red — write the test for behavior that doesn't exist yet:</strong></p>
        <app-code-block lang="typescript" [code]="timeAgoWeeksFailingSpec" />
        <p>Run <code>npm test</code>. This is the real failure, not a hypothetical one:</p>
        <app-code-block lang="text" [code]="timeAgoWeeksRedOutput" />
        <p><strong>Green — now make it pass, and only exactly enough to pass:</strong></p>
        <app-code-block lang="typescript" [code]="timeAgoWeeksImplementation" />
        <p>Run <code>npm test</code> again:</p>
        <app-code-block lang="text" [code]="timeAgoWeeksGreenOutput" />
        <p>That's the whole cycle: a test that fails for the right reason, a small change that makes it pass, nothing extra. Real TDD keeps looping — red, green, refactor, repeat — one case at a time; today you've done exactly one lap of it.</p>
        <div class="think-about-it"><p class="tai-q">What would it mean if the "red" step's test had passed on the very first run, before you'd written the week-scale branch?</p></div>
        <app-collapsible icon="✅" label="Show Answer — a test that passes before the code exists is testing nothing"><p>A test is only proof of anything if it can fail. If the failing-first step had passed immediately, either the assertion wasn't actually checking the new behavior (a lying assertion — exactly Act 3's first bug), or the old "days" branch already happened to produce the right string by coincidence. Confirming red before green is what tells you the test is actually wired to the code path you think it is — skip that step and you can ship a test that would pass even with the feature deleted.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You watched one spec fail for the right reason, wrote the smallest change that fixed it, and watched the same spec turn green — the full loop, not just the description of it.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day23/act1" class="btn-secondary">← Act 1: Why Tests Matter</a><a routerLink="/day23/act3" class="btn-primary">Act 3: Debug It — Three Tests That Lie →</a></div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    { concept: 'pipe under test', plainEnglish: 'A pipe class instantiated directly with `new`, bypassing Angular entirely to call transform() as a plain method.', analogy: '🔧 Testing a car engine on a workbench instead of driving the whole car.' },
    { concept: 'red-green cycle', plainEnglish: 'Write a failing test (red), make it pass with the smallest change (green), then clean up.', analogy: '🚦 A traffic light that only turns green once you\'ve actually earned it.' },
    { concept: 'boundary case', plainEnglish: 'An input right at the edge where behavior changes -- zero, the smallest valid value, the first value in the next bucket.', analogy: '📏 Checking a ruler right at the 12-inch mark, not just somewhere safely in the middle.' },
    { concept: 'test-driven development (TDD)', plainEnglish: 'Writing the test for a behavior before writing the behavior itself.', analogy: '🎯 Drawing the target before taking the shot, instead of drawing it around wherever the arrow landed.' }
  ];

  runtimePipeSource = `// src/app/pipes/runtime.pipe.ts -- shipped since Day 17
@Pipe({ name: 'runtime' })
export class RuntimePipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (!minutes) return '—';
    const h = Math.floor(minutes / 60), m = minutes % 60;
    return h ? \`\${h}h \${m ? m + 'm' : ''}\`.trim() : \`\${m}m\`;
  }
}`;

  runtimePipeSpec = `import { RuntimePipe } from './runtime.pipe';

describe('RuntimePipe', () => {
  const pipe = new RuntimePipe();

  it('returns an em dash for null or undefined', () => {
    expect(pipe.transform(null)).toBe('—');
    expect(pipe.transform(undefined)).toBe('—');
  });

  it('returns an em dash for a runtime of 0', () => {
    const result = pipe.transform(0);
    expect(result).toBe('—');
  });

  it('formats under an hour as minutes only', () => {
    const result = pipe.transform(45);
    expect(result).toBe('45m');
  });

  it('formats an exact hour with no trailing minutes', () => {
    const result = pipe.transform(60);
    expect(result).toBe('1h');
  });

  it('formats hours and minutes together', () => {
    const result = pipe.transform(90);
    expect(result).toBe('1h 30m');
  });
});`;

  timeAgoWeeksFailingSpec = `// src/app/pipes/time-ago.pipe.spec.ts
import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  const pipe = new TimeAgoPipe();

  it('formats 10 days ago as "1 week ago"', () => {
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
    const result = pipe.transform(tenDaysAgo);
    expect(result).toBe('1 week ago');
  });
});`;

  timeAgoWeeksRedOutput = `❯  bingeboard  src/app/pipes/time-ago.pipe.spec.ts (1 test | 1 failed) 14ms
    × formats 10 days ago as "1 week ago"

 FAIL   bingeboard  src/app/pipes/time-ago.pipe.spec.ts > TimeAgoPipe > formats 10 days ago as "1 week ago"
AssertionError: expected '10 days ago' to be '1 week ago' // Object.is equality

Expected: "1 week ago"
Received: "10 days ago"

 Test Files  1 failed (1)
      Tests  1 failed (1)`;

  timeAgoWeeksImplementation = `// src/app/pipes/time-ago.pipe.ts -- inside transform(), replacing the final "days" return
const days = Math.floor(hours / 24);
if (days < 7) return \`\${days} day\${days === 1 ? '' : 's'} ago\`;

const weeks = Math.floor(days / 7);
return \`\${weeks} week\${weeks === 1 ? '' : 's'} ago\`;`;

  timeAgoWeeksGreenOutput = `✓  bingeboard  src/app/pipes/time-ago.pipe.spec.ts (1 test) 5ms

 Test Files  1 passed (1)
      Tests  1 passed (1)`;
}
