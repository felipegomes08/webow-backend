import {IConfiguration} from "@interfaces/configuration";

export class Configuration implements IConfiguration {
    private _id?: string;
    private _pixel: string;
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

    get pixel(): string {
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

    set id(value: string) {
        this._id = value;
    }

    set pixel(value: string) {
        this._pixel = value;
    }

    set interface(value: object) {
        this._interface = value;
    }

    set system(value: object) {
        this._system = value;
    }

    set active(value: boolean) {
        this._active = value;
    }
}
