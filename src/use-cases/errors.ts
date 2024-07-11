export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AuthenticationError extends PublicError {
  constructor() {
    super("You must be logged in to perform this action");
    this.name = "AuthenticationError";
  }
}

export class NotGuardionError extends PublicError {
  constructor() {
    super("You need to be a guardion to perform this action");
    this.name = "NotGuardionError";
  }
}

export class NotMentorError extends PublicError {
  constructor() {
    super("You need to be a mentor to perform this action");
    this.name = "NotMentorError";
  }
}

export class NotAdminError extends PublicError {
  constructor() {
    super("You need to be an admin to perform this action");
    this.name = "NotAdminError";
  }
}

export class EmailInUseError extends PublicError {
  constructor() {
    super("Email is already in use");
    this.name = "EmailInUseError";
  }
}

export class LoginError extends PublicError {
  constructor() {
    super("Invalid email or password");
    this.name = "LoginError";
  }
}
