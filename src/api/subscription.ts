import { getCookie } from "@/utils/cookies.ts";

export type Subscription = {
  startDate: string;
  endDate: string;
  subscriptionType: "MONTHLY" | "WEEKLY" | "ONE_TIME" | "DAY_PASS";
  activeSubscription: boolean;
};

export async function getSubscription(): Promise<Subscription> {
  const token = getCookie("auth_data") ? JSON.parse(getCookie("auth_data")!).token : null;
  const res = await fetch(import.meta.env.VITE_API_URL + "subscriptions/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch subscription");
  return res.json();
}

export async function renewSubscription(data: { subscriptionType: string }): Promise<Subscription> {
  const token = getCookie("auth_data") ? JSON.parse(getCookie("auth_data")!).token : null;
  const res = await fetch(import.meta.env.VITE_API_URL + "subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to renew subscription");
  return res.json();
}
