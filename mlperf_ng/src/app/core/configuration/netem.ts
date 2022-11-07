import { NetworkEmulationConfiguration } from "./interface";

export const defaultNetEmConfig: NetworkEmulationConfiguration = {
    enabled: false,
    delay: "0ms",
    bandwidth: "0mbit",
    randomLoss: "0%",
};
