import { environment } from 'environments/environment';

export const apiPaths = {
    initStorage: `${environment.mecBenchUrl}/init_storage`,
    systemUnderTest: `${environment.mecBenchUrl}/sut`,
    loadGenJob: `${environment.mecBenchUrl}/start/{eid}/{selector}`,
    loadGenInstance: `${environment.mecBenchUrl}/lg_job/{eid}/{selector}`,
};
