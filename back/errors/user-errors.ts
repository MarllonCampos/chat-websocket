export class UserErrors extends Error {
  public static AlreadyExists() {
    throw new Error("User already exists")
  }

  public static UserNotFound() {
    throw new Error("User not found")
  }
}