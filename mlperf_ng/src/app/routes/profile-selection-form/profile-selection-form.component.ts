import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dropdown } from '@shared/components/form-inputs/dropdown/dropdown';
import { InputGeneratorService } from '@shared/services/input-generator.service';
import { ProfileService } from '@core/mlperf_backend/profile.service';
import { Profile } from '@core/mlperf_backend/interface';

@Component({
    selector: 'profile-selection-form',
    templateUrl: './profile-selection-form.component.html',
    styleUrls: ['./profile-selection-form.component.scss'],
})
export class ProfileSelectionFormComponent implements OnInit {
    profileService = new ProfileService();
    form!: FormGroup;
    profile = new Dropdown({
        key: 'profile',
        label: 'configuration.profile',
        validation: {
            required: true,
        },
        options: this.profileService.list().map((profile: Profile) => {
            return { label: profile.name, value: profile.id.toString() };
        }),
    });

    constructor(private inputGeneratorService: InputGeneratorService) {}

    ngOnInit(): void {
        this.form = this.inputGeneratorService.generateFromGroup([
            this.profile,
        ]);
    }

    onSave(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            // logic here
        }
    }
}
