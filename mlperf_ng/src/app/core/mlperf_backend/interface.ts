import { LoadGenConfiguration, SUTConfiguration, NetworkEmulationConfiguration } from "@core/configuration/interface";

export interface Profile {
    [prop: string]: any;
    loadgen?: LoadGenConfiguration;
    sut?: SUTConfiguration;
    networkClient?: NetworkEmulationConfiguration;
    networkServer?: NetworkEmulationConfiguration;
    id: number;
    name: string;
    description: string;
    
}

