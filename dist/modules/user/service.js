import { create, roleIs } from "./repository.js";
const creteUser = async (name, clerkId) => {
    return create(name, clerkId);
};
const roleUserIs = async (clerkId) => {
    return roleIs(clerkId);
};
export { creteUser, roleUserIs };
