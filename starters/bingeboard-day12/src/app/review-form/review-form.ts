import { Component, inject, input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewsService } from '../services/reviews';
import { noShouting, spoilersNeedDetail, tagsValidator } from '../validators/review-validators';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.html'
})
export class ReviewForm {
  showId = input.required<number>();

  private fb = inject(FormBuilder);
  private reviewsSvc = inject(ReviewsService);
  submitAttempted = signal(false);

  reviewForm = this.fb.nonNullable.group(
    {
      rating: [8, [Validators.required, Validators.min(0), Validators.max(10)]],
      headline: ['', [Validators.required, Validators.maxLength(80), noShouting()]],
      body: ['', [Validators.required, Validators.minLength(20)]],
      spoilers: false,
      tags: this.fb.array<FormControl<string>>([], { validators: tagsValidator() })
    },
    { validators: spoilersNeedDetail() }
  );

  get tags() {
    return this.reviewForm.controls.tags;
  }

  showError(control: AbstractControl) {
    return control.invalid && (control.touched || control.dirty || this.submitAttempted());
  }

  get errorSummary(): string[] {
    const messages: string[] = [];
    if (this.reviewForm.controls.rating.invalid) messages.push('Rating');
    if (this.reviewForm.controls.headline.invalid) messages.push('Headline');
    if (this.reviewForm.controls.body.invalid) messages.push('Full review');
    if (this.reviewForm.controls.tags.invalid) messages.push('Tags');
    if (this.reviewForm.hasError('spoilersNeedDetail')) messages.push('Spoiler detail');
    return messages;
  }

  submit() {
    this.submitAttempted.set(true);
    this.reviewForm.markAllAsTouched();
    if (this.reviewForm.invalid) return;

    const raw = this.reviewForm.getRawValue();

    this.reviewsSvc.add({
      showId: this.showId(),
      rating: raw.rating,
      headline: raw.headline,
      body: raw.body,
      spoilers: raw.spoilers,
      createdAt: new Date()
    });

    this.reviewForm.reset();
    this.submitAttempted.set(false);
  }

  quickFillTen() {
    this.reviewForm.patchValue({ rating: 10 });
  }

  recommendPreset() {
    this.reviewForm.patchValue({
      rating: 9,
      headline: 'Highly recommend'
    });
  }

  addTag() {
    if (this.tags.length < 5) {
      this.tags.push(this.fb.nonNullable.control('', [
        Validators.minLength(2),
        Validators.maxLength(20)
      ]));
    }
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }
}
