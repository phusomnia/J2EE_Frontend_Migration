export class BaseHandler {
    constructor() {
        console.log("BaseHandler init");
    }

    navigate(path: string): void {}
}

export class UrlHandler extends BaseHandler {
    constructor() {
        super();
        console.log("UrlHandler initialized");
    }

    static navigate(path: string): void {
        window.location.href = path;
    }
}
