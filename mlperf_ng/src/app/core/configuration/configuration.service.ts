import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoadGenConfiguration, MLPerfConfiguration, NetworkEmulationConfiguration, SUTConfiguration } from './interface';
import { defaultMLPerfConfiguration } from './mlperfConfiguration';
@Injectable({ providedIn: 'root' })
export class ConfigurationStoreService {
    private readonly _configuration = new BehaviorSubject<MLPerfConfiguration>(defaultMLPerfConfiguration);

    readonly configuration$ = this._configuration.asObservable();

    constructor() { }

    getCurrentConfiguration(): MLPerfConfiguration {
        return this._configuration.getValue();
    }

    setNetworkEmulation(emulationConfig: NetworkEmulationConfiguration, server: boolean = false): void {
        if (server) {
            this._configuration.getValue().networkServer = emulationConfig;
        } else {
            this._configuration.getValue().networkClient = emulationConfig;
        }
    }

    setLoadGen(loadGenConfig: LoadGenConfiguration): void {
        this._configuration.getValue().loadgen = loadGenConfig;
    }

    setSUT(sutConfig: SUTConfiguration): void {
        this._configuration.getValue().sut = sutConfig;
    }

    getLoadGen(): LoadGenConfiguration | undefined {
        return this._configuration.getValue().loadgen;
    }

    getSUT(): SUTConfiguration | undefined {
        return this._configuration.getValue().sut;
    }

    getNetworkEmulation(server: boolean = false): NetworkEmulationConfiguration | undefined {
        if (server) {
            return this._configuration.getValue().networkServer;
        } else {
            return this._configuration.getValue().networkClient;
        }
    }


}