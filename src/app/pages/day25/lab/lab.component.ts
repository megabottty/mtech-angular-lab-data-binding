import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day25-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label lab-label">🛠️ Student Lab</span><h1>The Safety Net Lab</h1><p class="subtitle">Turn today's risk triage into real, committed tests — then draft the capstone pitch you'll bring to Day 26.</p></div>
      <div class="lab-intro"><h3>🎯 Starting Point</h3><p>Start from the <a routerLink="/day25/start">Day 25 Starting Point</a>, then complete Acts 1-2. Today's tasks apply to your own project, not just this teaching site's starter — bring whichever real codebase you want a stronger safety net for.</p></div>
      <section class="lesson-framework"><h3>Lab Map</h3><ul><li><strong>Learning Goal:</strong> Build a real, prioritized test queue; prove a test would catch a real mutation; read coverage before and after; extract one hard-to-test piece of logic; draft your capstone pitch.</li><li><strong>Why It Matters:</strong> Everything from Days 23-25 only matters once it changes what you actually test next, on real code, not just in a lesson example.</li><li><strong>Build Steps:</strong> Rank real risk into a queue → mutate a line and prove a test catches it → capture coverage before/after → extract and test one tangled piece of logic → draft your pitch and self-check the rubric.</li><li><strong>Expected Outcome:</strong> A committed spec file, a coverage before/after note, an extraction log, and a capstone pitch draft.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Day 25 Lab</p><p><strong>Next step:</strong> Day 26 — Capstone Day 1.</p><p><strong>Time:</strong> About 70 minutes for Tasks 1-4; Task 5 is homework you can start now.</p></section>

      <app-lesson-step stepId="d25-lab-red-painful-queue" [stepNumber]="'Task 1'" title="Build Your Red-and-Painful Queue">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: risk triage, the testing pyramid, prioritization.</span></div>
        <h4>What to build:</h4><p>Using Act 1's risk triage, list at least five untested pieces of real code from your own project. For each, rate how likely it is to break and how bad it would be if it broke silently, then sort the list worst-first. This is your queue, not a one-time exercise — work down it for the rest of this lab.</p>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>List five real files or functions with zero or thin test coverage.</span></div><div class="task-step"><span class="step-dot">2</span><span>Rate each on likelihood and damage, then sort worst-first.</span></div><div class="task-step"><span class="step-dot">3</span><span>Write and commit one real spec file for your #1 entry.</span></div></div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A written, sorted queue of at least five real risks, and one new passing spec file addressing the top entry. You can explain why you started at the top instead of wherever felt easiest.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 1"><app-code-block lang="text" [code]="queueAnswer" /></app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d25-lab-mutation-proof" [stepNumber]="'Task 2'" title="Prove a Mutation Would Get Caught">
        <div class="task-meta"><span class="difficulty hard">🔴 Hard</span><span class="concepts">Concepts: mutation testing (by hand), fault injection, assertion strength.</span></div>
        <h4>What to build:</h4><p>Pick one line of real production logic your suite already covers. Deliberately break it in one small, specific way, rerun the suite, and confirm at least one test turns red. Then revert the change. This is mutation testing done by hand — a poor-man's version of the same idea real mutation-testing tools automate.</p>
        <app-code-block lang="text" [code]="mutationExample" />
        <div class="think-about-it"><p class="tai-q">What does it mean if you mutate a covered line and every test stays green?</p></div>
        <app-collapsible icon="✅" label="Show Answer — covered is not the same as protected"><p>A green suite after a real mutation means a test executed that line without checking the value that changed. That line is "covered" by Act 1's definition but not actually protected — the fix is a stronger assertion, not a new test file.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A short note naming the line you mutated, the exact change, and which test (if any) caught it — reverted afterward. You can tell the difference between a line that's covered and a line that's protected.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d25-lab-coverage-before-after" [stepNumber]="'Task 3'" title="Capture Coverage Before and After">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: coverage reporting, measuring your own progress.</span></div>
        <h4>What to build:</h4><p>Run <code>ng test -- --coverage</code> before adding Task 1's new spec file and record your queue's #1 target's line/branch percentage. Add the test, rerun coverage, and record the after numbers.</p>
        <app-code-block lang="text" [code]="coverageBeforeAfterTemplate" />
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A short before/after coverage note for one real file, plus one sentence about what the percentage change does and doesn't prove (tie this back to Task 2's mutation result).</div>
      </app-lesson-step>

      <app-lesson-step stepId="d25-lab-extraction-log" [stepNumber]="'Task 4'" title="Extraction Log and Debrief">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: extracting testable logic, pure functions, refactoring for testability.</span></div>
        <h4>What to build:</h4><p>Find one piece of logic embedded inside a component that's hard to unit test because it's tangled in the DOM or a lifecycle hook. Extract it into a small, pure function or a service method, write one direct test against the extracted piece, then log what changed.</p>
        <app-code-block lang="text" [code]="extractionLogTemplate" />
        <div class="think-about-it"><p class="tai-q">Why is a pure, extracted function easier to test than the same logic left inline in a component?</p></div>
        <app-collapsible icon="✅" label="Show Answer — no fixture, no DI, no DOM required"><p>A pure function takes an input and returns an output with nothing else attached — no <code>TestBed</code>, no fixture, no fake providers. Extracting the decision out of the component doesn't make the component's job smaller in a way that costs anything; it just gives the decision itself a door that a plain <code>it()</code> can walk through directly.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> One real extraction, one new passing test against the extracted piece, and a short debrief note (what it was, why it was hard to test before, what depends on it now). You can explain the extraction as a testability decision, not just a style preference.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d25-lab-capstone-pitch-draft" [stepNumber]="'Task 5'" title="Draft Your Capstone Pitch and Check the Rubric">
        <div class="task-meta"><span class="difficulty easy">🟡 Easy</span><span class="concepts">Concepts: scoping, self-assessment, planning ahead.</span></div>
        <h4>What to build:</h4><p>Write the one-paragraph pitch from Act 2's homework template. Then walk your current plan against every rubric category from Act 2 and mark each one "covered by my plan" or "still needs a plan."</p>
        <app-code-block lang="text" [code]="rubricChecklistTemplate" />
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A written pitch paragraph and a rubric self-check with every category marked. You can name, right now, which rubric category your current plan covers least.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day25/act2" class="btn-secondary">← Act 2: Capstone Kickoff</a><a routerLink="/" class="btn-primary">Back to Home →</a></div>
      <section class="lesson-framework checkpoint-card"><h3>Checkpoint</h3><ul class="task-checklist"><li><span class="checkbox">✅</span> You have a sorted, real risk queue with one committed spec against its top entry.</li><li><span class="checkbox">✅</span> You mutated one real line and know exactly which test did or didn't catch it.</li><li><span class="checkbox">✅</span> You captured a before/after coverage number for one real file.</li><li><span class="checkbox">✅</span> You extracted and tested one piece of previously tangled logic.</li><li><span class="checkbox">✅</span> You have a pitch paragraph and a rubric self-check ready for Day 26.</li></ul></section>
      <div class="completion-card"><h2>🎉 Congratulations!</h2><p>You've finished Day 25: Testing III and the Capstone Kickoff. You now know how to:</p><ul class="complete-list"><li>✅ Read a coverage report as a map, not a score.</li><li>✅ Rank real code by risk using the testing pyramid.</li><li>✅ Prove a test would catch a real mutation, by hand.</li><li>✅ Extract tangled component logic into something directly testable.</li><li>✅ Plan a capstone project against a public rubric, cut scope on purpose, and pitch your idea.</li></ul><a routerLink="/" class="btn-primary" style="display:inline-flex; margin-top: 20px">← Back to Home</a></div>
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
export class Day25LabComponent {
  queueAnswer = `1. core/watchlist.service.ts remove() -- wrong docId look-up loses a user's saved show
2. core/shows.service.ts byId() -- a bad null-rating map shows a false rating to everyone
3. core/guards/auth.guard.ts -- a broken redirect could lock out real signed-in users
4. shared/show-card.ts -- wrong button for wrong auth state, visible on every card
5. pages/browse/browse.ts search debounce -- annoying if wrong, but visible immediately

Started at #1 because a silent data-loss bug does more damage over time than a
visible, easy-to-notice cosmetic bug like #5 -- same order Act 1's risk triage taught.`;
  mutationExample = `File: core/shows.service.ts
Line: filter(show => show.rating >= 8)   -- inside topRated()
Mutation: changed >= 8 to > 8

Result: 1 test failed --
  "topRated() includes a show rated exactly 8" -- FAILED, expected length 1, got 0

Caught. Reverted the mutation back to >= 8 immediately after confirming the failure.`;
  coverageBeforeAfterTemplate = `File: core/watchlist.service.ts
Before: 40% lines, 25% branches (remove() and setNote() untested)
After:  68% lines, 58% branches (remove() now has 2 tests, setNote() has 1)

What changed: remove()'s docId look-up branch is now exercised on purpose.
What coverage alone would NOT have told me: Task 2 showed a covered line can
still hide a weak assertion -- the percentage went up, but only the mutation
test proved the new assertions actually check the right value.`;
  extractionLogTemplate = `Extracted: the "how many stars to show as filled" rounding logic, previously
inline inside ShowCard's template as a chain of @if branches.

New home: a pure function, starFillCount(rating: number): number, in
utils/star-rating.ts. No component, no signal, no Angular import.

Why it was hard to test before: it lived inside a template expression --
proving it needed a full component fixture just to check simple rounding math.

What depends on it now: ShowCard calls starFillCount(this.show().rating) and
renders based on the returned number; ShowCard's own spec still passes
unchanged, and starFillCount() has 4 new direct tests of its own.`;
  rubricChecklistTemplate = `Pitch paragraph: [your problem / audience / core feature / why tests matter /
first cut sentence goes here]

Rubric self-check:
[ ] Working Features       -- covered by my plan / still needs a plan
[ ] Test Coverage & Quality -- covered by my plan / still needs a plan
[ ] Code Quality & Architecture -- covered by my plan / still needs a plan
[ ] Pitch & Presentation    -- covered by my plan / still needs a plan
[ ] Stretch & Polish        -- covered by my plan / still needs a plan`;
}
