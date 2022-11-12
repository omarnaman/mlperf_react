import { LoadGenConfiguration } from "./interface";

export const defaultLoadGenConfiguration: LoadGenConfiguration = {
    dataset: "Coco",
    scenario: "SingleStream",
    sampleCount: 1024,
    rangeOfClients: 1,
    recordAccuracy: false,
    time: 10,
    pipelineRequests: false,
    samplesPerQuery: 1,
    maxOutgoingQueries: 1,
};
