export class UserPayload { //definimos a identificacao do user para ser carregada no jwt
    sub: number;
    email:string;
    iat?: number; //quando o token eh criado
    exp?: number; //quando o token vai expirar
}