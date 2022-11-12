import { MLPerfConfiguration } from "./interface";
import { defaultLoadGenConfiguration } from "./loadgen";
import { defaultSUTConfiguration } from "./sut";
import { defaultNetEmConfig } from "./netem";

export const defaultMLPerfConfiguration: MLPerfConfiguration = {
    loadgen: defaultLoadGenConfiguration,
    sut: defaultSUTConfiguration,
    networkClient: defaultNetEmConfig,
    networkServer: defaultNetEmConfig,
};