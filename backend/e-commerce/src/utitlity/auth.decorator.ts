import { SetMetadata } from "@nestjs/common";
import { Roles } from "./roles/user-role.enum";
import { AUTH_TYPE_KEY } from "./constant";


export const Auth=(...authTypes:string[]) => SetMetadata(AUTH_TYPE_KEY, authTypes)