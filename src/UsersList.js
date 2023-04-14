import * as React from "react";
import axios from "axios";
import { useApi } from "react-promise-cache";

export async function getUsersList() {
  await new Promise((res) => setTimeout(res, 800));
  return (await axios.get(`https://jsonplaceholder.typicode.com/users`)).data;
}

export default function UsersList() {
  const usersApi = useApi(getUsersList);
  let users = usersApi.use();

  const rerender = React.useState()[1];
  React.useEffect(() => usersApi.subscribe(rerender), [users]);
  return (
    <details open>
      <summary>Users List</summary>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </div>
      </div>
    </details>
  );
}
