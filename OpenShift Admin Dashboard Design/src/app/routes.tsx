import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Login } from "./components/Login";
import { Overview } from "./components/Overview";
import { HealthcareWorkerAuth } from "./components/HealthcareWorkerAuth";
import { BusinessAuth } from "./components/BusinessAuth";
import { PayrollReview } from "./components/PayrollReview";
import { QueriesSupport } from "./components/QueriesSupport";
import { Search } from "./components/Search";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Overview },
      { path: "hcw-auth", Component: HealthcareWorkerAuth },
      { path: "business-auth", Component: BusinessAuth },
      { path: "payroll", Component: PayrollReview },
      { path: "queries", Component: QueriesSupport },
      { path: "search", Component: Search },
    ],
  },
]);