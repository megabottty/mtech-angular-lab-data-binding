import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Day 18 Act 2 -- the first live Firestore read. Requires YOUR OWN
// shows-of-the-week collection (see src/environments/environment.ts).
export interface FeaturedShow {
  id: string;
  name: string;
  blurb: string;
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class FeaturedService {
  private firestore = inject(Firestore);

  featured = toSignal(
    collectionData(
      collection(this.firestore, 'shows-of-the-week'),
      { idField: 'id' }
    ) as Observable<FeaturedShow[]>,
    { initialValue: [] }
  );
}
