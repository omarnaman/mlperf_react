import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    profileList: Profile[] = [];
    form!: FormGroup;
    profile = new Dropdown({
        key: 'profile',
        label: 'configuration.profile',
        validation: {
            required: true,
        },

    });

    constructor(
        private inputGeneratorService: InputGeneratorService,
        private profileService: ProfileService,
        private configurationStoreService: ConfigurationStoreService,
    ) {}

    ngOnInit(): void {
        this.form = this.inputGeneratorService.generateFromGroup([
            this.profile,
        ]);

        this.profileService.profiles$.subscribe((profileList: Profile[]) => {
            this.profileList = profileList;
            this.profile.options = profileList.map((profile: Profile) => {
                return { label: profile.name, value: profile.id.toString() };
            });
        });
    }

    onSave(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            let selectedProfile = this.profileList.find((profile: Profile) => {
                return profile.id.toString() === this.form.value.profile;
            });
            if (selectedProfile) {
                this.configurationStoreService.setConfiguration(selectedProfile);
            }
        }
    }
}
