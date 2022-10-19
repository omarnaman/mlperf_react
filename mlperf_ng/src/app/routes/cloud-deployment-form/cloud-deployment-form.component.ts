import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Checkbox } from '@shared/components/form-inputs/checkbox/checkbox';
import { Dropdown } from '@shared/components/form-inputs/dropdown/dropdown';
import { InputGeneratorService } from '@shared/services/input-generator.service';

@Component({
    selector: 'app-cloud-deployment-form',
    templateUrl: './cloud-deployment-form.component.html',
    styleUrls: ['./cloud-deployment-form.component.scss'],
})
export class CloudDeploymentFormComponent implements OnInit {
    form!: FormGroup;
    enableCloudDeployment = new Checkbox({
        key: 'enableCloudDeployment',
        label: 'configuration.enable-cloud-deployment'
    });
    cloudProvider = new Dropdown({
        key: 'cloudProvider',
        label: 'configuration.cloud-provider',
        validation: {
            required: true,
        },
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
            { label: 'Option 4', value: 'option4' },
        ],
    });

    constructor(private inputGeneratorService: InputGeneratorService) {}

    ngOnInit(): void {
        this.form = this.inputGeneratorService.generateFromGroup([
            this.enableCloudDeployment,
            this.cloudProvider,
        ]);
    }

    onSave(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            // logic here
        }
    }
}
