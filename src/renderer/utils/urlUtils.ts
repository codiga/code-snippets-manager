import { APP_URL } from 'renderer/lib/config';
import { PageTypes } from 'renderer/types/pageTypes';

export const getCookbookUrl = (
  page: PageTypes,
  id: number,
  groupId?: number
) => {
  return `${APP_URL}${
    page === 'team'
      ? `/assistant/group-sharing/${groupId}/cookbook/${id}/view`
      : `/assistant/cookbook/${id}/view`
  }`;
};

export const getSnippetUrl = (
  page: PageTypes,
  id: number,
  groupId?: number
) => {
  return `${APP_URL}${
    page === 'team'
      ? `/assistant/group-sharing/${groupId}/snippet/${id}/view`
      : `/assistant/snippet/${id}/view`
  }`;
};

export const getUserUrl = (slug: string) => {
  return `${APP_URL}${`/hub/user/${slug}/assistant`}`;
};

export const getGroupUrl = (groupId: number) => {
  return `${APP_URL}${`/assistant/group-sharing/${groupId}`}`;
};
