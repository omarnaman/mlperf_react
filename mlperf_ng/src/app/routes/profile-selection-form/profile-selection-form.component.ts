import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Dropdown } from '@shared/components/form-inputs/dropdown/dropdown';
import { InputGeneratorService } from '@shared/services/input-generator.service';
import { ProfileService } from '@core/mlperf_backend/profile.service';
import { Profile } from '@core/mlperf_backend/interface';
import { ConfigurationStoreService } from '@core/configuration/configuration.service';

@Component({
    selector: 'profile-selection-form',
    templateUrl: './profile-selection-form.component.html',
    styleUrls: ['./profile-selection-form.component.scss'],
})
export class ProfileSelectionFormComponent implements OnInit {
    profiles: Profile[] = [];
    form!: FormGroup;
    profile = new Dropdown({
        key: 'profile',
        label: 'configuration.profile',
        validation: {
            required: true,
        },
    });
    description = '';

    constructor(
        private inputGeneratorService: InputGeneratorService,
        private profileService: ProfileService,
        private configurationStoreService: ConfigurationStoreService,
    ) {}

    ngOnInit(): void {
        this.form = this.inputGeneratorService.generateFromGroup([
            this.profile,
        ]);
        this.getAllProfiles();
    }

    getAllProfiles(): void {
        this.profileService.getProfiles().subscribe((res) => {
            this.profiles = res.profiles
            this.profile.options = this.profiles.map((profile: Profile) => {
                return { label: profile.name, value: profile.id.toString() };
            });
        });
    }

    onSave(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            let selectedProfile = this.profiles.find((profile: Profile) => {
                return profile.id.toString() === this.form.value.profile;
            });
            if (selectedProfile) {
                this.configurationStoreService.setConfiguration(selectedProfile);
            }
        }
    }

    onProfileUpdate(event: { input: Dropdown, control: FormControl }): void {
        if(event.control.value) {
            let selectedProfile = this.profiles.find((profile: Profile) => {
                return profile.id.toString() === this.form.value.profile;
            });
            this.description = selectedProfile?.description || '';
        }
    }
}
