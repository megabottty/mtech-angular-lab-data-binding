import { AbstractControl, FormArray, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noShouting(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
    const letters = value.replace(/[^a-zA-Z]/g, '');
    return letters.length >= 3 && value === value.toUpperCase()
      ? { noShouting: true }
      : null;
  };
}

export function spoilersNeedDetail(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const spoilers = group.get('spoilers')?.value === true;
    const body = String(group.get('body')?.value ?? '');
    return spoilers && body.trim().length < 50
      ? { spoilersNeedDetail: true }
      : null;
  };
}

export function tagsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const tags = (control as FormArray<FormControl<string>>).value
      .map(tag => tag.trim().toLowerCase())
      .filter(Boolean);

    if (tags.length > 5) return { maxTags: true };
    return new Set(tags).size !== tags.length ? { duplicateTags: true } : null;
  };
}
