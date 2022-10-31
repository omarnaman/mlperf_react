import { environment } from 'environments/environment';

export const apiPaths = {
    initStorage: `${environment.baseUrl}/init_storage`,
    systemUnderTest: `${environment.baseUrl}/sut`,
    loadGenJob: `${environment.baseUrl}/start/{eid}/{selector}`,
    loadGenInstance: `${environment.baseUrl}/lg_job/{eid}/{selector}`,
};
