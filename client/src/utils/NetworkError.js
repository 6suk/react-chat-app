import toast from 'react-hot-toast';

class NetworkError {
  constructor({ refreshToken, handle403Error, handle404Error }) {
    this.refreshToken = refreshToken;
    this.handle403Error = handle403Error;
    this.handle404Error = handle404Error;

    this.isTokenRefreshing = false;
    this.refreshTokenPromise = null;

    console.log('🔥 ~ NetworkError 생성');
  }

  async handleHTTPError(response, nextRequest) {
    try {
      const responseJSON = await response.json();
      switch (response.status) {
        // refresh token >> 기존 request 재실행
        case 401:
          return await this.handle401Error(nextRequest);

        // refresh token 불가 >> 로그아웃 진행
        case 403:
          this.handle403Error();
          throw new Error(responseJSON.error || '권한이 없습니다.');

        // 찾을 수 없는 페이지 >> Home으로 이동
        case 404:
          this.handle404Error();
          throw new Error(responseJSON.error || '존재하지 않는 페이지입니다.');

        default: {
          throw new Error(responseJSON.error || '다시 시도해주세요!');
        }
      }
    } catch (error) {
      toast.error(error.message, { id: 'HTTP error' });
      throw error;
    }
  }

  async handle401Error(nextRequest) {
    try {
      // 첫 번째 401 오류가 발생한 경우에만 리프레시 토큰 실행
      if (!this.isTokenRefreshing) {
        this.isTokenRefreshing = true;
        this.refreshTokenPromise = this.refreshToken();
      }

      // 리프레시 토큰 진행 중이고, 프로미스가 존재하는 경우 기다림
      if (this.refreshTokenPromise && this.isTokenRefreshing) {
        await this.refreshTokenPromise;
        this.isTokenRefreshing = false;
        this.refreshTokenPromise = null;
      }

      // 기존 요청 보내기
      const { path, options } = nextRequest;
      const response = await fetch(path, options);
      return await response.json();
    } catch (error) {
      console.log('🚨Error FetchContext on401Error : ', error.message);
      throw error;
    }
  }
}

export default NetworkError;
