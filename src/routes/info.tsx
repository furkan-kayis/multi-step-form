import { z } from "zod";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../lib/utils";

const infoSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.string().email(),
  phone: z.string().regex(
    // eslint-disable-next-line no-useless-escape
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    "Invalid number"
  ),
});

type InfoSchema = z.infer<typeof infoSchema>;

export default function InfoPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InfoSchema>({
    defaultValues: {
      name: location.state?.name,
      email: location.state?.email,
      phone: location.state?.phone,
    },
    resolver: zodResolver(infoSchema),
  });

  const onSubmit: SubmitHandler<InfoSchema> = (data) => {
    navigate("/plan", { state: { ...location.state, ...data } });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-app-marine-blue">Personal info</h1>
      <p className="text-base text-app-cool-gray">
        Please provide your name, email address, and phone number.
      </p>
      <Form
        className="sm:grid sm:grid-rows-[1fr_auto] sm:h-full gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="name" className="flex justify-between">
            <span className="text-app-marine-blue">Name</span>
            {errors.name && (
              <span className="font-medium text-red-500">
                {errors.name?.message}
              </span>
            )}
          </label>
          <input
            type="text"
            id="name"
            placeholder="e.g. Stephen King"
            className={cn(
              "w-full px-4 py-2 font-bold transition-colors border rounded outline-none placeholder:font-medium border-app-light-gray placeholder:text-app-cool-gray hover:border-app-purplish-blue focus:border-app-purplish-blue text-app-marine-blue",
              errors.name &&
                "border-red-500 hover:border-red-500 focus:border-red-500"
            )}
            {...register("name")}
          />
        </div>

        <div>
          <label htmlFor="email" className="flex justify-between">
            <span className="text-app-marine-blue">Email Address</span>
            {errors.email && (
              <span className="font-medium text-red-500">
                {errors.email?.message}
              </span>
            )}
          </label>
          <input
            type="text"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            className={cn(
              "w-full px-4 py-2 font-bold transition-colors border rounded outline-none placeholder:font-medium border-app-light-gray placeholder:text-app-cool-gray hover:border-app-purplish-blue focus:border-app-purplish-blue text-app-marine-blue",
              errors.email &&
                "border-red-500 hover:border-red-500 focus:border-red-500"
            )}
            {...register("email")}
          />
        </div>

        <div>
          <label htmlFor="phone" className="flex justify-between">
            <span className="text-app-marine-blue">Phone Number</span>
            {errors.phone && (
              <span className="font-medium text-red-500">
                {errors.phone?.message}
              </span>
            )}
          </label>
          <input
            type="text"
            id="phone"
            placeholder="e.g. +1 234 567 890"
            className={cn(
              "w-full px-4 py-2 font-bold transition-colors border rounded outline-none placeholder:font-medium border-app-light-gray placeholder:text-app-cool-gray hover:border-app-purplish-blue focus:border-app-purplish-blue text-app-marine-blue",
              errors.phone &&
                "border-red-500 hover:border-red-500 focus:border-red-500"
            )}
            {...register("phone")}
          />
        </div>
        <div className="flex text-sm font-medium sm:pt-20 max-sm:p-4 max-sm:right-0 max-sm:left-0 max-sm:bottom-0 max-sm:fixed max-sm:drop-shadow-lg max-sm:bg-app-white">
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
