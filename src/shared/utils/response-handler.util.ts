export type Result<E, T> = [E] | [undefined, T]
export type PromiseResult<E, T> = Promise<Result<E, T>>

export interface CustomError extends Error {
    httpStatusCode: number
}

export function toResult<E extends CustomError, T>(callback: () => T): Result<E, T> {
    try {
        const res = callback();
        return [undefined, res as T]
    } catch (e) {
        return [e as E]
    }
}

export async function toResultAsync<E extends CustomError, T>(promise: Promise<T>): Promise<Result<E, T>> {
    try {
        const res = await promise;
        return [undefined, res as T]
    } catch (e) {
        return [e as E]
    }
}