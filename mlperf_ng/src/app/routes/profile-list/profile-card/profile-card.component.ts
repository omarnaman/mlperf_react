import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '@core/mlperf_backend/interface';
import { ProfileService } from '@core/mlperf_backend/profile.service';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { Checkbox } from '@shared/components/form-inputs/checkbox/checkbox';
import { InputGeneratorService } from '@shared/services/input-generator.service';

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit, OnChanges {
    @Input() profile!: Profile;
    @Input() selected = false;
    @Output() profileUpdated = new EventEmitter<any>();
    @Output() profileSelected = new EventEmitter<any>();
    selectProfile = new Checkbox({
        key: 'selectProfile',
        label: 'configuration.select-this-profile'
    });
    form!: FormGroup;

    constructor(
        private profileService: ProfileService,
        private dialog: MatDialog,
        private inputGeneratorService: InputGeneratorService,
    ) {}

    ngOnInit(): void {
        this.selectProfile.value = this.selected;
        this.form = this.inputGeneratorService.generateFromGroup([this.selectProfile]);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.selected && this.form) {
            this.form.get(this.selectProfile.key)?.patchValue(this.selected);
        }
    }

    openConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, { width: '400px' });
        dialogRef.componentInstance.message = 'configuration.delete-profile-confirmation';
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.deleteProfile();
            }
        });
    }

    deleteProfile(): void {
        this.profileService
            .deleteProfile(this.profile.id)
            .subscribe(() => this.profileUpdated.emit());
    }

    onProfileSelectUpdate(event: { input: Checkbox, control: FormControl}): void {
        if (event.control.value) {
            this.profileSelected.emit();
        }
    }
}
