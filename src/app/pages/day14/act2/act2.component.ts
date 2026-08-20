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

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Rebuild yesterday's imperative ShowDetail fetch as a signal-native <code>httpResource</code> and let the resource drive loading, error, success, and retry state.</li>
          <li><strong>Why It Matters:</strong> Detail pages and signal-keyed views constantly need one record from one URL. <code>httpResource</code> lets Angular own the fetch lifecycle instead of making you hand-maintain it.</li>
          <li><strong>Build Steps:</strong> Compare the Day 13 <code>ngOnInit()</code> + <code>subscribe()</code> version to the resource version → rebuild the template around <code>isLoading()</code>, <code>error()</code>, and <code>reload()</code> → make an explicit professional decision rule for when to use resources vs. ordinary <code>HttpClient</code> calls.</li>
          <li><strong>Expected Outcome:</strong> You can explain why <code>httpResource(() =&gt; ...)</code> must take a function, wire a detail page to resource signals, and choose the right fetch style for a new feature.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (The declarative resource version)</p>
        <p><strong>Next step:</strong> Act 3 (Debug It)</p>
      </section>

      <app-lesson-step stepId="d14-act2-resource-intro" [stepNumber]="1" title="Meet httpResource">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Yesterday's ShowDetail was honest, but manual: Angular created the component, <code>ngOnInit()</code> started the request, and our subscription callback pushed the result into writable signals. That worked, but it also meant we personally owned every fetch lifecycle detail.</p>
        <p style="margin-top: 12px;">Today we meet <code>httpResource</code> from <code>@angular/common/http</code>, a newer signal-native way to fetch data reactively for a view. State this plainly: it is still experimental as of Angular 21, and it is for GET/read fetching only; mutations like POST, PUT, and DELETE still go through ordinary <code>HttpClient</code> methods.</p>
        <p style="margin-top: 12px;">First, put yesterday's version on the screen so students can see the exact code being replaced:</p>
        <app-code-block lang="typescript" [code]="showDetailBeforeCode" />
        <p style="margin-top: 12px;">Now compare it to the resource version. The adapter stays, the route param stays, and the detail-page idea stays; what changes is who owns the fetch state.</p>
        <app-code-block lang="typescript" [code]="showDetailResourceCode" />
        <div class="ask-class">Why does <code>httpResource</code> take a function returning the URL instead of a plain URL string written once?</div>
        <div class="info-box">
          <strong>The key mechanism:</strong> <code>httpResource&lt;TvMazeShow&gt;(...)</code> takes a function because Angular re-runs that function whenever any signal read inside it changes. Here the function reads <code>this.id()</code>, so a new id means a new request automatically.
        </div>
        <div class="info-box">
          <strong>Important adapter reminder:</strong> <code>showRes.value()</code> is still the raw <code>TvMazeShow</code> from the API. <code>showRes.hasValue()</code> is the type-narrowing check that tells TypeScript a real response exists, and <code>toShow(...)</code> still performs the same Day 13 shape conversion into our app's <code>Show</code> model.
        </div>
        <app-collapsible icon="💡" label="Hint — Name the reactive ingredient">
          <p>If the URL-producing function never read a signal, Angular would have no reactive reason to run it again. The whole point is that the recipe depends on signal ingredients like <code>this.id()</code>.</p>
        </app-collapsible>
        <app-collapsible icon="🧩" label="Deep Dive — What disappeared, and what did not?">
          <p><code>ngOnInit()</code> disappeared. The explicit <code>.subscribe(...)</code> disappeared. The hand-rolled writable <code>show</code> and <code>loading</code> signals disappeared.</p>
          <p style="margin-top: 12px;">But the route param did not disappear, and the adapter did not disappear. <code>httpResource</code> changes how we fetch; it does not magically erase the need to map raw API data into the domain model our templates expect.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain why <code>httpResource</code> takes a function instead of a plain URL string and wire up a basic resource-backed fetch.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d14-act2-detail-rebuild" [stepNumber]="2" title="The Full Template — Loading, Error, and Success as Signals">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>The TypeScript got shorter, but the real payoff is the template. Instead of manually maintaining separate state and hoping we remembered to flip every flag at the right moment, the resource itself exposes the fetch lifecycle as signals.</p>
        <p style="margin-top: 12px;">Show the three-branch template slowly and let the room absorb what just vanished: no <code>ngOnInit()</code>, no <code>.subscribe(...)</code>, no hand-rolled <code>loading</code> or <code>error</code> signals to maintain yourself. <code>httpResource</code> gives you <code>isLoading()</code>, <code>error()</code>, and <code>value()</code>/<code>hasValue()</code> automatically, and <code>reload()</code> is already a built-in retry method.</p>
        <app-code-block lang="html" [code]="showDetailResourceHtmlCode" />
        <p style="margin-top: 12px;">That means the success branch can keep using the adapted <code>show()</code> computed signal, while the loading and failure branches read directly from the resource. The component becomes a small description of the data relationship instead of a manual state machine.</p>
        <div class="ask-class">What category of bugs does this eliminate compared to yesterday's <code>ngOnInit()</code> + <code>subscribe()</code> version?</div>
        <div class="info-box">
          <strong>The payoff moment:</strong> because the resource's URL function reads <code>this.id()</code>, navigating between shows with Day 9's Prev/Next buttons automatically triggers a refetch. Show that live: click Next, watch the Network tab fire a new request with zero new code from us.
        </div>
        <div class="warning-box">
          <strong>Notice what we did NOT write:</strong> no custom retry function, no reset-<code>loading</code>-to-true bookkeeping, no stale route-id closure to remember, and no subscription cleanup concern for this read pattern.
        </div>
        <app-collapsible icon="💡" label="Hint — Build the branches in timeline order">
          <p>Write the template in the same order the user experiences it: loading first, then error, then success. That keeps the screen honest and makes each branch's job obvious.</p>
        </app-collapsible>
        <app-collapsible icon="🧩" label="Deep Dive — Why navigation-triggered refetching is automatic now">
          <p>Because the resource is not watching the router directly; it is watching the signal dependency graph. The URL recipe reads <code>this.id()</code>, Angular notices that dependency, and when the bound route-param signal changes, Angular re-runs the recipe and issues a new GET request.</p>
          <p style="margin-top: 12px;">That is a much more robust mental model than “remember to call my load method again.” The dependency itself is the refetch rule.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can build the loading/error/success three-branch template entirely from resource signals and explain why navigation-triggered refetching is automatic.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d14-act2-which-one-when" [stepNumber]="3" title="Which One, When? — A Decision You'll Make Constantly">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Students now need a rule, not just a neat demo. Put the decision on the board in two categories they can reuse all semester.</p>
        <p style="margin-top: 12px;"><strong>Category 1:</strong> fetching data a view depends on — detail pages, lists keyed by a signal, route-driven reads. <code>httpResource</code> is made for exactly this shape. <strong>Category 2:</strong> imperative moments — a button click that POSTs a form, a manually triggered action, or a user-driven search event. Use ordinary <code>HttpClient</code> calls there, just like the subscribe-based code you built on Day 13 and in today's Act 1.</p>
        <p style="margin-top: 12px;">Also be honest about framework motion: Angular's Signal Forms work and resource-based APIs are clearly converging in this direction, so “watch the docs” is a fair professional sentence here. And reassure the room explicitly: you will read subscribe-based code forever in existing production codebases, which is exactly why we learned that style first before meeting this newer alternative today.</p>
        <div class="ask-class">Give me the one-sentence rule: when do you reach for <code>httpResource</code>, and when do you reach for ordinary <code>HttpClient</code> + <code>subscribe()</code>?</div>
        <div class="info-box">
          <strong>Fast rule of thumb:</strong> if the screen can describe what to fetch from signals, a resource is a strong fit. If the user is causing an action right now, use imperative <code>HttpClient</code> code.
        </div>
        <div class="warning-box">
          <strong>Boundary to remember:</strong> <code>httpResource</code> is for GET/read work. Do not force POST, PUT, or DELETE flows into it just because the API feels newer.
        </div>
        <app-collapsible icon="🧩" label="Deep Dive — Experimental does not mean 'never use it,' and it does not mean 'must use it'">
          <p>Because <code>httpResource</code> is still experimental as of Angular 21, reasonable teams make different adoption calls. Some wait completely. Others use it only for read-heavy views like detail pages and keep the rest of the app on ordinary <code>HttpClient</code>.</p>
          <p style="margin-top: 12px;">That is a legitimate professional decision, not a cop-out. Good engineers weigh stability, team familiarity, and framework maturity instead of blindly chasing or rejecting new APIs.</p>
        </app-collapsible>
        <app-collapsible icon="✅" label="Show Answer — The sentence I want to hear">
          <p><code>httpResource</code> is for describing GET data a view depends on reactively; ordinary <code>HttpClient</code> is for imperative actions like submits, button-driven work, and mutations.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can give a one-sentence rule for choosing between <code>httpResource</code> and <code>HttpClient</code> + <code>subscribe()</code> for a new feature.</div>
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
      analogy: '🔄 Pressing “send again” on a package scanner instead of rebuilding the shipping system.'
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
