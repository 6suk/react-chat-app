<!-- prettier-ignore-start -->
<!-- SOMETHING AUTO-GENERATED BY TOOLS - START -->
<div align="center">

# 💌 Live Chat Web Application

[🔗 기능 구현](#-기능-구현) / [🔗 기술 스택](#-기술스택) / [🔗 실행 방법](#-실행-방법) / [🔗 REST API](#-rest-api) / [🔥 프로젝트 회고](#-회고)

</div>

<br><br>

## 🔸 기능 구현
### ◽ 실시간 채팅
Socket.IO를 활용해 실시간으로 채팅을 주고 받을 수 있습니다.

| 실시간 채팅 | 실시간 채팅 알림 |
| --- | --- |
| <img src="https://github.com/6suk/6suk/assets/110910042/6cd9f176-548c-46cc-9e6f-6d7c4d618185"  alt="실시간 채팅"> | <img src="https://github.com/6suk/6suk/assets/110910042/957d43e7-c960-4844-8bf6-f508ba7aeeac"  alt="실시간 채팅 알림"> |

<br><br>

### ◽ 채팅방 생성 및 삭제

채팅방 생성 / 삭제 시 실시간으로 다른 유저들에게도 적용됩니다.

| 채팅방 생성 |
| --- |
| <img src="https://github.com/6suk/6suk/assets/110910042/416d5e31-d25f-4c4d-ab4c-d85313016b6c"  alt="채팅방 생성"> |

| 채팅방 삭제 | 채팅방 삭제 (참여 시) |
| --- | --- |
| <img src="https://github.com/6suk/6suk/assets/110910042/9f7f29a9-8c0c-4fbd-b3a6-cdb6aace7fd5"  alt="채팅방 삭제"> | <img src="https://github.com/6suk/6suk/assets/110910042/086807b7-bc0e-4860-9cd5-88c43b6290d2"  alt="채팅방 삭제 (참여 시)"> |

<br><br>

### ◽ 온라인 유저

온라인 및 오프라인 유저를 실시간으로 확인할 수 있습니다.

| 온라인/오프라인 |
| --- |
| <img src="https://github.com/6suk/6suk/assets/110910042/a5b45ee0-b1bf-4abb-bd62-26e34492f773" alt="오프라인 유저"> |

| 로그인 | 로그아웃 (회원 탈퇴) |
| --- | --- |
| <img src="https://github.com/6suk/6suk/assets/110910042/f3549032-8024-4e13-ae90-c275fffcc946" alt="로그인"> | <img src="https://github.com/6suk/6suk/assets/110910042/abb8e33b-8071-4ccf-9a52-1215ba884ead" alt="로그아웃"> |


<br><br>

### ◽ 렌더링 최적화

- 전역 상태관리(`Zustand`)를 통해 **불필요한 렌더링을 최소화**했습니다.
- 컴포넌트 렌더링 상태를 시각적으로 확인할 수 있는 gif를 아래에 첨부하였습니다. (with. **React Developer Tools**) 
- `Zustand`의 `subscribe`를 활용해 [🔗 채팅방 리스트의 알림 개선](https://www.notion.so/57674a1a23ac49b4a63425dce7b45258?pvs=21) 내용은 회고로 남겨두었습니다.

| 메뉴 및 채팅방 렌더링 | 실시간 채팅 / 알림 시 렌더링 |
| --- | --- |
| <img src="https://github.com/6suk/6suk/assets/110910042/9cd06275-0179-4c3e-bae9-2321ca4c1e52" alt="렌더링 최적화"> | <img src="https://github.com/6suk/6suk/assets/110910042/ddf17a8d-2759-42a3-9186-f1166f50cbf0" alt="렌더링 최적화 - 실시간 채팅"> |



<br><br>



## 🔸 기술스택

|  | 기술 |
| --- | --- |
| **Client** | <picture><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"></picture> <picture><img src="https://img.shields.io/badge/zustand-F46D01?style=for-the-badge&logo=zustand&logoColor=black"></picture> <picture><img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"></picture> <picture><img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"></picture> |
| **Server** | <picture><img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"></picture> <picture><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"></picture> <picture><img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"></picture> <picture><img src="https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"></picture> |
| **Common** | <picture><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"></picture> <picture><img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white"></picture> <picture><img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"></picture> |

<br><br>


## 🔸 실행 방법

### 1. 환경 변수 설정
#### /.env
- 루트 폴더의 `.env`파일에 아래와 같이 환경 변수를 설정합니다.
- Default 값은 `3000`으로 설정되어 있습니다.


```
VITE_SERVER_PORT=3000
```

<br>

### 2. 패키지 설치 및 실행

<details>
<summary>
<picture>
<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white">
</picture>
</summary>
<div>

```bash
yarn install
```
```bash
yarn start
```
</div>
</details>

<details>
<summary>
<picture>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
</picture>
</summary>
<div>

```bash
npm install
```
```bash
npm start
```
</div>
</details>

<br>

### 3. 웹사이트 접속

```
http://localhost:{PORT}
```

<br><br>

## 🔸 REST API

```
http://localhost:{PORT}/api/{END_POINT}
```

### ◽ User

<details>
<summary>
User Schema
</summary>
<div>

```scheme
[
  {
    "id": UUID,
    "name": string,
    "gender": [female | male],
    "profile": string,
    "rooms": room UUID array,
    "createdRooms": room UUID array
  },
  ...
]
```

</details> 
</div>


| Method | End Point | Role |
| --- | --- | --- |
| `POST` | `/auth/login/` | 유저 생성 및 로그인 |
| `POST` | `/auth/logout` | 유저 삭제 |
| `POST` | `/auth/token` | 토큰 재발급 |
| `GET` | `/users` | 유저 리스트 조회 |

<br>

### ◽ Room

<details>
<summary>
Room Schema
</summary>
<div>
    
```scheme
{
  room UUID : {
    "id": room UUID,
    "title": string,
    "created_user_id": user UUID,
    "users": user UUID array,
    "created_at": timeStamp,
  },
  ...
}
```

</details> 
</div>    

| Method | End Point | Role |
| --- | --- | --- |
| `POST` | `/room` | 채팅방 생성 |
| `DELETE` | `/room` | 채팅방 삭제 |
| `GET` | `/rooms` | 채팅방 리스트 조회 |

<br>

### ◽ Message

<details>
<summary>
Message Schema
</summary>
<div>
    
```scheme
{
  room UUID : [
    {
      "id": message UUID,
      "room": room UUID,
      "from": user UUID,
      "to": user UUID array,
      "created_at": timeStamp,
      "content": string
    }
  ],
  ...
}
```

</details> 
</div>    

| Method | End Point | Role |
| --- | --- | --- |
| `POST` | `/messages/send/{ROOM_ID}` | 메세지 전송 |
| `GET` | `/messages/{ROOM_ID}` | 메세지 리스트 조회 |

<br>

### [🔗 API Document](https://documenter.getpostman.com/view/25818560/2sA35MxJRA)
요청 및 응답 타입 / 각 API의 예시 등 상세한 내용은 위 문서에서 확인 가능합니다.



<br><br>

## 🔥 회고
### 💌 채팅방 리스트의 알림 개선

#### ◾ 1. **기존 참여했던 방을 나왔을 때 알림 기능**

- `기능1` Toast를 띄워 메세지 알림 - **Socket 활용**
- **`기능2`** 사이드바 채팅방 리스트의 해당 채팅방 ‘🔔’ 이모티콘 표시 - **Alarms State 활용**

#### ◾ 2. 문제

- `기능2`에서 알림이 추가될 때 마다 사이드바의 **전체 채팅방 리스트가 재렌더링** 되는 문제가 생겼다.

#### ◾ 3. 해결 방법 선택

- Zustand의 `subscribe` 기능과 `useRef` 활용해보기로 했다.

#### [🔗 subscribe 기능을 이용한 해결방법 더보기...](https://www.notion.so/57674a1a23ac49b4a63425dce7b45258?pvs=21)

<br><br>

### 💌 Axios의 기능들을 Fetch API로 구현해보기

#### ◾ 에러 핸들링

토큰이 만료되었을 때, 클라이언트는 토큰 갱신을 요청해야한다.
내가 생각한 대략적인 토큰 갱신의 순서는 이렇다.

1. 클라이언트에서 서버로 데이터를 ‘**요청**’한다.
2. 토근이 만료 되었을 경우, 서버는 1번의 요청을 **진행하지 않고 `401` 에러를 반환**한다.
3. 클라이언트는 에러를 전달 받아 **토큰 갱신** ‘**요청**’을 한다.
4. 서버는 토큰 갱신이 가능한 경우, 처리 후 **토큰 갱신에 성공했다는 데이터를 반환**한다.
5. 클라이언트는 1번 데이터를 ‘**다시 요청**’한다.
6. **사용자가 요청한 1번 데이터를 보여준다.**

> 위 과정이 간단해 보일 수 있지만<br>
> 토큰 갱신이 성공하면 사용자는 **2번부터 4번까지의 과정을 인지하지 않고**<br>
> 빠르게 데이터를 요청하고 받을 수 있어야 한다.<br>
> 사이에 또 다른 요청이 추가된다면, 토큰 갱신 후 1번 > 2번 요청을 순차적으로 진행해야한다.

#### [🔗 Axios의 기능들을 Fetch API로 구현해보기 더보기...](https://www.notion.so/Axios-Fetch-API-76f73773035a4e968789f11deb1031c2?pvs=21)

<br><br>

### 💌 성능 개선하기

- **Accessibility** 89 → 100 / **SEO** 70 → 100 개선
- **Performance** : **200ms** 개선 (First Contentful / Largest Contentful Paint, Speed Index)


| 개선 전 | 개선 후 |
| --- | --- |
| ![개선 전](https://github.com/6suk/6suk/assets/110910042/f1ce3293-2fca-4338-bd1f-69f9a05ef67c) | ![개선 후](https://github.com/6suk/6suk/assets/110910042/ad90dfc8-ce68-4887-8518-5467965a4fd4) |

#### [🔗 Lighthouse를 이용한 성능 측정 및 개선 더보기...](https://www.notion.so/57674a1a23ac49b4a63425dce7b45258?pvs=21)



<br><br><br><br>


<!-- SOMETHING AUTO-GENERATED BY TOOLS - END -->
<!-- prettier-ignore-end -->
