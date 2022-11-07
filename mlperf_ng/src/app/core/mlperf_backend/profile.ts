import { Profile } from './interface';
import { defaultMLPerfConfiguration } from '@core/configuration/mlperfConfiguration';

export const Profile1: Profile = {
    id: 1,
    name: 'Default Profile 1',
    description: 'Profile 1 description',
    loadgen: defaultMLPerfConfiguration.loadgen,
    sut: defaultMLPerfConfiguration.sut,
    networkClient: defaultMLPerfConfiguration.networkClient,
};
export const Profile2: Profile = {
    id: 2,
    name: 'Default Profile 2',
    description: 'Profile 2 description',
    loadgen: defaultMLPerfConfiguration.loadgen,
    sut: defaultMLPerfConfiguration.sut,
    networkClient: defaultMLPerfConfiguration.networkClient,
    
};


export const defaultProfiles: Profile[] = [
    Profile1,
    Profile2,
];
