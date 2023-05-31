import BaseAPI from './BaseAPI'

export interface ProfileData {
  first_name: string
  second_name: string
  display_name: string
  phone: string
  email: string
  login: string
}

export interface GuestData extends ProfileData{
  id: number
  avatar?: string
}

export interface ProfileDataAvatar extends ProfileData {
  avatar: string
}

export class ProfileAPI extends BaseAPI {
  constructor() {
    super('/user')
  }

  editPassword(data: {
    oldPassword: string
    newPassword: string
  }): Promise<ProfileData> {
    return this.http.put('/password', data)
  }

  editProfile(data: ProfileData): Promise<ProfileData> {
    return this.http.put('/profile', data)
  }
  
  searchUsers(login: string): Promise<GuestData[]> {
    return this.http.post('/search', { login })
  }

  newAvatar(data: FormData): Promise<ProfileDataAvatar> {
    return this.http.put('/profile/avatar', data)
  }

  read = undefined
  create = undefined
  update = undefined
  delete = undefined
}

export default new ProfileAPI()
