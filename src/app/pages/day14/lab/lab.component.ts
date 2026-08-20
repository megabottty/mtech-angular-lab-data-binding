import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day14-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Make BingeBoard Resilient</h1>
        <p class="subtitle">
          55 minutes. 4 tasks. Extend today's error handling and <code>httpResource</code> work on
          your own, then polish the experience until BingeBoard feels resilient instead of lucky.
        </p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Copy the working Act 3 code (Browse with error/retry, ShowDetail on
          <code>httpResource</code>) into your project before starting.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li>
            <strong>Learning Goal:</strong>
            Independently extend real error handling and resource-based fetching with new failure
            categories, a second independent resource, and perceived-performance polish.
          </li>
          <li>
            <strong>Why It Matters:</strong>
            Production apps distinguish failure types, avoid nested-subscribe tangles, and invest
            in perceived performance — and production engineers read evolving framework docs as a
            routine skill.
          </li>
          <li>
            <strong>Build Steps:</strong>
            graceful 404 → second independent resource (episodes) → skeleton screens → stretch:
            doc-reading on interceptors.
          </li>
          <li>
            <strong>Expected Outcome:</strong>
            Students can build resilient, honest data-fetching UIs and can independently research a
            framework feature from official docs.
          </li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (Day 14 capstone)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
      </section>

      <app-lesson-step
        stepId="d14-lab-404-grace"
        [stepNumber]="'Task 1'"
        title="404 With Grace"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: inspecting <code>showRes.error()</code> for a <code>.status</code> field, branching UI on specific status codes, not just a generic boolean error flag.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          On the <code>httpResource</code>-powered Detail page, when the show id does not exist (a
          genuine <code>404</code> from TVMaze, like <code>999999999</code>), show
          <code>That show doesn't exist (maybe it was cancelled?)</code> plus a link back to Browse.
          That message should be visibly different from the generic network-error state you already
          built in Act 1 and Act 2.
        </p>
        <p style="margin-top: 12px;">
          This is a subtle but very professional upgrade. A <code>404</code> means the request
          succeeded technically and the server answered honestly: the record is missing. That is a
          different story from <code>status: 0</code> offline mode or a generic server failure, so
          your template should branch on the actual status code instead of flattening everything into
          one lazy error box.
        </p>

        <div class="warning-box">
          <strong>Do not flatten the story:</strong> “missing show” and “could not reach the show
          database” are different truths, so the screen should sound different too.
        </div>

        <div class="ask-class">
          If the id is valid syntax but the show truly does not exist, why is that a different
          message from airplane-mode failure?
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Trigger a <code>404</code> by visiting a bogus id like <code>999999999</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Inspect <code>showRes.error()</code> in the console and notice the runtime object exposes a <code>.status</code> property.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Branch the template so <code>status === 404</code> shows the “doesn't exist” message and Browse link, while everything else falls back to the generic retry state from Act 2.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> student can distinguish a specific 4xx status from a
          generic failure and give each a distinct, honest user-facing message.
        </div>

        <app-collapsible icon="💡" label="Hint — Inspect the actual runtime error first">
          <p>
            The public resource API gives <code>showRes.error()</code> the type
            <code>Error | undefined</code>, but in practice <code>httpResource</code> often surfaces
            the underlying <code>HttpErrorResponse</code> object at runtime — including
            <code>.status</code>. That is why this task explicitly wants you to look in the console
            first instead of guessing from memory or a lesson slide.
          </p>
          <p style="margin-top: 12px;">
            If strict typing complains, cast pragmatically. This is one of those moments where
            “check the real runtime object” beats pretending the most generic type annotation tells
            the whole story.
          </p>
          <app-code-block lang="html" [code]="task1Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <p>
            This version keeps the generic retry branch for real connection/server failures, while a
            real <code>404</code> gets its own wording and a direct way back to Browse.
          </p>
          <h4>HTML:</h4>
          <app-code-block lang="html" [code]="task1HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d14-lab-episodes-resource"
        [stepNumber]="'Task 2'"
        title="Episodes as a Second, Independent Resource"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: multiple independent resources on one component, both reactive to the same id signal, no manual nesting or coordination required.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Convert yesterday's episodes fetch — which was a manual <code>HttpClient</code> call,
          likely nested inside the show's <code>subscribe</code> callback — into its own separate
          <code>httpResource</code>, keyed on the same <code>id()</code> signal. The show and the
          episodes should load independently, each with its own loading/error state rendered as a
          separate section.
        </p>
        <p style="margin-top: 12px;">
          This task is the direct contrast to Day 13's intentional nested-subscribe pain. Today the
          win is not just fewer lines — it is cleaner ownership: the show request owns the show UI,
          the episodes request owns the episodes UI, and neither one needs to hide inside the other
          just because both depend on the same route id.
        </p>

        <div class="info-box">
          <strong>Day 13 contrast:</strong> two GET requests that depend on the same signal do not
          have to be sequentially nested. Let both resources describe their own URL recipe and
          Angular can fire both requests in parallel.
        </div>

        <div class="ask-class">
          If the show loads successfully but the episodes call fails, should the entire page die —
          or should one section stay useful while the other asks for a retry?
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Define a second <code>httpResource&lt;TvMazeEpisode[]&gt;(...)</code> that reads the same <code>id()</code> signal and targets <code>/episodes</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Render an independent loading/error/success block for episodes, separate from the show's branches.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Open the Network tab and confirm both requests fire in parallel instead of one being nested inside the other's callback.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> student can wire up two independent, signal-keyed
          resources on one component and explain why this eliminates the nested-subscribe problem
          from yesterday.
        </div>

        <app-collapsible icon="💡" label="Hint — Same id signal, second resource">
          <p>
            Reuse the tiny <code>TvMazeEpisode</code> shape from Day 13's lab:
            <code>&#123; id, season, number &#125;</code>. This endpoint already gives you the raw array you
            need, so there is no adapter ceremony here — just a second resource whose URL recipe
            reads the same route-param signal.
          </p>
          <app-code-block lang="typescript" [code]="task2Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <p>
            The key visual proof is that the show and episodes sections each have their own
            <code>isLoading()</code>, <code>error()</code>, and success branch. They are siblings,
            not a parent request with a child callback trapped inside it.
          </p>
          <h4>TypeScript:</h4>
          <app-code-block lang="typescript" [code]="task2TsAnswer" />
          <h4 style="margin-top: 16px">HTML:</h4>
          <app-code-block lang="html" [code]="task2HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d14-lab-skeleton-screens"
        [stepNumber]="'Task 3'"
        title="Skeleton Screens (Pure CSS)"
      >
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: CSS <code>&#64;keyframes</code> shimmer animation, rendering N placeholder divs with <code>&#64;for</code> while <code>loading()</code> is true, matching the real card grid's dimensions so there's no layout shift.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Replace plain <code>Loading…</code> text on Browse's card grid with gray shimmer skeleton
          placeholder cards — pure CSS animation plus template branching, no new dependencies. This
          is a UX-polish task, but say the product truth out loud: it makes the app feel expensive.
        </p>
        <p style="margin-top: 12px;">
          Skeleton screens do not reduce the actual network time. What they improve is perceived
          performance: the layout appears stable immediately, the user sees what kind of content is
          coming, and the wait feels intentional instead of empty. That matters just as much as raw
          speed in real product work.
        </p>

        <div class="info-box">
          <strong>Perceived performance matters:</strong> if your placeholder matches the real card
          footprint, the page feels calmer and more polished because content does not jump around
          when the response arrives.
        </div>

        <div class="ask-class">
          Why can the same one-second wait feel slower with plain “Loading…” text than with a grid
          of skeleton cards that already matches the final layout?
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add a <code>.skeleton-card</code> class with a subtle shimmer gradient animation.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Render about 6 placeholder cards with <code>&#64;for (i of skeletonPlaceholders; track i)</code> while <code>loading()</code> is true.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Verify the skeletons and the real results share the same dimensions so there is no layout shift when the real content arrives.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> student can build a CSS-only loading skeleton that
          matches real content's layout dimensions.
        </div>

        <app-collapsible icon="💡" label="Hint — Match the real card footprint">
          <p>
            You do not need a library for this. A simple sweeping gradient plus
            <code>background-position</code> animation is enough, as long as the skeleton card's
            size matches the real card's size.
          </p>
          <app-code-block lang="typescript" [code]="task3Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <p>
            Add a tiny placeholder array on the component, then use matching CSS and a grid of fake
            cards while the real results are still loading.
          </p>
          <h4>Component styles + placeholder array:</h4>
          <app-code-block lang="typescript" [code]="task3StylesAnswer" />
          <h4 style="margin-top: 16px">HTML:</h4>
          <app-code-block lang="html" [code]="task3HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d14-lab-stretch-interceptors"
        [stepNumber]="'Task 4'"
        title="Stretch: Read the Docs — Interceptors"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: reading official framework docs, recognizing a functional interceptor shape, centralizing cross-cutting HTTP behavior.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          This task is intentionally <strong>not</strong> a coding task. Read Angular's docs page on
          HTTP interceptors and write exactly three sentences describing one thing a single
          interceptor could centralize for BingeBoard — like logging every request, attaching auth
          headers uniformly, or enforcing one shared retry policy for flaky requests.
        </p>
        <p style="margin-top: 12px;">
          Treat doc-reading as a graded skill here, not filler. Production Angular engineers read
          framework docs constantly as APIs evolve, and this whole day proves why: even
          <code>httpResource</code> is still experimental as of Angular 21, so staying current means
          reading, not just copying old snippets forever.
        </p>

        <div class="info-box">
          <strong>Foreshadow:</strong> we wire a real interceptor on Day 21. Today's win is learning
          how to read the docs well enough to explain the shape and the use case before the build-
          along does it for you.
        </div>

        <div class="ask-class">
          Why is reading official docs a real engineering skill instead of “cheating” compared to
          writing code from memory?
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Open the Angular docs' Interceptors page.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Identify the functional interceptor shape: a plain function that receives the request and a <code>next</code> handler.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Write exactly three sentences describing one thing BingeBoard could centralize there and why one interceptor beats repeating that logic in every service method.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> student has read real framework documentation and can
          explain, in their own words, what a functional interceptor is for and one concrete use
          case for BingeBoard.
        </div>

        <app-collapsible icon="💡" label="Hint — Functional interceptor shape">
          <p>
            You are looking for a plain function shape, not a class-based service. The example below
            is purely illustrative; actually wiring it into providers is Day 21's job.
          </p>
          <app-code-block lang="typescript" [code]="task4Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 4">
          <p>
            There is no single “correct” summary here, but this is the depth and specificity I want
            to hear.
          </p>
          <p>
            A functional interceptor could attach the same auth header to every BingeBoard request
            before it leaves the app. Centralizing that in one interceptor is better than repeating
            header code in every service method, because one change updates every request at once.
            Day 21 is where we actually wire one up, but today the point is recognizing the pattern
            from the docs and explaining why it exists.
          </p>
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day14/act3" class="btn-secondary">← Act 3: Debug It</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Browse and Detail both survive offline mode with actionable errors and retry</li>
          <li><span class="checkbox">✅</span> Detail runs on <code>httpResource</code> with a distinct, graceful <code>404</code> state</li>
          <li><span class="checkbox">✅</span> Episodes load as their own independent resource</li>
          <li><span class="checkbox">✅</span> Student can give the elevator-pitch answer: <code>resource for reactive GETs; client calls for actions; handle 0/4xx/5xx differently</code></li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 14: HTTP II.</p>
        <ul class="complete-list">
          <li>✅ Built honest loading, error, and retry states</li>
          <li>✅ Distinguished <code>0</code>, <code>4xx</code>, and <code>5xx</code> failure categories</li>
          <li>✅ Replaced <code>ngOnInit + subscribe</code> with a declarative <code>httpResource</code></li>
          <li>✅ Debugged three realistic resilience bugs</li>
          <li>✅ Wired a second independent resource without nested subscribes</li>
        </ul>
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
export class Day14LabComponent {
  task1Hint = `@if (showRes.error(); as err) {
  @if ((err as any).status === 404) {
    <section class="not-found-box">
      <h2>That show doesn't exist (maybe it was cancelled?)</h2>
      <a routerLink="/" class="back-link">← Back to Browse</a>
    </section>
  } @else {
    <section class="error-box">
      <p>Could not reach the show database.</p>
      <button type="button" (click)="showRes.reload()">Retry</button>
    </section>
  }
}`;

  task1HtmlAnswer = `@if (showRes.isLoading()) {
  <p class="muted">Loading show…</p>
} @else if (showRes.error(); as err) {
  @if ((err as any).status === 404) {
    <section class="not-found-box">
      <h2>That show doesn't exist (maybe it was cancelled?)</h2>
      <p>The request worked — TVMaze just does not have a record for that id.</p>
      <a routerLink="/" class="back-link">← Back to Browse</a>
    </section>
  } @else {
    <section class="error-box">
      <p>Could not reach the show database.</p>
      <button type="button" (click)="showRes.reload()">Retry</button>
    </section>
  }
} @else if (show(); as s) {
  <article class="detail-card">
    <h1>{{ s.name }}</h1>
    <div [innerHTML]="s.summary"></div>
  </article>
}`;

  task2Hint = `interface TvMazeEpisode {
  id: number;
  season: number;
  number: number;
}

episodesRes = httpResource<TvMazeEpisode[]>(() => \`https://api.tvmaze.com/shows/\${this.id()}/episodes\`);`;

  task2TsAnswer = `import { httpResource } from '@angular/common/http';
import { computed, input } from '@angular/core';
import { toShow } from '../core/adapters/show.adapter';
import { TvMazeShow } from '../core/models/tvmaze.model';

interface TvMazeEpisode {
  id: number;
  season: number;
  number: number;
}

export class ShowDetail {
  id = input.required<string>();

  showRes = httpResource<TvMazeShow>(() => \`https://api.tvmaze.com/shows/\${this.id()}\`);
  episodesRes = httpResource<TvMazeEpisode[]>(() => \`https://api.tvmaze.com/shows/\${this.id()}/episodes\`);

  show = computed(() =>
    this.showRes.hasValue() ? toShow(this.showRes.value()) : undefined
  );
}`;

  task2HtmlAnswer = `<section class="detail-main">
  @if (showRes.isLoading()) {
    <p class="muted">Loading show details…</p>
  } @else if (showRes.error()) {
    <p class="error-box">Could not load this show. <button type="button" (click)="showRes.reload()">Retry</button></p>
  } @else if (show(); as s) {
    <article class="detail-card">
      <h1>{{ s.name }}</h1>
      <p>⭐ {{ s.rating }} · {{ s.genre }}</p>
      <div [innerHTML]="s.summary"></div>
    </article>
  }
</section>

<section class="episodes-panel">
  <h2>Episodes</h2>

  @if (episodesRes.isLoading()) {
    <p class="muted">Loading episode list…</p>
  } @else if (episodesRes.error()) {
    <p class="error-box">Could not load episodes. <button type="button" (click)="episodesRes.reload()">Retry</button></p>
  } @else if (episodesRes.hasValue()) {
    <p>{{ episodesRes.value().length }} episodes loaded.</p>
    <ul>
      @for (episode of episodesRes.value(); track episode.id) {
        <li>S{{ episode.season }}E{{ episode.number }}</li>
      }
    </ul>
  }
</section>`;

  task3Hint = `.skeleton-card {
  background: linear-gradient(90deg, #2a2d35 25%, #3a3d46 37%, #2a2d35 63%);
  background-size: 400% 100%;
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}`;

  task3StylesAnswer = `skeletonPlaceholders = [1, 2, 3, 4, 5, 6];

styles: [\`
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.skeleton-card {
  height: 320px;
  border-radius: 16px;
  background: linear-gradient(90deg, #2a2d35 25%, #3a3d46 37%, #2a2d35 63%);
  background-size: 400% 100%;
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
\`]`;

  task3HtmlAnswer = `@if (loading()) {
  <div class="skeleton-grid">
    @for (i of skeletonPlaceholders; track i) {
      <div class="skeleton-card" aria-hidden="true"></div>
    }
  </div>
} @else {
  <div class="results-grid">
    @for (show of shows(); track show.id) {
      <app-show-card [show]="show" />
    }
  </div>
}`;

  task4Hint = `import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.url);
  return next(req);
};`;
}
