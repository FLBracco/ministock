import { ConfigServer } from "../../config/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { UserService } from "../../user/services/user.service";
import { UserEntity } from "../../user/entities/user.entity";
import { PayloadToken } from "../interfaces/auth.interface";

export class AuthService extends ConfigServer{
    
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly jwtInstance = jwt,
    ){
        super();
    }

    public async validateUser(username: string, password: string): Promise<UserEntity | null>{
        const userByEmail = await this.userService.findUserByEmail(username);
        console.log(userByEmail);
        if(userByEmail){
            const isMatch = await bcrypt.compare(password, userByEmail.password);
            if(isMatch){
                return userByEmail;
            }
        }

        return null;
    }

    //JWT_SECRET_KEY
    
    sing(payload: jwt.JwtPayload, secret: any){
        return this.jwtInstance.sign(payload, secret);
    }

    public async generateJWT(
        user: UserEntity
    ): Promise<{ accessToken: string; user: UserEntity }>{
        const userConsult = await this.userService.findUserWithRole(
            user.id, 
            user.role
        );

        const payload: PayloadToken = {
            role: userConsult!.role,
            sub: `${userConsult!.id}`
        }

        if(userConsult){
            user.password = "Not permission";
        }

        return {
            accessToken: this.sing(payload, this.getEnviroment("JWT_SECRET_KEY")),
            user
        }
    }

}