import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accessTokenState, userState } from '../_stores/user';

const useUser = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await axios.post(`${process.env.SERVER_URL}/auth/refresh-token`, {}, { withCredentials: true });

        if (response.status === 200) {
          const { accessToken, user } = response.data;
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          setAccessToken(accessToken); // Recoil 상태 업데이트
          // TODO: user 정보 가져오기
        } else {
          router.push('/auth/login'); // 인증 실패 시 로그인 페이지로 이동
        }
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/auth/login');
      }
    };

    if (!accessToken) {
      authenticate(); // Access Token이 없을 경우 Refresh Token으로 인증
    }
  }, [accessToken, setAccessToken, setUser, router]);

  return { user, accessToken };
};

export default useUser;