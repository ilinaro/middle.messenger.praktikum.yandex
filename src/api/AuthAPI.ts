import BaseAPI from './BaseAPI'

export interface SigninData {
  login: string
  password: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface User {
  id: number
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
  display_name: string
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth')
  }

  signin(data: SigninData) {
    return this.http.post('/signin', data)
  }

  signup(data: SignupData) {
    return this.http.post('/signup', data)
  }

  logout() {
    return this.http.post('/logout')
  }

  getUser() {
    return this.http.get<User>('/user')
  }

  read = undefined
  create = undefined
  update = undefined
  delete = undefined
}

export default new AuthAPI()



// Обработка ошибок
// type ErrorWithMessage = {
//   message: string;
// };


// function convertToErrorWithMessage(maybeError: unknown): ErrorWithMessage {
//   if (isErrorWithMessage(maybeError)) {
//       return maybeError;
//   }

//   try {
//       return new Error(JSON.stringify(maybeError));
//   } catch {
//       return new Error(String(maybeError));
//   }
// }

// function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
//   return (
//       (typeof error === 'object') &&
//       (error !== null) &&
//       ('message' in error) &&
//       (typeof (error as Record<string, unknown>)['message'] === 'string')
//   );
// }


// export function getErrorMessage(error: unknown): string {
//   return convertToErrorWithMessage(error).message;
// }