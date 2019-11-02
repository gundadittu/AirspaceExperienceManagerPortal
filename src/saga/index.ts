import * as authSagas from './auth';
import * as generalSagas from './general';
import * as servicePackageSagas from './servicePackage';

const sagas: {[index: string]: any} = {
  ...authSagas,
  ...generalSagas,
  ...servicePackageSagas
};

export default function registerWithMiddleware(middleware: { run: Function }) {
    for (let name in sagas) {
        middleware.run(sagas[name]);
    }
}
