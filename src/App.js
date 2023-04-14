import { Suspense, useState, useTransition } from "react";
import UsersList from "./UsersList";
import UsersDetails from "./UsersDetails";

export default function App() {
  const [view, setView] = useState("details");

  return (
    <Suspense fallback="Whole is is suspended">
      <div className="App">
        <h4>View type</h4>
        <Tab cb={() => setView("none")}>None</Tab>
        <Tab cb={() => setView("list")}>Users list</Tab>
        <Tab cb={() => setView("details")}>Users Details</Tab>
        <Tab cb={() => setView("both")}>Both</Tab>
        <hr />
        <View value={view} />
      </div>
    </Suspense>
  );
}

function Tab({ cb, children }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button disabled={isPending} onClick={() => startTransition(() => cb())}>
      {children}
    </button>
  );
}

function View({ value }) {
  if (value === "none") return null;
  if (value === "list") return <UsersList />;
  if (value === "details") return <UsersDetails />;
  if (value === "both")
    return (
      <>
        <UsersList />
        <hr />
        <UsersDetails />
      </>
    );
}
