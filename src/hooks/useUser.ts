import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../api/userApi';




export const useUserProfile = () => {
  return useQuery( {
    queryKey: ['identity'],
    queryFn: fetchUserProfile,
    retry: false,
  });
};
