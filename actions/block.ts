"use server";
import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  const blockedUser = await blockUser(id);
  revalidatePath("/");
  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }
  return blockedUser;
};
export const onUnblock = async (id: string) => {
  //TODO: Adapt to disconnect from livestream and Allow ability to kick the guest
  const unblockedUser = await unblockUser(id);
  revalidatePath("/");
  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`);
  }
  return unblockedUser;
};
