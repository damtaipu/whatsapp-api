export default interface RtnBaseData<T = unknown> {
    code: number;
    message?: string;
    data: T;
}
