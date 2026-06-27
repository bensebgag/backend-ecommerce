import { roleIs, update } from "./repository.js";

const roleUserIs = async (clerkId: string) => {
  return roleIs(clerkId);
};

const updateUser = async (
  clerkId: string,
  {
    FirstName,
    LastName,
    phoneNumber,
    imageUrl,
  }: {
    FirstName?: string;
    LastName?: string;
    phoneNumber?: string;
    imageUrl?: string;
  },
) => {
  return update(clerkId, { FirstName, LastName, phoneNumber, imageUrl });
};

export { roleUserIs, updateUser };
