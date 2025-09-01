import { AuthService } from "../services/auth.service";
import { Strategy as JwtStr, StrategyOptionsWithoutRequest as StrategyOptions, ExtractJwt} from "passport-jwt"
import { PayloadToken } from "../interfaces/auth.interface";
import { PassportUse } from "../utils/passport.use";

export class JwtStrategy extends AuthService{
    constructor(){
        super();
    }

    async validate(payload: PayloadToken,done: any){
        return done(null, payload);
    }

    get use(){
        return PassportUse<JwtStr, StrategyOptions, (payload: PayloadToken, done: any)=> Promise<PayloadToken>>(
            "jwt", 
            JwtStr, 
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: this.getEnviroment("JWT_SECRET_KEY")!
            }, this.validate
        )
    }

}