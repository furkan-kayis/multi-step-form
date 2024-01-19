import { z } from "zod";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../lib/utils";
import { plans } from "../constants";

const planSchema = z.object({
  plan: z.enum(["arcade", "advanced", "pro"]),
  yearly: z.boolean(),
});

type PlanSchema = z.infer<typeof planSchema>;

export default function PlanPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm<PlanSchema>({
    defaultValues: {
      plan: location.state?.plan ?? "arcade",
      yearly: location.state?.yearly,
    },
    resolver: zodResolver(planSchema),
  });

  const onSubmit: SubmitHandler<PlanSchema> = (data) => {
    navigate("/addons", { state: { ...location.state, ...data } });
  };

  const isYearly = watch("yearly");

  return (
    <>
      <h1 className="text-2xl font-bold text-app-marine-blue">
        Select your plan
      </h1>
      <p className="text-base text-app-cool-gray">
        You have the option of monthly or yearly billing.
      </p>
      <Form
        className="sm:grid sm:grid-rows-[1fr_auto] sm:h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ul className="flex w-full gap-3 max-md:flex-col">
          {plans.map((plan) => (
            <li key={plan.id} className="flex-1">
              <input
                type="radio"
                id={plan.id}
                value={plan.id}
                className="hidden peer"
                {...register("plan")}
              />
              <label
                htmlFor={plan.id}
                className="flex w-full gap-4 p-2.5 transition-colors border rounded-lg cursor-pointer items-start hover:border-app-purplish-blue sm:flex-col border-app-light-gray peer-checked:border-app-purplish-blue peer-checked:bg-app-alabaster"
              >
                <img src={plan.icon} alt="" aria-hidden className="pt-1" />
                <div>
                  <div className="text-base font-bold text-app-marine-blue">
                    {plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}
                  </div>
                  <div className="text-app-cool-gray min-h-10">
                    {isYearly ? (
                      <>
                        ${plan.price.yearly}/yr
                        <div className="text-xs font-medium text-app-marine-blue">
                          2 months free
                        </div>
                      </>
                    ) : (
                      <>${plan.price.monthly}/mo</>
                    )}
                  </div>
                </div>
              </label>
            </li>
          ))}
        </ul>

        <label className="flex items-center justify-center w-full p-4 mt-4 transition-colors rounded-lg cursor-pointer bg-app-alabaster">
          <span
            className={cn(
              "text-sm font-medium text-app-marine-blue me-3",
              isYearly && "text-app-light-gray"
            )}
          >
            Monthly
          </span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("yearly")}
            />
            <div className="w-11 h-6 bg-app-marine-blue peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:scale-75 scale-75 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </div>
          <span
            className={cn(
              "text-sm font-medium ms-3 text-app-light-gray",
              isYearly && "text-app-marine-blue"
            )}
          >
            Yearly
          </span>
        </label>
        <div className="flex text-sm font-medium sm:pt-20 max-sm:p-4 max-sm:right-0 max-sm:left-0 max-sm:bottom-0 max-sm:fixed max-sm:drop-shadow-lg max-sm:bg-app-white">
          <button
            type="button"
            className="transition-colors text-app-cool-gray hover:text-app-marine-blue active:text-app-marine-blue"
            onClick={() => {
              navigate("/info", { state: location.state });
            }}
          >
            Go back
          </button>
          <button
            type="submit"
            className="px-3.5 py-2.5 rounded-md text-app-light-gray bg-app-marine-blue ml-auto hover:bg-opacity-75 transition-colors"
          >
            Next Step
          </button>
        </div>
      </Form>
    </>
  );
}
