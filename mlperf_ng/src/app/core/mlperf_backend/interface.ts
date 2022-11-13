import { SUTConfiguration, NetworkEmulationConfiguration, LoadGenConfiguration } from "@core/configuration/interface";

export interface Profile {
    [prop: string]: any;
    id: number;
    loadgen?: LoadGenConfiguration;
    sut?: SUTConfiguration;
    networkClient?: NetworkEmulationConfiguration;
    networkServer?: NetworkEmulationConfiguration;
    name: string;
    description: string;
}

