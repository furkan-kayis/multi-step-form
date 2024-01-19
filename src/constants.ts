import arcadeIcon from "./assets/images/icon-arcade.svg";
import advancedIcon from "./assets/images/icon-advanced.svg";
import proIcon from "./assets/images/icon-pro.svg";

export const plans = [
  {
    id: "arcade",
    price: { monthly: 9, yearly: 90 },
    icon: arcadeIcon,
  },
  {
    id: "advanced",
    price: { monthly: 12, yearly: 120 },
    icon: advancedIcon,
  },
  {
    id: "pro",
    price: { monthly: 15, yearly: 150 },
    icon: proIcon,
  },
];

export const addons = [
  {
    id: "onlineService",
    description: "Access to multiplayer games",
    price: { monthly: 1, yearly: 10 },
  },
  {
    id: "largerStorage",
    description: "Extra 1TB of cloud save",
    price: { monthly: 2, yearly: 20 },
  },
  {
    id: "customizableProfile",
    description: "Custom theme on your profile",
    price: { monthly: 2, yearly: 20 },
  },
] as const;
