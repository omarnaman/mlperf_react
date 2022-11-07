import { Injectable } from '@angular/core';
import { Profile } from './interface';
import { defaultProfiles } from './profile';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  profileList: Profile[] = defaultProfiles;
  get(index: number): Profile {
    return defaultProfiles[index];
  }

  public list() {
    return defaultProfiles;
  }

}
