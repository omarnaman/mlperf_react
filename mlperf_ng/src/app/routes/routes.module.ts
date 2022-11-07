import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LoadGeneratorFormComponent } from './load-generator-form/load-generator-form.component';
import { SystemUnderTestFormComponent } from './system-under-test-form/system-under-test-form.component';
import { NetworkEmulationFormComponent } from './network-emulation-form/network-emulation-form.component';
import { CloudDeploymentFormComponent } from './cloud-deployment-form/cloud-deployment-form.component';
import { ProfileSelectionFormComponent } from './profile-selection-form/profile-selection-form.component';
const COMPONENTS: any[] = [
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    LoadGeneratorFormComponent,
    SystemUnderTestFormComponent,
    NetworkEmulationFormComponent,
    CloudDeploymentFormComponent,
    ProfileSelectionFormComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
    imports: [SharedModule, RoutesRoutingModule, NgApexchartsModule],
    declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class RoutesModule {}
