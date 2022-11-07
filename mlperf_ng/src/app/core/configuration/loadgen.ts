import { LoadGenConfiguration } from "./interface";

export const defaultLoadGenConfiguration: LoadGenConfiguration = {
    dataset: 0,
    scenario: 0,
    sampleCount: 1024,
    rangeOfClients: 1,
    recordAccuracy: false,
    time: 10,
    pipelineRequests: 1,
    samplesPerQuery: 1,
    maxOutgoingQueries: 1,
};
