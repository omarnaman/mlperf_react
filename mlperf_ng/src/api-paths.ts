import { environment } from 'environments/environment';

export const apiPaths = {
    initStorage: `${environment.mecBenchUrl}/init_storage`,
    systemUnderTest: `${environment.mecBenchUrl}/sut`,
    loadGenJob: `${environment.mecBenchUrl}/start/{eid}/{selector}`,
    loadGenInstance: `${environment.mecBenchUrl}/lg_job/{eid}/{selector}`,
    profiles: {
        getAll: `${environment.storageUrl}/profiles`,
        get: `${environment.storageUrl}/profiles/{profile_name}`,
        create: `${environment.storageUrl}/profiles`,
        delete: `${environment.storageUrl}/profiles/{profile_name}`,
    },
    storage: {
        latencies: `${environment.storageUrl}/latencies/{eid}`,
        qps: `${environment.storageUrl}/qps/{eid}`,
    },
};
