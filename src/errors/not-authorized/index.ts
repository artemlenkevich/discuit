export class NotAuthorized extends Error {
  constructor() {
    super();
    this.message = 'User Is Not Authorized';
    this.name = 'Not Authorized';
  }
}
