import { Form, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addons } from "../constants";

const addonsSchema = z.object({
  onlineService: z.boolean(),
  largerStorage: z.boolean(),
  customizableProfile: z.boolean(),
});

type AddonsSchema = z.infer<typeof addonsSchema>;

export default function AddonsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm<AddonsSchema>({
    defaultValues: {
      customizableProfile: location.state.customizableProfile,
      largerStorage: location.state.largerStorage,
      onlineService: location.state.onlineService,
    },
    resolver: zodResolver(addonsSchema),
  });

  const onSubmit: SubmitHandler<AddonsSchema> = (data) => {
    navigate("/summary", { state: { ...location.state, ...data } });
  };

  const isYearly = location.state.yearly;

  return (
    <>
      <h1 className="text-2xl font-bold text-app-marine-blue">Pick add-ons</h1>
      <p className="text-app-cool-gray">
        Add-ons help enhance your gaming experience.
      </p>
      <Form
        className="sm:grid sm:grid-rows-[1fr_auto] sm:h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ul className="flex flex-col w-full gap-3">
          {addons.map((addon) => (
            <li key={addon.id}>
              <input
                type="checkbox"
                id={addon.id}
                className="hidden peer"
                {...register(addon.id)}
              />
              <label
                htmlFor={addon.id}
                className="inline-flex items-center w-full gap-4 p-3 transition-colors border rounded-lg cursor-pointer hover:border-app-purplish-blue border-app-light-gray peer-checked:border-app-purplish-blue peer-checked:bg-app-alabaster"
              >
                <input
                  type="checkbox"
                  checked={watch(addon.id)}
                  readOnly
                  className="pointer-events-none"
                />
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="font-bold text-app-marine-blue">
                      {addon.id.charAt(0).toUpperCase() +
                        addon.id
                          .slice(1)
                          .replace(/([A-Z])/g, " $1")
                          .toLowerCase()}
                    </div>
                    <div className="text-xs text-app-cool-gray">
                      {addon.description}
                    </div>
                  </div>
                  <div className="text-app-purplish-blue">
                    {isYearly ? (
                      <>+${addon.price.yearly}/yr</>
                    ) : (
                      <>+${addon.price.monthly}/mo</>
                    )}
                  </div>
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div className="flex text-sm font-medium sm:pt-20 max-sm:p-4 max-sm:right-0 max-sm:left-0 max-sm:bottom-0 max-sm:fixed max-sm:drop-shadow-lg max-sm:bg-app-white">
          <button
            type="button"
            className="transition-colors text-app-cool-gray hover:text-app-marine-blue active:text-app-marine-blue"
            onClick={() => {
              navigate("/plan", { state: location.state });
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
