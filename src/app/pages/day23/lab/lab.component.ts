import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day23-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label lab-label">🛠️ Student Lab</span><h1>Your Turn — Cover the Rest of Today's Real Code</h1><p class="subtitle">Finish the TimeAgoPipe suite, write first-ever tests for two functions that have shipped for weeks untested, then peek at what coverage actually measures.</p></div>
      <div class="lab-intro"><h3>🎯 Starting Point</h3><p>Start from the <a routerLink="/day23/start">Day 23 Starting Point</a>, then complete Acts 1-3. You need a working <code>npm test</code> in your own project, plus the <code>bingeLevel</code> and <code>TimeAgoPipe</code> specs from Acts 1-3, before these tasks make sense.</p></div>
      <section class="lesson-framework"><h3>Lab Map</h3><ul><li><strong>Learning Goal:</strong> Write complete, boundary-aware test suites for real, already-shipped functions on your own, without a walkthrough.</li><li><strong>Why It Matters:</strong> Every test so far today was written together, step by step. A real testing habit means reaching for a spec file on your own the next time you touch untested code — starting now, with code that's been sitting untested since Day 13 and Day 11.</li><li><strong>Build Steps:</strong> Finish <code>TimeAgoPipe</code>'s suite → test <code>toShow()</code>'s null-safety → test <code>noShouting()</code>'s edge cases → stretch into coverage reporting.</li><li><strong>Expected Outcome:</strong> Three real spec files, all green, covering code that had zero tests this morning.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Day 23 Lab (final step of Day 23)</p><p><strong>Next step:</strong> Review the Checkpoint below.</p><p><strong>Time:</strong> About 50 minutes for Tasks 1-3; Task 4 is open-ended.</p></section>

      <app-lesson-step stepId="d23-lab-finish-timeago-suite" [stepNumber]="'Task 1'" title="Finish TimeAgoPipe's Test Suite">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: boundary cases, singular vs. plural, the clock-skew branch.</span></div>
        <h4>What to build:</h4>
        <p>Act 2 and Act 3 only gave <code>time-ago.pipe.spec.ts</code> two cases. The pipe's own code comment claims it "handles just-now, singular/plural, and a future-dated value (clock skew) gracefully" — prove every part of that claim with a test.</p>
        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Add a case for singular vs. plural at every tier: exactly 1 minute, 2 minutes, exactly 1 hour, 2 hours, exactly 1 day, 2 days, exactly 1 week, 2 weeks.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Add a case for a date a few seconds in the <em>future</em> (a plausible clock-skew scenario) and confirm it still returns <code>'just now'</code> instead of throwing or returning something nonsensical like a negative number of minutes.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>If any case uses <code>vi.useFakeTimers()</code>, add the <code>afterEach(() =&gt; vi.useRealTimers())</code> from Act 3 so it can't leak into a sibling test.</span></div>
        </div>
        <div class="think-about-it"><p class="tai-q">Why test both "exactly 1" and "exactly 2" at every tier, instead of just picking one representative number per tier?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the singular/plural branch is its own tiny piece of logic"><p>Every tier's plural handling (<code>&#36;&#123;n === 1 ? '' : 's'&#125;</code>) is a small independent decision the pipe makes, separate from which tier gets chosen at all. A test suite that only ever checks, say, <code>3 hours</code> never exercises the singular branch for hours — a typo that broke <code>'1 hours ago'</code> specifically would ship clean. Testing the exact boundary where singular flips to plural is what actually proves that branch works, not just that some number formats into some string.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> <code>npm test</code> shows a fully green <code>time-ago.pipe.spec.ts</code> with a case for every tier's singular/plural boundary plus the clock-skew case.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <app-code-block lang="typescript" [code]="timeAgoFullSuiteAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d23-lab-test-toshow-adapter" [stepNumber]="'Task 2'" title="Test the toShow Adapter">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: null-safety, testing a boundary-crossing function, fake input data.</span></div>
        <h4>What to build:</h4>
        <p>Day 13 Act 2 built <code>toShow()</code> specifically to isolate the rest of the app from TVMaze's null rules and naming — and promised that a fake <code>TvMazeShow</code> with a null <code>image</code> and empty <code>genres</code> array should convert cleanly. Nobody has ever actually written that test. Do it now.</p>
        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Create <code>show.spec.ts</code> next to <code>models/show.ts</code>. Arrange a fake <code>TvMazeShow</code> with <code>image: null</code>, <code>genres: []</code>, <code>rating: {{ '{ average: null }' }}</code>, and <code>summary: null</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Act by calling <code>toShow()</code> with that fake input.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Assert every field the adapter is supposed to default: <code>imageUrl</code> is an empty string, <code>genre</code> is <code>'Unknown'</code>, <code>rating</code> is <code>0</code>, <code>summary</code> is an empty string.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Add one more test with a fully populated, realistic <code>TvMazeShow</code> and confirm every field passes through unchanged.</span></div>
        </div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A passing <code>show.spec.ts</code> that proves the adapter's null-safety with a fake object, not just by reading the source and trusting it.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <app-code-block lang="typescript" [code]="toShowSpecAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d23-lab-test-noshouting" [stepNumber]="'Task 3'" title="Test the noShouting Validator">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: testing a ValidatorFn directly, boundary-length inputs.</span></div>
        <h4>What to build:</h4>
        <p>Day 11 Act 2's rule: a headline of at least 3 letters, entirely uppercase, gets flagged; anything shorter (like an acronym) or mixed-case does not. <code>noShouting()</code> takes no arguments and returns a function that takes a control-like object — call it directly with a plain object literal, exactly like Act 3's Bug 1 spec did, minus the lying assertion.</p>
        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Test a long, all-caps headline (<code>'AMAZING SHOW'</code>) — expect <code>{{ '{ noShouting: true }' }}</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Test a short all-caps value under 3 letters (<code>'US'</code>) — expect <code>null</code>.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Test a normal, mixed-case sentence — expect <code>null</code>.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Test an empty string — expect <code>null</code>, and think about why that's the right behavior for this validator specifically (hint: what other validator's job is it to reject an empty headline?).</span></div>
        </div>
        <div class="think-about-it"><p class="tai-q">Should <code>noShouting()</code> itself reject an empty or missing headline?</p></div>
        <app-collapsible icon="✅" label="Show Answer — one validator, one job"><p>No — that's <code>Validators.required</code>'s job, and Day 11 attached both to the same control side by side. <code>noShouting()</code> only has an opinion about shouting; an empty string isn't shouting, so it correctly returns <code>null</code> and lets <code>required</code> handle emptiness. Testing that <code>noShouting()</code> stays quiet about a problem that isn't its problem is exactly as valuable as testing that it catches the problem that is.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A passing <code>review-validators.spec.ts</code> with four cases, each asserting the exact return value (an errors object or <code>null</code>), never just truthiness.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <app-code-block lang="typescript" [code]="noShoutingSpecAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d23-lab-coverage-stretch" [stepNumber]="'Task 4 (Stretch)'" title="Turn On Coverage, Find the Gap">
        <div class="task-meta"><span class="difficulty hard">🔴 Hard</span><span class="concepts">Concepts: code coverage, reading a coverage report, an untested branch.</span></div>
        <h4>What to build:</h4>
        <p>Coverage reporting needs one extra package this project doesn't install by default:</p>
        <app-code-block lang="bash" [code]="coverageInstallCommand" />
        <p>Then run tests with coverage on:</p>
        <app-code-block lang="bash" [code]="coverageRunCommand" />
        <p>Read the report's percentage columns per file. Find one line or branch still showing red or yellow in <code>binge-level.ts</code>, <code>show.ts</code>, or <code>review-validators.ts</code> — every function above has at least one boundary nobody wrote a test for yet — then add exactly the test that turns it green.</p>
        <div class="outcome-check">✅ <strong>Expected outcome (if attempted):</strong> A coverage report you can read, and one specific gap you found and closed yourself, not one this lesson pointed at directly.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day23/act3" class="btn-secondary">← Act 3: Debug It — Three Tests That Lie</a><a routerLink="/" class="btn-primary">Back to Home →</a></div>
      <section class="lesson-framework checkpoint-card"><h3>Checkpoint</h3><ul class="task-checklist"><li><span class="checkbox">✅</span> <code>npm test</code> runs clean in your own project, with at least three real spec files.</li><li><span class="checkbox">✅</span> You can write a new spec for a pure function from a blank file, unassisted.</li><li><span class="checkbox">✅</span> You can name a lying assertion, an invisible-character mismatch, and a leaked-mock bug from their symptoms alone.</li></ul></section>
      <div class="completion-card"><h2>🎉 Congratulations!</h2><p>You've finished Day 23: Testing I. You now know how to:</p><ul class="complete-list"><li>✅ Wire up <code>ng test</code> and read what it tells you, including which runner is actually behind it.</li><li>✅ Write a test using Arrange-Act-Assert, for a pipe or a plain function alike.</li><li>✅ Run one full TDD red-green cycle on real code.</li><li>✅ Spot a lying assertion, a wrong-dash-character failure, and leaked mock state between tests.</li><li>✅ Read a coverage report and use it to find one real, specific gap.</li></ul><a routerLink="/" class="btn-primary" style="display:inline-flex; margin-top: 20px">← Back to Home</a></div>
    </div>
  `,
  styles: [`
    .lab-label { background: #4ec9b0 !important; color: #1e1e1e !important; }
    .lab-intro {
      background: #1a2e4a;
      border: 1px solid #2a4a7a;
      border-radius: 10px;
      padding: 20px 24px;
      margin-bottom: 24px;
    }
    .lab-intro h3 { color: #82aaff; margin-bottom: 8px; }
    .lab-intro p { font-size: 14px; color: #b0c8e0; }

    .task-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
    .difficulty {
      font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 12px;
    }
    .difficulty.easy { background: #1a2e1a; color: #4ec9b0; border: 1px solid #2a5c2a; }
    .difficulty.medium { background: #2a2a1a; color: #ff9d00; border: 1px solid #5c4a00; }
    .difficulty.hard { background: #2a1a1a; color: #f44747; border: 1px solid #5c1a1a; }
    .concepts { font-size: 12px; color: #858585; }

    .task-steps { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
    .task-step {
      display: flex; align-items: flex-start; gap: 12px;
      font-size: 14px; color: #cccccc;
    }
    .step-dot {
      width: 24px; height: 24px; background: #3e3e42;
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 12px; font-weight: 700;
      flex-shrink: 0; color: #4fc3f7;
    }

    .checkpoint-card { margin-top: 32px; }

    .completion-card {
      background: linear-gradient(135deg, #1a2e1a, #0d1f0d);
      border: 2px solid #4ec9b0;
      border-radius: 12px;
      padding: 32px;
      margin-top: 40px;
      text-align: center;
    }
    .completion-card h2 { font-size: 28px; margin-bottom: 12px; }
    .completion-card p { color: #a0d0a0; margin-bottom: 16px; }
    .complete-list {
      list-style: none;
      padding: 0;
      display: inline-block;
      text-align: left;
    }
    .complete-list li {
      padding: 6px 0;
      font-size: 14px;
    }
  `]
})
export class Day23LabComponent {
  timeAgoFullSuiteAnswer = `import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  const pipe = new TimeAgoPipe();

  afterEach(() => {
    vi.useRealTimers();
  });

  function agoIso(ms: number): string {
    return new Date(Date.now() - ms).toISOString();
  }

  it('returns "just now" for a few seconds ago', () => {
    expect(pipe.transform(agoIso(10 * 1000))).toBe('just now');
  });

  it('handles a few seconds in the future (clock skew) as "just now"', () => {
    const secondsInTheFuture = new Date(Date.now() + 5000).toISOString();
    expect(pipe.transform(secondsInTheFuture)).toBe('just now');
  });

  it('formats singular vs. plural minutes', () => {
    expect(pipe.transform(agoIso(60 * 1000))).toBe('1 minute ago');
    expect(pipe.transform(agoIso(2 * 60 * 1000))).toBe('2 minutes ago');
  });

  it('formats singular vs. plural hours', () => {
    expect(pipe.transform(agoIso(60 * 60 * 1000))).toBe('1 hour ago');
    expect(pipe.transform(agoIso(2 * 60 * 60 * 1000))).toBe('2 hours ago');
  });

  it('formats singular vs. plural days', () => {
    expect(pipe.transform(agoIso(24 * 60 * 60 * 1000))).toBe('1 day ago');
    expect(pipe.transform(agoIso(2 * 24 * 60 * 60 * 1000))).toBe('2 days ago');
  });

  it('formats singular vs. plural weeks', () => {
    expect(pipe.transform(agoIso(7 * 24 * 60 * 60 * 1000))).toBe('1 week ago');
    expect(pipe.transform(agoIso(14 * 24 * 60 * 60 * 1000))).toBe('2 weeks ago');
  });
});`;

  toShowSpecAnswer = `import { toShow, TvMazeShow } from './show';

describe('toShow', () => {
  it('defaults every null-safe field on a sparse TvMazeShow', () => {
    // Arrange
    const sparse: TvMazeShow = {
      id: 1,
      name: 'Mystery Show',
      genres: [],
      rating: { average: null },
      image: null,
      summary: null,
      runtime: null
    };

    // Act
    const result = toShow(sparse);

    // Assert
    expect(result).toEqual({
      id: 1,
      name: 'Mystery Show',
      genre: 'Unknown',
      rating: 0,
      imageUrl: '',
      summary: '',
      runtime: 0
    });
  });

  it('passes every field through unchanged on a fully populated show', () => {
    const full: TvMazeShow = {
      id: 2,
      name: 'Real Show',
      genres: ['Drama', 'Comedy'],
      rating: { average: 8.4 },
      image: { medium: 'medium.jpg', original: 'original.jpg' },
      summary: '<p>A great show.</p>',
      runtime: 42
    };

    const result = toShow(full);

    expect(result.genre).toBe('Drama');
    expect(result.rating).toBe(8.4);
    expect(result.imageUrl).toBe('medium.jpg');
    expect(result.runtime).toBe(42);
  });
});`;

  noShoutingSpecAnswer = `import { noShouting } from './review-validators';

describe('noShouting', () => {
  const validate = noShouting();

  it('flags a long, fully uppercase headline', () => {
    const result = validate({ value: 'AMAZING SHOW' } as any);
    expect(result).toEqual({ noShouting: true });
  });

  it('does not flag a short all-caps acronym', () => {
    const result = validate({ value: 'US' } as any);
    expect(result).toBeNull();
  });

  it('does not flag a normal, mixed-case sentence', () => {
    const result = validate({ value: 'This show was great' } as any);
    expect(result).toBeNull();
  });

  it('does not flag an empty string', () => {
    const result = validate({ value: '' } as any);
    expect(result).toBeNull();
  });
});`;

  coverageInstallCommand = `npm install -D @vitest/coverage-v8`;

  coverageRunCommand = `ng test --coverage`;
}
