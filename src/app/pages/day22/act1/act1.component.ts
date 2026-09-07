import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day22-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 22 · Act 1 of 3</span>
        <h1>🏗️ The Production Build</h1>
        <p class="subtitle">ng serve has been your whole world. Today you produce the version of this app meant for someone who isn't you.</p>
      </div>
      <div class="info-box"><strong>Before you start:</strong> run the end-of-Day-21 project and confirm sign-in, per-user watchlists, and authored reviews all work. If you need the exact baseline, visit the <a routerLink="/day22/start">Day 22 Starting Point</a>.</div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Angular's <a href="https://angular.dev/tools/cli/deployment" target="_blank" rel="noopener">deployment guide</a> and <a href="https://angular.dev/reference/configs/file-structure#application-configuration-files" target="_blank" rel="noopener">workspace configuration reference</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Produce a real <code>ng build</code>, read what it generated, and separate dev configuration from prod configuration.</li><li><strong>Why It Matters:</strong> A dev server is for you. A build is for everyone else — small, fast, and unaware you were ever debugging it.</li><li><strong>Build Steps:</strong> Run and tour a build → read the budget warnings → add an environment-specific configuration.</li><li><strong>Expected Outcome:</strong> You can name what <code>ng build</code> produces and where dev vs. prod configuration diverges.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 1 (The Production Build)</p><p><strong>Next step:</strong> Act 2 (Firebase Hosting)</p><p><strong>Time:</strong> About 25 minutes.</p></section>

      <app-lesson-step stepId="d22-act1-build-inspect" [stepNumber]="1" title="Run ng build and Tour What Comes Out">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p><code>ng serve</code> has been your whole world: unminified code, live reload, and a server that only ever answers to <code>localhost</code>. The version for actual users needs to be small, fast, and reachable on a public URL. That starts with a build.</p>
        <app-code-block lang="bash" [code]="buildCommand" />
        <p>Open <code>dist/bingeboard/browser/</code>. One <code>index.html</code>, a handful of fingerprinted <code>.js</code>/<code>.css</code> files, and — look closely — your lazy-loaded pages sitting there as separate chunk files. That's Day 9's Network-tab proof, now visible on disk instead of in DevTools.</p>
        <app-code-block lang="typescript" [code]="distTreeExample" />
        <div class="think-about-it"><p class="tai-q">Why does the CLI print budget warnings during a production build?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the framework nags you toward smallness"><p><code>ng build</code> tree-shakes (removes code nothing imports), minifies, and fingerprints your app into this folder — the actual deployable artifact. Budget warnings in <code>angular.json</code> exist because bundle size creeps up silently over a project's life; the CLI would rather annoy you a little now than let users download megabytes they didn't need.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Run <code>ng build</code> and open the output folder. You can point at a lazy chunk file and say which route it belongs to.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d22-act1-environments" [stepNumber]="2" title="One Codebase, Environment-Specific Configuration">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Add <code>environment.development.ts</code> beside your existing <code>environment.ts</code>, then wire Angular's file-replacement pattern in <code>angular.json</code> so <code>ng serve</code> uses one and <code>ng build</code> (the default, production configuration) uses the other.</p>
        <app-code-block lang="typescript" [code]="environmentFilesCode" />
        <app-code-block lang="json" [code]="fileReplacementsCode" />
        <p>Today both files hold the same Firebase config — that's fine, it's public (Day 18's exact reasoning). In a job, this is exactly where a staging API URL vs. a production API URL would live: the <em>code</em> stays identical everywhere, only the <em>configuration</em> differs per environment.</p>
        <div class="think-about-it"><p class="tai-q">If both environment files hold identical Firebase config today, why bother with two files at all?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the mechanism matters more than today's values"><p>The values happen to match today because Firebase config is meant to be public. But the <em>mechanism</em> — <code>fileReplacements</code> swapping one TypeScript file for another at build time — is what every real app leans on for staging URLs, feature flags, or different logging levels per environment. Set it up now, while the stakes are low, so it's already there the day the values actually need to differ.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Add a development environment file and confirm <code>angular.json</code>'s <code>fileReplacements</code> swaps it in only for the development configuration. You can explain why code stays the same while configuration diverges.</div>
      </app-lesson-step>
      <div class="nav-footer"><a routerLink="/day22/start" class="btn-secondary">← Day 22 Starting Point</a><a routerLink="/day22/act2" class="btn-primary">Act 2: Firebase Hosting →</a></div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    { concept: 'production build', plainEnglish: 'Compiling, minifying, and fingerprinting source into a folder of static, deployable files.', analogy: '📦 Packing a finished product into a shippable box.' },
    { concept: 'tree-shaking', plainEnglish: 'Removing code that nothing in the app actually imports.', analogy: '✂️ Trimming the branches nobody uses off a tree before shipping it.' },
    { concept: 'environment file replacement', plainEnglish: 'Swapping which configuration file compiles in, based on dev vs. prod.', analogy: '🔌 Plugging in a different power adapter depending on the country you land in.' },
    { concept: 'bundle budget', plainEnglish: 'A size limit the CLI warns you about so bundles don\'t quietly grow.', analogy: '⚖️ A luggage scale that beeps before your suitcase gets too heavy.' }
  ];

  buildCommand = `ng build`;

  distTreeExample = `dist/bingeboard/browser/
├── index.html
├── main-XXXXXXXX.js          # bootstraps the app
├── chunk-XXXXXXXX.js         # framework + shared code
├── styles-XXXXXXXX.css
├── browse-XXXXXXXX.js        # lazy chunk: Browse
├── show-detail-XXXXXXXX.js   # lazy chunk: Show Detail
└── watchlist-XXXXXXXX.js     # lazy chunk: Watchlist`;

  environmentFilesCode = `// environments/environment.ts               (production — ng build's default)
// environments/environment.development.ts   (ng serve uses this)

export const environment = {
  production: true,
  firebase: { /* your config */ },
};`;

  fileReplacementsCode = `{
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.development.ts",
          "with": "src/environments/environment.ts"
        }
      ]
    }
  }
}`;
}
