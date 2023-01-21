import { useContext, createContext, ReactNode, useState } from 'react';
import { useQuery } from '@apollo/client';
import { CHECK_USER } from '../../graphql/queries';
import { User } from '../../types/userTypes';
import { POLL_USER_FOR_LOGOUT_MSEC } from '../../lib/constants';

type UserContextType = {
  setUser: React.Dispatch<React.SetStateAction<User>>;
} & User;

const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({});

  useQuery<{ user: Partial<User> }>(CHECK_USER, {
    pollInterval: POLL_USER_FOR_LOGOUT_MSEC,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    onCompleted: (respData) => {
      if (respData?.user) {
        setUser(respData?.user);
      } else {
        setUser({});
      }
    },
    onError: (err) => {
      if (err.message === 'user-not-logged') {
        setUser({});
      }
    },
  });

  const userContext = {
    ...user,
    setUser,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
