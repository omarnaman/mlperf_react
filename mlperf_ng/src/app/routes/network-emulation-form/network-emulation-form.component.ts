import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Checkbox } from '@shared/components/form-inputs/checkbox/checkbox';
import { Textbox } from '@shared/components/form-inputs/textbox/textbox';
import { InputGeneratorService } from '@shared/services/input-generator.service';

@Component({
    selector: 'app-network-emulation-form',
    templateUrl: './network-emulation-form.component.html',
    styleUrls: ['./network-emulation-form.component.scss'],
})
export class NetworkEmulationFormComponent implements OnInit {
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

    constructor(private inputGeneratorService: InputGeneratorService) {}

    ngOnInit(): void {
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

    onSave(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            // logic here
        }
    }
}
