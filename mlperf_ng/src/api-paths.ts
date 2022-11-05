import { environment } from 'environments/environment';

export const apiPaths = {
    initStorage: `${environment.baseUrl2}/init_storage`,
    systemUnderTest: `${environment.baseUrl2}/sut`,
    loadGenJob: `${environment.baseUrl2}/start/{eid}/{selector}`,
    loadGenInstance: `${environment.baseUrl2}/lg_job/{eid}/{selector}`,
};
