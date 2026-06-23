import { create } from "./repository.js";
const createReview = async (UserId, ProductId) => {
    return create(UserId, ProductId);
};
export { createReview };
