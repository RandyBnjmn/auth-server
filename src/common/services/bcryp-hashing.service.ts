import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHashingService } from '../interfaces';


@Injectable()
export class BcrypHashingService implements IHashingService {
    genrateSalt(length: number): Promise<string> | string {
        return bcrypt.genSaltSync(length);
    }


    hashPassword(password: string): string {
        const salt = this.generateSalt();
        return bcrypt.hashSync(password, salt);
    }

    comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }
    private generateSalt(): string {
        const saltRounds = 10; // You can adjust the number of rounds as needed
        return bcrypt.genSaltSync(saltRounds);
    }
}
