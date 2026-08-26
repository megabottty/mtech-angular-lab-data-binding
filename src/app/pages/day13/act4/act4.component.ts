import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day13-act4',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 13 · Act 4 of 4</span>
        <h1>🎬 Detail Page Goes Live</h1>
        <p class="subtitle">From local lookup to a real network call — plus safely rendering someone else's HTML.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Convert Show Detail from a synchronous Day 9 lookup into a real HTTP-driven load, then render TVMaze's HTML summaries safely.</li>
          <li><strong>Why It Matters:</strong> Real detail pages do not already have every record sitting in memory. They fetch by id, wait honestly, and handle third-party content carefully — and this act closes out the "make it real" arc that started in Act 1.</li>
          <li><strong>Build Steps:</strong> Replace the old <code>computed()</code> lookup with <code>ngOnInit()</code> + <code>subscribe()</code> → use <code>[innerHTML]</code> for TVMaze summaries → build a troubleshooting checklist for the four things most likely to go wrong.</li>
          <li><strong>Expected Outcome:</strong> You can explain why HTTP breaks the old synchronous lookup pattern, load a single show from the service with visible loading state, and safely render API-provided HTML.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 4 (Detail page goes live)</p>
        <p><strong>Next step:</strong> Student Lab — apply the same HTTP timing ideas yourself.</p>
        <p><strong>Time:</strong> About 25–30 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d13-act4-detail-live" [stepNumber]="1" title="ShowDetail Switches to Real HTTP">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>On Day 9, <code>ShowDetail</code> could stay beautifully declarative because <code>this.showsSvc.byId(Number(this.id()))</code> returned a plain value immediately from an in-memory array. That meant <code>computed()</code> could synchronously derive the answer every time the route-param signal changed.</p>

        <p style="margin-top: 12px;">Today that contract changes. <code>byId()</code> now returns an <code>Observable&lt;Show&gt;</code>, which means the service is describing work whose answer arrives later; a <code>computed()</code> cannot synchronously grab the future result of an HTTP request that has not finished yet — there is no version of "compute this synchronously" that can wait for a network round-trip.</p>

        <p style="margin-top: 12px;">So we drop down one level and do the honest imperative version: create writable signals for <code>show</code> and <code>loading</code>, kick off the request in <code>ngOnInit()</code>, and update those signals when the response lands. This is Day 6 paying off directly — <code>ngOnInit</code> is exactly the hook meant for kicking off loads that happen once, right when the component starts. One honest heads-up: this pattern is a little manual, and it's supposed to feel that way. Day 14 introduces <code>httpResource</code>, a cleaner, fully reactive option that replaces this exact <code>ngOnInit</code> + <code>subscribe</code> pair with signals — but today is not that day, and seeing the manual version first is what will make tomorrow's shortcut actually land as a shortcut.</p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> replace your <code>ShowDetail</code> component's fields and lookup logic with:</p>

        <app-code-block lang="typescript" [code]="showDetailLiveCode" />

        <div class="think-about-it">
          <p class="tai-q">Why can't <code>show</code> stay a <code>computed()</code> the way it was on Day 9, now that <code>byId()</code> returns an <code>Observable</code> instead of a plain value?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — why computed() can't do this job anymore">
          <p><code>computed()</code> must return a value synchronously right now, by reading other signals. But <code>byId()</code> returns an <code>Observable&lt;Show&gt;</code> — a description of data that will arrive later over the network. There is no way for a <code>computed()</code> to "wait" for that future response. Instead, we use a writable signal initialized to <code>undefined</code> and update it inside the <code>.subscribe()</code> callback once the HTTP response actually lands.</p>
        </app-collapsible>

        <div class="info-box">
          <strong>The timing rule underneath this:</strong> <code>computed()</code> can only derive from values available right now. An HTTP Observable describes a future response, so we need to start the load and then react when that response eventually arrives. Any time you reach for <code>computed()</code> and it needs to "wait" for something, that's the signal you actually need a writable signal plus a subscription instead.
        </div>

        <app-collapsible icon="💡" label="Hint — The route param part did not change">
          <p>The <code>id</code> is still the required string input from Day 9, supplied by <code>withComponentInputBinding()</code>. Routing, the URL shape, and param binding all stay the same today; only the way the actual show data is fetched changes.</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Deep Dive — why ngOnInit, specifically?">
          <p>Because this component now has a side effect to start: it must kick off a network request after Angular has created the instance and wired its inputs. That is exactly the practical definition of <code>ngOnInit()</code> you learned on Day 6 — the hook for work that should happen once, right after setup, before the user sees anything.</p>
          <p style="margin-top: 12px;">The explicit version you're writing today is worth sitting with rather than rushing past, because it makes every moving part visible: you can see the request start, watch the response arrive, and see the loading flag flip, all in code you wrote yourself. Later, Angular's newer reactive resource patterns (Day 14) let you express this same idea with far less manual subscription bookkeeping — but that shortcut means much more once you've felt what it's shortcutting.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Navigate to a show's detail page. You should briefly see a loading state, then the real show data. Reload the page directly at that URL (not by clicking from Browse) to confirm the fetch-by-id works standalone. You can convert a synchronous <code>computed()</code>-based lookup into an <code>ngOnInit()</code> + <code>subscribe()</code> HTTP-driven load with loading state.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d13-act4-innerhtml" [stepNumber]="2" title="Rendering Real Summaries Safely — [innerHTML]">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>TVMaze's <code>summary</code> field is not plain text. Back in Act 2, our <code>TvMazeShow</code> interface deliberately warned us with the comment <code>summary: string | null;   // contains HTML!</code>, which means records may come back looking like <code>&lt;p&gt;A guy...&lt;/p&gt;</code> instead of a bare sentence.</p>

        <p style="margin-top: 12px;">If you want that markup to render as actual paragraphs instead of displaying literal angle brackets, bind it with <code>[innerHTML]</code> instead of ordinary interpolation:</p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> in your Show Detail template, find where the summary renders and change it to:</p>

        <app-code-block lang="html" [code]="summaryInnerHtmlCode" />

        <div class="think-about-it">
          <p class="tai-q">If we used plain interpolation instead of <code>[innerHTML]</code>, what would the browser do with those HTML tags?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — what interpolation would have done instead">
          <p>Angular's text interpolation (double-curly-brace syntax) escapes all HTML characters — angle brackets become <code>&amp;lt;</code> and <code>&amp;gt;</code> — so the raw tag text like <code>&lt;p&gt;A guy...&lt;/p&gt;</code> would be displayed as a literal string on screen instead of being parsed as markup. The user would see the HTML tags themselves rather than formatted paragraphs.</p>
        </app-collapsible>

        <div class="info-box">
          <strong>Why Angular allows this safely:</strong> Angular automatically sanitizes <code>[innerHTML]</code> content and strips dangerous things like <code>&lt;script&gt;</code> tags so untrusted HTML cannot run XSS (cross-site scripting) code in your users' browsers. This is worth understanding as more than an Angular quirk — it's the same reason every serious framework treats "HTML from somewhere else" as suspicious by default. TVMaze isn't malicious, but the sanitizer doesn't know that; it treats every <code>[innerHTML]</code> binding the same way, which is exactly what makes it trustworthy as a default.
        </div>

        <div class="info-box">
          <strong>Rare escape hatch:</strong> if Angular ever strips markup you truly need, <code>DomSanitizer</code> with <code>bypassSecurityTrustHtml</code> is the deliberate override — you're explicitly telling Angular "I've verified this content myself, skip the safety check." That should be rare and intentional, and it is not needed here.
        </div>

        <app-collapsible icon="🧩" label="Deep Dive — what exactly counts as dangerous?">
          <p>
            Angular's sanitizer strips things that can execute code or trigger unexpected browser behavior:
            <code>&lt;script&gt;</code> tags, inline event handlers like <code>onclick="..."</code>, and
            <code>javascript:</code> URLs in links or images, among others. Plain formatting tags —
            <code>&lt;p&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;a&gt;</code> with a
            normal <code>href</code> — pass through untouched. TVMaze's summaries only ever contain the harmless
            kind, which is why this feature works cleanly without you having to think about it further.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A show's summary now renders as formatted paragraphs, not literal <code>&lt;p&gt;</code> tags on screen. You can safely render third-party HTML content and explain in one sentence why Angular sanitizes it automatically.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d13-act4-pitfalls" [stepNumber]="3" title="When It Breaks — Your Troubleshooting Checklist">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>You've now built the full real-data path for both Browse and Detail. Before the lab, here are the four things most likely to actually go wrong when you're running this on your own machine — what you'll see, why it happens, and exactly what to do about it. Bookmark this step; you'll likely come back to it.</p>

        <div class="warning-box">
          <strong>1) You see "No provider for HttpClient":</strong> this means <code>provideHttpClient()</code> never made it into <code>app.config.ts</code> — go back and check Act 1, Step 2. The good news is this error basically hands you the fix in plain English; trust it.
        </div>

        <div class="warning-box">
          <strong>2) Every request fails and DevTools shows a CORS or network error:</strong> TVMaze was chosen specifically because it does <strong>not</strong> produce a CORS fight for this lesson, so this is uncommon. But a locked-down network — school wifi, a corporate VPN, a firewall — can still block outbound requests entirely. If that happens to you, swap to a local JSON fixture and keep everything else identical:
        </div>
        <app-code-block lang="typescript" [code]="fixtureFallbackCode" />
        <p style="margin-top: 4px;">Notice what stays the same: <code>HttpClient.get(...)</code> still returns an Observable, the adapter still runs, the component still subscribes, and the UI still goes through loading → response. Only the source of the bytes changed.</p>

        <div class="warning-box">
          <strong>3) You find yourself writing <code>.subscribe()</code> inside another <code>.subscribe()</code>:</strong> if today's lab has you loading episode data after a show loads, you'll likely nest one subscription inside another. Let it happen — it's fine for now, and it's supposed to feel slightly uncomfortable. Day 15 introduces <code>switchMap</code>, an operator built specifically to untangle exactly this shape, and it will make far more sense once you've personally felt the tangle it's solving.
        </div>

        <div class="warning-box">
          <strong>4) You see a <code>429</code> response and requests start failing:</strong> TVMaze allows roughly 20 requests per 10 seconds per IP address. If you (or a search-happy keyboard) hammer it quickly, you can trip that limit. This isn't a sign you did something wrong — it's your first real encounter with a production API's rate limit. Wait about ten seconds and try again; the same fixture fallback above also covers you instantly if it happens mid-lab.
        </div>

        <div class="think-about-it">
          <p class="tai-q">If you got rate-limited right now, what would that teach you about designing real production apps that call third-party APIs?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — what a rate limit is actually telling you">
          <p>It teaches you that real APIs enforce limits and that production apps must plan for them. Good design responses include caching results so repeated lookups don't cost extra requests, implementing exponential backoff and retry logic for <code>429</code> responses, debouncing user input so rapid keystrokes don't each fire a request, and keeping a local fixture or CDN-cached fallback so the app stays functional during API outages or quota exhaustion.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can recognize each of the four symptoms above, name its cause, and apply its fix without needing to look anything up next time it happens.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day13/act3" class="btn-secondary">← Act 3: Browse Goes Live</a>
        <a routerLink="/day13/lab" class="btn-primary">Student Lab: Your Turn →</a>
      </div>
    </div>
  `
})
export class Act4Component {
  models: MentalModel[] = [
    {
      concept: 'HTTP-driven detail page',
      plainEnglish: 'The record is fetched after the component starts, not pulled instantly from memory.',
      analogy: '📬 Looking up a package by tracking number and waiting for delivery.'
    },
    {
      concept: 'ngOnInit() for loads',
      plainEnglish: 'Use component startup to kick off work whose answer arrives later.',
      analogy: '🚦 Turning the ignition key before the car can start moving.'
    },
    {
      concept: '[innerHTML]',
      plainEnglish: 'Render trusted-enough markup as HTML instead of showing literal tags.',
      analogy: '🖼️ Hanging the finished poster instead of reading the printing instructions out loud.'
    },
    {
      concept: 'sanitization',
      plainEnglish: 'Angular cleans unsafe HTML before it reaches the page.',
      analogy: '🧼 A safety check that washes off dangerous chemicals before you touch the package.'
    }
  ];

  showDetailLiveCode = `export class ShowDetail {
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

  summaryInnerHtmlCode = `<div class="summary" [innerHTML]="show()!.summary"></div>`;

  fixtureFallbackCode = `// Same Observable shape, fully offline-safe fallback:
return this.http.get<TvMazeSearchResult[]>('assets/fixtures/search-office.json')
  .pipe(map(results => results.map(r => toShow(r.show))));`;
}
