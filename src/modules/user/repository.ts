import prisma from "../../config/db.js";

const roleIs = async (Clerkid: string) => {
  let user = await prisma.user.findUnique({ where: { Clerkid } });

  return user;
};

const update = async (
  Clerkid: string,
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
  const updatedUser = await prisma.user.update({
    where: { Clerkid },
    data: { FirstName, LastName, phoneNumber, imageUrl },
  });
  return updatedUser;
};

export { roleIs, update };
