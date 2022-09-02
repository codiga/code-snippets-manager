import { APP_URL } from '../lib/config';

export const getCookbookUrl = (id: number) => {
  return `${APP_URL}/assistant/cookbook/${id}/view`;
};

export const getSnippetUrl = (id: number) => {
  return `${APP_URL}/assistant/snippet/${id}/view`;
};

export const getUserUrl = (slug: string) => {
  return `${APP_URL}${`/hub/user/${slug}/assistant`}`;
};

export const getGroupUrl = (groupId: number) => {
  return `${APP_URL}${`/assistant/group-sharing/${groupId}`}`;
};
