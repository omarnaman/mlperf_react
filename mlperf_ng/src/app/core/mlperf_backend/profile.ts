import { Profile } from './interface';
import { defaultMLPerfConfiguration } from '@core/configuration/mlperfConfiguration';
import { defaultNetEmConfig, NetEmConfig_4G, NetEmConfig_5G } from '@core/configuration/netem';

export const Profile1: Profile = {
    id: 1,
    name: 'Coco SSD MobileNet Closed-loop 4G',
    description: 'Profile 1 description',
    loadgen: defaultMLPerfConfiguration.loadgen,
    sut: {
        ...defaultMLPerfConfiguration.sut,
        model: 'ssd-mobilenet',
        runtime: 'onnxruntime',
        modelThreads: 0,
        consumerThreads: 1,
    },
    networkClient: NetEmConfig_4G,
    networkServer: NetEmConfig_4G,
};

export const Profile2: Profile = {
    id: 2,
    name: 'SSD MobileNet Closed-loop 5G',
    description: 'Profile 2 description',
    loadgen: defaultMLPerfConfiguration.loadgen,
    sut: {
        ...defaultMLPerfConfiguration.sut,
        model: 'ssd-mobilenet',
        runtime: 'onnxruntime',
        modelThreads: 0,
        consumerThreads: 1,
    },
    networkClient: NetEmConfig_5G,
    networkServer: defaultNetEmConfig,

};

export const Profile3: Profile = {
    id: 3,
    name: 'SSD MobileNet Open-loop 5G',
    description: 'Profile 3 description',
    loadgen: defaultMLPerfConfiguration.loadgen,
    sut: {
        ...defaultMLPerfConfiguration.sut,
        model: 'ssd-mobilenet',
        runtime: 'onnxruntime',
        modelThreads: 0,
        consumerThreads: 1,

    },
    networkClient: NetEmConfig_5G,
    networkServer: defaultNetEmConfig,
};

export const defaultProfiles: Profile[] = [
    Profile1,
    Profile2,
    Profile3,
];
