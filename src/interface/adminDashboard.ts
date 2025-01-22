export interface UserMonthWiseCount {
  _id: string;
  count: number;
}
export interface GenderCount {
  _id: string;
  count: number;
}
export interface WduhauCount {
  _id: object;
  type: string;
  count: number;
}
export interface AdminDashboardResponse {
  onlineUser: number;
  onlineUserWithoutAuthentication: number;
  totalUserCount: number;
  userMonthWiseCountData: UserMonthWiseCount[];
  userCountCreatedToday: number;
  genderCountData: GenderCount[];
  totalConformedUser: number;
  totalUnConformedUser: number;
  wduhauCountData: WduhauCount[];
  totalUserOnSuite: number;
  totalActivePaidSubscribers: number;
  totalActiveFreeSubscribers: number;
  totalNewSubscriber: number;
}
