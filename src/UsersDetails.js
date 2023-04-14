import * as React from "react";
import axios from "axios";
import { useApi } from "react-promise-cache";

export async function getUserDetails(id) {
  await new Promise((res) => setTimeout(res, 800));

  let promise = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return promise.data;
}

export default function UsersDetails() {
  const [id, setId] = React.useState(1);
  return (
    <div>
      <Controls currentId={id} onChange={setId} />
      <br />
      <React.Suspense fallback={`Loading user ${id}`}>
        <UserDetails userId={id} />
      </React.Suspense>
    </div>
  );
}

function UserDetails({ userId }) {
  let user = null;

  const userApi = useApi(getUserDetails);
  if (userId) {
    user = userApi.use(userId);
  }

  const rerender = React.useState()[1];
  React.useEffect(() => userApi.subscribe(rerender), [userApi]);
  return (
    <div>
      {!user && <h4>Please type a user Id</h4>}
      {user && (
        <details open>
          <summary>User {user.name} details</summary>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <pre>{JSON.stringify(user, null, 4)}</pre>
            </div>
          </div>
        </details>
      )}
    </div>
  );
}

function Controls({ currentId, onChange }) {
  return (
    <>
      <input value={currentId} onChange={(e) => onChange(e.target.value)} />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
        <UserButton onClick={() => onChange(t)} key={t}>
          {t}
        </UserButton>
      ))}
    </>
  );
}

function UserButton({ onClick, children }) {
  const [isPending, startTransition] = React.useTransition();
  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => onClick())}
    >
      {children}
    </button>
  );
}
