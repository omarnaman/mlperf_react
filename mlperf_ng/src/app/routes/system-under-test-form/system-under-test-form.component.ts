import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dropdown } from '@shared/components/form-inputs/dropdown/dropdown';
import { Textbox } from '@shared/components/form-inputs/textbox/textbox';
import { InputGeneratorService } from '@shared/services/input-generator.service';

@Component({
    selector: 'app-system-under-test-form',
    templateUrl: './system-under-test-form.component.html',
    styleUrls: ['./system-under-test-form.component.scss'],
})
export class SystemUnderTestFormComponent implements OnInit {
    form!: FormGroup;
    modelThreads = new Textbox({
        key: 'modelThreads',
        label: 'configuration.model-threads',
        type: 'number',
        validation: {
            required: true,
            min: 0,
        },
    });
    model = new Dropdown({
        key: 'model',
        label: 'configuration.model',
        validation: {
            required: true,
        },
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
        ],
    });
    runtime = new Textbox({
        key: 'runtime',
        label: 'configuration.runtime',
        validation: {
            required: true,
        },
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ],
    });
    consumerThreads = new Textbox({
        key: 'consumerThreads',
        label: 'configuration.consumer-threads',
        type: 'number',
        validation: {
            required: true,
            min: 0,
        },
    });

    constructor(private inputGeneratorService: InputGeneratorService) {}

    ngOnInit(): void {
        this.form = this.inputGeneratorService.generateFromGroup([
            this.modelThreads,
            this.model,
            this.runtime,
            this.consumerThreads,
        ]);
    }

    onSave(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            // logic here
        }
    }
}
