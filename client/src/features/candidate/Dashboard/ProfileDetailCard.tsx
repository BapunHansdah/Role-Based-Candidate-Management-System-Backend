import { Mail, Pencil, Phone, Save } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { User } from "../../../@types/user";
import { Input } from "../../../components/ui/input";

function ProfileDetailCard({
  profile,
  handleProfileUpdate,
  isEditing,
  setIsEditing,
  editedProfile,
  setEditedProfile,
  isUploadingResume,
  handleResumeUpload,
}: {
  profile: User;
  handleProfileUpdate: () => Promise<void>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editedProfile: User;
  setEditedProfile: React.Dispatch<React.SetStateAction<User>>;
  isUploadingResume: boolean;
  handleResumeUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}) {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Profile Details</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (isEditing) {
              handleProfileUpdate();
            } else {
              setIsEditing(true);
              setEditedProfile(profile);
            }
          }}
        >
          {isEditing ? (
            <Save className="h-5 w-5 text-green-600" />
          ) : (
            <Pencil className="h-5 w-5 text-blue-600" />
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing ? (
          // Edit Mode
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Name
                </label>
                <Input
                  value={editedProfile.name}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Email
                </label>
                <Input value={editedProfile.email} readOnly disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Phone
                </label>
                <Input
                  value={editedProfile.phone}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{profile.phone}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2">
                {profile.resume ? (
                  <button
                    className="text-sm font-medium text-blue-600 hover:underline"
                    onClick={() => {
                      window.open(profile.resume, "_blank");
                    }}
                  >
                    View Resume
                  </button>
                ) : (
                  <p className="text-sm font-medium text-gray-500">
                    No resume uploaded
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-3">
                {isUploadingResume ? (
                  <p className="text-sm font-medium text-gray-500">
                    Uploading Resume...
                  </p>
                ) : (
                  <Button>
                    <label htmlFor="resume" className="text-sm font-medium ">
                      Upload Resume {""}
                      <span className="text-xs text-gray-400">(PDF only)</span>
                    </label>
                  </Button>
                )}

                <input
                  type="file"
                  accept=".pdf"
                  id="resume"
                  className="hidden"
                  onChange={handleResumeUpload}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileDetailCard;
