import { User } from "../../../@types/user";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card";

function ProfileCard({profile}: {profile: User}) {
  return (
    <Card className="md:col-span-1 h-fit">
    <CardHeader className="text-center">
      <div className="relative mx-auto w-32 h-32 mb-4">
        <img
          src={profile.avatar}
          alt="Profile"
          className="rounded-full w-full h-full object-cover border-4 border-white shadow-lg"
        />
      </div>
      <CardTitle className="text-xl font-bold">
        {profile.name}
      </CardTitle>
      <CardDescription className="text-sm text-gray-500">
        {profile.role}
      </CardDescription>
    </CardHeader>
  </Card>
  )
}

export default ProfileCard