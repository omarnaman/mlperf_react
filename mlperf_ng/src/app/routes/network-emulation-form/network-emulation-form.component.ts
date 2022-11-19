import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Checkbox } from '@shared/components/form-inputs/checkbox/checkbox';
import { Textbox } from '@shared/components/form-inputs/textbox/textbox';
import { InputGeneratorService } from '@shared/services/input-generator.service';
import { ConfigurationStoreService } from '@core/configuration/configuration.service';
import { NetworkEmulationConfiguration, MLPerfConfiguration } from '@core/configuration/interface';

@Component({
    selector: 'app-network-emulation-form',
    templateUrl: './network-emulation-form.component.html',
    styleUrls: ['./network-emulation-form.component.scss'],
})
export class NetworkEmulationFormComponent implements OnInit {
    serverNetEm?: NetworkEmulationConfiguration;
    clientNetEm?: NetworkEmulationConfiguration;
    form!: FormGroup;
    enableClientSideEmulation = new Checkbox({
        key: 'enableClientSideTrafficEmulation',
        label: 'configuration.enable-client-side-traffic-emulation'
    });
    clientTcDelay = new Textbox({
        key: 'clientTcDelay',
        label: 'configuration.tc-delay',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.tc-delay-hint',
        },
    });
    clientTcJitter = new Textbox({
        key: 'clientTcJitter',
        label: 'configuration.tc-jitter',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.tc-jitter-hint',
        },
    });
    clientTcBandwidth = new Textbox({
        key: 'clientTcBandwidth',
        label: 'configuration.tc-bandwidth',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.tc-bandwidth-hint',
        },
    });
    clientRandomLoss = new Textbox({
        key: 'clientRandomLoss',
        label: 'configuration.tc-random-loss',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.tc-random-loss-hint',
        },
    });
    enableServerSideEmulation = new Checkbox({
        key: 'enableServerSideEmulation',
        label: 'configuration.enable-server-side-traffic-emulation'
    });
    serverTcDelay = new Textbox({
        key: 'serverTcDelay',
        label: 'configuration.tc-delay',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.tc-delay-hint',
        },
    });
    serverTcJitter = new Textbox({
        key: 'serverTcJitter',
        label: 'configuration.tc-jitter',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.tc-jitter-hint',
        },
    });
    serverTcBandwidth = new Textbox({
        key: 'serverTcBandwidth',
        label: 'configuration.tc-bandwidth',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.tc-bandwidth-hint',
        },
    });
    serverRandomLoss = new Textbox({
        key: 'serverRandomLoss',
        label: 'configuration.tc-random-loss',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.tc-random-loss-hint',
        },
    });

    constructor(
        private inputGeneratorService: InputGeneratorService,
        private configurationStoreService: ConfigurationStoreService,
    ) { }

    ngOnInit(): void {
        this.addFormControls();
        this.getNetworkEmulationValues();
    }

    addFormControls(): void {
        this.form = this.inputGeneratorService.generateFromGroup([
            this.enableClientSideEmulation,
            this.clientTcDelay,
            this.clientTcJitter,
            this.clientTcBandwidth,
            this.clientRandomLoss,
            this.enableServerSideEmulation,
            this.serverTcDelay,
            this.serverTcJitter,
            this.serverTcBandwidth,
            this.serverRandomLoss,
        ]);
    }

    getNetworkEmulationValues(): void {
        this.configurationStoreService.configuration$.subscribe((mlperfConfiguration: MLPerfConfiguration) => {
            this.clientNetEm = mlperfConfiguration.network_client;
            this.serverNetEm = mlperfConfiguration.network_server;
            this.form.patchValue({
                enableClientSideTrafficEmulation: this.clientNetEm?.enabled,
                clientTcDelay: this.clientNetEm?.tcDelay,
                clientTcJitter: this.clientNetEm?.tcJitter,
                clientTcBandwidth: this.clientNetEm?.tcBandwidth,
                clientRandomLoss: this.clientNetEm?.randomLoss,
                enableServerSideEmulation: this.serverNetEm?.enabled,
                serverTcDelay: this.serverNetEm?.tcDelay,
                serverTcJitter: this.serverNetEm?.tcJitter,
                serverTcBandwidth: this.serverNetEm?.tcBandwidth,
                serverRandomLoss: this.serverNetEm?.randomLoss,
            });
        });
    }

    onSave(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.clientNetEm = {
                enabled: this.form.value.enableClientSideTrafficEmulation,
                tcDelay: this.form.value.clientTcDelay,
                tcJitter: this.form.value.clientTcJitter,
                tcBandwidth: this.form.value.clientTcBandwidth,
                randomLoss: this.form.value.clientRandomLoss,
            };
            this.serverNetEm = {
                enabled: this.form.value.enableServerSideEmulation,
                tcDelay: this.form.value.serverTcDelay,
                tcJitter: this.form.value.serverTcJitter,
                tcBandwidth: this.form.value.serverTcBandwidth,
                randomLoss: this.form.value.serverRandomLoss,
            };
            this.configurationStoreService.setNetworkEmulation(this.clientNetEm);
            this.configurationStoreService.setNetworkEmulation(this.serverNetEm, true);
        }
    }
}
