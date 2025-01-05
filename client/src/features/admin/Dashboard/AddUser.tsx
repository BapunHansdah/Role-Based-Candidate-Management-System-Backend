import { Lock, Mail, Phone, UserPlus } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function AddUser({
  newUser,
  setNewUser,
  errors,
  handleAddUser,
}: {
  newUser: {
    name: string;
    email: string;
    password: string;
    phone: string;
  };
  setNewUser: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    password: string;
    phone: string;
  }>>;
  errors: {
    name: string;
    email: string;
    password: string;
    phone: string;
  };
  handleAddUser: () => Promise<void>;
}) {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <div className="relative">
          <UserPlus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="name"
            placeholder="name"
            className="pl-10"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="email"
            placeholder="Email address"
            className="pl-10"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="phone"
            placeholder="phone"
            className="pl-10"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="password"
            placeholder="Password"
            className="pl-10"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>
      </div>

      {/* name, email, password, phone */}
      <Button onClick={handleAddUser} className="w-full">
        Add User
      </Button>
    </div>
  );
}
