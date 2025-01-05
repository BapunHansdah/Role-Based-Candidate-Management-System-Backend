import { User } from "../../@types/user";
import UserDashboardComp from "../../features/candidate/Dashboard/index";
import { useUser } from "../../hooks/useUser";

function AdminDashboard() {

  const { getProfile, updateProfile, updateProfileImage, updateResume ,updatePassword} = useUser();
  
   
  const handleUpdateProfile = async (user: User) => {
    try {
      await updateProfile(user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserDashboardComp
      getProfile={getProfile}
      updateProfile={handleUpdateProfile}
      updateProfileImage={updateProfileImage}
      updateResume={updateResume}
      updatePassword={updatePassword}
    />
  );
}

export default AdminDashboard;
