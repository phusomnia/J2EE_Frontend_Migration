export class BaseHandler {
  constructor() {
    console.log('BaseHandler init');
  }

  navigate(path: string): void {}
}

export class UrlHandler extends BaseHandler {
  constructor() {
    super();
    console.log('UrlHandler initialized');
  }

  static navigate(path: string): void {
    window.location.href = path;
  }

  static navigatePrev(path: string): void {
    UrlHandler.navigate(path);
  }

  static navigateNext(
    formValue: any,
    setFormValue: any,
    formName: string,
    initValue: any,
  ): void {
    let initId = '';
    initId = crypto.randomUUID();
    if (!formValue[formName] || formValue[formName].length === 0) {
      setFormValue(formName, [{ Id: initId, ...initValue }]);
    } else if (formValue[formName].length >= 1) {
      return UrlHandler.navigate(
        `/build-cv/${formName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
      );
    }
    return UrlHandler.navigate(
      `/build-cv/${formName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}/detail/${initId}`,
    );
  }
}
