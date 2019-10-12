import * as authSagas from './auth';
// import * as generalSagas from './general';

const sagas: {[index: string]: any} = {
  ...authSagas,
  // ...generalSagas
};

export default function registerWithMiddleware(middleware: { run: Function }) {
    for (let name in sagas) {
        middleware.run(sagas[name]);
    }
}
