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

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 9's BingeBoard is working — a <code>ShowsService</code> serving a hardcoded array, a <code>Browse</code> component listing shows, and a <code>ShowDetail</code> component looking one up by <code>id</code>. Run <code>npm start</code> now and confirm Browse and Detail both still work. Everything below builds on top of that code; nothing here replaces it yet.
      </div>

      <app-mental-model-card [models]="models" />

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> Angular's own docs on
        <a href="https://angular.dev/guide/http/setup" target="_blank" rel="noopener">HttpClient setup</a>
        and <a href="https://angular.dev/guide/http/making-requests" target="_blank" rel="noopener">making requests</a>.
        You don't need them to finish today — everything you need is on this page — but official docs are
        where this information lives permanently, and reading them once now makes them far less intimidating
        the next time you need to look something up on the job.
      </div>

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Understand the request/response timeline from your app's point of view, wire Angular's HTTP client into the app the modern standalone way, and adopt a working (deliberately simplified) definition of an Observable.</li>
          <li><strong>Why It Matters:</strong> The moment data leaves this file and lives on a server, the UI has to handle waiting honestly instead of pretending values are instantly available. Almost every real-world app you'll ever build talks to a server — this is the day that stops being theoretical.</li>
          <li><strong>Build Steps:</strong> Compare Day 9's in-memory service to a real API call → add <code>provideHttpClient()</code> in <code>app.config.ts</code> → adopt a simple "arrives later" Observable mental model.</li>
          <li><strong>Expected Outcome:</strong> You can describe request → wait → response → render, add the missing provider, and explain why an HTTP request does not fire until something subscribes.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Request/Response Cycle &amp; HttpClient)</p>
        <p><strong>Next step:</strong> Act 2 (Typing the API &amp; the Adapter Pattern)</p>
        <p><strong>Time:</strong> About 20 minutes — mostly reading and one small config change. The typing-heavy work starts in Act 2.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d13-act1-problem" [stepNumber]="1" title="The Problem — Data Now Lives on a Server">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p><strong>Do this:</strong> open <code>https://api.tvmaze.com/search/shows?q=severance</code> in a browser tab right now.</p>

        <p style="margin-top: 12px;">What loaded is not a webpage. There is no title bar, no poster image, no "Add to Watchlist" button — just raw JSON, a block of text data with nothing rendering it yet:</p>

        <app-code-block lang="typescript" [code]="tvMazeJsonExample" />

        <p style="margin-top: 12px;">
          This is worth sitting with for a second, because it is the entire premise of the next four days: <strong>a
          server does not know or care how to draw a screen.</strong> It only knows how to answer a question with
          data. Every app you have ever used — a banking app, a weather app, a chat app — is built on exactly this
          split. Some computer far away holds the data; your device asks for it, waits, and then draws something
          with whatever comes back. This is not an Angular idea. It is how the entire networked world works, and
          Angular's <code>HttpClient</code> is just a convenient, typed way to do it from inside your app.
        </p>

        <p style="margin-top: 12px;">
          Up through Day 9, BingeBoard never had to deal with this split. The show list already lived in memory,
          right there in <code>ShowsService</code>, as a hardcoded array. The component asked for it and got it —
          instantly, in the same tick of code — because nothing ever had to travel anywhere. The screen rendered as
          if the data had always simply existed.
        </p>

        <p style="margin-top: 12px;">
          A real API breaks that illusion. Sometimes the response comes back in 50 milliseconds; sometimes the
          network stalls for several seconds; sometimes it never comes back at all. That delay — the gap between
          asking and knowing — is the whole new problem today introduces, and it is the reason a fetch-based UI
          needs more moving parts than a hardcoded one: it must show something honest <em>during</em> the gap, and
          be ready to admit failure if the gap never closes (that part is tomorrow's job). Today is about surviving
          the gap when things go right.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Sketch on paper: what has to happen between "user opens Browse" and "cards appear" when the data lives on a server, not in this file?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the four stages, and why the middle one is new">
          <p>
            The browser sends an HTTP GET request to the API server, then waits while the network delivers a
            response. Once the JSON arrives, your code parses it, passes it through an adapter (Act 2's job) to
            produce <code>Show</code> objects your templates already understand, and only then can the template
            render the cards.
          </p>
          <p style="margin-top: 12px;">
            Four stages, in order: <strong>request sent → time passes → response arrives → UI renders.</strong>
            Every one of those except "time passes" already existed in Day 9's version, just instantly and
            invisibly. The waiting gap in the middle is the only genuinely new thing — and it is the reason a
            loading state stops being optional decoration and becomes a correctness requirement. An app that
            skips it isn't simpler; it's lying about what state it's actually in.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You opened the TVMaze URL directly and saw raw JSON with no UI attached to it. You can list, from memory, the four stages between "user searches" and "cards appear," and say in your own words why the middle stage (waiting) is the one that changes everything.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d13-act1-httpclient" [stepNumber]="2" title="Wiring Up HttpClient">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Angular does not let a service start making HTTP requests just by importing something — the ability to
          talk to the network is a capability you have to switch on, once, for the whole app. That is a deliberate
          design choice: Angular wants one place where every network-related setting (later: interceptors, base
          URLs, auth headers) can live, instead of every component quietly configuring its own HTTP client.
        </p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> open <code>src/app/app.config.ts</code> and add <code>provideHttpClient()</code> to the <code>providers</code> array:</p>

        <app-code-block lang="typescript" [code]="httpClientProviderCode" />

        <p style="margin-top: 12px;">
          Notice exactly where the new line goes: inside the same <code>providers</code> array as the
          <code>provideRouter(...)</code> call you added on Day 9. This matters — this is app-wide plumbing,
          registered once at startup, not a per-component setting you'd add to an individual <code>@Component</code>.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why does this line live in <code>app.config.ts</code> instead of, say, inside <code>ShowsService</code> itself?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — why providers live at the root">
          <p>
            <code>app.config.ts</code> is where Angular's dependency injection system gets told, once, how to build
            things that many different parts of the app will need. <code>provideHttpClient()</code> registers an
            <code>HttpClient</code> instance with the app's root injector, so <em>any</em> service — today's
            <code>ShowsService</code>, or any future service you write — can simply <code>inject(HttpClient)</code>
            and get a working instance, with zero setup of its own. If every service had to configure its own HTTP
            client, you'd have ten different copies of the same plumbing scattered across the app, each one a
            separate thing that could be misconfigured.
          </p>
        </app-collapsible>

        <div class="warning-box">
          <strong>The error you'll see if you forget this:</strong> <code>NullInjectorError: No provider for HttpClient!</code>
          It's one of the more helpful runtime errors Angular throws — it names the exact missing piece. If you
          ever see it later in this course (or on the job), your first move is always the same: check
          <code>app.config.ts</code> for the matching <code>provide...()</code> call.
        </div>

        <app-collapsible icon="💡" label="Hint — exactly where in the array?">
          <p>Anywhere inside the <code>providers: [ ]</code> array works — order between providers doesn't matter here. Put it right next to <code>provideRouter(routes, withComponentInputBinding())</code> so the two pieces of app-wide setup stay visually grouped.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>app.config.ts</code> now includes <code>provideHttpClient()</code>. The app still looks and behaves exactly like it did before you added it — that's expected, since nothing calls <code>HttpClient</code> yet. You're installing a capability that Act 2 is about to use. (If you want to see the error above for real, you can temporarily delete the line once Act 2's service is written, reload, and watch it appear — then put the line back.)</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d13-act1-observable-model" [stepNumber]="3" title="The Working Mental Model — “A Value That Arrives Later”">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Every method on <code>HttpClient</code> — <code>get</code>, <code>post</code>, and the rest — returns
          something called an <code>Observable</code>, not the data itself. You will hear a lot more about
          Observables starting on Day 15, where the topic gets a full day of its own. For today, one deliberately
          simplified working definition is enough to build with honestly:
        </p>

        <div class="info-box">
          <strong>Today's working definition:</strong> an <code>Observable</code> is <em>a value that will arrive
          later</em> — not a value you already have in hand. Nothing more, for now.
        </div>

        <p style="margin-top: 12px;">
          That single idea changes how the code reads compared to Day 9. With the hardcoded array, you asked for
          data and got it in the very same line. With an Observable, you first <em>describe</em> the request you
          want made, and separately tell Angular what should happen <em>once</em> a response eventually shows up.
          Those are two different moments in time, and the code below makes that split visible:
        </p>

        <app-code-block lang="typescript" [code]="httpGetSubscribeCode" />

        <p style="margin-top: 12px;">
          Read it in two halves. <strong>Line 1</strong> — <code>this.http.get(...)</code> — only builds a
          description of a GET request; nothing about "severance" has left your browser yet. <strong>Line 2</strong>
          — <code>.subscribe(results =&gt; ...)</code> — is the moment you say "and when that response actually
          shows up, run this callback with it." Only <em>that</em> call is what actually sends the request over the
          network. This snippet is scratch code to build the mental model with — you don't need to paste it
          anywhere yet; Act 2 rebuilds <code>ShowsService</code> for real.
        </p>

        <div class="think-about-it">
          <p class="tai-q">If you deleted the <code>.subscribe(...)</code> call from that snippet entirely, what would the browser's Network tab show?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — why nothing happens without subscribe">
          <p>
            Nothing. The Network tab would stay completely empty. Calling <code>http.get(...)</code> only creates an
            Observable — a <em>lazy description</em> of a request, not the request itself. Nothing is sent over the
            network until something subscribes to that Observable. This is what "lazy" means in the RxJS world, and
            it's the single most important habit to build today: seeing <code>http.get(...)</code> on its own, with
            no <code>.subscribe()</code> anywhere nearby, should make you suspicious that a request is missing.
          </p>
        </app-collapsible>

        <div class="warning-box">
          Contrast this with the browser's built-in <code>fetch(...)</code>, which you may have used before Angular:
          <code>fetch(url)</code> fires the request the instant you call it — it's eager, like Day 9's array. An
          Angular <code>Observable</code> is the opposite: nothing happens until <code>.subscribe()</code>. That
          single difference trips up almost every developer who is new to RxJS at least once, so it's worth
          getting used to on purpose today.
        </div>

        <app-collapsible icon="🧩" label="Deep Dive — why keep Observables this shallow for now?">
          <p>
            This is a deliberate teaching choice, not an accident. An <code>Observable</code> can do far more than
            deliver one value once — it can represent a stream of many values over time, be transformed with
            operators, be combined with other streams, and be cancelled midway. All of that machinery is real and
            useful, and it gets its own dedicated day: <strong>Day 15</strong> opens the box fully and explains
            what's actually going on underneath <code>.subscribe()</code> and the <code>.pipe(map(...))</code> call
            you'll write in Act 2.
          </p>
          <p style="margin-top: 12px;">
            The reason for holding that back today isn't that it's unimportant — it's that "a value that arrives
            later" is exactly enough truth to write correct, working HTTP code with, and piling on operator theory
            before you've even made one real network call would slow down the thing that matters most right now:
            getting comfortable with the request/response gap itself. You're not being told a lie; you're being
            told a smaller, true story on purpose, with the rest promised for later — and it does arrive.
          </p>
          <p style="margin-top: 12px;">
            You may also see older Angular tutorials import <code>HttpClientModule</code> through an
            <code>NgModule</code> instead of calling <code>provideHttpClient()</code>. That's the pre-standalone
            pattern from before Angular's modern standalone APIs; <code>provideHttpClient()</code> is the version
            you should expect to write, and see, in current codebases.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can state today's working definition of an Observable ("a value that arrives later") from memory, explain why an HTTP request does not fire until something subscribes, and name the day (Day 15) where the fuller picture arrives.</div>
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
]
// No HTML, no CSS, no "Add to Watchlist" button — just data.
// Rendering it is entirely your app's job, not the server's.`;

  httpClientProviderCode = `import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient()   // <-- new: turns on real network requests, app-wide
  ]
};`;

  httpGetSubscribeCode = `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ShowsService {
  private http = inject(HttpClient);

  loadSeverance() {
    // Line 1: describes a GET request. Nothing has been sent yet.
    const request$ = this.http.get('https://api.tvmaze.com/search/shows?q=severance');

    // Line 2: THIS is what actually sends it over the network.
    request$.subscribe(results => {
      console.log('Response arrived:', results);
    });
  }
}`;
}
