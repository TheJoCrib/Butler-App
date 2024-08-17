import {createSelector} from 'reselect';

export const common = state => state.common;

export const chatRoomsSelector = createSelector(
  common,
  data => data.chatRooms,
);

export const chatRoomsLoadingSelector = createSelector(
  common,
  data => data.chatRoomsLoading,
);

export const jobsSelector = createSelector(
  common,
  data => data.jobs,
);

export const jobsLoadingSelector = createSelector(
  common,
  data => data.jobsLoading,
);

export const jobInvitesSelector = createSelector(
  common,
  data => data.jobInvites,
);

export const jobInvitesLoadingSelector = createSelector(
  common,
  data => data.jobInvitesLoading,
);
