import { Injectable } from '@angular/core';
import { Profile } from './interface';
import { defaultProfiles } from './profile';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private readonly _profiles = new BehaviorSubject<Profile[]>(defaultProfiles);
    profiles$ = this._profiles.asObservable();
    profileList: Profile[] = defaultProfiles;

    constructor() {}

    get(index: number): Profile {
        return defaultProfiles[index];
    }

    public list() {
        return defaultProfiles;
    }
}
