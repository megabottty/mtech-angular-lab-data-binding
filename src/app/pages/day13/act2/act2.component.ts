import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day13-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 13 · Act 2 of 4</span>
        <h1>🧩 Typing the API &amp; the Adapter Pattern</h1>
        <p class="subtitle">The API's shape is never your app's shape — write the adapter once, use Show everywhere else.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/http/making-requests" target="_blank" rel="noopener">HTTP → Making requests</a> — the typed-response section explains the generic you add in Step 1.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Type the specific pieces of TVMaze we care about, adapt them into BingeBoard's <code>Show</code> shape, and move <code>ShowsService</code> from fake local data to real HTTP.</li>
          <li><strong>Why It Matters:</strong> Professional apps almost never consume third-party JSON directly. They define a boundary, normalize the data, and keep the rest of the app insulated from outside quirks. This exact pattern — sometimes called an "anti-corruption layer" — shows up in essentially every serious codebase that talks to an API it doesn't own.</li>
          <li><strong>Build Steps:</strong> Model TVMaze's search response → write <code>toShow()</code> to reconcile shapes → upgrade <code>ShowsService</code> to <code>HttpClient</code> → prove that nothing happens until <code>subscribe()</code>.</li>
          <li><strong>Expected Outcome:</strong> You can explain why adapters exist, write null-safe mappings with <code>??</code>/<code>?.</code>, and recognize that HTTP Observables stay lazy until subscribed.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Typing the API &amp; Adapter Pattern)</p>
        <p><strong>Next step:</strong> Act 3 (Browse goes live and we debug the first real HTTP bugs.)</p>
        <p><strong>Time:</strong> About 35–40 minutes. This is the most typing-heavy act of the day — new files, real code, no shortcuts.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d13-act2-typing" [stepNumber]="1" title="Modeling the API's Real Shape">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>TVMaze's search endpoint does not return a plain array of shows. It returns an array of wrapper objects, each shaped like <code>&#123; score, show: ... &#125;</code>, which means our first job is to model the real JSON honestly before we try to use it.</p>

        <p style="margin-top: 12px;">Notice the discipline here: we are <strong>not</strong> trying to model the entire API. We define only the fields BingeBoard actually reads today, and we deliberately ignore the rest of TVMaze's much larger payload. That is realistic, professional TypeScript — model what you consume, not an entire third-party universe you do not control. It also means this interface can survive TVMaze quietly adding new fields tomorrow; you'll simply keep ignoring them.</p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> create a new file, <code>tvmaze.model.ts</code>, next to wherever your <code>Show</code> model already lives, and add both interfaces:</p>

        <app-code-block lang="typescript" [code]="tvMazeModelCode" />

        <div class="think-about-it">
          <p class="tai-q">Try it yourself in a browser tab: https://api.tvmaze.com/shows/431 — what other fields does the real response have that we're choosing to ignore?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the fields we deliberately left out">
          <p>The real response includes fields like <code>url</code>, <code>type</code>, <code>language</code>, <code>status</code>, <code>officialSite</code>, <code>schedule</code>, <code>network</code>, <code>webChannel</code>, <code>dvdCountry</code>, <code>externals</code>, <code>updated</code>, and <code>_links</code>, among others. BingeBoard only needs <code>id</code>, <code>name</code>, <code>genres</code>, <code>rating</code>, <code>image</code>, <code>summary</code>, and <code>runtime</code> today, so we ignore everything else. Modeling only what you consume keeps your interface small and stable when the API adds new fields — a field you never named can never break your build.</p>
        </app-collapsible>

        <div class="info-box">
          <strong>Why this matters beyond today:</strong> a small, purposeful interface is easier to maintain, easier to read at a glance, and less fragile when the API team adds unrelated fields tomorrow. The opposite habit — copy-pasting an entire API response into one giant interface "just in case" — is a common beginner move that quietly makes every file that imports it harder to read.
        </div>

        <app-collapsible icon="💡" label="Hint — Minimal typing is not lazy typing">
          <p>If our page only reads <code>id</code>, <code>name</code>, <code>genres</code>, <code>rating</code>, <code>image</code>, <code>summary</code>, and <code>runtime</code>, those are the fields worth modeling right now. We can always extend the interface later when a new screen genuinely needs a new field.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>tvmaze.model.ts</code> exists with both interfaces, and it compiles with no errors. You can explain in one sentence why the interface only lists 7 fields when the real API returns dozens.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d13-act2-adapter" [stepNumber]="2" title="The Adapter — API Shape ≠ App Shape">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>Here's a pause worth taking seriously: TVMaze's shape is not BingeBoard's shape, and that is completely normal. Our app wants one clean <code>Show</code> model we can use everywhere in our own templates and services, so we translate from API-shape to app-shape exactly once, at the boundary where outside data enters our app.</p>

        <p style="margin-top: 12px;">
          This pattern has a name outside Angular too — it's often called an <strong>adapter</strong> or an
          <strong>anti-corruption layer</strong>: a single, deliberate seam where a foreign data shape gets
          converted into your own vocabulary, so the foreign shape's quirks never leak past that seam. You will
          meet this idea again in any serious codebase that talks to a database, a payment provider, or another
          team's API — the name changes, the idea doesn't.
        </p>

        <p style="margin-top: 12px;">This is also where Day 13 becomes a little disruptive in a good way. Day 9's local <code>Show</code> used names like <code>title</code> and <code>posterUrl</code>; after a real API integration, teams often standardize names such as <code>name</code> and <code>imageUrl</code>, and they add new fields like <code>summary</code> and <code>runtime</code>. That refactor is annoying for a day and worth it for months — you'll feel the annoyance yourself in today's lab.</p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> update (or confirm) your <code>Show</code> interface with the new field names:</p>

        <app-code-block lang="typescript" [code]="showInterfaceCode" />

        <p style="margin-top: 12px;">Then, in a new <code>show.adapter.ts</code> file, write the function that does the actual reconciliation work:</p>

        <app-code-block lang="typescript" [code]="toShowAdapterCode" />

        <div class="info-box">
          <strong>Nulls everywhere — welcome to real data.</strong> The chorus in this function is the lesson: <code>genres[0] ?? 'Unknown'</code> protects against an empty genres array, <code>rating.average ?? 0</code> protects against missing ratings, <code>image?.medium ?? 'assets/no-poster.png'</code> covers null images, and both <code>summary ?? ''</code> and <code>runtime ?? 0</code> defend against incomplete records. A hardcoded array (Day 9) never had holes in it; a real API always might.
        </div>

        <div class="think-about-it">
          <p class="tai-q">Why do we write an adapter function instead of just using <code>TvMazeShow</code> directly as our app's <code>Show</code> type everywhere?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — what the boundary actually buys you">
          <p>The adapter isolates the rest of your app from TVMaze's naming conventions, null rules, and future shape changes. If TVMaze renames <code>image.medium</code> tomorrow or changes how ratings are nested, only the <code>toShow()</code> function needs to change — every component and test that works with your app's <code>Show</code> type stays untouched. Without the adapter, a third-party API change would ripple through every file in the project that ever read a show's fields.</p>
          <p style="margin-top: 12px;">Put another way: without this seam, "TVMaze changed something" and "my app broke" would be the same sentence, in every single file that touches show data. With it, they're two separate sentences, and only one file needs to change.</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Deep Dive — Why image?.medium but not rating?.average?">
          <p><code>image</code> itself can be <code>null</code>, so we must use optional chaining before touching <code>medium</code>. By contrast, our type says <code>rating</code> is always an object; only <code>rating.average</code> can be <code>null</code>, so optional chaining is unnecessary there and <code>?? 0</code> is the right guard. Reading the interface carefully — which parts can be null, and at what nesting level — is exactly how you decide where <code>?.</code> is required versus where <code>??</code> alone is enough.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>show.adapter.ts</code> exports a working <code>toShow()</code> function. If you temporarily call it with a fake <code>TvMazeShow</code> that has a null <code>image</code> and an empty <code>genres</code> array, it should return a valid <code>Show</code> with no runtime error — proof the null-safe mapping actually works, not just that it compiles.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d13-act2-service" [stepNumber]="3" title="Upgrading ShowsService to Real HTTP">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>With our types and adapter in place, the service upgrade becomes surprisingly small — which is exactly the point of having done Steps 1 and 2 first. We keep the public idea of the service the same — it still knows how to search shows and fetch one show by id — but now those methods describe real HTTP work instead of synchronously reading from a local array.</p>

        <p style="margin-top: 12px;">This replaces Day 9's in-memory signal version entirely. The big breaking change is timing: <code>byId(id)</code> is still conceptually "get me the show," but now it returns an <code>Observable&lt;Show&gt;</code> instead of a synchronous <code>Show | undefined</code>, and that ripple hits <code>Browse</code> and <code>ShowDetail</code> in Acts 3 and 4.</p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> replace the entire contents of your <code>ShowsService</code> (the one that currently reads a hardcoded array) with:</p>

        <app-code-block lang="typescript" [code]="showsServiceHttpCode" />

        <p style="margin-top: 12px;">
          Read that <code>search()</code> method as two separate jobs stitched together. <code>this.http.get&lt;TvMazeSearchResult[]&gt;(...)</code>
          is Angular going out and getting the raw JSON — this is the HTTP job. <code>.pipe(map(results =&gt; results.map(r =&gt; toShow(r.show))))</code>
          is us reshaping that raw JSON into our own <code>Show</code> objects using the adapter you just wrote — this is the
          translation job. <code>.pipe(...)</code> is how you chain a transformation onto a stream without ever
          touching the actual HTTP response object: <strong>think "one clear step, applied to whatever comes back
          from the network, before it reaches the rest of the app."</strong> <code>map()</code> here does the exact
          same job it does on a plain array — it takes each item and turns it into something else — except this
          <code>map</code> works on values arriving from a network response instead of an array already sitting in
          memory. We are not teaching the whole RxJS operator story yet; Day 15 gives <code>pipe</code> and <code>map</code>
          their own proper spotlight, including several other operators that live alongside them.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Point to the two different jobs in this code: where is Angular doing HTTP work, and where are we reshaping third-party data into app data?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the two jobs, named">
          <p><code>this.http.get&lt;TvMazeSearchResult[]&gt;(url)</code> is Angular doing HTTP work — it sends the network request and emits the raw response. The <code>.pipe(map(results =&gt; results.map(r =&gt; toShow(r.show))))</code> is us reshaping third-party data — it transforms each raw <code>TvMazeSearchResult</code> into our clean <code>Show</code> model using the adapter. The pipe operator connects these two jobs into one stream without mixing their responsibilities: HTTP work stays HTTP work, and translation work stays translation work.</p>
        </app-collapsible>

        <app-collapsible icon="💡" label="Hint — Same method names, new async contract">
          <p>Notice how little the service's API surface changes. <code>search(query)</code> is still "search," and <code>byId(id)</code> is still "fetch one show" — but the return values are now lazy streams, not immediate objects, because the browser must wait for the network. Every caller of this service will need to change how it reads the result (that's Acts 3 and 4's job), even though the method names and intent stayed the same.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>ShowsService</code> compiles with real <code>HttpClient</code> calls. You haven't wired it into a component yet, so nothing visibly changes on screen — that's expected, and Step 4 gives you a way to prove it's working before Act 3 does.</div>
      </app-lesson-step>

      <!-- Step 4 -->
      <app-lesson-step stepId="d13-act2-subscribe-fires" [stepNumber]="4" title="Nothing Happens Until subscribe()">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>This is the critical mental model shift for HTTP in Angular, and Act 1 promised you'd get to prove it live — this is that moment. Calling <code>this.showsSvc.search('office')</code> by itself does <strong>nothing</strong>. It builds an Observable — basically a request description — but the browser does not actually fire the HTTP call until someone subscribes to that Observable.</p>

        <p style="margin-top: 12px;"><strong>Try this yourself, right now, before moving on:</strong> temporarily add a method to any component you can trigger from the UI (a button click is fine) that calls <code>search()</code> both ways, and watch the Network tab:</p>

        <app-code-block lang="typescript" [code]="subscribeProofCode" />

        <p style="margin-top: 12px;">Open DevTools → Network, filter by "tvmaze," and click the button. Call the first line alone and you'll see nothing land in the Network tab — no request, nothing. Add the <code>.subscribe(...)</code> version and click again: a real request appears immediately. Same method call, same service, same URL — the only difference is whether something subscribed.</p>

        <div class="think-about-it">
          <p class="tai-q">In one sentence: why does an Observable-returning method call alone never perform the side effect?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the one-sentence rule">
          <p>An Observable is lazy — calling <code>showsSvc.search('office')</code> only builds the recipe for the HTTP request; the browser does not actually send the request until something calls <code>.subscribe()</code> on the returned Observable.</p>
        </app-collapsible>

        <div class="warning-box">Hold onto this — it is exactly the bug you'll meet and fix in Act 3. If you remember only one trap from today, make it this one: seeing <code>http.get(...)</code> or a service method that wraps it, with no <code>.subscribe()</code> anywhere nearby, should immediately make you suspicious.</div>

        <app-collapsible icon="🧩" label="Deep Dive — why does this matter for more than just debugging?">
          <p>
            Laziness isn't just a quirk to watch out for — it's what makes Observables composable. Because
            <code>search('office')</code> only describes work rather than performing it, you can pass that
            description around, combine it with other Observables, add more <code>.pipe()</code> steps, or decide
            not to run it at all — all without side effects sneaking out early. If <code>http.get(...)</code> fired
            the instant you called it (the way <code>fetch()</code> does), you'd lose the ability to build up a
            request description safely before committing to it. Day 15 leans on exactly this property.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You watched the Network tab stay empty for the un-subscribed call and fire for the subscribed one, in your own running app. You can state, in one sentence, why an Observable-returning method call alone never performs a side effect. (Remove your temporary test button before Act 3 — <code>Browse</code> is about to get the real wiring.)</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day13/act1" class="btn-secondary">← Act 1: HttpClient &amp; the Mental Model</a>
        <a routerLink="/day13/act3" class="btn-primary">Act 3: Browse Goes Live →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'API model',
      plainEnglish: 'A TypeScript description of the JSON shape the server actually sends.',
      analogy: '📦 The shipping label on the package before you open it.'
    },
    {
      concept: 'adapter',
      plainEnglish: 'A function that converts outside data into the shape our app prefers.',
      analogy: '🔌 A travel adapter that makes one plug fit another socket.'
    },
    {
      concept: 'null-safe mapping',
      plainEnglish: 'Defensive field handling for incomplete or missing real-world data.',
      analogy: '🪖 A helmet you wear because the road is real, not ideal.'
    },
    {
      concept: 'Observable laziness',
      plainEnglish: 'The request is described first and only runs when something subscribes.',
      analogy: '📬 A sealed letter that is not mailed until someone drops it in the box.'
    }
  ];

  tvMazeModelCode = `export interface TvMazeShow {
  id: number;
  name: string;
  genres: string[];
  rating: { average: number | null };
  image: { medium: string; original: string } | null;
  summary: string | null;   // contains HTML!
  runtime: number | null;
}

export interface TvMazeSearchResult {
  score: number;
  show: TvMazeShow;
}`;

  showInterfaceCode = `export interface Show {
  id: number;
  name: string;
  genre: string;
  rating: number;
  imageUrl: string;
  summary: string;
  runtime: number;
}`;

  toShowAdapterCode = `import { Show } from './show.model';
import { TvMazeShow } from './tvmaze.model';

export function toShow(tv: TvMazeShow): Show {
  return {
    id: tv.id,
    name: tv.name,
    genre: tv.genres[0] ?? 'Unknown',
    rating: tv.rating.average ?? 0,
    imageUrl: tv.image?.medium ?? 'assets/no-poster.png',
    summary: tv.summary ?? '',
    runtime: tv.runtime ?? 0,
  };
}`;

  showsServiceHttpCode = `import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { TvMazeSearchResult, TvMazeShow } from './tvmaze.model';
import { toShow } from './show.adapter';

@Injectable({ providedIn: 'root' })
export class ShowsService {
  private http = inject(HttpClient);
  private readonly base = 'https://api.tvmaze.com';

  search(query: string) {
    return this.http
      .get<TvMazeSearchResult[]>(\`\${this.base}/search/shows\`, { params: { q: query } })
      .pipe(map(results => results.map(r => toShow(r.show))));
  }

  byId(id: number) {
    return this.http.get<TvMazeShow>(\`\${this.base}/shows/\${id}\`).pipe(map(toShow));
  }
}`;

  subscribeProofCode = `// Builds the Observable, but fires no request:
this.showsSvc.search('office');

// Actually performs the HTTP call — check the Network tab now:
this.showsSvc.search('office').subscribe(results => {
  console.log('Response arrived:', results);
});`;
}
