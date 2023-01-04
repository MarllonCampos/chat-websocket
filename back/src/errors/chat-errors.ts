export class ChatErrors {

  public static AlreadyExists() {
    throw new Error("Chat already exists")
  }
}