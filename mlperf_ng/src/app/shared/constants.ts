import {
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexGrid,
    ApexStroke,
    ApexTitleSubtitle,
} from 'ng-apexcharts';

export const EXPERIMENT_MODES = {
    SUBMISSION_RUN: 0,
    ACCURACY_ONLY: 1,
    PERFORMANCE_ONLY: 2,
    PEAK_PERFORMANCE: 3,
};

export const SCENARIOS = {
    SINGLE_STREAM: 'SingleStream',
    MULTI_STREAM: 'MultiStream',
    OFFLINE: 'Offline',
    SERVER: 'Server',
};

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
};
