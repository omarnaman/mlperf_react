import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadGenConfiguration, MLPerfConfiguration, NetworkEmulationConfiguration, SUTConfiguration } from './interface';

@Injectable({ providedIn: 'root' })
export class ConfigurationStoreService {
    private readonly _configuration = new BehaviorSubject<MLPerfConfiguration | undefined>(undefined);

    configuration$ = this._configuration.asObservable();

    constructor() {}

    getCurrentConfiguration(): MLPerfConfiguration | undefined {
        return this._configuration.getValue();
    }

    setNetworkEmulation(emulationConfig: NetworkEmulationConfiguration, server: boolean = false): void {
        if (server) {
            this._configuration.next({ ...this._configuration.getValue(), network_server: emulationConfig });
        } else {
            this._configuration.next({ ...this._configuration.getValue(), network_client: emulationConfig });
        }
    }

    setLoadGen(loadGenConfig: LoadGenConfiguration): void {
        this._configuration.next({ ...this._configuration.getValue(), loadgen: loadGenConfig });
    }

    setSUT(sutConfig: SUTConfiguration): void {
        this._configuration.next({ ...this._configuration.getValue(), sut: sutConfig });
    }

    setConfiguration(config: MLPerfConfiguration): void {
        this._configuration.next(config);
    }

    getLoadGen(): LoadGenConfiguration | undefined {
        return this._configuration.getValue()?.loadgen;
    }

    getSUT(): SUTConfiguration | undefined {
        return this._configuration.getValue()?.sut;
    }

    getNetworkEmulation(server: boolean = false): NetworkEmulationConfiguration | undefined {
        if (server) {
            return this._configuration.getValue()?.network_server;
        } else {
            return this._configuration.getValue()?.network_client;
        }
    }
}
