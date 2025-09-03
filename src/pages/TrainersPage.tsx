import { useEffect, useState } from "react";

import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, ArrowUpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {deleteUser, fetchUsers, promoteUser, type User} from "@/api/trainers.ts";
import {useAuth} from "@/hooks/useAuth.ts";

const TrainersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);


  const{role} = useAuth();


  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error("Αποτυχία φόρτωσης χρηστών");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτόν τον χρήστη;")) {
      return;
    }
    try {
      await deleteUser(id);
      toast.success("Ο χρήστης διαγράφηκε");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      toast.error("Αποτυχία διαγραφής χρήστη");
    }
  };

  const handlePromote = async (id: number) => {
    if (!window.confirm("Είστε σίγουροι ότι θέλετε να κάνετε promote αυτόν τον χρήστη σε TRAINER;")) {
      return;
    }
    try {
      await promoteUser(id);
      toast.success("Ο χρήστης έγινε trainer");
      loadUsers();
    } catch {
      toast.error("Αποτυχία αναβάθμισης χρήστη");
    }
  };

  if (loading) return <p>Φόρτωση...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Διαχείριση Χρηστών</h1>
      <Table>
        <TableCaption>Λίστα Χρηστών (χωρίς admins)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Όνομα</TableHead>
            <TableHead>Επώνυμο</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ρόλος</TableHead>
            <TableHead className="text-right">Ενέργειες</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right space-x-2">

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {user.role !== "TRAINER" && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePromote(user.id)}
                  >
                    <ArrowUpCircle className="w-4 h-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrainersPage;
