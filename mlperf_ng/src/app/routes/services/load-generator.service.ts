import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExperimentLatency, ExperimentQps, LoadGenInstanceRequest } from '@shared/models/load-generator.model';
import { apiPaths } from 'api-paths';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadGeneratorService {
    constructor(private http: HttpClient) {}

    runLoadGeneratorInstance(eid: string, selector: string, payload: LoadGenInstanceRequest): Observable<any> {
        return this.http.post(apiPaths.loadGenInstance.replace('{eid}/{selector}', `${eid}/${selector}`), payload);
    }

    getExperimentLatencies(eid: string): Observable<ExperimentLatency[]> {
        return this.http.get<ExperimentLatency[]>(apiPaths.storage.latencies.replace('{eid}', eid));
    }

    getExperimentQps(eid: string): Observable<ExperimentQps[]> {
        return this.http.get<ExperimentQps[]>(apiPaths.storage.qps.replace('{eid}', eid));
    }
}
