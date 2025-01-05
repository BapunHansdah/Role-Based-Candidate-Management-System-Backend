import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";

function ChangePasswordCard({
  oldPassword,
  password,
  confirmPassword,
  isChangingPassword,
  setIsChangingPassword,
  setOldPassword,
  setPassword,
  setConfirmPassword,
  handlePasswordUpdate,
}: {
  oldPassword: string;
  password: string;
  confirmPassword: string;
  isChangingPassword: boolean;
  setIsChangingPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setOldPassword: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  handlePasswordUpdate: () => Promise<void>;
}) {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Update Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isChangingPassword ? (
          <div className="flex justify-between">
            <Button
              className="text-sm font-medium  bg-black"
              onClick={() => setIsChangingPassword(true)}
            >
              Update password
            </Button>
          </div>
        ) : (
          <div className="space-y-4 relative">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">
                Old Password
              </label>
              <Input
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">
                New Password
              </label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">
                Confirm Password
              </label>
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </div>
            <Button onClick={handlePasswordUpdate}>Update Password</Button>
            <Button
              className="text-sm font-medium ml-2 hover:underline"
              onClick={() => setIsChangingPassword(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ChangePasswordCard;
