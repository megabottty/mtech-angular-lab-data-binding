import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Day 11 Act 2 built this as a reactive-forms ValidatorFn attached to a
// review headline field. The review form itself has since moved to a
// simpler template-driven flow (Day 19 rebuilt Reviews on Firestore with
// a plain <textarea>/<input>, no FormGroup, no headline field at all), so
// this validator is not wired to today's UI. It's kept here because it's
// real, previously-shipped app logic, and -- being a plain function that
// takes a control-like value and returns null or an errors object -- it's
// exactly as easy to unit test as bingeLevel: no component, no DOM, no
// TestBed required.
export function noShouting(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
    const letters = value.replace(/[^a-zA-Z]/g, '');
    return letters.length >= 3 && value === value.toUpperCase()
      ? { noShouting: true }
      : null;
  };
}
