import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Textbox } from '@shared/components/form-inputs/textbox/textbox';
import { InputGeneratorService } from '@shared/services/input-generator.service';
import { Dropdown } from '@shared/components/form-inputs/dropdown/dropdown';
import { EXPERIMENT_MODES, SCENARIOS } from '@shared/constants';
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
    loadGen?: LoadGenConfiguration;
    form!: FormGroup;
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
        options: [{ label: 'Coco', value: 's3://mlperf-cocodatasets/300.tar.gz' }],
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
            { label: 'configuration.single-stream', value: SCENARIOS.SINGLE_STREAM },
            { label: 'configuration.multi-stream', value: SCENARIOS.MULTI_STREAM },
            { label: 'configuration.offline', value: SCENARIOS.OFFLINE },
            { label: 'configuration.server', value: SCENARIOS.SERVER },
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
        this.addFormControls();
        this.getLoadGenConfiguration();
    }

    addFormControls(): void {
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
    }

    getLoadGenConfiguration() {
        this.configurationStoreService.configuration$.subscribe(
            (mlperfConfiguration: MLPerfConfiguration) => {
                this.loadGen = mlperfConfiguration.loadgen;
                this.form.patchValue({ ...this.loadGen });
            }
        );
    }

    onSave(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.loadGen = {
                ...this.form.value,
                [this.repeat.key]: parseInt(this.form.value[this.repeat.key]),
            };
            this.configurationStoreService.setLoadGen(this.loadGen!!);
        }
    }
}
