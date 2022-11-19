import { SUTConfiguration, NetworkEmulationConfiguration, LoadGenConfiguration } from "@core/configuration/interface";

export interface Profile {
    [prop: string]: any;
    id: number;
    loadgen?: LoadGenConfiguration;
    sut?: SUTConfiguration;
    network_client?: NetworkEmulationConfiguration;
    network_server?: NetworkEmulationConfiguration;
    name: string;
    description: string;
}

