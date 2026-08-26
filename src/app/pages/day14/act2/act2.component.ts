import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day14-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 14 · Act 2 of 3</span>
        <h1>📡 httpResource — The Declarative Way</h1>
        <p class="subtitle">Loading, error, and success — for free, as signals, just by describing what to fetch.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> Angular's docs on
        <a href="https://angular.dev/api/common/http/httpResource" target="_blank" rel="noopener"><code>httpResource</code></a>.
        Because this API is still evolving, the live docs are the most current source of truth — more current than this page.
      </div>

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Rebuild yesterday's imperative ShowDetail fetch as a signal-native <code>httpResource</code> and let the resource drive loading, error, success, and retry state.</li>
          <li><strong>Why It Matters:</strong> Detail pages and signal-keyed views constantly need one record from one URL. <code>httpResource</code> lets Angular own the fetch lifecycle instead of making you hand-maintain it — and it's part of a much larger industry shift toward describing data dependencies declaratively instead of imperatively fetching them.</li>
          <li><strong>Build Steps:</strong> Compare the Day 13 <code>ngOnInit()</code> + <code>subscribe()</code> version to the resource version → rebuild the template around <code>isLoading()</code>, <code>error()</code>, and <code>reload()</code> → make an explicit personal rule for when to use resources vs. ordinary <code>HttpClient</code> calls.</li>
          <li><strong>Expected Outcome:</strong> You can explain why <code>httpResource(() =&gt; ...)</code> must take a function, wire a detail page to resource signals, and choose the right fetch style for a new feature.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (The declarative resource version)</p>
        <p><strong>Next step:</strong> Act 3 (Debug It)</p>
        <p><strong>Time:</strong> About 30 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d14-act2-resource-intro" [stepNumber]="1" title="Meet httpResource">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>Yesterday's <code>ShowDetail</code> was honest, but manual: Angular created the component, <code>ngOnInit()</code> started the request, and your subscription callback pushed the result into writable signals. That worked, but it also meant you personally owned every fetch lifecycle detail — every flag, every reset, every edge case.</p>

        <p style="margin-top: 12px;">Today you meet <code>httpResource</code> from <code>@angular/common/http</code>, a newer signal-native way to fetch data reactively for a view. Two things to know plainly up front: it is still experimental as of Angular 21, and it is for GET/read fetching only — mutations like POST, PUT, and DELETE still go through ordinary <code>HttpClient</code> methods, which you'll keep using for those.</p>

        <p style="margin-top: 12px;">Here is exactly the code you're about to replace — open your own <code>ShowDetail</code> and find something like this:</p>

        <app-code-block lang="typescript" [code]="showDetailBeforeCode" />

        <p style="margin-top: 12px;"><strong>Do this:</strong> replace it with the resource version below. The adapter stays, the route param stays, and the detail-page idea stays; what changes is who owns the fetch state:</p>

        <app-code-block lang="typescript" [code]="showDetailResourceCode" />

        <div class="think-about-it">
          <p class="tai-q">Why does <code>httpResource</code> take a function returning the URL instead of a plain URL string written once?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — why a function, not a string">
          <p>Angular needs executable code — a recipe it can call again whenever a signal dependency changes. When the URL factory function runs, Angular tracks every signal it reads, such as <code>this.id()</code>. When that signal later changes (for example, you navigate to a different show), Angular re-calls the function to get the new URL and fires a fresh GET request automatically. A plain string is a frozen value with no dependencies to track, so Angular would have no reactive trigger to ever issue a second request.</p>
        </app-collapsible>

        <div class="info-box">
          <strong>The key mechanism:</strong> <code>httpResource&lt;TvMazeShow&gt;(...)</code> takes a function because Angular re-runs that function whenever any signal read inside it changes. Here the function reads <code>this.id()</code>, so a new id means a new request automatically — with zero code from you to make that happen.
        </div>

        <div class="info-box">
          <strong>Important adapter reminder:</strong> <code>showRes.value()</code> is still the raw <code>TvMazeShow</code> from the API. <code>showRes.hasValue()</code> is the type-narrowing check that tells TypeScript a real response exists, and <code>toShow(...)</code> still performs the same Day 13 shape conversion into our app's <code>Show</code> model. The resource changed how the request is made — it did not remove the need for the adapter you wrote yesterday.
        </div>

        <app-collapsible icon="💡" label="Hint — Name the reactive ingredient">
          <p>If the URL-producing function never read a signal, Angular would have no reactive reason to run it again. The whole point is that the recipe depends on signal ingredients like <code>this.id()</code>.</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Deep Dive — what disappeared, and what did not?">
          <p><code>ngOnInit()</code> disappeared. The explicit <code>.subscribe(...)</code> disappeared. The hand-rolled writable <code>show</code> and <code>loading</code> signals disappeared.</p>
          <p style="margin-top: 12px;">But the route param did not disappear, and the adapter did not disappear. <code>httpResource</code> changes how we fetch; it does not magically erase the need to map raw API data into the domain model our templates expect. This is worth noticing as a general pattern: a "declarative" API usually removes lifecycle bookkeeping, not the actual data-shaping work underneath it.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your <code>ShowDetail</code> compiles with <code>httpResource</code> in place of <code>ngOnInit + subscribe</code>. You can explain why <code>httpResource</code> takes a function instead of a plain URL string.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d14-act2-detail-rebuild" [stepNumber]="2" title="The Full Template — Loading, Error, and Success as Signals">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>The TypeScript got shorter, but the real payoff is the template. Instead of manually maintaining separate state and hoping you remembered to flip every flag at the right moment, the resource itself exposes the fetch lifecycle as signals.</p>

        <p style="margin-top: 12px;">Notice what's missing from the code below compared to yesterday: no <code>ngOnInit()</code>, no <code>.subscribe(...)</code>, no hand-rolled <code>loading</code> or <code>error</code> signals to maintain yourself. <code>httpResource</code> gives you <code>isLoading()</code>, <code>error()</code>, and <code>value()</code>/<code>hasValue()</code> automatically, and <code>reload()</code> is already a built-in retry method — you didn't write any of that.</p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> replace your detail template's loading/error/success branches with:</p>

        <app-code-block lang="html" [code]="showDetailResourceHtmlCode" />

        <p style="margin-top: 12px;">That means the success branch can keep using the adapted <code>show()</code> computed signal, while the loading and failure branches read directly from the resource. The component becomes a small description of the data relationship instead of a manual state machine.</p>

        <div class="think-about-it">
          <p class="tai-q">What category of bugs does this eliminate compared to yesterday's <code>ngOnInit()</code> + <code>subscribe()</code> version?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the whole class of bugs this removes">
          <p>It eliminates the entire class of "forgot to reset a flag" lifecycle bugs: forgetting to set <code>loading</code> back to true before a new request, forgetting to clear a stale result before the new one arrives, and forgetting to call a load method again when the route id changes. Because <code>httpResource</code> owns <code>isLoading()</code>, <code>error()</code>, and <code>value()</code> internally, those state transitions are no longer your responsibility to coordinate — Angular does it for you every time the URL-recipe signal changes.</p>
        </app-collapsible>

        <div class="info-box">
          <strong>Try this yourself — the payoff moment:</strong> because the resource's URL function reads <code>this.id()</code>, navigating between shows with Day 9's Prev/Next buttons should automatically trigger a refetch. Click Next in your own app right now and watch the Network tab fire a new request — with zero new code from you.
        </div>

        <div class="warning-box">
          <strong>Notice what you did NOT write:</strong> no custom retry function, no reset-<code>loading</code>-to-true bookkeeping, no stale route-id closure to remember, and no subscription cleanup concern for this read pattern.
        </div>

        <app-collapsible icon="💡" label="Hint — Build the branches in timeline order">
          <p>Write the template in the same order the user experiences it: loading first, then error, then success. That keeps the screen honest and makes each branch's job obvious.</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Deep Dive — why is navigation-triggered refetching automatic now?">
          <p>Because the resource is not watching the router directly; it is watching the signal dependency graph. The URL recipe reads <code>this.id()</code>, Angular notices that dependency, and when the bound route-param signal changes, Angular re-runs the recipe and issues a new GET request.</p>
          <p style="margin-top: 12px;">That is a much more robust mental model than "remember to call my load method again." The dependency itself is the refetch rule — which is exactly the kind of guarantee that's hard to get right by hand and easy to get right when the framework owns it.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Load a detail page, then click Next/Prev and confirm the Network tab fires a fresh request each time with no extra code from you. You can build the loading/error/success three-branch template entirely from resource signals and explain why navigation-triggered refetching is automatic.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d14-act2-which-one-when" [stepNumber]="3" title="Which One, When? — A Decision You'll Make Constantly">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>You now need a rule, not just a neat demo. Here it is, in two categories worth memorizing — you'll reach for this decision constantly, in this course and beyond.</p>

        <p style="margin-top: 12px;"><strong>Category 1:</strong> fetching data a view depends on — detail pages, lists keyed by a signal, route-driven reads. <code>httpResource</code> is made for exactly this shape. <strong>Category 2:</strong> imperative moments — a button click that POSTs a form, a manually triggered action, or a user-driven search event. Use ordinary <code>HttpClient</code> calls there, just like the subscribe-based code you built on Day 13 and in today's Act 1.</p>

        <p style="margin-top: 12px;">Worth being honest about framework motion: Angular's Signal Forms work and resource-based APIs are clearly converging in this direction, so "check the current docs" is a genuinely correct professional answer, not a cop-out. And subscribe-based code is not going away — you will read it forever in existing production codebases, which is exactly why you learned that style first, on Day 13, before meeting this newer alternative today.</p>

        <div class="think-about-it">
          <p class="tai-q">Give the one-sentence rule: when do you reach for <code>httpResource</code>, and when do you reach for ordinary <code>HttpClient</code> + <code>subscribe()</code>?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the one-sentence rule">
          <p>Use <code>httpResource</code> when the screen can describe <em>what</em> to fetch purely from signals — detail pages, route-driven reads, or any data the view depends on reactively — and use <code>HttpClient</code> + <code>subscribe()</code> when the user is triggering an imperative action right now, such as a button click that searches, POSTs a form, or issues a PUT. A quick test: if a signal change should automatically refetch, reach for <code>httpResource</code>; if a user gesture should fire the request, reach for <code>subscribe()</code>.</p>
        </app-collapsible>

        <div class="info-box">
          <strong>Fast rule of thumb:</strong> if the screen can describe what to fetch from signals, a resource is a strong fit. If the user is causing an action right now, use imperative <code>HttpClient</code> code.
        </div>

        <div class="warning-box">
          <strong>Boundary to remember:</strong> <code>httpResource</code> is for GET/read work. Don't force POST, PUT, or DELETE flows into it just because the API feels newer.
        </div>

        <app-collapsible icon="🧩" label="Deep Dive — experimental doesn't mean 'never use it,' and it doesn't mean 'must use it'">
          <p>Because <code>httpResource</code> is still experimental as of Angular 21, reasonable teams make different adoption calls. Some wait completely. Others use it only for read-heavy views like detail pages and keep the rest of the app on ordinary <code>HttpClient</code>.</p>
          <p style="margin-top: 12px;">That is a legitimate professional decision, not a cop-out. Good engineers weigh stability, team familiarity, and framework maturity instead of blindly chasing or rejecting new APIs. When you're deciding on your own future projects, ask: is the team ready to absorb a breaking change if the experimental API's shape shifts before it stabilizes?</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can give a one-sentence rule for choosing between <code>httpResource</code> and <code>HttpClient</code> + <code>subscribe()</code> for a new feature, without needing to look it up.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day14/act1" class="btn-secondary">← Act 1: Errors in the Subscribe World</a>
        <a routerLink="/day14/act3" class="btn-primary">Act 3: Debug It →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'httpResource',
      plainEnglish: 'Describe what to fetch; Angular handles loading, error, and refetch for you.',
      analogy: '🧾 Handing the kitchen one order ticket and letting the house workflow handle the rest.'
    },
    {
      concept: 'URL function',
      plainEnglish: 'A recipe, not a value — Angular re-runs it automatically when its signal ingredients change.',
      analogy: '👩‍🍳 A recipe card you rerun whenever the ingredient list changes.'
    },
    {
      concept: 'reload()',
      plainEnglish: 'A built-in retry button with no extra state machine code from us.',
      analogy: '🔄 Pressing "send again" on a package scanner instead of rebuilding the shipping system.'
    }
  ];

  showDetailBeforeCode = `export class ShowDetail {
  id = input.required<string>();
  private showsSvc = inject(ShowsService);

  show = signal<Show | undefined>(undefined);
  loading = signal(true);

  ngOnInit() {
    this.showsSvc.byId(Number(this.id())).subscribe(show => {
      this.show.set(show);
      this.loading.set(false);
    });
  }
}`;

  showDetailResourceCode = `import { httpResource } from '@angular/common/http';
import { computed, input } from '@angular/core';

export class ShowDetail {
  id = input.required<string>();

  showRes = httpResource<TvMazeShow>(() => \`https://api.tvmaze.com/shows/\${this.id()}\`);
  show = computed(() => this.showRes.hasValue() ? toShow(this.showRes.value()) : undefined);
}`;

  showDetailResourceHtmlCode = `@if (showRes.isLoading()) {
  <p class="muted">Loading…</p>
} @else if (showRes.error()) {
  <p class="error-box">Couldn't load this show. <button (click)="showRes.reload()">Retry</button></p>
} @else if (show(); as s) {
  <!-- the existing detail template -->
}`;
}
