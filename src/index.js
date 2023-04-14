import { StrictMode } from "react";
import { useApi } from "react-promise-cache";
import { createRoot } from "react-dom/client";

import App from "./App";
import { getUserDetails } from "./UsersDetails";
import { getUsersList } from "./UsersList";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Controls />
    <App />
  </StrictMode>
);

function Controls({ children }) {
  let usersApi = useApi(getUsersList);
  let userDetailsApi = useApi(getUserDetails);

  return (
    <div>
      <h4>Invalidate cache</h4>
      <button
        onClick={() => {
          usersApi.evict();
        }}
      >
        Users list
      </button>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
        <button
          key={t}
          onClick={() => {
            userDetailsApi.evict(t);
          }}
        >
          {t}
        </button>
      ))}
      <hr />
      <div>{children}</div>
    </div>
  );
}
