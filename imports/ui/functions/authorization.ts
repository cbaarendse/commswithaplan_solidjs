// Authorization

// imports
import {Roles} from 'meteor/alanning:roles';

// class
export class Authorization {
  static mayChange(touchPointName: string, userId: string, companyId: string): boolean {
    // This check happens just for the ui, real authorisation check happens in validated methods.
    if (
      Roles.userIsInRole(userId, ['owner', 'companyAdmin', touchPointName], companyId) ||
      Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
    ) {
      return true;
    }
    return false;
  }

  static maySeeDatesForCompany(userId: string, companyId?: string): boolean {
    // Client based check for more relevant presentation
    return (
      Roles.userIsInRole(userId, 'dates', companyId) ||
      Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
      Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
    );
  }

  static maySeeInputForCompany(userId: string, companyId?: string): boolean {
    // Client based check for more relevant presentation
    return (
      Roles.userIsInRole(userId, 'input', companyId) ||
      Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
      Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
    );
  }

  static maySeeCostsForCompany(userId: string, companyId?: string): boolean {
    // Client based check for more relevant presentation
    return (
      Roles.userIsInRole(userId, 'costs', companyId) ||
      Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
      Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
    );
  }

  static mayChangeTouchPointForCompany(userId: string, touchPoint: string | string[], companyId?: string): boolean {
    // Client based check for more relevant presentation
    return (
      Roles.userIsInRole(userId, touchPoint, companyId) ||
      Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
      Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
    );
  }
}
