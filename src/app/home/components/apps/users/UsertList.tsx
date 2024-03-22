import List from "@mui/material/List";

import Scrollbar from "../../custom-scroll/Scrollbar";
import UserListItem from "./UserListItem";
import { userList, UserType } from "@/mock/users";

type Props = {
  showrightSidebar: () => void;
};

export default function UserList({ showrightSidebar }: Props) {
  const getVisibleUsers = (
    users: UserType[],
    filter: string,
    userSearch: string
  ) => {
    switch (filter) {
      case "show_all":
        return users.filter(
          (c) =>
            !c.deleted && c.firstname.toLocaleLowerCase().includes(userSearch)
        );

      case "frequent_user":
        return users.filter(
          (c) =>
            !c.deleted &&
            c.frequentlycontacted &&
            c.firstname.toLocaleLowerCase().includes(userSearch)
        );

      case "starred_user":
        return users.filter(
          (c) =>
            !c.deleted &&
            c.starred &&
            c.firstname.toLocaleLowerCase().includes(userSearch)
        );

      case "engineering_department":
        return users.filter(
          (c) =>
            !c.deleted &&
            c.department === "Engineering" &&
            c.firstname.toLocaleLowerCase().includes(userSearch)
        );

      case "support_department":
        return users.filter(
          (c) =>
            !c.deleted &&
            c.department === "Support" &&
            c.firstname.toLocaleLowerCase().includes(userSearch)
        );

      case "sales_department":
        return users.filter(
          (c) =>
            !c.deleted &&
            c.department === "Sales" &&
            c.firstname.toLocaleLowerCase().includes(userSearch)
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const users = getVisibleUsers(userList, "show_all", "");

  const active = "show_all";

  return (
    <Scrollbar
      sx={{
        height: { lg: "calc(100vh - 100px)", md: "100vh" },
        maxHeight: "800px",
      }}
    >
      <List>
        {users.map((user) => (
          <UserListItem
            key={user.id}
            active={user.id === active}
            {...user}
            onUserClick={() => {
              showrightSidebar();
            }}
            onDeleteClick={() => {}}
            onStarredClick={() => {}}
          />
        ))}
      </List>
    </Scrollbar>
  );
}
