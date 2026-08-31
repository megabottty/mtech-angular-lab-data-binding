import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day17-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>The Great Refactor Lab</h1>
        <p class="subtitle">
          90+ minutes, four tiers, self-paced. This is the last breather before five days of Firebase —
          use it to make your own BingeBoard feel finished, not just functional.
        </p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Get the end-of-Day-17-Acts BingeBoard working before starting — a <code>runtime</code> pipe should
          already exist and be applied somewhere. If that isn't true yet, finish Act 2 first. Beyond that,
          this lab works directly on top of whatever your own project has accumulated since Day 9 — there is
          no separate starter delta for the lab itself; the mess you're cleaning up is <em>your</em> mess.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li>
            <strong>Learning Goal:</strong>
            Apply pipes to real formatting debt, pay down structural debt you've been accumulating since
            Day 9, polish the app's rough edges, and — if you have time — discover why a pipe can't safely
            return raw HTML.
          </li>
          <li>
            <strong>Why It Matters:</strong>
            Tomorrow this app gets a real database. Starting that block from a clean, deliberate codebase
            instead of an accumulated pile of shortcuts halves the pain of everything that follows.
          </li>
          <li>
            <strong>Build Steps:</strong>
            pipes in anger → debt paydown → polish sprint → stretch: the highlight-pipe pivot decision.
          </li>
          <li>
            <strong>Expected Outcome:</strong>
            You can look at your own project and honestly say it feels finished, not just working — and you
            can point to specific things you fixed, not just "cleaned some stuff up."
          </li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (Day 17 capstone)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> Tier 1 is required and takes about 25 minutes. Tiers 2 and 3 are each about 20-25 minutes — do as much as you have time for, in order. Tier 4 is a stretch; only reach it if the first three are genuinely done. Set a visible timer — aimless polishing is this lab's biggest risk.</p>
      </section>

      <app-lesson-step
        stepId="d17-lab-tier1-pipes-in-anger"
        [stepNumber]="'Tier 1'"
        title="Pipes in Anger"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: custom pipes with derived logic, edge-case handling, taste (knowing when <em>not</em> to change something).</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Two new custom pipes, then a sweep. <strong><code>ratingBadge</code></strong> turns a number into a
          verdict: <code>"Certified banger"</code> for a high rating, <code>"Solid"</code> for a middling
          one, <code>"Proceed with caution"</code> for a low one. <strong><code>timeAgo</code></strong> turns
          a review's timestamp into relative time — <code>"3 days ago"</code> — handling the edge cases: "just
          now" for anything under a minute, singular vs. plural ("1 day ago" vs. "3 days ago"), and a
          sensible fallback for a future-dated timestamp (clock skew happens).
        </p>
        <p style="margin-top: 12px;">
          Then sweep: find every remaining raw date and raw number rendered anywhere in your own project and
          route it through the right pipe — built-in or one of today's custom ones.
        </p>

        <div class="warning-box">
          <strong>Honest aside:</strong> if you have an existing <code>&#64;switch</code> somewhere doing
          something like this rating logic (the kind of control-flow block Day 5 Act 2 covers), ask yourself
          whether replacing it with <code>ratingBadge</code> is actually better here, or just different. A
          <code>&#64;switch</code> that's read once, in one place, and never reused is sometimes genuinely fine
          as it is. Taste — knowing when a refactor is worth it and when it's motion for its own sake — is
          a real skill, not a tie-breaker rule.
        </div>

        <div class="think-about-it">
          <p class="tai-q">"Just now" needs a boundary — under what threshold does an event stop being "3 minutes ago" and start being "just now"? Pick a number and defend it.</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — there's no universally correct number, only a defensible one">
          <p>A common, defensible choice is under 60 seconds. The reasoning: "just now" should read as "so recent it doesn't need a number," and once you're stating a number of minutes, the reader benefits more from the precision than from the vagueness. Some products use a wider window (under 2 minutes) to smooth over clock-sync jitter between client and server. Either is fine as long as you can explain your choice — this is a product decision with a reasonable range, not a single correct answer.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Generate and write <code>ratingBadge</code>: <code>number =&gt; string</code>, three bands.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Generate and write <code>timeAgo</code>: <code>Date | string =&gt; string</code>, with the just-now/singular-plural/future-date edge cases handled explicitly.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Sweep every raw date and number left in your templates through an appropriate pipe.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Every show's rating shows a verdict string somewhere in your
          UI, every review shows relative time instead of a raw timestamp, and no raw unformatted date or
          number remains anywhere you can find one. You can write a custom pipe that branches on its input
          and handles real edge cases, not just the happy path.
        </div>

        <app-collapsible icon="💡" label="Hint — timeAgo's shape">
          <p>Work in whole units, largest first, and fall through:</p>
          <app-code-block lang="typescript" [code]="tier1Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Tier 1">
          <p>Both pipes, complete.</p>
          <h4>ratingBadge.pipe.ts:</h4>
          <app-code-block lang="typescript" [code]="ratingBadgeAnswer" />
          <h4 style="margin-top: 16px">timeAgo.pipe.ts:</h4>
          <app-code-block lang="typescript" [code]="timeAgoAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d17-lab-tier2-debt-paydown"
        [stepNumber]="'Tier 2'"
        title="Debt Paydown"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: lazy-loading audit, component-boundary discipline, deleting dead code confidently.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Nothing new — this tier is a self-directed audit. Keep a running list as you go of anything you
          fix (there's no instructor gap-log in a self-paced course, so this list is entirely for you: it's
          proof of what you actually did, and a thing worth being a little proud of).
        </p>

        <div class="think-about-it">
          <p class="tai-q">Before deleting anything, ask: am I actually sure this is dead, or just unfamiliar? What's the cheap way to check?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — search before you delete">
          <p>Search your whole project for the symbol's name before deleting it — an unused-looking handler might be wired up via a template binding your editor's "find references" doesn't catch (a string-based binding, a dynamically-built selector, or simply a search you ran in the wrong file type). Once you've confirmed zero real references, delete confidently — this is exactly the moment "git remembers" matters: nothing is truly lost, so hesitating to delete something you're 95% sure is dead costs you more than deleting it and being wrong once in a while.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Convert any route still eagerly loaded (<code>component:</code> instead of <code>loadComponent:</code>) to lazy — Day 9 Act 4's pattern.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Find any place one component reaches directly into another's internals instead of going through <code>input()</code>/<code>output()</code> or a shared service, and fix it.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Delete confidently: old hardcoded array remnants from Day 9, unused event handlers, commented-out experiments you never cleaned up.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Every route in your app is lazy-loaded, every cross-component
          interaction goes through a proper boundary, and a search of your own codebase for commented-out
          code or obviously dead handlers comes back empty. You can identify and confidently remove code you
          are sure is unused.
        </div>
      </app-lesson-step>

      <app-lesson-step
        stepId="d17-lab-tier3-polish-sprint"
        [stepNumber]="'Tier 3'"
        title="Polish Sprint"
      >
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: empty states, page metadata, a real 404 page, reading a Lighthouse report.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Small, high-visibility fixes. Audit every screen for a missing empty state (what does a student
          see if the watchlist is empty, or a search returns nothing, before they've done anything at all?).
          Add a real favicon if you're still using the CLI default. Audit every route's page title — a
          browser tab that just says "BingeBoard" everywhere is a missed, free piece of polish. Build a real
          <code>**</code> wildcard 404 route instead of a blank screen for an unmatched URL.
        </p>
        <p style="margin-top: 12px;">
          Then open DevTools → Lighthouse, run it against your app, and screenshot the score. Pick one cheap
          thing it flags and fix it — cheap meaning "under 10 minutes," not "the most impactful."
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why screenshot the Lighthouse score instead of just reading it and moving on?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a number you don't record didn't happen">
          <p>A screenshot is a timestamp you can compare against later — after a future refactor, after adding a new dependency, after five more days of Firebase work. Without a saved baseline, "did this get better or worse" becomes a guess instead of a comparison. This is the same instinct as the empty-list watchlist gap in Tier 1's runtime-badge hiding logic: measurable beats remembered.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Audit every screen for a missing empty state and add one.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add a real favicon and audit every route's page title.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Build a real wildcard 404 page.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Run Lighthouse, screenshot the score, fix one cheap flagged item.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Every empty-data screen shows an intentional message instead
          of a blank area, every browser tab shows a real page-specific title, visiting a nonsense URL shows
          a real 404 page, and you have a saved Lighthouse score plus one concrete fix applied against it.
        </div>
      </app-lesson-step>

      <app-lesson-step
        stepId="d17-lab-tier4-stretch-highlight"
        [stepNumber]="'Tier 4 (Stretch)'"
        title="The highlight Pipe — a Pivot Decision, Not Just a Pipe"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: pipes and HTML safety, <code>DomSanitizer</code>, recognizing when a pipe is the wrong tool.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          A <code>highlight</code> pipe that wraps a matched search term in <code>&lt;mark&gt;</code> inside
          a show's name — so searching "office" shows "The &lt;mark&gt;Office&lt;/mark&gt;" with the match
          visually highlighted. Try the obvious first approach before reading further.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Your first attempt will probably return a string containing <code>&lt;mark&gt;</code> tags and bind it with plain interpolation. What actually renders?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — literal angle brackets, not a highlighted word">
          <p>Plain <code>{{ "{{ ... }}" }}</code> interpolation escapes HTML — exactly the same rule Day 13 Act 4 taught for <code>[innerHTML]</code> vs. interpolation on show summaries. Your pipe's returned string, containing real <code>&lt;mark&gt;</code> tags, would render as the literal text <code>&lt;mark&gt;Office&lt;/mark&gt;</code> on screen instead of a highlighted word. A pipe's return value is just interpolated text by default; it does not get treated as markup.</p>
        </app-collapsible>

        <p style="margin-top: 12px;">
          The fix requires either binding the pipe's output with <code>[innerHTML]</code> and sanitizing it
          through <code>DomSanitizer.sanitize()</code> or <code>bypassSecurityTrustHtml</code> — research
          that API — or accepting that a pipe is the wrong tool for something that needs to produce actual
          markup, and pivoting to a small component instead (one that takes the show name and the search term
          as inputs, and renders the highlighted segments as real DOM nodes via <code>&#64;for</code> over split
          segments, no raw HTML string involved at all).
        </p>

        <div class="warning-box">
          <strong>Either conclusion is a correct outcome for this task.</strong> Reaching for
          <code>DomSanitizer</code> and getting it working is a legitimate answer. Deciding a pipe is
          structurally the wrong tool here and pivoting to a component is <em>also</em> a legitimate
          answer — arguably the more sophisticated one. The decision itself, not the code, is the actual
          lesson.
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Write the naive <code>highlight</code> pipe and confirm it fails to render real <code>&lt;mark&gt;</code> markup through plain interpolation.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Research <code>DomSanitizer</code> in the Angular docs. Decide: sanitize and keep the pipe, or pivot to a component.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Implement whichever you chose, and write one sentence explaining why you chose it.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Searching for a term on Browse visually highlights the
          matching text inside each result's name, using either a sanitized <code>[innerHTML]</code> pipe
          output or a dedicated component. You can explain, in one sentence, why a pipe returning raw HTML
          needs special handling to render as markup at all.
        </div>

        <app-collapsible icon="💡" label="Hint — the naive pipe, to prove the point first">
          <app-code-block lang="typescript" [code]="highlightNaiveHint" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day17/act2" class="btn-secondary">← Act 2: Writing Your Own Pipe</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> At least two custom pipes shipped and used in 3+ places across your project</li>
          <li><span class="checkbox">✅</span> Your personal debt list from Tier 2 measurably shrunk — you can point to specific fixes, not a vague sense of "cleaner"</li>
          <li><span class="checkbox">✅</span> Your app feels finished-ish: no missing empty states, a real 404, a saved Lighthouse baseline</li>
          <li><span class="checkbox">✅</span> You can place any new piece of logic into the right one of four tools (pipe / computed / service / component) without guessing</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 17: Pipes + The Great Refactor Lab.</p>
        <ul class="complete-list">
          <li>✅ Applied built-in pipes with arguments and chaining to real BingeBoard data.</li>
          <li>✅ Wrote custom pipes (<code>runtime</code>, <code>ratingBadge</code>, <code>timeAgo</code>) and understood why pure pipes are cheap.</li>
          <li>✅ Placed logic correctly across all four organizing tools: pipe, <code>computed</code>, service, component.</li>
          <li>✅ Paid down structural debt: lazy loading, component boundaries, dead code.</li>
          <li>✅ Polished the rough edges: empty states, page titles, a real 404, a Lighthouse baseline.</li>
          <li>✅ Confronted the limits of pipes head-on with the <code>highlight</code>/<code>DomSanitizer</code> pivot decision.</li>
        </ul>
        <p style="margin-top: 12px;">Tomorrow: a real database. You're starting that block from a clean codebase — that was the whole point of today.</p>
        <a routerLink="/" class="btn-primary" style="display:inline-flex; margin-top: 20px">← Back to Home</a>
      </div>
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
      color: #c3e88d;
    }
  `]
})
export class Day17LabComponent {
  tier1Hint = `const seconds = (Date.now() - timestamp) / 1000;
if (seconds < 60) return 'just now';
const minutes = Math.floor(seconds / 60);
if (minutes < 60) return \`\${minutes} minute\${minutes === 1 ? '' : 's'} ago\`;
// ...continue up through hours, days`;

  ratingBadgeAnswer = `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ratingBadge' })
export class RatingBadgePipe implements PipeTransform {
  transform(rating: number | null | undefined): string {
    if (!rating) return 'Unrated';
    if (rating >= 8) return 'Certified banger';
    if (rating >= 6) return 'Solid';
    return 'Proceed with caution';
  }
}`;

  timeAgoAnswer = `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';
    const date = new Date(value);
    const seconds = (Date.now() - date.getTime()) / 1000;

    if (seconds < 0) return 'just now';       // future timestamp — clock skew, don't show negative time
    if (seconds < 60) return 'just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return \`\${minutes} minute\${minutes === 1 ? '' : 's'} ago\`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return \`\${hours} hour\${hours === 1 ? '' : 's'} ago\`;

    const days = Math.floor(hours / 24);
    return \`\${days} day\${days === 1 ? '' : 's'} ago\`;
  }
}`;

  highlightNaiveHint = `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, term: string): string {
    if (!term) return text;
    return text.replace(new RegExp(term, 'ig'), match => \`<mark>\${match}</mark>\`);
  }
}
// {{ show().name | highlight: currentTerm() }} — renders literal <mark> text, not a highlight.
// Plain interpolation escapes HTML. Now what?`;
}
