import { User } from "@/infrastructure/users/i-external";
import { IUser } from "@/infrastructure/users/i-internal";
import { Accesses, Profession } from "@/infrastructure/constants";

export const UserToIUser: (user: User) => IUser = user => {
  return {
    id: user.id || 0,
    name: user.name,
    lastName: user.last_name || "",
    fullName: user.name + (user.last_name ? " " + user.last_name : ""),
    login: user.login,
    companyID: user.company_id,
    price: user.price || 0,
    profession: user.profession || Profession.none,
    access: user.access || Accesses.user
  } as IUser;
};
