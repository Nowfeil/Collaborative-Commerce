import { GET_USER_GROUP_SUCCESS, GET_USER_GROUP_FAIL } from '../constants/userConstant';

import { GET_GROUP_MEMBERS_SUCCESS, GET_GROUP_MEMBERS_FAIL } from '../constants/userConstant';
export const userGroupReducer = (state = { groupMembers: [] }, action) => {
  switch (action.type) {
    case GET_USER_GROUP_SUCCESS:
      return { groupMembers: action.payload };
    case GET_USER_GROUP_FAIL:
      return { groupMembers: [], error: action.payload };
    default:
      return state;
  }
};


export const groupMembersReducer = (state = { members: [] }, action) => {
  switch (action.type) {
    case GET_GROUP_MEMBERS_SUCCESS:
      return { members: action.payload };
    case GET_GROUP_MEMBERS_FAIL:
      return { members: [], error: action.payload };
    default:
      return state;
  }
};
