import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day7-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 7 · Act 2</span>
        <h1>🔗 Proving the Singleton</h1>
        <p class="subtitle">Two components that have never heard of each other, sharing live state through nothing but a service. No inputs, no outputs, no wiring — this five-second demo is the entire day.</p>
      </div>

      <div class="info-box">
        📚 <strong>Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/di/dependency-injection" target="_blank" rel="noopener">Injecting dependencies</a> —
        especially the section on where a provider lives and what that means for how many instances exist.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <p><strong>Learning Goal:</strong> Extract the nav bar into a <code>Header</code> component, inject the same service into it, and watch a badge update from an action taken somewhere else entirely.</p>
        <p><strong>Why It Matters:</strong> "Singleton" stops being a vocabulary word the moment you watch two unrelated components share one object. This is also the answer you will give in an interview.</p>
        <p><strong>Build Steps:</strong> Extract <code>Header</code> &rarr; inject the service into it &rarr; show a live count &rarr; prove there is only one instance &rarr; understand what would break it.</p>
        <p><strong>Expected Outcome:</strong> Clicking "Add to watchlist" on a card updates a counter in the header, with zero wiring between them.</p>
      </section>

      <div class="selfguided-panel">
        <p><strong>You are here:</strong> Day 7, Act 2 of 3.</p>
        <p><strong>Next step:</strong> Act 3 covers when <em>not</em> to reach for a service, and three bugs that break DI.</p>
        <p><strong>Time:</strong> about 35 minutes.</p>
      </div>

      <app-lesson-step stepNumber="1" stepId="d7-act2-extract-header" title="Extract the nav bar into a Header component">
        <p>
          Your <code>app.html</code> currently opens with a hardcoded nav bar. To prove that a service shares state between
          components, you first need a second component — so pull that bar out into one. This is a five-minute rep of Day 5's
          extraction skill.
        </p>
        <app-code-block lang="bash" [code]="generateCommand" />

        <p><strong>Before</strong> — markup sitting directly in <code>app.html</code>:</p>
        <app-code-block lang="html" file="src/app/app.html" variant="before" [code]="navBeforeCode" />

        <p><strong>After</strong> — one tag, and the markup moves into the new component:</p>
        <app-code-block lang="html" file="src/app/app.html" variant="after" [code]="navAfterCode" />

        <p>The component itself, for now with no service in sight:</p>
        <app-code-block lang="typescript" file="src/app/header/header.ts" [code]="headerPlainCode" />

        <p>
          Register it in <code>App</code>'s <code>imports</code> array alongside <code>Panel</code>, and move the
          <code>.app-nav</code> and <code>.brand</code> rules out of <code>app.css</code> and into <code>header.css</code>.
        </p>

        <div class="warning-box">
          Moving those CSS rules is not optional bookkeeping — it is Day 6's encapsulation lesson biting immediately. The
          <code>&lt;header class="app-nav"&gt;</code> element now lives inside <code>Header</code>'s template, so a
          <code>.app-nav</code> rule left behind in <code>app.css</code> can no longer reach it and your nav bar will lose its
          styling. Move the rules with the markup.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> The app looks exactly the same as before, but the nav bar is now its own component with its own stylesheet.</div>
      </app-lesson-step>

      <app-lesson-step stepNumber="2" stepId="d7-act2-badge" title="Inject the service and show a live badge">
        <p>
          Now the payoff. <code>Header</code> asks for the same <code>WatchlistService</code> that <code>App</code> asked for:
        </p>
        <app-code-block lang="typescript" file="src/app/header/header.ts" variant="after" [code]="headerServiceCode" />

        <p>
          Look at what is <em>not</em> there. <code>Header</code> has no <code>input()</code>. <code>App</code> passes it
          nothing. <code>App</code> does not even know the header displays a count. The two components have no relationship
          beyond both asking for the same type.
        </p>
        <p>
          Save, and click "Add to watchlist" on any card. <strong>The header badge updates instantly.</strong>
        </p>
        <p>
          Trace why, because every piece is something you already learned: the card emitted an output &rarr; <code>App</code>
          called <code>watchlistSvc.add()</code> &rarr; the service's <code>items</code> signal changed &rarr;
          <code>count</code> is a <code>computed()</code> reading that signal, so it recomputed &rarr; the header's template
          reads <code>count()</code>, so Angular re-rendered it. Signals plus one shared instance. Nothing else.
        </p>

        <div class="think-about-it">
          <p class="tai-q">
            The header renders <em>above</em> the cards and is not their parent — it is their sibling. With inputs and outputs
            only, how would you have gotten the count up there?
          </p>
        </div>

        <app-collapsible icon="✅" label="Show Answer — you would have gone through the parent">
          <p>
            You would have had to route it through <code>App</code>: <code>App</code> holds the count, passes it down as
            <code>[count]="watchlist().length"</code> to <code>Header</code>, and every card's add event has to reach
            <code>App</code> first. That works here only because both components happen to be <code>App</code>'s direct
            children.
          </p>
          <p>
            Now imagine the header is in a layout component, three levels above the router outlet the cards render inside. The
            input chain gets absurd, and every component in the middle has to carry data it does not use. The service version
            does not get harder as the tree gets deeper — that is the property that matters.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Adding and removing shows changes a number in the header, and you can point at every line involved and explain what it does.</div>
      </app-lesson-step>

      <app-lesson-step stepNumber="3" stepId="d7-act2-one-instance" title="Prove there really is only one instance">
        <p>
          "One shared instance" is easy to say and easy to half-believe. Prove it to yourself in ten seconds by giving the
          service a constructor that logs:
        </p>
        <app-code-block lang="typescript" file="src/app/services/watchlist.ts" [code]="proveCode" />
        <p>
          Refresh with the console open. You have two components injecting this service, but you see
          <strong>exactly one</strong> log line. Angular created the instance once — lazily, when the first component asked for
          it — and handed the same object to the second.
        </p>
        <p>
          Add a second temporary log inside <code>add()</code> printing <code>this.items().length</code>. Add shows and watch a
          single, continuous count. There is no second list anywhere. Delete both logs when you're convinced.
        </p>

        <app-collapsible icon="🔍" label="What providedIn: 'root' actually means">
          <p>
            Angular keeps a registry called an <strong>injector</strong> that maps a type to an instance.
            <code>providedIn: 'root'</code> registers your class with the application-wide root injector.
          </p>
          <p>
            When a component's field initializer runs <code>inject(WatchlistService)</code>, Angular checks that registry. No
            instance yet? Create one, store it, return it. Already there? Return the stored one. That is the entire mechanism —
            a lazily-populated map. "Singleton" is just the consequence.
          </p>
          <p>
            It is also <strong>tree-shakable</strong>: because the class declares where it belongs rather than being listed in
            some central module, a service nothing injects is dropped from your production bundle automatically.
          </p>
        </app-collapsible>

        <app-collapsible icon="🎯" label="So is a service ALWAYS a singleton?">
          <p>
            With <code>providedIn: 'root'</code>, yes — one per application. But "singleton" is a property of
            <em>where it was provided</em>, not of services in general.
          </p>
          <p>
            A class can also be listed in a component's own <code>providers: []</code> array, which gives that component — and
            each of its instances — a private copy. Eight cards would mean eight services. That is occasionally exactly what you
            want, and it is why the distinction has a name.
          </p>
          <p>
            You do not need it today. <code>root</code> covers the overwhelming majority of real usage, and reaching for
            component-level providers before you need them is a classic way to create the "why is my state empty?" bug you are
            about to see in Act 3.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You saw one constructor log for two injecting components, and you can define "singleton" without notes.</div>
      </app-lesson-step>

      <app-lesson-step stepNumber="4" stepId="d7-act2-inject-timing" title="The inject() timing rule, demonstrated">
        <p>
          One rule causes more Day 7 runtime errors than everything else combined, so meet it deliberately rather than by
          accident. Try this on purpose:
        </p>
        <app-code-block lang="typescript" variant="before" [code]="injectTooLateCode" />
        <p>Click the button and the console gives you:</p>
        <app-code-block lang="text" [code]="injectErrorCode" />
        <p><strong>The fix</strong> — inject at the top, use it in the handler:</p>
        <app-code-block lang="typescript" variant="after" [code]="injectFixedCode" />

        <p>
          The reason: <code>inject()</code> is not a normal function that looks things up on demand. It reads an ambient
          "who is being constructed right now?" context that Angular sets up while it builds your component and tears down the
          moment construction finishes. A click happens long after that, so there is no context to read.
        </p>
        <p>
          The habit that makes this a non-issue forever: <strong>inject at the top of the class, use it everywhere.</strong>
          Field initializers and the constructor body are inside the window. Everything else is not.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You triggered the NG0203 error on purpose, read it, and fixed it — so when it appears by accident later you will recognize it instantly.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day7/act1" class="btn-secondary">← Act 1</a>
        <a routerLink="/day7/act3" class="btn-primary">Act 3: Boundaries and Debug It →</a>
      </div>
    </div>
  `
})
export class Day7Act2Component {
  models: MentalModel[] = [
    {
      concept: 'Injector',
      plainEnglish: 'The registry Angular keeps that maps a type to the one instance of it.',
      analogy: 'A coat check. You hand over a ticket with a type on it and get back the same coat every time.'
    },
    {
      concept: "providedIn: 'root'",
      plainEnglish: 'Register this class app-wide, and only actually build it the first time somebody asks.',
      analogy: 'A restaurant that only brews the coffee once someone orders it - and then everyone shares the pot.'
    },
    {
      concept: 'Shared reactive state',
      plainEnglish: 'One signal inside a service, read by many components, so a change anywhere shows up everywhere.',
      analogy: 'A scoreboard. Whoever scores, everyone in the stadium sees the same number change.'
    },
    {
      concept: 'Injection context',
      plainEnglish: 'The short window while Angular is constructing your class, which is the only time inject() works.',
      analogy: 'Boarding a plane. You can bring luggage while boarding; you cannot go get more once the doors close.'
    }
  ];

  generateCommand = `ng g c header`;

  navBeforeCode = `<header class="app-nav">
  <span class="brand">📺 BingeBoard</span>
</header>

<main>
  <app-panel title="My watchlist">
    <!-- ...unchanged... -->`;

  navAfterCode = `<app-header />

<main>
  <app-panel title="My watchlist">
    <!-- ...unchanged... -->`;

  headerPlainCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: \`
    <header class="app-nav">
      <span class="brand">📺 BingeBoard</span>
    </header>
  \`,
  styleUrl: './header.css'
})
export class Header {}`;

  headerServiceCode = `import { Component, inject } from '@angular/core';
import { WatchlistService } from '../services/watchlist';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: \`
    <header class="app-nav">
      <span class="brand">📺 BingeBoard</span>
      <span class="watchlist-badge">My Watchlist ({{ count() }})</span>
    </header>
  \`,
  styleUrl: './header.css'
})
export class Header {
  // the exact same instance App is using
  count = inject(WatchlistService).count;
}`;

  proveCode = `@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private items = signal<Show[]>([]);

  constructor() {
    // temporary - delete once you have seen it
    console.log('WatchlistService constructed');
  }

  // ...rest unchanged
}`;

  injectTooLateCode = `export class Header {
  onClick() {
    // this throws - construction is long over by the time you click
    const svc = inject(WatchlistService);
    svc.remove(1);
  }
}`;

  injectErrorCode = `ERROR RuntimeError: NG0203: inject() must be called from an injection
context such as a constructor, a factory function, a field initializer,
or a function used with 'runInInjectionContext'.`;

  injectFixedCode = `export class Header {
  // inject at the top...
  private watchlistSvc = inject(WatchlistService);

  onClick() {
    // ...use it anywhere
    this.watchlistSvc.remove(1);
  }
}`;
}
