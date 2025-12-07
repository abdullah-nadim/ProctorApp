export type Constructor<T = {}> = new (...args: any[]) => T;

export class Base {
    protected isLoading = false;
    startLoading() {
        this.isLoading = true;
    }
    stopLoading() {
        this.isLoading = false;
    }
    onServiceError(error: any): void { console.log(error); }
    onServiceCompleted(): void { console.log('completed'); this.stopLoading(); }
}