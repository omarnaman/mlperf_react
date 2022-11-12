import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Textbox } from '@shared/components/form-inputs/textbox/textbox';
import { InputGeneratorService } from '@shared/services/input-generator.service';
import { Dropdown } from '@shared/components/form-inputs/dropdown/dropdown';
import { EXPERIMENT_MODES } from '@shared/constants';
import { LoadGenInstanceRequest } from '@shared/models/load-generator.model';
import { LoadGeneratorService } from '../services/load-generator.service';
import { ConfigurationStoreService } from '@core/configuration/configuration.service';
import { LoadGenConfiguration, MLPerfConfiguration } from '@core/configuration/interface';

@Component({
    selector: 'app-load-generator-form',
    templateUrl: './load-generator-form.component.html',
    styleUrls: ['./load-generator-form.component.scss'],
})
export class LoadGeneratorFormComponent implements OnInit {
    loadgen?: LoadGenConfiguration;
    form !: FormGroup;
    eid = new Textbox({
        key: 'eid',
        label: 'configuration.experiment-id',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.eid-hint',
        },
    });
    dataset = new Dropdown({
        key: 'dataset_id',
        label: 'configuration.dataset',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.dataset-hint',
        },
        options: [
            { label: 'Coco', value: 'Coco' },
            { label: 'Squad', value: 'squad' },
        ],
    });
    scenario = new Dropdown({
        key: 'scenario',
        label: 'configuration.scenario',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.scenario-hint',
        },
        options: [
            { label: 'configuration.single-stream', value: 'SingleStream' },
            { label: 'configuration.multi-stream', value: 'MultiStream' },
            { label: 'configuration.offline', value: 'Offline' },
            { label: 'configuration.server', value: 'Server' },
        ],
    });
    repeat = new Textbox({
        key: 'repeats',
        label: 'configuration.repeat',
        type: 'number',
        validation: {
            min: 0,
        },
        config: {
            hint: 'configuration.repeat-hint',
        },
    });
    numberOfThreads = new Textbox({
        key: 'num_threads',
        label: 'configuration.number-of-threads',
        type: 'number',
        validation: {
            required: true,
            min: 0,
        },
        config: {
            hint: 'configuration.number-of-threads-hint',
        },
    });
    minDuration = new Textbox({
        key: 'min_duration',
        label: 'configuration.min-duration',
        type: 'number',
        validation: {
            required: true,
            min: 0,
        },
        config: {
            hint: 'configuration.min-duration-hint',
        },
    });
    maxDuration = new Textbox({
        key: 'max_duration',
        label: 'configuration.max-duration',
        type: 'number',
        validation: {
            required: true,
            min: 0,
        },
        config: {
            hint: 'configuration.max-duration-hint',
        },
    });
    targetQps = new Textbox({
        key: 'target_qps',
        label: 'configuration.target-qps',
        type: 'number',
        validation: {
            required: true,
            min: 0,
        },
        config: {
            hint: 'configuration.target-qps-hint',
        },
    });
    mode = new Dropdown({
        key: 'mode',
        label: 'configuration.mode',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.mode-hint',
        },
        options: [
            { label: 'configuration.submission-run', value: EXPERIMENT_MODES.SUBMISSION_RUN + '' },
            { label: 'configuration.accuracy-only', value: EXPERIMENT_MODES.ACCURACY_ONLY + '' },
            {
                label: 'configuration.performance-only',
                value: EXPERIMENT_MODES.PERFORMANCE_ONLY + '',
            },
            {
                label: 'configuration.peak-performance',
                value: EXPERIMENT_MODES.PEAK_PERFORMANCE + '',
            },
        ],
    });
    samplesPerQuery = new Textbox({
        key: 'samples_per_query',
        label: 'configuration.samples-per-query',
        type: 'number',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.samples-per-query-hint',
        },
    });
    maxOutgoingQueries = new Textbox({
        key: 'max_async_queries',
        label: 'configuration.maximum-outgoing-queries',
        type: 'number',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.max-outgoing-queries-hint',
        },
    });

    constructor(
        private inputGeneratorService: InputGeneratorService,
        private loadGeneratorService: LoadGeneratorService,
        private configurationStoreService: ConfigurationStoreService
    ) {}

    ngOnInit(): void {
        this.form = this.inputGeneratorService.generateFromGroup([
            this.eid,
            this.dataset,
            this.scenario,
            this.repeat,
            this.numberOfThreads,
            this.minDuration,
            this.maxDuration,
            this.targetQps,
            this.mode,
            this.samplesPerQuery,
            this.maxOutgoingQueries,
        ]);
        this.configurationStoreService.configuration$.subscribe((mlperfConfiguration: MLPerfConfiguration) => {
            this.loadgen = mlperfConfiguration.loadgen;
            this.form.patchValue(this.loadgen!!);
        });
    }

    onSave(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.loadgen = {
                dataset: this.form.get('dataset')?.value,
                scenario: this.form.get('scenario')?.value,
                sampleCount: parseInt(this.form.get('sampleCount')?.value),
                rangeOfClients: this.form.get('rangeOfClients')?.value,
                recordAccuracy: this.form.get('recordAccuracy')?.value,
                time: parseInt(this.form.get('time')?.value),
                pipelineRequests: this.form.get('pipelineRequests')?.value,
                samplesPerQuery: parseInt(this.form.get('samplesPerQuery')?.value),
                maxOutgoingQueries: parseInt(this.form.get('maxOutgoingQueries')?.value),
                eid: this.form.get('eid')?.value,
            }
            this.runLoadGeneratorService();
        }
        console.log(this.loadgen);
        this.configurationStoreService.setLoadGen(this.loadgen!!);
    }

    runLoadGeneratorService(): void {
        const eid = this.form.value[this.eid.key];
        const selector = 'some_scenario';
        const payload: LoadGenInstanceRequest = {
            models: [
                {
                    model_name: '*',
                    scenarios: [
                        {
                            scenario_name: '*',
                            config: {
                                num_threads: this.form.value[this.numberOfThreads.key],
                                min_duration: this.form.value[this.minDuration.key],
                                max_duration: this.form.value[this.maxDuration.key],
                                target_qps: this.form.value[this.targetQps.key],
                                mode: this.form.value[this.mode.key],
                                samples_per_query: this.form.value[this.samplesPerQuery.key],
                                max_async_queries: this.form.value[this.maxOutgoingQueries.key],
                            },
                        },
                    ],
                },
            ],
            dataset_id: "s3://mlperf-cocodatasets/300.tar.gz",
            scenario: this.form.value[this.scenario.key],
            repeats: this.form.value[this.repeat.key],
        };
        this.loadGeneratorService.runLoadGeneratorInstance(eid, selector, payload).subscribe(res => console.log(res));
    }
}

