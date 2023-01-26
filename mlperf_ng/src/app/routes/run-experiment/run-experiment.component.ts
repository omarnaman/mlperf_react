import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigurationStoreService } from '@core/configuration/configuration.service';
import { LoadGenConfiguration, MLPerfConfiguration } from '@core/configuration/interface';
import { Textbox } from '@shared/components/form-inputs/textbox/textbox';
import { ChartOptions } from '@shared/constants';
import {
    ExperimentLatency,
    ExperimentQps,
    LoadGenInstanceRequest,
} from '@shared/models/load-generator.model';
import { InputGeneratorService } from '@shared/services/input-generator.service';
import { ChartComponent } from 'ng-apexcharts';
import { LoadGeneratorService } from '../services/load-generator.service';

@Component({
    selector: 'app-run-experiment',
    templateUrl: './run-experiment.component.html',
    styleUrls: ['./run-experiment.component.scss'],
})
export class RunExperimentComponent implements OnInit {
    @ViewChild('chart') chart!: ChartComponent;
    public latencyChartOptions!: Partial<ChartOptions>;
    public qpsChartOptions!: Partial<ChartOptions>;
    form!: FormGroup;
    loadGen?: LoadGenConfiguration;
    eid = new Textbox({
        key: 'eid',
        label: 'configuration.experiment-id',
        validation: {
            required: true,
        },
        config: {
            hint: 'configuration.eid-hint',
        },
    });

    constructor(
        private inputGeneratorService: InputGeneratorService,
        private loadGeneratorService: LoadGeneratorService,
        private configurationStoreService: ConfigurationStoreService
    ) {}

    ngOnInit(): void {
        this.form = this.inputGeneratorService.generateFromGroup([this.eid]);
        this.getLoadGenConfiguration();
    }

    getLoadGenConfiguration() {
        this.configurationStoreService.configuration$.subscribe(
            (mlperfConfiguration: MLPerfConfiguration | undefined) => {
                this.loadGen = mlperfConfiguration?.loadgen;
            }
        );
    }

    onRunClick(): void {
        this.form.markAllAsTouched();
        if (this.form.valid && this.loadGen) {
            this.runLoadGeneratorService();
        }
    }

    runLoadGeneratorService(): void {
        if (this.loadGen) {
            const eid = this.form.value[this.eid.key];
            const selector = 'some_scenario';
            const payload: LoadGenInstanceRequest = {
                models: [
                    {
                        model_name: '*',
                        scenarios: [
                            {
                                scenario_name: '*',
                                config: {
                                    num_threads: this.loadGen?.num_threads,
                                    min_duration: this.loadGen?.min_duration,
                                    max_duration: this.loadGen?.max_duration,
                                    target_qps: this.loadGen?.target_qps,
                                    mode: this.loadGen?.mode,
                                    samples_per_query: this.loadGen?.samples_per_query,
                                    max_async_queries: this.loadGen?.max_async_queries,
                                },
                            },
                        ],
                    },
                ],
                dataset_id: this.loadGen?.dataset_id,
                scenario: this.loadGen?.scenario,
                repeats: this.loadGen?.repeats,
            };
            this.loadGeneratorService
                .runLoadGeneratorInstance(eid, selector, payload)
                .subscribe(() => {
                    this.getExperimentLatencies(eid);
                    this.getExperimentQps(eid);
                });
        }
    }

    getExperimentLatencies(eid: string): void {
        this.loadGeneratorService
            .getExperimentLatencies(eid)
            .subscribe(latencies => this.plotLatencyChart(latencies));
    }

    getExperimentQps(eid: string): void {
        this.loadGeneratorService
            .getExperimentQps(eid)
            .subscribe(experimentQps => this.plotQpsChart(experimentQps));
    }

    plotLatencyChart(latencies: ExperimentLatency[]) {
        const latency10: number[] = [];
        const latency50: number[] = [];
        const latency90: number[] = [];
        const latencySelectors: string[] = [];
        latencies.forEach(latency => {
            latencySelectors.push(latency.selector);
            const latencyData = latency.latencies.split(',');
            const length = latencyData.length;
            latencyData.sort((latency1, latency2) => {
                return parseFloat(latency1) - parseFloat(latency2);
            });
            latency10.push(parseFloat(latencyData[Math.round(length * 0.1)]));
            latency50.push(parseFloat(latencyData[Math.round(length * 0.5)]));
            latency90.push(parseFloat(latencyData[Math.round(length * 0.9)]));
        });
        this.latencyChartOptions = {
            series: [
                {
                    name: '10th Percentile',
                    data: latency10,
                },
                {
                    name: '50th Percentile',
                    data: latency50,
                },
                {
                    name: '90th Percentile',
                    data: latency90,
                },
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'straight',
            },
            title: {
                text: latencySelectors[0],
                align: 'left',
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            // xaxis: {
            //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            // },
        };
        // TODO: scenarios, x-axis, translate labels
    }

    plotQpsChart(experimentQps: ExperimentQps[]): void {
        const qpsSelectors: string[] = [];
        const qpsData: number[] = [];
        experimentQps.forEach(qps => {
            qpsSelectors.push(qps.selector);
            qpsData.push(parseFloat(qps.qps));
        });
        this.qpsChartOptions = {
            series: [
                {
                    name: 'Queries Per Second',
                    data: qpsData,
                }
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'straight',
            },
            title: {
                text: qpsSelectors[0],
                align: 'left',
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            // xaxis: {
            //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            // },
        };
    }
}
