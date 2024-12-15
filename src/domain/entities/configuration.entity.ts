import {IConfiguration} from "@interfaces/configuration";

export class Configuration implements IConfiguration {
    private _id?: string;
    private _pixel: object;
    private _interface: object;
    private _system: object;
    private _active: boolean;

    constructor(data: IConfiguration) {
        this._id = data.id;
        this._pixel = data.pixel;
        this._interface = data.interface;
        this._system = data.system;
        this._active = data.active;
    }

    get id(): string | undefined {
        return this._id;
    }

    get pixel(): object {
        return this._pixel;
    }

    get interface(): object {
        return this._interface;
    }

    get system(): object {
        return this._system;
    }

    get active(): boolean {
        return this._active;
    }
}
