
export interface IHashingService {
    hashPassword(password: string): Promise<string> | string;
    comparePassword(password: string, hash: string): Promise<boolean> | boolean;
}