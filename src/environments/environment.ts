// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { WebStorageStateStore } from 'oidc-client';

export const environment = {
  production: false,

  oidcClientConfig: {
    authority: 'https://localhost:5001',
    client_id: 'spa',
    redirect_uri: window.location.origin + '/auth-callback',
    includeIdTokenInSilentRenew: true,

    response_type: 'id_token token',
    scope: 'openid profile api',

    // this will toggle if profile endpoint is used
    loadUserInfo: true,

    // silent renew will get a new access_token via an iframe
    // just prior to the old access_token expiring (60 seconds prior)
    silent_redirect_uri: window.location.origin + '/silent.html',
    automaticSilentRenew: true,

    // will revoke (reference) access tokens at logout time
    revokeAccessTokenOnSignout: true,

    filterProtocolClaims: true,
    userStore: new WebStorageStateStore({ store: window.localStorage })
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
