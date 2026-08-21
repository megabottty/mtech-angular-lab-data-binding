import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day9-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 9 · Act 1 of 4</span>
        <h1>🔗 Route Parameters &amp; Component Input Binding</h1>
        <p class="subtitle">Every show needs its own page. We write ONE route with a parameter, not one route per show.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <div class="info-box">
        <strong>Warm-up drill (6 min, no notes):</strong> add <code>/stats</code> as a page with a placeholder, route, and nav link. Keep it — it becomes today's guard and lazy-loading example in Acts 3 and 4.
      </div>

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Build one reusable detail-page route that reads a show id from the URL and reacts automatically when the URL changes.</li>
          <li><strong>Why It Matters:</strong> Real apps do not hardcode separate routes for every record. They use route parameters so one component can show many different items.</li>
          <li><strong>Build Steps:</strong> Move show data into a shared service → add a <code>show/:id</code> route → bind the param into the detail component → debug the two common mistakes.</li>
          <li><strong>Expected Outcome:</strong> You can explain the full chain from URL → route param → input signal → computed lookup → rendered detail page.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Route Params)</p>
        <p><strong>Next step:</strong> Act 2 (Programmatic Navigation)</p>
      </section>

      <app-lesson-step stepId="d9-act1-service" [stepNumber]="1" title="The Problem — One Route Per Show Doesn't Scale (and the ShowsService refactor)">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Hardcoding <code>/show/1</code>, <code>/show/2</code>, and so on sounds fine until the list grows. The detail page shape stays the same; only the id changes.</p>
        <div class="think-about-it">
          <p class="tai-q">If we have 100 shows, do we write 100 routes?</p>
          <p class="tai-a">No. You define one parameterized route like <code>/show/:id</code> and Angular matches any URL that fits that shape — <code>/show/1</code>, <code>/show/42</code>, and <code>/show/99</code> all hit the same route. The <code>:id</code> segment is a placeholder the router extracts and passes to the component, so one route definition handles the entire catalog regardless of its size.</p>
        </div>
        <p style="margin-top: 12px;">Before routing can look up a show by id, both <code>Browse</code> and <code>ShowDetail</code> need access to the same data. So the first move is a tiny refactor: lift the hardcoded array into a root service.</p>
        <app-code-block lang="typescript" [code]="showsServiceCode" />
        <p style="margin-top: 12px;">Now <code>Browse</code> becomes thinner. It injects the service and reads the shared signal instead of owning the array itself.</p>
        <app-code-block lang="typescript" [code]="browseRefactorCode" />
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain why shared route-driven pages need shared data, not duplicated arrays inside page components.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d9-act1-route-param" [stepNumber]="2" title="The Route — :id and withComponentInputBinding()">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Now we define one detail-page route with a parameter placeholder. Angular will match <code>/show/1</code>, <code>/show/2</code>, or <code>/show/99</code> with the same route definition.</p>
        <app-code-block lang="typescript" [code]="routeDefinitionCode" />
        <p style="margin-top: 12px;">Then we enable component input binding once in the app config.</p>
        <app-code-block lang="typescript" [code]="appConfigCode" />
        <div class="info-box">
          <strong>Why this line matters:</strong> <code>withComponentInputBinding()</code> is what lets route params arrive as plain input-style signals on the component. No <code>ActivatedRoute</code> subscription ceremony needed.
        </div>
        <app-collapsible icon="💡" label="Hint — What if I forget withComponentInputBinding()?">
          <p>The route still matches, but your required <code>id</code> input never gets populated. Students usually see a vague runtime error about a required input being missing — which is exactly the first bug we debug together in Step 4.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can point to the route param and the router configuration line that makes it flow into the component.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d9-act1-detail-page" [stepNumber]="3" title="The Detail Page — input(), computed(), and &#64;if...as">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p>The detail page treats the route param like an input signal. From there, everything else is derived reactively.</p>
        <app-code-block lang="typescript" [code]="showDetailTsCode" />
        <p style="margin-top: 12px;">The template reads that computed signal once, aliases it, and cleanly handles the not-found case.</p>
        <app-code-block lang="html" [code]="showDetailHtmlCode" />
        <p style="margin-top: 12px;">The <code>as s</code> alias is immediately useful: it avoids repeating <code>show()</code> all over the block and handles the null case once at the top.</p>
        <p style="margin-top: 12px;">Cards link into that route with the array form of <code>routerLink</code>:</p>
        <app-code-block lang="html" [code]="showCardLinkCode" />
        <app-collapsible icon="🧩" label="Deep Dive — Why use the array form of routerLink?">
          <p><code>[routerLink]="['/show', show().id]"</code> builds the URL from safe path segments. It composes cleanly, avoids manual slash bugs, and scales better than string-building code like <code>'/show/' + show().id</code>.</p>
        </app-collapsible>
        <app-collapsible icon="💡" label="Hint — Start with the route param as a required string input">
          <p>Write the route param first: <code>id = input.required&lt;string&gt;();</code> Then build everything else from it. Remember that route params are always strings, so convert before numeric lookup.</p>
        </app-collapsible>
        <app-collapsible icon="✅" label="Show Answer — Full computed() + template pattern">
          <h4>TypeScript</h4>
          <app-code-block lang="typescript" [code]="showDetailTsCode" />
          <h4 style="margin-top: 16px;">Template</h4>
          <app-code-block lang="html" [code]="showDetailHtmlCode" />
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Change the id in the address bar by hand — the page reacts with no lifecycle hooks and no subscriptions. Why?</p>
          <p class="tai-a">Because <code>withComponentInputBinding()</code> wires the route param directly into the <code>id = input.required&lt;string&gt;()</code> signal. When the URL changes, Angular updates that input signal, which automatically reruns the <code>computed()</code> that looks up the show, which triggers a template re-render. The entire chain is reactive — no manual subscription or <code>ngOnChanges</code> needed.</p>
        </div>
        <div class="info-box">
          <strong>Answer to listen for:</strong> the URL updates the <code>id</code> input signal, that reruns the <code>computed()</code> lookups, and the template re-renders. It is one fully reactive signal chain.
        </div>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can build a reactive detail page where the URL feeds an input signal, computed state, and a clean <code>&#64;if (...; as item)</code> template.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d9-act1-debug" [stepNumber]="4" title="Debug It — Two Bugs Everyone Meets Today">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>These two mistakes are perfect teaching bugs because they force students to read the runtime error and reason about string-vs-number lookups.</p>
        <h4>Buggy snippet A</h4>
        <app-code-block lang="typescript" [code]="buggyConfigCode" />
        <h4 style="margin-top: 16px;">Buggy snippet B</h4>
        <app-code-block lang="typescript" [code]="buggyLookupCode" />
        <app-collapsible icon="🧩" label="Bug 1 — The route matched, so why is id still missing?">
          <p>Without <code>withComponentInputBinding()</code>, the router never wires the param into the component input. The route activates, but <code>id = input.required&lt;string&gt;();</code> stays empty and Angular throws a required-input error at runtime.</p>
          <p>Read that error together as a class. It sounds vague at first, but it is pointing at the missing binding configuration.</p>
          <app-code-block lang="typescript" [code]="bindingFixCode" />
        </app-collapsible>
        <app-collapsible icon="✅" label="Bug 2 — Why does byId() quietly return undefined?">
          <p><code>this.id()</code> is the string <code>'2'</code>, not the number <code>2</code>. Inside <code>byId()</code>, the comparison is effectively <code>s.id === '2'</code>, and strict equality never matches a number to a string.</p>
          <p>The fix is tiny but essential: convert first, then look up.</p>
          <app-code-block lang="typescript" [code]="numericLookupFixCode" />
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Params are always strings. Why doesn't TypeScript catch this bug for us?</p>
          <p class="tai-a">Because <code>input.required&lt;string&gt;()</code> is correctly typed as a string — that's exactly what the router delivers. TypeScript sees no mismatch. The bug only appears at runtime when you compare that string to a numeric <code>id</code> field using strict equality (<code>===</code>), which silently returns <code>false</code> for every show. TypeScript can only catch type mismatches it can see statically; the numeric vs. string comparison happens in your own lookup logic at runtime.</p>
        </div>
        <div class="warning-box">This bug is a rite of passage — make sure everyone meets it today, in class, where it's cheap.</div>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain why route params must be converted before being used to look up numeric ids.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/" class="btn-secondary">← Home</a>
        <a routerLink="/day9/act2" class="btn-primary">Act 2: Programmatic Navigation →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: ':id',
      plainEnglish: 'A variable slot in the URL.',
      analogy: '📫 A mailbox label that changes which apartment gets the delivery.'
    },
    {
      concept: 'input()',
      plainEnglish: 'A reactive input value the router can fill in for you.',
      analogy: '🏷️ A name tag the router clips onto the component when it arrives.'
    },
    {
      concept: 'computed()',
      plainEnglish: 'Derived state that recalculates when its inputs change.',
      analogy: '🧮 A formula cell in a spreadsheet that updates itself.'
    },
    {
      concept: '@if (...; as s)',
      plainEnglish: 'Check once, then reuse a local alias inside the block.',
      analogy: '🪪 Show your badge once at the door, then move around freely inside.'
    }
  ];

  showsServiceCode = `import { Injectable, signal } from '@angular/core';
import { Show } from './show.model';

@Injectable({ providedIn: 'root' })
export class ShowsService {
  private shows = signal<Show[]>([
    { id: 1, title: 'The Bear', genre: 'Drama', rating: 8.6, posterUrl: 'assets/the-bear.jpg' },
    { id: 2, title: 'Bluey', genre: 'Family', rating: 9.4, posterUrl: 'assets/bluey.jpg' },
    { id: 3, title: 'Severance', genre: 'Sci-Fi', rating: 8.7, posterUrl: 'assets/severance.jpg' }
  ]);

  readonly all = this.shows.asReadonly();

  byId(id: number) {
    return this.shows().find(show => show.id === id);
  }
}`;

  browseRefactorCode = `import { Component, inject } from '@angular/core';
import { ShowCardComponent } from '../show-card/show-card.component';
import { ShowsService } from '../core/services/shows.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [ShowCardComponent],
  templateUrl: './browse.component.html'
})
export class Browse {
  private showsSvc = inject(ShowsService);
  shows = this.showsSvc.all;
}`;

  routeDefinitionCode = `export const routes = [
  { path: '', component: Browse, title: 'Browse · BingeBoard' },
  { path: 'show/:id', component: ShowDetail, title: 'Show · BingeBoard' },
  { path: 'stats', component: Stats, title: 'Stats · BingeBoard' },
  { path: 'watchlist', component: Watchlist, title: 'Watchlist · BingeBoard' }
];`;

  appConfigCode = `import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())]
};`;

  showDetailTsCode = `import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShowsService } from '../core/services/shows.service';
import { WatchlistService } from '../core/services/watchlist.service';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './show-detail.component.html'
})
export class ShowDetail {
  id = input.required<string>();

  private showsSvc = inject(ShowsService);
  private watchlistSvc = inject(WatchlistService);

  show = computed(() => this.showsSvc.byId(Number(this.id())));
  onList = computed(() => {
    const s = this.show();
    return s ? this.watchlistSvc.has(s.id) : false;
  });

  toggleWatchlist() {
    const s = this.show();
    if (!s) return;
    this.watchlistSvc.toggle(s.id);
  }
}`;

  showDetailHtmlCode = `@if (show(); as s) {
  <section class="detail-shell">
    <img
      class="detail-poster"
      [src]="s.posterUrl || 'assets/poster-placeholder.png'"
      [alt]="s.title"
    />

    <div class="detail-copy">
      <a routerLink="/" class="back-link">← Back to browse</a>
      <h1>{{ s.title }}</h1>
      <p>⭐ {{ s.rating }} · {{ s.genre }}</p>

      <button type="button" (click)="toggleWatchlist()">
        @if (onList()) {
          Remove from Watchlist
        } @else {
          Add to Watchlist
        }
      </button>
    </div>
  </section>
} @else {
  <p>Show not found.</p>
}`;

  showCardLinkCode = `<a [routerLink]="['/show', show().id]" class="poster-link">
  <img [src]="show().posterUrl" [alt]="show().title" />
</a>`;

  buggyConfigCode = `// app.config.ts
provideRouter(routes)   // ← bug 1: input binding not enabled`;

  buggyLookupCode = `show = computed(() => this.showsSvc.byId(this.id()));  // bug 2`;

  bindingFixCode = `// app.config.ts
provideRouter(routes, withComponentInputBinding())`;

  numericLookupFixCode = `show = computed(() => this.showsSvc.byId(Number(this.id())));`;
}
