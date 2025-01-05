import React from 'react'
import { Input } from '../../../components/ui/input'

function UpdateProfilePic({isUploadingProfilePicture, handleImageUpload}: {isUploadingProfilePicture: boolean; handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <div className="space-y-4 pt-4">
    {isUploadingProfilePicture ? (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    ) : (
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    )}
  </div>
  )
}

export default UpdateProfilePic