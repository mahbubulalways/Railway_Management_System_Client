export enum USER_ROLE {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  PESSENGER = "PESSENGER",
}

export enum USER_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCK = "BLOCK",
}

export type TUser = {
  id: string;
  email: string;
  phone: string;
  password: string;
  role: USER_ROLE;
  isDeleted: boolean;
  status: USER_STATUS;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};
