export interface RoleType {
  _id: string;
  name: string;
  description: string;
  permissions: string[];
}

export const roleList: RoleType[] = [
  {
    _id: "1",
    name: "Create assets",
    description: "Admin permissions",
    permissions: ["all"],
  },
  {
    _id: "2",
    name: "Guest",
    description: "guest permissions",
    permissions: ["all"],
  },
  {
    _id: "3",
    name: "Regular User",
    description: "Regular user permissions",
    permissions: ["all"],
  },
];
