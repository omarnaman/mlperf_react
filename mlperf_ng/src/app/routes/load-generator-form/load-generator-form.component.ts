import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Textbox } from '@shared/components/form-inputs/textbox/textbox';
import { Checkbox } from '@shared/components/form-inputs/checkbox/checkbox';
import { InputGeneratorService } from '@shared/services/input-generator.service';
import { Dropdown } from '@shared/components/form-inputs/dropdown/dropdown';
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
    dataset = new Dropdown({
        key: 'dataset',
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
            { label: 'SingleStream', value: 'SingleStream' },
            { label: 'MultiStream', value: 'MultiStream' },
            { label: 'Offline', value: 'Offline' },
            { label: 'Server', value: 'Server' },
        ],
    });
    sampleCount = new Textbox({
        key: 'sampleCount',
        label: 'configuration.sample-count',
        type: 'number',
        validation: {
            required: true,
            min: 0,
        },
        config: {
            hint: 'configuration.sample-count-hint',
        },
    });
    rangeOfClients = new Textbox({
        key: 'rangeOfClients',
        label: 'configuration.range-of-clients',
        type: 'number',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.range-of-clients-hint',
        },
    });
    recordAccuracy = new Checkbox({
        key: 'recordAccuracy',
        label: 'configuration.record-accuracy',
    });
    time = new Textbox({
        key: 'time',
        label: 'configuration.time',
        type: 'number',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.time-hint',
        },
    });
    pipelineRequests = new Checkbox({
        key: 'pipelineRequests',
        label: 'configuration.pipeline-requests',
    });
    samplesPerQuery = new Textbox({
        key: 'samplesPerQuery',
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
        key: 'maxOutgoingQueries',
        label: 'configuration.maximum-outgoing-queries',
        type: 'number',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.max-outgoing-queries-hint',
        },
    });
    eid = new Textbox({
        key: 'eid',
        label: 'configuration.experiment-id',
        type: 'text',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.eid-hint',
        },
    });

    constructor(private inputGeneratorService: InputGeneratorService, private configurationStoreService: ConfigurationStoreService) { }

    ngOnInit(): void {
        this.form = this.inputGeneratorService.generateFromGroup([
            this.dataset,
            this.scenario,
            this.sampleCount,
            this.rangeOfClients,
            this.recordAccuracy,
            this.time,
            this.pipelineRequests,
            this.samplesPerQuery,
            this.maxOutgoingQueries,
            this.eid,
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
        }
        console.log(this.loadgen);
        this.configurationStoreService.setLoadGen(this.loadgen!!);
    }
}

