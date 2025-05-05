import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const CheckUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    // if user stored in db
    if (loggedInUser) {
      return loggedInUser;
    }

    // if do not store in db
    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress, //take the first email address
      },
    });
    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};
