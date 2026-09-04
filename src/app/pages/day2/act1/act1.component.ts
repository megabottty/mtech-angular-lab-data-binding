import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day2-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 2 · Act 1 of 3</span>
        <h1>📦 The Three Bindings</h1>
        <p class="subtitle">Data into the page, events out of the page — and the show card that starts BingeBoard.</p>
      </div>

      <div class="info-box">
        <strong>New project today:</strong> Day 1's <code>job-tracker</code> was for practicing the CLI and
        components — it's done its job. Today starts <strong>BingeBoard</strong>, the app you'll build for
        the rest of the course. Scaffold it the same way you scaffolded Job Tracker:
        <code>ng new bingeboard</code>, then <code>cd bingeboard &amp;&amp; ng serve</code>. Everything from
        here forward lives in this project.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/templates/binding" target="_blank" rel="noopener">Templates → Binding</a> — the property-binding section is exactly Step 2 below.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Bind data into an element with <code>[property]</code>, and understand why that's different from a plain HTML attribute.</li>
          <li><strong>Why It Matters:</strong> Interpolation only puts text on the page. Real elements need their properties — <code>src</code>, <code>disabled</code>, and dozens more — driven from data too.</li>
          <li><strong>Build Steps:</strong> Warm up with a cold-open component → name the three binding types → model show data → bind a poster image with <code>[src]</code>.</li>
          <li><strong>Expected Outcome:</strong> You can explain, and demonstrate, the difference between a literal HTML attribute and a property binding.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (The Three Bindings)</p>
        <p><strong>Next step:</strong> Act 2 (Reacting to Events)</p>
        <p><strong>Time:</strong> About 30 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d2-act1-warmup" [stepNumber]="1" title="Warm-Up — No Notes">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Before any explanation, try this cold: generate a new component called <code>show-card</code>, put
          an <code>&lt;h3&gt;</code> with an interpolated show title in it, and render it under your header.
        </p>

        <app-code-block lang="bash" [code]="generateCommand" />

        <p style="margin-top: 12px;">
          This is yesterday's entire lesson in one rep — generate, template, interpolate, import, use.
          Everything this week builds on it. If any part of that felt shaky, that's useful information: go
          back to Day 1's Act 2 before continuing.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A <code>ShowCard</code> component renders on the page with at least one interpolated property, imported the same way <code>Header</code> was on Day 1.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d2-act1-three-bindings" [stepNumber]="2" title="The Problem — Interpolation Isn't Enough">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Interpolation puts text on the page. But real UIs need more: an <code>&lt;img&gt;</code> needs its
          <code>src</code> set from data, a button needs to be <code>disabled</code> from data, and clicks
          need to <em>do</em> something. In old-school JS you'd query the DOM and mutate it by hand.
          Angular's deal: describe the relationship once in the template, and Angular maintains it.
        </p>

        <p style="margin-top: 12px;">Three binding types, one page at a time:</p>
        <ul>
          <li><code>{{ "{{ value }}" }}</code> — text into the page</li>
          <li><code>[property]="value"</code> — data into an element property (square brackets = <strong>into</strong> the DOM)</li>
          <li><code>(event)="handler()"</code> — DOM events into your class (parentheses = <strong>out of</strong> the DOM)</li>
        </ul>

        <div class="info-box">
          <strong>Memory hook:</strong> <code>[box]</code> receives, <code>(banana)</code> reacts.
        </div>

        <div class="think-about-it">
          <p class="tai-q">Interpolation and property binding both move data toward the template. Why do we need both — why isn't <code>{{ "{{ }}" }}</code> enough for everything?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — text nodes vs. element properties">
          <p>
            Interpolation only ever produces text inside an element — it can't set an attribute like
            <code>src</code> or a boolean property like <code>disabled</code>. Property binding targets a
            specific property on the element or component itself, so it can set anything: strings, numbers,
            booleans, even whole objects. Interpolation is really just a convenient shorthand for binding to
            an element's <code>textContent</code>.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can name all three binding types and say, without looking, which direction each one flows.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d2-act1-property-binding" [stepNumber]="3" title="Property Binding — the Poster Image">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> model the show's data in <code>show-card.ts</code>:</p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="modelCode" />

        <p style="margin-top: 12px;">Then bind the poster image and the rating in <code>show-card.html</code>:</p>

        <app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="propertyBindingCode" />

        <div class="warning-box">
          <strong>See the failure first:</strong> write <code>src="imageUrl"</code> with no brackets and
          watch the broken image icon — the browser requests a literal file named <code>imageUrl</code>,
          because without brackets it's just a string attribute, not an expression. Add the brackets back
          and watch it resolve to the real URL. This 60-second demo prevents weeks of confusion.
        </div>

        <div class="think-about-it">
          <p class="tai-q">If <code>src="imageUrl"</code> is broken but <code>[src]="imageUrl"</code> works, what exactly do the square brackets change about how Angular reads that right-hand side?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — literal string vs. expression">
          <p>
            Without brackets, everything after <code>=</code> is a plain string literal — Angular sets the
            <code>src</code> attribute to the literal text <code>imageUrl</code>. With brackets, Angular
            evaluates what's inside the quotes as a TypeScript expression against your component class, so
            <code>imageUrl</code> resolves to the property's current value instead.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your show card renders a real poster image via <code>[src]</code>, plus a rating line — and you can explain in your own words why the unbracketed version breaks.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day1/lab" class="btn-secondary">← Day 1 Lab</a>
        <a routerLink="/day2/act2" class="btn-primary">Act 2: Reacting to Events →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'Property binding [prop]',
      plainEnglish: 'Set an element\'s actual property from a class value, not just its visible text.',
      analogy: 'Like plugging a wire into a specific socket on the element, instead of just writing a label near it.'
    },
    {
      concept: 'Event binding (event)',
      plainEnglish: 'Run a method in your class whenever a specific DOM event fires on an element.',
      analogy: 'Like wiring a doorbell button to a specific chime — press it, and code you wrote runs.'
    },
    {
      concept: 'Data flows down, events flow up',
      plainEnglish: 'Property bindings push data into the template; event bindings push signals back out to your class.',
      analogy: 'A one-way pipe carrying water down into a fountain, and a separate wire carrying a sensor\'s signal back up to the pump controller.'
    },
    {
      concept: 'Angular maintains the relationship',
      plainEnglish: 'You describe the binding once. Angular re-applies it automatically whenever the underlying data changes.',
      analogy: 'A thermostat, not a thermometer you have to keep re-reading and adjusting by hand.'
    }
  ];

  generateCommand = `ng generate component show-card`;

  modelCode = `export class ShowCard {
  title = 'Severance';
  imageUrl = 'https://static.tvmaze.com/uploads/images/medium_portrait/423/1059131.jpg';
  rating = 8.7;
  watched = false;
}`;

  propertyBindingCode = `<article class="card">
  <img [src]="imageUrl" [alt]="title" width="140" />
  <h3>{{ title }}</h3>
  <p>Rating: {{ rating }} / 10</p>
</article>`;
}
