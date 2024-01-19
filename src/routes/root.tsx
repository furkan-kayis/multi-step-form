import { Outlet, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

export default function RootLayout() {
  const location = useLocation();

  const steps = [
    { title: "Your info", path: "/info" },
    { title: "Select plan", path: "/plan" },
    { title: "Add-ons", path: "/addons" },
    { title: "Summary", path: "/summary" },
  ];

  const getStepsClassName = (path: string) => {
    return cn(
      "flex items-center justify-center w-8 h-8 font-bold transition-colors rounded-full border border-app-white text-app-white",
      (path === location.pathname ||
        (path === "/summary" && location.pathname === "/thanks")) &&
        "bg-app-light-blue text-app-marine-blue border-none"
    );
  };

  return (
    <div className="min-h-screen bg-app-magnolia sm:flex sm:items-center sm:justify-center max-sm:pb-24">
      <div className="sm:flex sm:max-w-screen-md sm:w-11/12 sm:min-h-[32rem] sm:rounded-xl sm:bg-app-white sm:shadow-md sm:p-3 sm:gap-10">
        <div className="pt-8 bg-no-repeat bg-cover sm:rounded-lg sm:px-8 sm:pr-20 max-sm:h-40 bg-sidebar-mobile sm:bg-sidebar-desktop">
          <ol className="flex justify-center gap-4 text-sm uppercase sm:flex-col text-nowrap">
            {steps.map((step, i) => (
              <li key={step.path} className="flex gap-5">
                <div className={getStepsClassName(step.path)}>{i + 1}</div>
                <div className="max-sm:hidden">
                  <div className="text-xs text-app-light-gray">
                    Step {i + 1}
                  </div>
                  <div className="font-medium text-app-white">{step.title}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="w-11/12 sm:w-full p-6 text-sm max-sm:mx-auto max-sm:rounded-lg max-sm:-mt-[3.8rem] max-sm:bg-app-white flex flex-col gap-3 max-sm:shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
