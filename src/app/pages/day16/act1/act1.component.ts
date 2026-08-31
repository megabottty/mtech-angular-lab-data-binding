import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day16-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 16 · Act 1 of 3</span>
        <h1>🏁 The Race Condition</h1>
        <p class="subtitle">Every keystroke fires a request. Requests don't always finish in the order they started. Today you meet the bug, and the operator that ends it for good.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 15's BingeBoard is fully working — a live ticker and top-rated list on Stats, and a <code>/</code> keyboard shortcut on Browse. If that isn't running yet, visit the <a routerLink="/day16/start">Day 16 Starting Point</a> first — it gets you a working copy in minutes.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> RxJS's
        <a href="https://rxjs.dev/api/operators/switchMap" target="_blank" rel="noopener"><code>switchMap</code></a>
        reference page.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Reproduce the classic search-as-you-type race condition live, name exactly what's wrong, and build the mental model for the operator that fixes it.</li>
          <li><strong>Why It Matters:</strong> Day 13 deliberately left live-as-you-type search unbuilt because of this exact bug — you were told "Day 15 introduces switchMap." This is that day. It's also a top-3 RxJS interview topic for a reason: almost every serious app has a search box, and almost every naive implementation of one has this bug hiding in it.</li>
          <li><strong>Build Steps:</strong> Wire the naive live-search version → throttle the network and watch it misbehave → build the switchMap mental model that explains exactly why.</li>
          <li><strong>Expected Outcome:</strong> You can reproduce the race condition on demand, explain in one sentence why it happens, and describe what switchMap does to a stream of keystrokes in marble-diagram terms.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (The Race Condition)</p>
        <p><strong>Next step:</strong> Act 2 (Building the Typeahead)</p>
        <p><strong>Time:</strong> About 25 minutes. The Slow 3G demo takes a few tries to reliably misbehave — that's expected, not a sign you're doing it wrong.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d16-act1-naive-search" [stepNumber]="1" title="Wiring the Naive Live-Search Version">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Day 13's Browse deliberately fires search only on Enter or a button click — the lesson at the time
          said "we are deliberately NOT wiring live-as-you-type search today." Today you wire it, on purpose,
          so you can watch it break.
        </p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> in your own Browse component, change the input binding from
          <code>(keyup.enter)</code> to <code>(input)</code>, so every keystroke fires a search:</p>

        <app-code-block lang="html" [code]="naiveLiveSearchHtmlCode" />

        <p style="margin-top: 12px;">
          Run it and type a show title. It works — results update as you type, which feels great on a fast
          connection with a small result set. That's exactly what makes this bug so easy to ship: it looks
          correct in the happy case.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Before reading on: what do you think happens to in-flight requests if you type faster than the network can respond?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — nothing happens to them, and that's the problem">
          <p>Nothing happens to them — each keystroke fires its own independent <code>HttpClient</code> request, and every single one of those requests runs to completion and updates <code>shows</code> whenever it personally finishes, with zero awareness that other requests exist. On a fast connection with a fast typist, you simply don't notice, because responses usually arrive in roughly the order they were sent. Step 2 makes the disorder visible on purpose.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Typing in the search box fires a new request on every keystroke, and results visibly update as you type — no Enter key or button click required anymore.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d16-act1-race-condition" [stepNumber]="2" title="Breaking It on Purpose — Meet the Race Condition">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Now make the network slow enough to see the problem. Open DevTools → Network tab → find the throttling
          dropdown (usually says "No throttling") → select <strong>Slow 3G</strong>. Then type a longer show
          title briskly — "severance" is a good choice because it types in distinct, meaningfully different prefixes:
          "s", "se", "sev", "seve", "sever"... — each one is its own valid, different search term.
        </p>

        <div class="warning-box">
          <strong>Watch the Network tab, not just the screen:</strong> you should see roughly one request fire per
          keystroke, several of them in flight simultaneously. Watch which one lands last, and what ends up on
          screen after they've all resolved.
        </div>

        <p style="margin-top: 12px;">
          Run this a few times. Eventually you'll catch it: the results on screen match "seve" or "sev" — a
          <em>shorter, earlier</em> term than what you actually finished typing. The response for your real
          query ("severance") arrived first and rendered correctly, and then a slower, stale response for an
          earlier partial term arrived <em>after</em> it and silently overwrote the correct results.
        </p>

        <div class="think-about-it">
          <p class="tai-q">In one precise sentence: why does a stale response overwrite fresher results? What does the code currently have no way of knowing?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — what the code can't tell">
          <p>Each <code>.subscribe()</code> callback unconditionally calls <code>this.shows.set(shows)</code> whenever its own request resolves, with no idea whether a <em>newer</em> request has since been fired and is still in flight. The code has no concept of "this response belongs to an outdated query — ignore it" — every response is treated as equally authoritative, so whichever network request happens to finish last wins the screen, regardless of which keystroke actually asked for it. This is precisely what a <strong>race condition</strong> means: correctness depends on the order two independent operations happen to finish in, and that order isn't guaranteed.</p>
        </app-collapsible>

        <div class="info-box">
          <strong>Say its name:</strong> this is a race condition — one of a small handful of bug categories worth being able to name precisely in a code review or an interview. "The UI shows results for a query the user no longer wants" is the symptom; "responses can resolve out of order and nothing cancels the stale ones" is the actual defect.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've personally watched stale, shorter-query results overwrite the results for what you actually finished typing, under Slow 3G throttling. You can state, in one sentence, why the current code has no way to prevent it.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d16-act1-switchmap-insight" [stepNumber]="3" title="The switchMap Insight">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Day 15 Act 3 ended with a promise: "tomorrow's entire act is dedicated to <code>switchMap</code> —
          the operator that transforms one stream into another and automatically cancels in-flight work when a
          new value arrives." This is that operator, and now you've felt exactly the problem it exists to solve.
        </p>

        <p style="margin-top: 12px;">
          Think of the keystroke stream as the <strong>outer</strong> stream, and each keystroke's search request
          as an <strong>inner</strong> stream that the outer stream produces. <code>switchMap</code>'s whole job:
          every time the outer stream emits a new value, <em>stop listening to the previous inner stream</em> and
          switch to a brand-new one. The old request's eventual response, if it ever arrives, is simply never
          looked at again — there's no subscriber left to receive it.
        </p>

        <app-code-block lang="typescript" [code]="switchMapMarbleCode" />

        <div class="think-about-it">
          <p class="tai-q">Does switchMap stop the abandoned HTTP request from actually happening on the network, or just stop your code from reacting to its response?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — it does both, and here's why">
          <p>Both, and the mechanism is worth understanding. <code>switchMap</code> unsubscribes from the previous inner Observable the instant a new outer value arrives. For an Observable created by Angular's <code>HttpClient</code>, unsubscribing isn't just "stop listening" — <code>HttpClient</code> wires that unsubscription to the browser's underlying request-cancellation mechanism, so the actual in-flight HTTP request is aborted. Open the Network tab during the Slow 3G test in Act 2 and you'll see abandoned requests marked as cancelled, not just ignored. This is a real efficiency win, not only a correctness one: you stop paying for network requests whose answers you were never going to use anyway.</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Deep Dive — why 'switch' and not 'cancel'?">
          <p>
            The name <code>switchMap</code> describes what happens to the <em>subscription</em>, not just the
            request: the operator switches which inner Observable it is currently subscribed to. Cancellation
            is a side effect of that switch for cancellable sources like HTTP calls — but the core guarantee
            <code>switchMap</code> makes is about attention, not networking: "I am now listening to the newest
            thing you gave me, and only the newest thing." That framing is why the same operator works
            identically whether the inner stream is an HTTP call, a WebSocket message, or anything else —
            it doesn't need to know or care what kind of thing it's switching between.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can draw (or narrate) the switchMap marble diagram above from memory — outer dots as keystrokes, inner arrows as requests, scissors cutting every inner arrow except the most recent one.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day15/lab" class="btn-secondary">← Day 15 Lab</a>
        <a routerLink="/day16/act2" class="btn-primary">Act 2: Building the Typeahead →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'race condition',
      plainEnglish: 'Correctness depends on which of two independent operations happens to finish first — and that order is not guaranteed.',
      analogy: '📬 Two letters mailed in order can still arrive out of order.'
    },
    {
      concept: 'outer stream vs. inner stream',
      plainEnglish: 'The keystrokes are the outer stream; each keystroke\'s own search request is an inner stream it produces.',
      analogy: '🎬 A movie (outer) that starts a brand-new trailer (inner) every time the scene changes.'
    },
    {
      concept: 'switchMap',
      plainEnglish: 'Every new outer value cancels the previous inner stream and switches attention to a new one.',
      analogy: '✂️ Cutting the old thread the instant you start tying a new one.'
    },
    {
      concept: 'cancellation',
      plainEnglish: 'Unsubscribing from an HttpClient Observable actually aborts the underlying network request, not just the callback.',
      analogy: '🚫 Calling off a courier mid-delivery instead of just refusing the package at the door.'
    }
  ];

  naiveLiveSearchHtmlCode = `<input
  #searchInput
  placeholder="Search all of television…"
  (input)="runSearch(searchInput.value)"
/>
<!-- Enter/click still work too, but every keystroke now fires its own request. -->`;

  switchMapMarbleCode = `// Keystrokes (outer stream) — each letter is a new value:
//
//  ──s────se───sev──seve──sever...────────────▶
//
// Each keystroke starts its own inner request stream.
// switchMap cancels every inner stream except the newest:
//
//  s:     └─req(s)──✂            (cancelled — 'se' arrived)
//  se:          └─req(se)──✂     (cancelled — 'sev' arrived)
//  sev:              └─req(sev)──✂          (cancelled — 'seve' arrived)
//  seve:                  └─req(seve)──✂    (cancelled — 'sever...' arrived)
//  sever...:                    └─req(sever...)──────────▶  (survives — nothing newer arrives)
//
// Only the LAST inner stream is ever allowed to reach your subscriber.
// Every earlier one is cancelled the moment a newer keystroke arrives.`;
}
