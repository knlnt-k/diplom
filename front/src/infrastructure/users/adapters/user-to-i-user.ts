import { User } from "@/infrastructure/users/i-external";
import { IUser } from "@/infrastructure/users/i-internal";
import { Accesses, Profession } from "@/infrastructure/constants";
import { getProfessionObject } from "@/infrastructure/services/get-profession-object";
import { getAccessObject } from "@/infrastructure/services/get-access-object";

export const UserToIUser: (user: User) => IUser = user => {
  return {
    id: user.id || 0,
    name: user.name,
    lastName: user.last_name || "",
    fullName: user.name + (user.last_name ? " " + user.last_name : ""),
    login: user.login,
    companyID: user.company_id,
    profession: getProfessionObject(user.profession || Profession.none),
    access: getAccessObject(user.access || Accesses.user)
  } as IUser;
};
