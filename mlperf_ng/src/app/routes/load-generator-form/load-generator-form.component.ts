import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Textbox } from '@shared/components/form-inputs/textbox/textbox';
import { Checkbox } from '@shared/components/form-inputs/checkbox/checkbox';
import { InputGeneratorService } from '@shared/services/input-generator.service';
import { Dropdown } from '@shared/components/form-inputs/dropdown/dropdown';

@Component({
    selector: 'app-load-generator-form',
    templateUrl: './load-generator-form.component.html',
    styleUrls: ['./load-generator-form.component.scss'],
})
export class LoadGeneratorFormComponent implements OnInit {
    form !: FormGroup;
    dataset = new Dropdown({
        key: 'dataset',
        label: 'configuration.data-set',
        validation: {
            required: true,
        },
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
        ],
    });
    scenario = new Dropdown({
        key: 'scenario',
        label: 'configuration.scenario',
        validation: {
            required: true,
        },
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
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
    });
    rangeOfClients = new Textbox({
        key: 'rangeOfClients',
        label: 'configuration.range-of-clients',
        type: 'number',
        validation: {
            required: true,
        },
    });
    recordAccuracy = new Checkbox({
        key: 'maxOutgoingQueries',
        label: 'configuration.record-accuracy',
    });
    time = new Textbox({
        key: 'time',
        label: 'configuration.time',
        type: 'number',
        validation: {
            required: true,
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
    });
    maxOutgoingQueries = new Textbox({
        key: 'maxOutgoingQueries',
        label: 'configuration.maximum-outgoing-queries',
        type: 'number',
        validation: {
            required: true,
        },
    });

    constructor(private inputGeneratorService: InputGeneratorService) {}

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
        ]);
    }

    onSave(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            // logic here
        }
    }
}
