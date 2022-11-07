import { NetworkEmulationConfiguration } from "./interface";

export const defaultNetEmConfig: NetworkEmulationConfiguration = {
    enabled: false,
    tcDelay: "0ms",
    tcBandwidth: "0mbit",
    tcJitter: "0ms",
    randomLoss: "0%",
};


export const NetEmConfig_4G: NetworkEmulationConfiguration = {
    enabled: true,
    tcDelay: "10ms",
    tcBandwidth: "12.5Mbit",
    tcJitter: "0ms",
    randomLoss: "0%",
};

export const NetEmConfig_5G: NetworkEmulationConfiguration = {
    enabled: true,
    tcDelay: "1ms",
    tcBandwidth: "10Gbit",
    tcJitter: "0ms",
    randomLoss: "0%",
};