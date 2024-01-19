import icon from "../assets/images/icon-thank-you.svg";

export default function ThanksPage() {
  return (
    <div className="grid h-full gap-4 py-10 text-center place-content-center place-items-center">
      <img src={icon} alt="" className="w-1h-14 h-14" />
      <h1 className="text-2xl font-bold text-app-marine-blue">Thank you!</h1>
      <p className="text-base text-app-cool-gray">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}
