import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day25-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label">Day 25 · Act 2 of 2</span><h1>🚀 Capstone Kickoff</h1><p class="subtitle">You've spent 24 days building one shared app together. Starting Day 26, you're building your own — and today you plan it, before you write a single line.</p></div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> your own notes from every "Debug It" and lab checkpoint across Days 9-24 — they're the closest thing you have to a personal record of what actually goes wrong.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Understand the capstone rubric, cut your idea's scope to something shippable, and plan milestones across Days 26-33.</li><li><strong>Why It Matters:</strong> An unplanned project either grows forever or stalls on Day 1. A rubric, a cut scope, and dated milestones are what turn "I want to build an app" into something you actually finish.</li><li><strong>Build Steps:</strong> Read the rubric → cut scope before you start → plan milestones → draft your pitch → practice reading a non-coding teammate's bug report.</li><li><strong>Expected Outcome:</strong> You leave today with a rubric-aligned, scope-cut, milestone-dated plan and a pitch draft.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 2 (Capstone Kickoff)</p><p><strong>Next step:</strong> Student Lab (Safety Net Lab)</p><p><strong>Time:</strong> About 30 minutes.</p></section>

      <app-lesson-step stepId="d25-act2-rubric" [stepNumber]="1" title="Meet the Capstone Rubric">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>The rubric is public today, not on Day 33 — you should never be guessing what "good" means while you build.</p>
        <app-code-block lang="text" [code]="rubricTable" />
        <p>Notice that tests are worth almost as much as working features. A feature nobody can prove still works after a change is a feature you'll be afraid to touch again — this course has spent three days on that exact idea for a reason.</p>
        <div class="think-about-it"><p class="tai-q">Why might "Test Coverage and Quality" be graded separately from "Working Features," instead of folded into one score?</p></div>
        <app-collapsible icon="✅" label="Show Answer — a feature and its safety net are two different promises"><p>A feature can work today and still have zero tests protecting it from tomorrow's change. Grading them separately rewards building a safety net even for features that already work, instead of only rewarding the last thing you touched before the deadline.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Name the rubric's highest-weighted category from memory. You can explain why tests are graded on their own line instead of bundled into "features."</div>
      </app-lesson-step>

      <app-lesson-step stepId="d25-act2-scope-cut" [stepNumber]="2" title="Cut Scope Before Day 1, Not During Day 33">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Sort your idea into Must / Should / Could / Won't before you write any code. "Won't" is not a failure — it's a decision you made on purpose, in daylight, instead of one panic made you at 1 a.m. on Day 33.</p>
        <app-code-block lang="text" [code]="scopeCutExample" />
        <div class="think-about-it"><p class="tai-q">Why write down a "Won't" list at all, instead of just not mentioning those features?</p></div>
        <app-collapsible icon="✅" label="Show Answer — an unwritten cut gets re-litigated"><p>An idea you didn't write down as cut has a way of quietly creeping back into scope the moment it seems easy, usually around Day 31 when time is shortest. A written "Won't" list is something you can point back to and say "we already decided," instead of re-deciding it while short on time.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A written Must/Should/Could/Won't list for your own idea, with at least one real item in "Won't." You can explain what your Must list alone would demo.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d25-act2-milestones" [stepNumber]="3" title="Plan Milestones for Days 26-33">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>A milestone is a date plus a short, checkable list of what should be true by then — not a grade, and not a guess about how much time is left.</p>
        <app-code-block lang="text" [code]="milestoneTable" />
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Your own milestone table for Days 26-33, each row naming one real, checkable thing that should be true by that date. You can point to the exact day you plan to start your own tests.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d25-act2-pitch-homework" [stepNumber]="4" title="Homework — Draft Your One-Paragraph Pitch">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Before Day 26, write one paragraph covering: the problem, who it's for, the one core feature that proves the idea, why tests matter specifically for this idea, and the first thing you'd cut if you ran out of time.</p>
        <app-code-block lang="text" [code]="pitchTemplate" />
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A single paragraph you could read in under a minute. You can identify your own core feature without hedging.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d25-act2-teammate-debug" [stepNumber]="5" title="Debug It — Turn a Teammate's Bug Report Into a Test">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Imagine a capstone teammate who doesn't write Angular code yet, but is testing your app by hand every day. They message you: "the delete button doesn't work on my phone." No stack trace, no repro steps, no line number — but it's still real signal, and it's still your job to turn it into something you can act on.</p>
        <app-code-block lang="text" [code]="teammateReportScenario" />
        <div class="think-about-it"><p class="tai-q">What three questions turn that message into a reproducible bug, before you touch any code?</p></div>
        <app-collapsible icon="✅" label="Show Answer — ask for the report a test would need"><p>Ask what device/browser they used, exactly what they tapped and in what order, and whether anything appeared on screen (an error message, nothing happening, the wrong item disappearing). Those three answers are the same information a component test needs: a starting state, an action, and an expected — or actually observed — outcome. A non-coding teammate's report becomes a spec's <code>it()</code> description the moment you can state it that concretely.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A rewritten version of the vague report as one concrete sentence you could turn directly into a test's title. You can treat a non-coding teammate's manual testing as real QA input, not lesser feedback.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day25/act1" class="btn-secondary">← Act 1: Coverage, Risk, and a Test Plan</a><a routerLink="/day25/lab" class="btn-primary">Student Lab: Safety Net Lab →</a></div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    { concept: 'capstone project', plainEnglish: 'A self-directed, multi-day project applying everything learned so far, evaluated against a shared, public rubric.', analogy: '🎭 The performance after weeks of rehearsal — the same skills, now with nobody handing you the next line.' },
    { concept: 'scope cut', plainEnglish: 'Deliberately shrinking a plan to the smallest version that still proves the idea, on purpose and in advance.', analogy: '✂️ Pruning a bush so the branches you keep get enough light to actually grow.' },
    { concept: 'milestone', plainEnglish: 'A checkpoint date paired with a short, checkable list of what should be true by then.', analogy: '🥾 A marked mile on a long hike, so you know whether you are on pace before it is too late to matter.' },
    { concept: 'rubric', plainEnglish: 'A public, upfront statement of exactly what "good" looks like, shared before the work starts, not after.', analogy: '📋 A recipe\'s ingredient list handed to you before you start cooking, not compared afterward.' }
  ];
  rubricTable = `Category                        | Weight | What it actually measures
---------------------------------|--------|--------------------------------
Working Features                 |  40%   | Your Must-list features work end to end
Test Coverage & Quality          |  25%   | Real assertions on real risk, not padding
Code Quality & Architecture      |  15%   | Reused services/pipes, no copy-pasted logic
Pitch & Presentation             |  10%   | Can you explain what you built and why
Stretch & Polish                 |  10%   | Should/Could-list items you had time for`;
  scopeCutExample = `Idea: "WatchParty" — plan movie nights with friends and vote on what to watch.

Must   — create a watch party, add candidate shows, cast one vote per person, see the winner.
Should — a countdown to the party's start time, a simple "already watched" filter.
Could  — genre filtering on candidates, a shareable read-only link for guests.
Won't (this capstone) — real-time sync between multiple open tabs, native push notifications.`;
  milestoneTable = `Day    | Milestone
-------|----------------------------------------------------------
26     | Idea locked, scope cut written down, tech spike for the riskiest unknown
27-28  | Must-list core feature built and clickable, even with fake/static data
29     | First real tests written against that core feature's riskiest logic
30     | Second Must-list feature built; first feature's tests still green
31     | Should-list items attempted; regression check across everything so far
32     | Pitch deck drafted and rehearsed at least once
33     | Demo day — present, and answer questions about your test plan`;
  pitchTemplate = `[Problem] — a one-sentence version of what's annoying or missing today.
[Audience] — who specifically feels that problem.
[Core feature] — the one thing your Must-list proves, in one sentence.
[Why tests matter here] — what silent failure would hurt this idea's users most.
[First cut if short on time] — the specific Should/Could item you'd drop first, and why that one.`;
  teammateReportScenario = `Teammate's message: "hey the delete button doesn't work on my phone, can you fix it"

What you actually know so far: nothing about which phone, which screen,
which item, or what "doesn't work" looked like. That's not a bug report
yet -- it's a starting point for one.`;
}
