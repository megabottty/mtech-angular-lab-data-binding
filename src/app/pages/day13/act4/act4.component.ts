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
          <li><strong>Why It Matters:</strong> Real detail pages do not already have every record sitting in memory. They fetch by id, wait honestly, and handle third-party content carefully.</li>
          <li><strong>Build Steps:</strong> Replace the old <code>computed()</code> lookup with <code>ngOnInit()</code> + <code>subscribe()</code> → use <code>[innerHTML]</code> for TVMaze summaries → prep for the practical classroom/debugging pitfalls that show up in live demos.</li>
          <li><strong>Expected Outcome:</strong> You can explain why HTTP breaks the old synchronous lookup pattern, load a single show from the service with visible loading state, and safely render API-provided HTML.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 4 (Detail page goes live)</p>
        <p><strong>Next step:</strong> Student Lab — apply the same HTTP timing ideas yourself.</p>
      </section>

      <app-lesson-step stepId="d13-act4-detail-live" [stepNumber]="1" title="ShowDetail Switches to Real HTTP">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>On Day 9, <code>ShowDetail</code> could stay beautifully declarative because <code>this.showsSvc.byId(Number(this.id()))</code> returned a plain value immediately from an in-memory array. That meant <code>computed()</code> could synchronously derive the answer every time the route-param signal changed.</p>
        <p style="margin-top: 12px;">Today that contract changes. <code>byId()</code> now returns an <code>Observable&lt;Show&gt;</code>, which means the service is describing work whose answer arrives later; a <code>computed()</code> cannot synchronously grab the future result of an HTTP request that has not finished yet.</p>
        <p style="margin-top: 12px;">So we drop down one level and do the honest imperative version: create writable signals for <code>show</code> and <code>loading</code>, kick off the request in <code>ngOnInit()</code>, and update those signals when the response lands. This is Day 6 paying off directly: <code>ngOnInit</code> is for kicking off loads. Also say out loud that this pattern is a little manual; Day 16 introduces cleaner fully reactive options with <code>resource()</code> and <code>toSignal</code>-style patterns, but today is not that day.</p>
        <app-code-block lang="typescript" [code]="showDetailLiveCode" />
        <div class="ask-class">Why can't <code>show</code> stay a <code>computed()</code> the way it was on Day 9, now that <code>byId()</code> returns an <code>Observable</code> instead of a plain value?</div>
        <div class="info-box">
          <strong>Listen for the timing answer:</strong> <code>computed()</code> can only derive from values available right now. An HTTP Observable describes a future response, so we need to start the load and then react when that response eventually arrives.
        </div>
        <app-collapsible icon="💡" label="Hint — The route param part did not change">
          <p>The <code>id</code> is still the required string input from Day 9, supplied by <code>withComponentInputBinding()</code>. Routing, the URL shape, and param binding all stay the same today; only the way the actual show data is fetched changes.</p>
        </app-collapsible>
        <app-collapsible icon="🧩" label="Deep Dive — Why is ngOnInit the right home for this today?">
          <p>Because this component now has a side effect to start: it must kick off a network request after Angular has created the instance and wired its inputs. That is exactly the practical classroom definition of <code>ngOnInit()</code> you learned on Day 6.</p>
          <p style="margin-top: 12px;">Later, Angular's newer reactive resource patterns let us express this with less manual subscription code. For now, the explicit version is pedagogically useful because students can see the request start, the response arrive, and the loading flag flip.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can convert a synchronous <code>computed()</code>-based lookup into an <code>ngOnInit()</code> + <code>subscribe()</code> HTTP-driven load with loading state.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d13-act4-innerhtml" [stepNumber]="2" title="Rendering Real Summaries Safely — [innerHTML]">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>TVMaze's <code>summary</code> field is not plain text. Back in Act 2, our <code>TvMazeShow</code> interface deliberately warned us with the comment <code>summary: string | null;   // contains HTML!</code>, which means records may come back looking like <code>&lt;p&gt;A guy...&lt;/p&gt;</code> instead of a bare sentence.</p>
        <p style="margin-top: 12px;">If you want that markup to render as actual paragraphs instead of displaying literal angle brackets, bind it with <code>[innerHTML]</code>:</p>
        <app-code-block lang="html" [code]="summaryInnerHtmlCode" />
        <div class="ask-class">If we used plain interpolation instead of <code>[innerHTML]</code>, what would the browser do with those HTML tags?</div>
        <div class="info-box">
          <strong>Why Angular allows this safely:</strong> Angular automatically sanitizes <code>[innerHTML]</code> content and strips dangerous things like <code>&lt;script&gt;</code> tags so untrusted HTML cannot run XSS code in your users' browsers.
        </div>
        <div class="info-box">
          <strong>Rare escape hatch:</strong> if Angular ever strips markup you truly need, <code>DomSanitizer</code> with <code>bypassSecurityTrustHtml</code> is the deliberate override. That is rare, intentional, and not needed here.
        </div>
        <app-collapsible icon="💡" label="Hint — The rare escape hatch has a name">
          <p>If Angular's automatic sanitization ever strips markup you genuinely need, the deliberate escape hatch is <code>DomSanitizer</code> with methods like <code>bypassSecurityTrustHtml</code>. That is a rare, intentional decision — and it is not needed for TVMaze summaries here.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can safely render third-party HTML content and explain in one sentence why Angular sanitizes it automatically.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d13-act4-pitfalls" [stepNumber]="3" title="Running This Live — Teacher/Classroom Pitfalls">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>This last section is intentionally teacher-facing. The code itself is manageable; the live-demo logistics are where the real surprises tend to show up, so name these pitfalls before they name themselves in front of the room.</p>

        <div class="warning-box">
          <strong>1) Missing <code>provideHttpClient()</code>:</strong> if that provider never made it into <code>app.config.ts</code>, Angular throws <code>No provider for HttpClient</code>. The nice part is that this runtime error basically tells students the fix in plain English, so recap Act 1 and have them trust the error message.
        </div>

        <div class="warning-box">
          <strong>2) CORS vs. school-network reality:</strong> TVMaze was chosen on purpose because it does <strong>not</strong> produce a CORS fight for this lesson. But a school firewall or wifi policy can still block outbound requests entirely, so keep a local JSON fixture ready and swap only the URL — the rest of the service shape and Observable flow stay identical.
        </div>
        <app-code-block lang="typescript" [code]="fixtureFallbackCode" />

        <div class="warning-box">
          <strong>3) Nested subscriptions are coming:</strong> by the end of today, and especially once tomorrow's episode-count lab task appears, many students will start writing <code>.subscribe()</code> inside another <code>.subscribe()</code>. Let that happen for now. Do not rush to “fix” it yet; Day 15 and Day 16's <code>switchMap</code> lesson lands much harder once they have personally felt the tangle first.
        </div>

        <div class="warning-box">
          <strong>4) Rate limits are a teachable moment:</strong> TVMaze allows roughly 20 requests per 10 seconds per IP address, so an entire classroom hammering live search can occasionally trip a <code>429</code> response. Frame that as a gift, not a disaster: real production APIs have real limits, and the same fixture fallback above covers you instantly if it happens mid-demo.
        </div>

        <div class="ask-class">If our whole class got rate-limited live right now, what would that teach us about designing real production apps that call third-party APIs?</div>
        <app-collapsible icon="🧩" label="Deep Dive — Why the fixture fallback is such a good emergency plan">
          <p>Because it preserves the exact same teaching shape: <code>HttpClient.get(...)</code> still returns an Observable, the adapter still runs, the component still subscribes, and the UI still goes through loading → response. You are only changing where the bytes come from, not the architecture students are practicing.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Student and teacher can list the four practical pitfalls above and have a fixture-fallback plan ready.</div>
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
