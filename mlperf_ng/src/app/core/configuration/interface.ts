export interface LoadGenConfiguration {
    eid?: string;
    num_threads: string;
    max_duration: string;
    min_duration: string;
    target_qps: string;
    mode: string;
    samples_per_query: string;
    max_async_queries: string;
    dataset_id: string;
    scenario: string;
    repeats?: number;
}

export interface SUTConfiguration {
    [prop: string]: any;
    modelThreads: number;
    model: string;
    runtime: string;
    consumerThreads: number;
}

export interface NetworkEmulationConfiguration {
    [prop: string]: any;
    enabled: boolean;
    tcDelay: string;
    tcBandwidth: string;
    tcJitter: string;
    randomLoss: string;
}

export interface MLPerfConfiguration {
    [prop: string]: any;
    loadgen?: LoadGenConfiguration;
    sut?: SUTConfiguration;
    network_client?: NetworkEmulationConfiguration;
    network_server?: NetworkEmulationConfiguration;
}

