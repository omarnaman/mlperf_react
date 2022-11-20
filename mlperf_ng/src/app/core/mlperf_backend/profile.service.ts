import { Injectable } from '@angular/core';
import { Profile } from './interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from 'api-paths';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private http: HttpClient) {}

    getProfiles(): Observable<{ profiles: Profile[]}> {
        return this.http.get<{ profiles: Profile[]}>(apiPaths.profiles.getAll);
    }
}
