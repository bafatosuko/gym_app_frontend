import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { getSubscription, renewSubscription, type Subscription } from "@/api/subscription"; // το δικό σου service

const prices: Record<Subscription["subscriptionType"], number> = {
  DAY_PASS: 5,
  WEEKLY: 20,
  MONTHLY: 55,
  ONE_TIME: 10,
};

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const fetchSubscriptions = async () => {
    try {
      const data = await getSubscription();
      // αν backend σου επιστρέφει λίστα -> βάλτο σε [] αλλιώς μετέτρεψέ το
      setSubscriptions(Array.isArray(data) ? data : [data]);
    } catch {
      setSubscriptions([]);
    }
  };

  const createSubscription = async (type: Subscription["subscriptionType"]) => {
    try {
      await renewSubscription({ subscriptionType: type });
      toast.success(`Επιτυχής αγορά ${type} (${prices[type]} €)`);
      fetchSubscriptions();
    } catch {
      toast.error("Αποτυχία αγοράς συνδρομής");
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Οι συνδρομές μου</h1>

      {/* Νέες συνδρομές */}
      <Card>
        <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(prices).map(([type, price]) => (
            <Button
              key={type}
              className="rounded-2xl shadow-md"
              onClick={() => createSubscription(type as Subscription["subscriptionType"])}
            >
              {type} - {price}€
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Λίστα συνδρομών */}
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Τύπος</TableHead>
                <TableHead>Έναρξη</TableHead>
                <TableHead>Λήξη</TableHead>
                <TableHead>Κατάσταση</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map(sub => (
                <TableRow
                  key={sub.startDate + sub.subscriptionType}
                  className={sub.activeSubscription ? "bg-green-100" : ""}
                >
                  <TableCell>{sub.subscriptionType}</TableCell>
                  <TableCell>{sub.startDate}</TableCell>
                  <TableCell>{sub.endDate}</TableCell>
                  <TableCell>
                    {sub.activeSubscription ? "Ενεργή ✅" : "Ληγμένη ❌"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
