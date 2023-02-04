import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigurationStoreService } from '@core/configuration/configuration.service';
import { LoadGenConfiguration, MLPerfConfiguration } from '@core/configuration/interface';
import { TranslateService } from '@ngx-translate/core';
import { Textbox } from '@shared/components/form-inputs/textbox/textbox';
import { ChartOptions } from '@shared/constants';
import {
    ExperimentLatency,
    ExperimentQps,
    LoadGenInstanceRequest,
} from '@shared/models/load-generator.model';
import { InputGeneratorService } from '@shared/services/input-generator.service';
import { ChartComponent } from 'ng-apexcharts';
import { combineLatest, Observable } from 'rxjs';
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
    public latencyQpsChartOptions!: Partial<ChartOptions>;
    latencies: ExperimentLatency[] = [];
    experimentQps: ExperimentQps[] = [];
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
        private configurationStoreService: ConfigurationStoreService,
        private translateService: TranslateService
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
            const selector = this.loadGen?.num_threads?.split('-')[0];
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
                    this.getChartData(eid);
                });
        }
    }

    getChartData(eid: string): void {
        combineLatest([this.getExperimentLatencies(eid), this.getExperimentQps(eid)]).subscribe(
            ([latencies, experimentQps]) => {
                this.latencies = latencies;
                this.experimentQps = experimentQps;
                this.plotLatencyChart(this.latencies);
                this.plotQpsChart(this.experimentQps);
                this.plotLatencyVsThroughputChart(this.latencies, this.experimentQps);
            }
        );
    }

    getExperimentLatencies(eid: string): Observable<ExperimentLatency[]> {
        return this.loadGeneratorService.getExperimentLatencies(eid);
    }

    getExperimentQps(eid: string): Observable<ExperimentQps[]> {
        return this.loadGeneratorService.getExperimentQps(eid);
    }

    plotLatencyChart(latencies: ExperimentLatency[]) {
        const latency10 : number[] = [];
        const latency50 : number[] = [];
        const latency90 : number[] = [];
        const latencySelectors : number[] = [];
        latencies.forEach(latency => {
            latencySelectors.push(parseInt(latency.selector));
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
                    name: this.translateService.instant('experiments.10th-percentile'),
                    data: latency10,
                },
                {
                    name: this.translateService.instant('experiments.50th-percentile'),
                    data: latency50,
                },
                {
                    name: this.translateService.instant('experiments.90th-percentile'),
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
                width: 5,
                curve: 'straight',
                // colors: ['#ff0000', '#00ff00', '#0000ff'],
            },
            title: {
                text: this.translateService.instant('experiments.latency-vs-number-of-threads'),
                align: 'left',
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: latencySelectors,
            },
        };
    }

    plotQpsChart(experimentQps: ExperimentQps[]): void {
        const qpsSelectors : number[] = [];
        const qpsData: number[] = [];
        experimentQps.forEach(qps => {
            qpsSelectors.push(parseInt(qps.selector));
            qpsData.push(parseFloat(qps.qps));
        });
        this.qpsChartOptions = {
            series: [
                {
                    name: this.translateService.instant('experiments.queries-per-second'),
                    data: qpsData,
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
                text: this.translateService.instant('experiments.throughput-vs-number-of-threads'),
                align: 'left',
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: qpsSelectors,
            },
        };
    }

    plotLatencyVsThroughputChart(latencies: ExperimentLatency[], experimentQps: ExperimentQps[]) {
        const qpsData = experimentQps.map(qps => parseFloat(qps.qps));
        const dataToPlot: any[] = [];
        latencies.forEach((latency, index) => {
            const latencyData = latency.latencies.split(',');
            const length = latencyData.length;
            latencyData.sort((latency1, latency2) => {
                return parseFloat(latency1) - parseFloat(latency2);
            });
            const latency95 = parseFloat(latencyData[Math.round(length * 0.95)]);
            dataToPlot.push([qpsData[index], latency95]);
        });

        this.latencyQpsChartOptions = {
            series: [{
              name: this.translateService.instant('experiments.95th-percentile'),
              data: dataToPlot,
            }],
            chart: {
              height: 350,
              type: 'scatter',
              zoom: {
                enabled: true,
                type: 'xy'
              }
            },
            title: {
                text: this.translateService.instant('experiments.latency-vs-throughput'),
                align: 'left',
            },
          };
    }
}
