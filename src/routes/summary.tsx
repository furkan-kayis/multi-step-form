import { useLocation, useNavigate } from "react-router-dom";
import { addons, plans } from "../constants";
import { camelToFlat, capitalize } from "../lib/utils";

export default function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isYearly = location.state?.yearly ?? false;

  const selectedPlan = plans.find((plan) => plan.id === location.state?.plan);
  const selectedAddons = addons.filter(
    (addon) => location.state?.[addon.id]
  ) as (typeof addons)[number][] | undefined;

  if (!selectedPlan) {
    throw new Error(
      `Could not find a matching plan for the provided id: ${location.state?.plan}`
    );
  }

  const getTotal = () => {
    const billing = isYearly ? "yearly" : "monthly";
    const planPrice = selectedPlan.price[billing];

    return selectedAddons?.length
      ? selectedAddons
          .map((addon) => addon.price[billing] as number)
          .reduce((acc, curr) => acc + curr) + planPrice
      : planPrice;
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-app-marine-blue">Finishing up</h1>
      <p className="text-app-cool-gray">
        Double-check everything looks OK before confirming.
      </p>
      <div className="sm:grid sm:grid-rows-[1fr_auto] sm:h-full">
        <div className="flex flex-col gap-3 p-4 divide-y bg-app-alabaster">
          <div className="flex items-center justify-between w-full font-bold text-app-marine-blue">
            <div>
              <div>
                {capitalize(selectedPlan.id)} ({isYearly ? "Yearly" : "Monthly"}
                )
              </div>
              <button
                type="button"
                className="font-normal underline transition-colors text-app-cool-gray hover:text-app-purplish-blue"
                onClick={() => {
                  navigate("/plan", { state: location.state });
                }}
              >
                Change
              </button>
            </div>
            <div>
              {isYearly
                ? `$${selectedPlan.price.yearly}/yr`
                : `$${selectedPlan.price.monthly}/mo`}
            </div>
          </div>
          <ul className="flex flex-col gap-3 pt-3">
            {addons.map(
              (addon) =>
                location.state[addon.id] && (
                  <li key={addon.id} className="flex justify-between">
                    <div className="text-app-cool-gray">
                      {capitalize(camelToFlat(addon.id))}
                    </div>
                    <div className="text-app-marine-blue">
                      {isYearly
                        ? `+${addon.price.yearly}/yr`
                        : `+${addon.price.monthly}/mo`}
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="flex justify-between p-4">
          <div className="text-app-cool-gray">
            Total (per {isYearly ? "year" : "month"})
          </div>
          <div className="font-bold text-app-purplish-blue">
            ${getTotal()}/{isYearly ? "yr" : "mo"}
          </div>
        </div>
        <div className="flex text-sm font-medium sm:pt-20 max-sm:p-4 max-sm:right-0 max-sm:left-0 max-sm:bottom-0 max-sm:fixed max-sm:drop-shadow-lg max-sm:bg-app-white">
          <button
            type="button"
            onClick={() => {
              navigate("/addons", { state: location.state });
            }}
          >
            Go back
          </button>
          <button
            type="button"
            onClick={() =>
              navigate("/thanks", {
                state: location.state,
              })
            }
            className="px-3.5 py-2.5 rounded-md text-app-light-gray bg-app-marine-blue ml-auto hover:bg-opacity-75 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}
