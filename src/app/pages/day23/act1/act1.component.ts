import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day23-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 23 · Act 1 of 3</span>
        <h1>🧪 Why Tests Matter (and Your First Real Test)</h1>
        <p class="subtitle">Every act until today has ended with "click around and confirm it works." Today you write down what "it works" means, in a file the computer re-checks for you.</p>
      </div>
      <div class="info-box"><strong>Before you start:</strong> run the end-of-Day-22 project and confirm every route loads with a real tab title. If you need the exact baseline, visit the <a routerLink="/day23/start">Day 23 Starting Point</a>.</div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Angular's <a href="https://angular.dev/guide/testing" target="_blank" rel="noopener">testing guide</a> and the <a href="https://vitest.dev/" target="_blank" rel="noopener">Vitest documentation</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Wire up <code>ng test</code>, read its output, and write your first real spec using Arrange-Act-Assert.</li><li><strong>Why It Matters:</strong> Manual clicking only ever checks the one path you happened to click. A test file checks the same claim, the same way, every single time — including six weeks from now, after you've forgotten this code existed.</li><li><strong>Build Steps:</strong> Wire up the test target → run it and read the output → learn Arrange-Act-Assert → write <code>bingeLevel</code>'s first spec.</li><li><strong>Expected Outcome:</strong> <code>ng test</code> runs in your own project, and you have one real, passing, three-part spec for a pure function.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 1 (Why Tests Matter)</p><p><strong>Next step:</strong> Act 2 (Testing Pipes, and a Real TDD Cycle)</p><p><strong>Time:</strong> About 30 minutes.</p></section>

      <app-lesson-step stepId="d23-act1-wire-up-ng-test" [stepNumber]="1" title="Wire Up ng test, Then Read What It Tells You">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Your starter project doesn't have a <code>test</code> target yet — this repo's own root project does, so that's the exact config to copy. Four small pieces, all in your own <code>bingeboard-day23</code> copy: a builder entry in <code>angular.json</code>, a <code>test</code> script plus two dev dependencies in <code>package.json</code>, and a <code>tsconfig.spec.json</code> that tells TypeScript's project references about spec files at all.</p>
        <app-code-block lang="json" [code]="angularJsonTestTarget" />
        <app-code-block lang="json" [code]="packageJsonTestDeps" />
        <app-code-block lang="typescript" [code]="tsconfigSpecJson" />
        <p>Run <code>npm install</code>, then run the new script:</p>
        <app-code-block lang="bash" [code]="runTestCommand" />
        <p>With zero spec files anywhere in <code>src/</code>, this is the exact, real error you get back:</p>
        <app-code-block lang="text" [code]="noTestsFoundOutput" />
        <p>That's not a broken setup — it's the runner telling you precisely what it searched for (<code>**/*.spec.ts</code>, <code>**/*.test.ts</code>) and that it found nothing. Good error messages name the search, not just the failure.</p>
        <p><strong>A note on "runner drift":</strong> <code>ng test</code> in this Angular version can run on two different engines, chosen with a <code>--runner</code> flag defaulting to <code>vitest</code>. A lot of tutorials, blog posts, and Stack Overflow answers you'll find online were written when Karma — an older, browser-launching runner — was the only option, and they describe things this project doesn't have: a <code>karma.conf.js</code> file, a real Chrome window flashing open, console output shaped like <code>Executed 3 of 3 SUCCESS</code>. Passing <code>--runner=karma</code> here would ask for that engine, but it needs its own packages installed first (<code>karma</code>, <code>karma-jasmine</code>, <code>karma-coverage</code>) — this project simply doesn't have them. Same command, same <code>*.spec.ts</code> files, genuinely different tool underneath. If an example online looks unfamiliar, check which runner it's describing before assuming your setup is wrong.</p>
        <div class="think-about-it"><p class="tai-q">Why does the CLI still support two different test runners behind the exact same <code>ng test</code> command?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the command is a stable contract, the engine underneath isn't"><p>Angular has been migrating its default test runner from Karma to Vitest across recent major versions. Keeping <code>ng test</code> as the one command you and CI pipelines type — while swapping the engine underneath via <code>--runner</code> or a project default — means nobody's npm scripts, muscle memory, or CI YAML has to change just because the tooling team changed its mind about which JavaScript test runner is fastest. The command is the stable interface; the runner is an implementation detail you only need to know about when reading old examples or debugging something runner-specific.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>npm test</code> (or <code>ng test</code>) runs in your own project and reports "No tests found" instead of erroring on a missing target. You can say, out of your own head, which runner this project uses by default and why an old Karma-flavored tutorial might look unfamiliar.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d23-act1-arrange-act-assert" [stepNumber]="2" title="Arrange-Act-Assert — the Shape of Every Test">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Nearly every test worth writing has the same three-part shape, regardless of language or framework:</p>
        <app-code-block lang="typescript" [code]="aaaShapeExplained" />
        <p><strong>Arrange:</strong> set up whatever input the code under test needs. <strong>Act:</strong> call the one thing you're actually testing. <strong>Assert:</strong> check that what came back is what you expected — and only that one thing, in one test. A test that arranges, acts, and asserts three unrelated facts is really three tests wearing one <code>it()</code>.</p>
        <div class="think-about-it"><p class="tai-q">Why put the comments in even when a test is short enough to read at a glance?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the comments are for six-weeks-from-now you, not today-you"><p>A two-line test doesn't need the comments to be readable today. It needs them for the day you're scanning fifteen specs at once, half-asleep, trying to find the one that's failing — at that point, a visual break between "here's the setup" and "here's the check" is worth more than it costs to type. It's also a forcing function: if you can't cleanly label one line as Act and one as Assert, the test is probably doing too much.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Given any test, you can point at its Arrange, Act, and Assert lines without help — including tests you didn't write.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d23-act1-bingelevel-first-spec" [stepNumber]="3" title="bingeLevel's First Spec">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Day 3's lab taught this exact branching logic as a <code>computed()</code> signal inside a component, driven by a fake episode counter. The starter's <code>src/app/utils/binge-level.ts</code> is that same idea, reborn: a plain function, no Angular import anywhere in the file, run against the real episode count Show Detail already gets back from the TVMaze API.</p>
        <app-code-block lang="typescript" [code]="bingeLevelSource" />
        <p>Nothing about that function needs a component, a fixture, or a browser to check. Create <code>binge-level.spec.ts</code> next to it:</p>
        <app-code-block lang="typescript" [code]="bingeLevelFirstSpec" />
        <p>Run <code>npm test</code> again. Three green checks, and a summary line reporting exactly how many test files and tests ran:</p>
        <app-code-block lang="text" [code]="bingeLevelSpecOutput" />
        <div class="think-about-it"><p class="tai-q">Why did this spec need zero setup — no <code>TestBed</code>, no <code>beforeEach</code>, no import of Angular at all?</p></div>
        <app-collapsible icon="✅" label="Show Answer — pure functions have nothing to configure"><p><code>bingeLevel()</code> reads only its one parameter and returns only a plain string — no injected service, no signal, no DOM, nothing Angular needs to construct on its behalf. <code>TestBed</code> exists to build a realistic Angular environment (dependency injection, change detection, a fixture) for code that needs one. A pure function was never going to need one, so skipping <code>TestBed</code> here isn't a shortcut — it's the correct amount of ceremony for what's actually being tested.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A real, passing <code>binge-level.spec.ts</code> with three <code>it()</code> blocks, one per tier, each following Arrange-Act-Assert.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day23/start" class="btn-secondary">← Day 23 Starting Point</a><a routerLink="/day23/act2" class="btn-primary">Act 2: Testing Pipes, and a Real TDD Cycle →</a></div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    { concept: 'unit test', plainEnglish: 'A small, automated check that one piece of code does what it claims, with no browser and no clicking.', analogy: '🔬 A lab technician re-running the same measurement to confirm a result instead of trusting memory.' },
    { concept: 'test runner', plainEnglish: 'The tool that finds every spec file, executes it, and reports what passed and what failed.', analogy: '🎬 A stage manager reading every scene\'s cue sheet and calling out which cues actually fired.' },
    { concept: 'Arrange-Act-Assert (AAA)', plainEnglish: 'A three-part shape for a test: set up the input, call the thing, check the output.', analogy: '🧪 Measure the ingredients, run the experiment, read the result off the gauge.' },
    { concept: 'pure function', plainEnglish: 'A function whose output depends only on its input, with no side effects at all.', analogy: '🧮 A calculator button — the same input gives the same output, every single time.' }
  ];

  angularJsonTestTarget = `// angular.json -- inside projects.bingeboard.architect, alongside "build" and "serve"
"test": {
  "builder": "@angular/build:unit-test"
}`;

  packageJsonTestDeps = `// package.json
{
  "scripts": {
    "test": "ng test"
  },
  "devDependencies": {
    "vitest": "^4.0.8",
    "jsdom": "^28.0.0"
  }
}`;

  tsconfigSpecJson = `// tsconfig.spec.json -- new file, next to tsconfig.app.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*.d.ts", "src/**/*.spec.ts"]
}

// tsconfig.json -- add the reference alongside tsconfig.app.json
"references": [
  { "path": "./tsconfig.app.json" },
  { "path": "./tsconfig.spec.json" }
]`;

  runTestCommand = `npm test`;

  noTestsFoundOutput = `An exception occurred while getting runner-specific build options:
Error: No tests found matching the following patterns:
- Included: **/*.spec.ts, **/*.test.ts

Please check the 'test' target configuration in your project's 'angular.json' file.`;

  aaaShapeExplained = `it('description of the one behavior being checked', () => {
  // Arrange -- set up whatever input the code under test needs
  const input = /* ... */;

  // Act -- call the one thing actually under test
  const result = someFunction(input);

  // Assert -- check the result, and only the result
  expect(result).toBe(/* expected value */);
});`;

  bingeLevelSource = `// src/app/utils/binge-level.ts -- no Angular import anywhere in this file
export type BingeLevel = 'Quick Watch' | 'Full-Season Binge' | 'Marathon';

export function bingeLevel(episodeCount: number): BingeLevel {
  if (episodeCount <= 12) return 'Quick Watch';
  if (episodeCount <= 50) return 'Full-Season Binge';
  return 'Marathon';
}`;

  bingeLevelFirstSpec = `import { bingeLevel } from './binge-level';

describe('bingeLevel', () => {
  it('returns Quick Watch at 12 episodes or fewer', () => {
    // Arrange
    const episodeCount = 12;
    // Act
    const result = bingeLevel(episodeCount);
    // Assert
    expect(result).toBe('Quick Watch');
  });

  it('returns Full-Season Binge between 13 and 50 episodes', () => {
    const result = bingeLevel(24);
    expect(result).toBe('Full-Season Binge');
  });

  it('returns Marathon above 50 episodes', () => {
    const result = bingeLevel(51);
    expect(result).toBe('Marathon');
  });
});`;

  bingeLevelSpecOutput = `✓  bingeboard  src/app/utils/binge-level.spec.ts (3 tests) 5ms

 Test Files  1 passed (1)
      Tests  3 passed (3)`;
}
