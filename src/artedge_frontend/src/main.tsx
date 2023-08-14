import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createRoutesFromElements,
    createBrowserRouter,
    BrowserRouter,
    Route,
  } from "react-router-dom";
  import Root, {
    loader as rootLoader,
    action as rootAction,
  } from "../../routes/root";
  import ErrorPage from "../../error-page";
  import Contact, {
    loader as contactLoader,
  } from "../../routes/contact";  
  import Index from "../../routes/index";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Root />}
        loader={rootLoader}
        action={rootAction}
        errorElement={<ErrorPage />}
      >
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Index />} />
          <Route
            path="contacts/:contactId"
            element={<Contact />}
            loader={contactLoader}
            //action={contactAction}
          />
        </Route>
      </Route>
    )
  );
  
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);