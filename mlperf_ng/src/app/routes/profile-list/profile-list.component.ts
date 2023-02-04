import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '@core/mlperf_backend/interface';
import { ProfileService } from '@core/mlperf_backend/profile.service';

@Component({
    selector: 'app-profile-list',
    templateUrl: './profile-list.component.html',
    styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
    profiles: Profile[] = [];

    constructor(private profileService: ProfileService) {}

    ngOnInit(): void {
        this.getAllProfiles();
    }

    getAllProfiles(): void {
        this.profileService.getProfiles().subscribe(res => {
            this.profiles = res.profiles;
        });
    }
}
