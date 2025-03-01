import { createBrowserRouter } from "react-router-dom";
import { GeneralPage } from "./pages/general";
import { NotFoundPage } from "./pages/404";
import { Unauthorized } from "./pages/unauthorized";
import { LoginPage } from "./pages/account/login";
import { RegisterPage } from "./pages/account/register";
import { ForgotPasswordPage } from "./pages/account/forgot";
import { CustomersPage } from "./pages/customers";
import { EmployeesPage } from "./pages/employees";
import { DashboardPage } from "./pages/dashboard";
import { ReportPage } from "./pages/report";
import { GroupServicesPage } from "./pages/group-services";
import { NailServicesPage } from "./pages/nail-services";
import { GiftCardsPage } from "./pages/gift-cards";
import { CreditManagementPage } from "./pages/credit-management";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GeneralPage page={<DashboardPage />} isPrivate />,
    handle: {
      info: {
        title: "Dashboard",
        description: "Welcome to the customers management dashboard",
      },
      crumbs: [
        {
          label: "Dashboard",
          path: "/"
        },
      ]
    },
  },
  {
    path: "/customers",
    element: <GeneralPage page={<CustomersPage />} isPrivate />,
    handle: {
      info: {
        title: "Customers Management",
        description: "Welcome to the customers management",
      },
      crumbs: [
        {
          label: "Dashboard",
          path: "/"
        },
        {
          label: "Customers",
          path: "/customers"
        }
      ]
    },
  },
  {
    path: "/technicians",
    element: <GeneralPage page={<EmployeesPage />} isPrivate />,
    handle: {
      info: {
        title: "Technicians Management",
        description: "Welcome to the technicians management",
      },
      crumbs: [
        {
          label: "Dashboard",
          path: "/"
        },
        {
          label: "Technicians",
          path: "/technicians"
        }
      ]
    },
  },
  // gift cards
  {
    path: "/gift-cards",
    element: <GeneralPage page={<GiftCardsPage />} isPrivate />,
    handle: {
      info: {
        title: "Gift Cards",
        description: "Welcome to the gift cards management",
      },
      crumbs: [
        {
          label: "Dashboard",
          path: "/"
        },
        {
          label: "Gift Cards",
          path: "/gift-cards"
        }
      ]
    },
  },
  {
    path: "/report",
    element: <GeneralPage page={<ReportPage />} isPrivate />,
    handle: {
      info: {
        title: "Check-In Management",
        description: "Welcome to the check-in management dashboard",
      },
      crumbs: [
        {
          label: "Dashboard",
          path: "/"
        },
        {
          label: "Check-In Management",
          path: "/report"
        }
      ]
    },
  },
  {
    path: "/group-services",
    element: <GeneralPage page={<GroupServicesPage />} isPrivate />,
    handle: {
      info: {
        title: "Group Services Management",
        description: "Welcome to the group services management",
      },
      crumbs: [
        {
          label: "Dashboard",
          path: "/"
        },
        {
          label: "Group Services",
          path: "/group-services"
        }
      ]
    },
  },
  {
    path: "/nail-services",
    element: <GeneralPage page={<NailServicesPage />} isPrivate />,
    handle: {
      info: {
        title: "Nail Services Management",
        description: "Welcome to the nail services management",
      },
      crumbs: [
        {
          label: "Dashboard",
          path: "/"
        },
        {
          label: "Nail Services",
          path: "/nail-services"
        }
      ]
    },
  },
  {
    path: "/credit-management",
    element: <GeneralPage page={<CreditManagementPage />} isPrivate />,
    handle: {
      info: {
        title: "Credit Management",
        description: "Welcome to the credit management",
      },
      crumbs: [
        {
          label: "Dashboard",
          path: "/"
        },
        {
          label: "Credit Management",
          path: "/credit-management"
        }
      ]
    },
  },
  {
    path: "/login",
    element: <Unauthorized page={<LoginPage />} />,
  },
  {
    path: "/register",
    element: <Unauthorized page={<RegisterPage />} />
  },
  {
    path: "/forgot-password",
    element: <Unauthorized page={<ForgotPasswordPage />} />
  },
  {
    path: "*",
    element: <NotFoundPage />,
  }
]);