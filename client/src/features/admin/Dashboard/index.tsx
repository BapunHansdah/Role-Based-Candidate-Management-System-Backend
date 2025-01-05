import { useEffect, useState } from "react";
import { LogOut, Trash2, UserPlus, Users } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { IUser, RegistrationData } from "../../../@types/admin";
import { DashboardHeader } from "../../../components/layout/index";
import AddUser from "./AddUser";
import { useAuth } from "../../../hooks/useAuth";

const AdminDashboardComp = ({
  registerUser,
  deleteUser,
  fetchUsers,
}: {
  registerUser: (user: RegistrationData) => Promise<void>;
  fetchUsers: () => Promise<IUser[]>;
  deleteUser: (userId: string) => Promise<void>;
}) => {
  const { logout } = useAuth();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const handleDelete = async (userId: string) => {
    await deleteUser(userId);
    const response = await fetchUsers();
    setUsers(response);
    await fetchUsers();
  };

  const validateNewUser = () => {
    const newErrors = { email: "", password: "", name: "", phone: "" };

    if (!newUser.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!newUser.password) {
      newErrors.password = "Password is required";
    } else if (newUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleAddUser = async () => {
    if (validateNewUser()) {
      await registerUser({
        email: newUser.email,
        password: newUser.password,
        name: newUser.name,
        phone: newUser.phone,
      });
      const response = await fetchUsers();
      setUsers(response);
      setNewUser({ email: "", password: "", name: "", phone: "" });
      setIsDialogOpen(false);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader title="User Management" icon={Users}>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Add User</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <AddUser
              newUser={newUser}
              setNewUser={setNewUser}
              errors={errors}
              handleAddUser={handleAddUser}
            />
          </DialogContent>
        </Dialog>
        <Button className="bg-red-500 hover:bg-red-600 ml-2" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </DashboardHeader>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          {/* User Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user._id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(user._id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-gray-500 py-8"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardComp;
