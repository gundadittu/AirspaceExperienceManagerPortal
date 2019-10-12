const sagas: {[index: string]: any} = {

};

export default function registerWithMiddleware(middleware: { run: Function }) {
    for (let name in sagas) {
        middleware.run(sagas[name]);
    }
}
