
import {create, roleIs} from "./repository.js";


const creteUser=async  (name:string,clerkId:string)=>{
    return create(name,clerkId);
}
const roleUserIs=async(clerkId:string) => {
    return roleIs(clerkId)

}

export {creteUser,roleUserIs}