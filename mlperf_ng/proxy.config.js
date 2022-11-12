// https://angular.io/guide/build#proxying-to-a-backend-server
import { environment } from 'environments/environment';

const PROXY_CONFIG = {
    [`/${environment.authenticationKey}/**`]: {
        target: environment.mecBenchUrl,
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
    },
};

module.exports = PROXY_CONFIG;
