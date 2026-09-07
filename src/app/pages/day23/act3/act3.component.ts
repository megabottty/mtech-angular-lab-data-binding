import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day23-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 23 · Act 3 of 3</span>
        <h1>🐛 Debug It — Three Tests That Lie</h1>
        <p class="subtitle">A test suite that's green isn't the same thing as a test suite that's telling the truth. Three real, easy-to-write bugs, none of which show up as a build error.</p>
      </div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> the <a href="https://vitest.dev/api/vi.html#vi-usefaketimers" target="_blank" rel="noopener">Vitest fake timers reference</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Recognize a lying assertion, an invisible character mismatch, and leaked test state between specs — three real bug classes that hide inside passing-looking or confusingly-failing test files.</li><li><strong>Why It Matters:</strong> A test suite is only as trustworthy as its weakest assertion. All three of today's bugs let bad code slip through, or good code look broken, without a single TypeScript error to point at.</li><li><strong>Build Steps:</strong> Spot a lying assertion on <code>noShouting</code> → spot a wrong-dash-character failure on <code>bingeLevel</code> → spot leaked fake-timer state across <code>TimeAgoPipe</code> specs.</li><li><strong>Expected Outcome:</strong> You can name all three bugs from the symptom alone, and know the one-line fix for each.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 3 (Debug It — Three Tests That Lie)</p><p><strong>Next step:</strong> Day 23 Lab</p><p><strong>Time:</strong> About 25 minutes.</p></section>

      <app-lesson-step stepId="d23-act3-lying-assertion" [stepNumber]="1" title="Bug 1 — The Lying Assertion">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>This spec for <code>noShouting()</code> passes. That's the problem.</p>
        <app-code-block lang="typescript" [code]="lyingAssertionBuggyCode" />
        <p>Now imagine someone refactors the validator and accidentally breaks the errors-object key:</p>
        <app-code-block lang="typescript" [code]="lyingAssertionBrokenValidator" />
        <p>The test above still passes — <code>{{ "{{ wrongKey: true }}" }}</code> is just as truthy as <code>{{ "{{ noShouting: true }}" }}</code>. Meanwhile, the actual template check (<code>hasError('noShouting')</code>) would now be silently broken in production, and nothing caught it.</p>
        <div class="think-about-it"><p class="tai-q">What's the one-line fix, and why does it actually catch the bug where <code>toBeTruthy()</code> didn't?</p></div>
        <app-collapsible icon="✅" label="Show Answer — assert the exact shape, not just that something came back">
          <app-code-block lang="typescript" [code]="lyingAssertionFixedSpec" />
          <p><code>toEqual({{ "{{ noShouting: true }}" }})</code> checks the actual key and value, not just "is this truthy." A validator that returns the wrong key, the wrong value, or an extra unexpected key now fails the test immediately, which is the entire point of writing it.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain why <code>toBeTruthy()</code>/<code>toBeDefined()</code> are the two most common ways a test quietly stops testing anything.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d23-act3-wrong-dash" [stepNumber]="2" title="Bug 2 — The Wrong Dash Character">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>This spec for <code>bingeLevel</code> fails, and the failure output looks like a bug in the test — the expected and received strings look identical.</p>
        <app-code-block lang="typescript" [code]="wrongDashSpecCode" />
        <app-code-block lang="text" [code]="wrongDashRealFailureOutput" />
        <p>Read that output character by character rather than trusting your eyes: the expected string was pasted from somewhere that auto-converted a plain hyphen (<code>-</code>, U+002D) into a typographic en dash (<code>–</code>, U+2013) — visually near-identical in most fonts, but a completely different character to a string comparison. <code>bingeLevel()</code> was never broken; the test's expected value was corrupted before it ever ran.</p>
        <div class="think-about-it"><p class="tai-q">Why is this exact bug more likely to happen with pasted text than with hand-typed text?</p></div>
        <app-collapsible icon="✅" label="Show Answer — typography tools fix hyphens for human readers, not for string equality"><p>Word processors, some markdown renderers, and "smart" text editors routinely convert a plain hyphen into an en dash or em dash for readability — a nicety for humans reading prose, and a landmine for code that will compare the raw bytes. Hand-typing <code>-</code> on a keyboard produces U+002D every time; copying from a rendered web page, PDF, or slide deck might not. When a string comparison fails and the diff looks identical, suspect an invisible character before suspecting your logic — retype the expected value by hand instead of trusting a paste.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Given a test failure where two strings look the same, you know to check for a mismatched dash, quote, or other visually-similar character before assuming the code under test is wrong.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d23-act3-leaked-fake-timers" [stepNumber]="3" title="Bug 3 — Leaked State Between Tests">
        <p><span class="effort-tag effort-medium">Effort: Hard</span></p>
        <p>Testing <code>TimeAgoPipe</code>'s day/week math against a real, moving clock is awkward — so it's tempting to freeze time with <code>vi.useFakeTimers()</code>. This suite does exactly that, and its first test passes:</p>
        <app-code-block lang="typescript" [code]="leakedTimersBuggyCode" />
        <p>Run the whole file, though, and the <em>second</em> test — one that never touches fake timers itself — fails with an output that has nothing to do with anything it wrote:</p>
        <app-code-block lang="text" [code]="leakedTimersRealFailureOutput" />
        <p><code>realNow</code> was captured from the real wall clock when the file loaded. The second test never called <code>vi.useFakeTimers()</code> — but the <em>first</em> test did, froze the clock at the year 2030, and never told Vitest to undo it. <code>TimeAgoPipe</code>'s own <code>Date.now()</code> call inside <code>transform()</code> is still reading that frozen, six-years-in-the-future clock when the second test runs.</p>
        <div class="think-about-it"><p class="tai-q">Why does adding a fresh <code>const pipe = new TimeAgoPipe()</code> inside a <code>beforeEach</code> not fix this bug, even though "scoping" is in the name of the mistake?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the pipe was never the shared state; the mocked clock was">
          <app-code-block lang="typescript" [code]="leakedTimersFixedCode" />
          <p><code>TimeAgoPipe</code> is stateless — a fresh instance per test changes nothing, because there was never anything wrong with the instance. The actual shared, leaking state is global: Vitest's fake-timer system, which stays active for every test after the one that turned it on until something turns it back off. The fix is an <code>afterEach</code> that calls <code>vi.useRealTimers()</code> unconditionally, so every test starts from a real clock regardless of what the previous test mocked. "Pipe scoping" is the instinct to reach for — the real bug is test-runner scoping.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain, without re-reading the answer, why a test that mocks global state (a clock, a random seed, a module-level singleton) needs a matching teardown even when nothing about the code under test is stateful itself.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day23/act2" class="btn-secondary">← Act 2: Testing Pipes, and a Real TDD Cycle</a><a routerLink="/day23/lab" class="btn-primary">Day 23 Lab →</a></div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    { concept: 'lying assertion', plainEnglish: 'An expect() so loose it still passes even when the real behavior is wrong.', analogy: '🚨 A smoke detector with a dead battery -- still hanging on the ceiling, no longer actually watching for anything.' },
    { concept: 'invisible character bug', plainEnglish: 'Two strings that look identical to a human but differ in one byte a screen can\'t distinguish.', analogy: '🕵️ Two keys that look the same but are cut with a different groove -- one just won\'t turn the lock.' },
    { concept: 'test isolation', plainEnglish: 'Each test should start from a clean slate, unaffected by whatever ran before it.', analogy: '🧹 Wiping the whiteboard clean before the next person\'s turn, not leaving their old diagram half-erased.' },
    { concept: 'global mock leakage', plainEnglish: 'A test mocks something shared (a clock, a module) and forgets to undo it, so later tests inherit the mock.', analogy: '⏰ Forgetting to unset a clock you set forward for a fire drill -- everyone after you shows up late.' }
  ];

  lyingAssertionBuggyCode = `import { noShouting } from '../validators/review-validators';

it('flags an all-caps headline', () => {
  const result = noShouting()({ value: 'AMAZING SHOW' } as any);
  expect(result).toBeTruthy(); // <- this is the bug
});`;

  lyingAssertionBrokenValidator = `// A "harmless" refactor of noShouting() -- renamed the error key by accident
export function noShouting(): ValidatorFn {
  return (control) => {
    const value = String(control.value ?? '');
    const letters = value.replace(/[^a-zA-Z]/g, '');
    return letters.length >= 3 && value === value.toUpperCase()
      ? { wrongKey: true } // was { noShouting: true }
      : null;
  };
}`;

  lyingAssertionFixedSpec = `it('flags an all-caps headline', () => {
  const result = noShouting()({ value: 'AMAZING SHOW' } as any);
  expect(result).toEqual({ noShouting: true });
});`;

  wrongDashSpecCode = `import { bingeLevel } from './binge-level';

it('returns Full-Season Binge between 13 and 50 episodes', () => {
  const result = bingeLevel(24);
  expect(result).toBe('Full–Season Binge'); // pasted from a doc -- looks right, isn't
});`;

  wrongDashRealFailureOutput = `AssertionError: expected 'Full-Season Binge' to be 'Full–Season Binge' // Object.is equality

Expected: "Full–Season Binge"
Received: "Full-Season Binge"`;

  leakedTimersBuggyCode = `import { TimeAgoPipe } from './time-ago.pipe';

const realNow = new Date(); // captured once, at module load

describe('TimeAgoPipe', () => {
  const pipe = new TimeAgoPipe();

  it('formats a fixed timestamp against a mocked clock', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2030-01-01T00:00:00Z'));

    const twoDaysBeforeFakeNow = new Date('2029-12-30T00:00:00Z').toISOString();
    expect(pipe.transform(twoDaysBeforeFakeNow)).toBe('2 days ago');
    // no vi.useRealTimers() here, and no afterEach either
  });

  it('formats a timestamp captured moments ago as "just now"', () => {
    const result = pipe.transform(realNow.toISOString());
    expect(result).toBe('just now');
  });
});`;

  leakedTimersRealFailureOutput = `❯  bingeboard  src/app/pipes/time-ago.pipe.spec.ts (2 tests | 1 failed) 13ms
    ✓ formats a fixed timestamp against a mocked clock 4ms
    × formats a timestamp captured moments ago as "just now" 7ms

 FAIL   bingeboard  src/app/pipes/time-ago.pipe.spec.ts > TimeAgoPipe > formats a timestamp captured moments ago as "just now"
AssertionError: expected '1211 days ago' to be 'just now' // Object.is equality

Expected: "just now"
Received: "1211 days ago"`;

  leakedTimersFixedCode = `describe('TimeAgoPipe', () => {
  const pipe = new TimeAgoPipe();

  afterEach(() => {
    vi.useRealTimers(); // runs after EVERY test, whether or not it mocked anything
  });

  // ...both tests unchanged...
});`;
}
