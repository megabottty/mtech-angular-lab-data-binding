import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day13-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 13 · Act 1 of 4</span>
        <h1>🌐 The Request/Response Cycle &amp; HttpClient</h1>
        <p class="subtitle">Every hardcoded array dies today — data now lives on a server, and fetching takes time.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Understand the request/response timeline and wire Angular's HTTP client into the app the modern standalone way.</li>
          <li><strong>Why It Matters:</strong> The moment data leaves this file and lives on a server, the UI has to handle waiting honestly instead of pretending values are instantly available.</li>
          <li><strong>Build Steps:</strong> Compare Day 9's in-memory service to a real API call → add <code>provideHttpClient()</code> in <code>app.config.ts</code> → adopt a simple “arrives later” Observable mental model.</li>
          <li><strong>Expected Outcome:</strong> You can describe request → wait → response → render, add the missing provider, and explain why an HTTP request does not fire until something subscribes.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Request/Response Cycle &amp; HttpClient)</p>
        <p><strong>Next step:</strong> Act 2 (Typing the API &amp; the Adapter Pattern)</p>
      </section>

      <app-lesson-step stepId="d13-act1-problem" [stepNumber]="1" title="The Problem — Data Now Lives on a Server">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Open <code>https://api.tvmaze.com/search/shows?q=severance</code> in a browser tab. What you see is not a webpage — it is raw JSON, data with no design, no buttons, and no cards attached yet.</p>
        <app-code-block lang="typescript" [code]="tvMazeJsonExample" />
        <p style="margin-top: 12px;">Up through Day 9, BingeBoard behaved synchronously because the show list already lived in memory inside the app. The service owned a hardcoded array, the component read it immediately, and the screen rendered as if the data had always been there.</p>
        <p style="margin-top: 12px;">A real API changes the timeline. Sometimes the response is fast; sometimes the network stalls for seconds. That delay is the whole new problem: the UI must show a loading state during the gap, admit that failure is possible if the response never arrives, and then render real content once it lands.</p>
        <div class="ask-class">Sketch on paper: what has to happen between “user opens Browse” and “cards appear” when the data lives on a server, not in this file?</div>
        <div class="info-box">
          <strong>Answer to listen for:</strong> a request goes out → time passes → a response arrives → we render. The new complication is not the request itself; it is the waiting in the middle.
        </div>
        <app-collapsible icon="✅" label="Show Answer — Why loading state suddenly becomes mandatory">
          <p>If the app pretends data is instant when it is not, users get a blank or misleading screen. A loading state is the honest version of “we asked, and we're waiting.” Tomorrow's error-handling work adds the second honest state: “we asked, but it never came back.”</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can describe the request/response timeline and explain why a loading state becomes mandatory the moment data lives on a server.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d13-act1-httpclient" [stepNumber]="2" title="Wiring Up HttpClient">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Angular does not let services start making HTTP requests by magic. First we turn on that capability once at app startup, using the standalone provider version of the HTTP client.</p>
        <app-code-block lang="typescript" [code]="httpClientProviderCode" />
        <p style="margin-top: 12px;">Notice where the new line goes: right beside the router provider you already added on Day 9. This is app-wide plumbing, not a per-component setting.</p>
        <div class="ask-class">Where should <code>provideHttpClient()</code> live so every service can inject <code>HttpClient</code> without repeating setup?</div>
        <div class="info-box">
          <strong>Most-forgotten line today:</strong> if you skip this, Angular throws <code>No provider for HttpClient</code> at runtime. The error is actually helpful — it names the missing dependency almost word for word.
        </div>
        <app-collapsible icon="💡" label="Hint — Where does provideHttpClient() go?">
          <p>Put it in <code>app.config.ts</code>, inside the root <code>providers</code> array, alongside <code>provideRouter(routes, withComponentInputBinding())</code>. Do <strong>not</strong> try to add it inside one component; HTTP is a cross-app service.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can add <code>provideHttpClient()</code> to the app config and explain that the missing-provider runtime error appears if you forget it.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d13-act1-observable-model" [stepNumber]="3" title="The Working Mental Model — “A Value That Arrives Later”">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Today's deliberately shallow rule is enough to move forward: <code>HttpClient</code> methods like <code>http.get(...)</code> return an <code>Observable</code>. For now, treat that as “a value that will arrive later, not a value I already have right now.”</p>
        <p style="margin-top: 12px;">That means today's code reads differently from Day 9's signal array. Instead of grabbing data immediately, we describe the request first and then tell Angular what to do once the response eventually shows up.</p>
        <app-code-block lang="typescript" [code]="httpGetSubscribeCode" />
        <div class="ask-class">If I remove <code>subscribe()</code> from this method, what should the Network tab show?</div>
        <div class="warning-box">Important: nothing happens when you only create the Observable with <code>http.get(...)</code>. The request is just described at that point. It does not actually fire until something subscribes.</div>
        <app-collapsible icon="🧩" label="Deep Dive — Why do older tutorials use HttpClientModule instead?">
          <p>Older Angular examples often import <code>HttpClientModule</code> through an NgModule. That is the pre-standalone pattern. In a modern standalone app, <code>provideHttpClient()</code> is the equivalent root-level setup and is the version you should expect to write in current codebases.</p>
          <p style="margin-top: 12px;">We are intentionally keeping the Observable story simple today. Days 15 and 16 open the box properly and explain more of the machinery underneath.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can state the working definition of an Observable as “a value that arrives later” and explain that an HTTP request will not fire until something subscribes.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/" class="btn-secondary">← Home</a>
        <a routerLink="/day13/act2" class="btn-primary">Act 2: Typing the API &amp; the Adapter Pattern →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'Observable',
      plainEnglish: 'A value that arrives later, not immediately.',
      analogy: '📦 A package that exists, but is still in transit.'
    },
    {
      concept: 'HttpClient.get()',
      plainEnglish: 'Describes a request; it does nothing until someone subscribes.',
      analogy: '✉️ A shipping form filled out but not yet sent.'
    },
    {
      concept: 'subscribe()',
      plainEnglish: 'Tells the courier what to do when the package arrives.',
      analogy: '🚪 Instructions taped to the door for the delivery.'
    },
    {
      concept: 'provideHttpClient()',
      plainEnglish: 'Turns on the app\'s ability to make real network requests.',
      analogy: '🔌 Plugging the app into the network outlet.'
    }
  ];

  tvMazeJsonExample = `[
  {
    score: 0.906,
    show: {
      id: 52677,
      name: 'Severance',
      genres: ['Drama', 'Science-Fiction'],
      image: {
        medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/...jpg'
      }
    }
  }
]`;

  httpClientProviderCode = `import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient()
  ]
};`;

  httpGetSubscribeCode = `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ShowsService {
  private http = inject(HttpClient);

  loadSeverance() {
    const request$ = this.http.get('https://api.tvmaze.com/search/shows?q=severance');

    request$.subscribe(results => {
      console.log('Response arrived:', results);
    });
  }
}`;
}
