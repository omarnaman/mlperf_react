import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '@core/mlperf_backend/interface';
import { ProfileService } from '@core/mlperf_backend/profile.service';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
    @Input() profile!: Profile;
    @Output() profileUpdated = new EventEmitter<any>();

    constructor(private profileService: ProfileService, private dialog: MatDialog) {}

    ngOnInit(): void {}

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
}
