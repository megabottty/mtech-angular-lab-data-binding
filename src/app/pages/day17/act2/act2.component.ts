import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day17-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 17 · Act 2 of 2</span>
        <h1>🧪 Writing Your Own Pipe</h1>
        <p class="subtitle">Angular ships the common formatters. Today you write the app-specific one BingeBoard actually needs.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> Angular's docs on
        <a href="https://angular.dev/guide/templates/pipes#creating-a-pipe" target="_blank" rel="noopener">creating custom pipes</a>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Write and use a custom pipe, place it correctly against the other three tools this course has taught you, and debug the three most common pipe mistakes.</li>
          <li><strong>Why It Matters:</strong> You now own all four tools a real Angular app uses to organize logic — pipe, <code>computed()</code>, service, component. Knowing which one a new piece of logic belongs in, instantly, is what separates "code that works" from "code a teammate can find."</li>
          <li><strong>Build Steps:</strong> Generate and write a custom <code>runtime</code> pipe → place it on the decision board against the other three tools → debug a buggy pipe with three stacked mistakes.</li>
          <li><strong>Expected Outcome:</strong> You can write a <code>PipeTransform</code> class from scratch, import it correctly, and place any new piece of formatting/derivation/behavior logic in the right one of four places without guessing.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Writing Your Own Pipe)</p>
        <p><strong>Next step:</strong> Student Lab — The Great Refactor Lab</p>
        <p><strong>Time:</strong> About 20 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d17-act2-custom-runtime-pipe" [stepNumber]="1" title="Your First Custom Pipe — runtime">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          TVMaze gives you <code>runtime</code> as raw minutes — <code>62</code>. No built-in pipe turns that
          into "1h 2m," because that formatting rule is specific to this app's domain, not a general-purpose
          one. That's exactly the gap custom pipes exist to fill.
        </p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> generate the pipe with the CLI, then write its
          <code>transform()</code> method:</p>

        <app-code-block lang="typescript" [code]="runtimeGenCommand" />
        <app-code-block lang="typescript" [code]="runtimePipeCode" />

        <p style="margin-top: 12px;">
          A pipe is just a class with a <code>transform()</code> method — the <code>&#64;Pipe</code> decorator's
          only job is giving it a name templates can call with <code>|</code>. Apply it exactly like a
          built-in:
        </p>

        <app-code-block lang="html" [code]="runtimeUsageCode" />

        <div class="warning-box">
          <strong>Don't skip this:</strong> import <code>RuntimePipe</code> into every standalone component
          that uses it, the same way you import a component you use in a template. Forgetting this is Act 2's
          first Debug It bug below, and it's worth feeling the real error message once before you meet it in
          the abstract.
        </div>

        <div class="think-about-it">
          <p class="tai-q">Why does <code>transform()</code> accept <code>minutes: number | null | undefined</code> instead of just <code>number</code>?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — because real API data is not always present">
          <p>TVMaze's <code>runtime</code> field can genuinely be <code>null</code> for a show without reliable episode-length data, and your own adapted <code>Show</code> model defaults it to <code>0</code> in some paths but may pass <code>undefined</code> through others depending on how you wired it. A pipe that only accepted <code>number</code> would be a compile-time lie about what actually flows through your templates — TypeScript would let you bind it to a value that can be <code>null</code>, and the pipe would blow up at runtime the first time a show without runtime data rendered. Widening the parameter type and returning <code>'—'</code> for the falsy cases makes the pipe honest about its real inputs.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>{{ "{{ show().runtime | runtime }}" }}</code> renders "1h 2m" for a real show, and "—" for a show with no runtime data. You can write a <code>PipeTransform</code> class and import it into a component correctly.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d17-act2-taxonomy" [stepNumber]="2" title="The Final Map — Where Does Logic Actually Go?">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>
          You now have all four tools this course teaches for organizing logic. Knowing which one a new
          requirement belongs in, on sight, is the actual skill — more valuable than knowing any one of the
          four tools individually.
        </p>

        <app-code-block lang="typescript" [code]="taxonomyCode" />

        <div class="think-about-it">
          <p class="tai-q">Quiz yourself before checking the answer: "relative time — '3 days ago'"? "count of unwatched shows"? "no duplicate show titles in the watchlist"?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — pipe, computed, service">
          <p>
            <strong>"3 days ago"</strong> is reusable display formatting applied to a raw timestamp — a
            <strong>pipe</strong> (you build exactly this one, <code>timeAgo</code>, in today's lab).
            <strong>Count of unwatched shows</strong> is a value derived purely from existing state (the
            watchlist minus whatever's marked watched) that should recompute automatically when that state
            changes — a <strong>computed()</strong>. <strong>No duplicate show titles allowed</strong> is a
            business rule that has to be enforced consistently everywhere a show gets added, not just in one
            template — that consistency requirement is exactly what a <strong>service</strong> is for.
          </p>
        </app-collapsible>

        <div class="info-box">
          <strong>The tell for each:</strong> if it's about how a value <em>looks</em>, it's a pipe. If it's a
          value <em>derived</em> from other state, it's <code>computed()</code>. If it's a <em>rule</em> that
          must hold true no matter which component touches the data, it's a service. If it's specific to one
          screen and nothing else needs it, it can just live in the component.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Given a new one-sentence requirement you haven't seen before, you can name the correct tool (pipe / computed / service / component) and justify it in a sentence.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d17-act2-debug-shout-pipe" [stepNumber]="3" title="Debug It — Three Bugs in One Tiny Pipe">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Here's a small pipe with three separate mistakes stacked on top of each other. Try to spot all
          three before opening the answers — this is worth the friction.
        </p>

        <app-code-block lang="typescript" [code]="shoutPipeBuggyCode" />
        <app-code-block lang="html" [code]="shoutPipeUsageCode" />

        <app-collapsible icon="🧩" label="Bug 1 — missing implements PipeTransform">
          <p>The class works without it — TypeScript is structurally typed, so a class with a matching <code>transform()</code> method satisfies anything that needs a <code>PipeTransform</code> even without the explicit <code>implements</code> clause. But that's exactly the problem with skipping it: <code>implements PipeTransform</code> is what makes TypeScript check your <code>transform()</code> signature against the interface at compile time. Change the method name, get the parameter order wrong, or return the wrong type, and without the interface, nothing catches it until runtime. This is the miniature version of why interfaces exist at all — they turn "hope you got the shape right" into "the compiler already checked."</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Bug 2 — the pipe isn't in the component's imports array">
          <p>Read the actual error message here rather than guessing — it names the pipe directly, something like "The pipe 'shout' could not be found." Standalone components need every pipe they use listed in their own <code>imports</code> array, the exact same rule as needing a component listed there before you can use its selector. It's easy to forget for a pipe specifically because using it feels like plain template syntax, not "using another piece of code."</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Bug 3 — the argument is silently ignored">
          <p><code>{{ "{{ review.headline | shout: '!!' }}" }}</code> passes <code>'!!'</code> as a second argument, but <code>transform(v: string)</code> only declares one parameter — TypeScript doesn't error on an extra argument to a template pipe call the way it would on a plain function call, so the <code>'!!'</code> is silently dropped and nothing bad-looking happens; the headline just never gets its exclamation marks. The fix is to actually declare the parameter: <code>transform(v: string, suffix = '')</code>, then use it: <code>return v.toUpperCase() + suffix;</code>. This is the quiet failure mode of pipes worth remembering — a wrong argument count rarely throws, it just does nothing.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can name all three bugs without opening the collapsibles, and fix the pipe so <code>{{ "{{ review.headline | shout: '!!' }}" }}</code> actually appends the exclamation marks.</div>
      </app-lesson-step>

      <div class="info-box">
        <strong>Day 17 Acts complete.</strong> You've swept built-in pipes onto real data, written your first custom pipe, and placed logic correctly across all four tools this course has given you. Head to the Student Lab — the real substance of today.
      </div>

      <div class="nav-footer">
        <a routerLink="/day17/act1" class="btn-secondary">← Act 1: Pipes on Real Data</a>
        <a routerLink="/day17/lab" class="btn-primary">Student Lab: The Great Refactor Lab →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'PipeTransform',
      plainEnglish: 'The interface a pipe class implements — one method, transform(), does the actual work.',
      analogy: '🔧 A single-purpose tool with exactly one job: take this, hand back that.'
    },
    {
      concept: 'custom pipe',
      plainEnglish: 'A pipe you write for formatting specific to your own app\'s domain.',
      analogy: '🛠️ A jig you build on the shop floor because no off-the-shelf tool does your exact job.'
    },
    {
      concept: 'the four-tool taxonomy',
      plainEnglish: 'Pipe (display), computed (derived state), service (shared rules), component (one screen\'s glue).',
      analogy: '🗂️ Four labeled drawers — every new piece of logic has exactly one drawer it belongs in.'
    },
    {
      concept: 'silent argument mismatch',
      plainEnglish: 'A pipe call with the wrong number of arguments rarely throws — it just quietly ignores the extra one.',
      analogy: '📭 A letter addressed to an apartment that does not exist — no bounce, it just never arrives.'
    }
  ];

  runtimeGenCommand = `ng g pipe pipes/runtime`;

  runtimePipeCode = `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'runtime' })
export class RuntimePipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (!minutes) return '—';
    const h = Math.floor(minutes / 60), m = minutes % 60;
    return h ? \`\${h}h \${m ? m + 'm' : ''}\`.trim() : \`\${m}m\`;
  }
}`;

  runtimeUsageCode = `<p>{{ show().runtime | runtime }}</p>
<!-- import { RuntimePipe } from '../../pipes/runtime.pipe';
     add RuntimePipe to this component's imports array. -->`;

  taxonomyCode = `// The four-tool decision board:
//
// Reusable display formatting              → pipe
// Derived state (computed from other state) → computed()
// Behavior/rules shared across the app      → service
// One component's own glue, nothing shares it → the component

// Quiz:
// "relative time — '3 days ago'"          → ?
// "count of unwatched shows"               → ?
// "no duplicate show titles in watchlist"  → ?`;

  shoutPipeBuggyCode = `import { Pipe } from '@angular/core';

@Pipe({ name: 'shout' })
export class ShoutPipe {
  transform(v: string) {
    return v.toUpperCase();
  }
}`;

  shoutPipeUsageCode = `<p>{{ review.headline | shout: '!!' }}</p>`;
}
