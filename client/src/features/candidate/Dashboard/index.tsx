import React, { useEffect, useState } from "react";
import { Camera, LogOut, UserIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { User } from "../../../@types/user";
import { DashboardHeader } from "../../../components/layout";
import ProfileCard from "./ProfileCard";
import ProfileDetailCard from "./ProfileDetailCard";
import ChangePasswordCard from "./ChangePasswordCard";
import UpdateProfilePic from "./UpdateProfilePic";
import { useAuth } from "../../../hooks/useAuth";

const UserDashboardComp = ({
  updateProfile,
  getProfile,
  updateProfileImage,
  updateResume,
  updatePassword,
}: {
  updateProfile: (user: User) => Promise<void>;
  getProfile: () => Promise<User>;
  updateProfileImage: (file: FormData) => Promise<void>;
  updateResume: (file: FormData) => Promise<void>;
  updatePassword: (
    oldPassword: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
}) => {
  const {logout} = useAuth();
  const [profile, setProfile] = useState<User>({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    resume: "",
    role: "",
  });
  const [password, setPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isUploadingProfilePicture, setUploadingProfilePicture] =
    useState(false);
  const [isUploadingResume, setUploadingResume] = useState(false);
  const handleProfileUpdate = async () => {
    await updateProfile(editedProfile);
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handlePasswordUpdate = async () => {
    await updatePassword(oldPassword, password, confirmPassword);
    setPassword("");
    setOldPassword("");
    setConfirmPassword("");
    setIsChangingPassword(false);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadingProfilePicture(true);
    const file = event.target.files?.[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append("avatar", file);
      await updateProfileImage(formData);
      setUploadingProfilePicture(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, avatar: reader.result as string });
        setProfile({ ...profile, avatar: reader.result as string });
        setIsImageDialogOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadingResume(true);
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);
      await updateResume(formData);
      setUploadingResume(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, resume: reader.result as string });
        setProfile({ ...profile, resume: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const userData = await getProfile();
      setProfile(userData);
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader title="My profile" icon={UserIcon} >
        <Button
          variant="outline"
          size="sm"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </DashboardHeader>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <ProfileCard profile={profile} />
          <div className="md:col-span-2 grid gap-5">
            {/* Profile Details Card */}
            <ProfileDetailCard
              profile={profile}
              handleProfileUpdate={handleProfileUpdate}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editedProfile={editedProfile}
              setEditedProfile={setEditedProfile}
              isUploadingResume={isUploadingResume}
              handleResumeUpload={handleResumeUpload}
            />
            {/* update password */}
            <ChangePasswordCard
              oldPassword={oldPassword}
              password={password}
              confirmPassword={confirmPassword}
              isChangingPassword={isChangingPassword}
              setIsChangingPassword={setIsChangingPassword}
              setOldPassword={setOldPassword}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              handlePasswordUpdate={handlePasswordUpdate}
            />

            <Dialog
              open={isImageDialogOpen}
              onOpenChange={setIsImageDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Profile Picture</DialogTitle>
                </DialogHeader>
                <UpdateProfilePic
                  handleImageUpload={handleImageUpload}
                  isUploadingProfilePicture={isUploadingProfilePicture}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardComp;
