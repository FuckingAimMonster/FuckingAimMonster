# Aim Fishery

## About Aim Fishery


발로란트를 하는 유저 중 자신에게 맞는 감도를 찾고 싶지만, 게임하는 시간이 아까운 유저들을 위한 어플리케이션 입니다. 컴퓨터 비전을 기반으로 적을 감지하고, 실시간으로 유저의 사격 경향을 분석하여 마우스 감도를 추천해 주는 어플리케이션 입니다.

## Installation


발로란트 용으로 학습된 가중치를 다운로드 한다.

```c
https://drive.google.com/file/d/1emXH3PB8hMKiHptqJkrclRM3cFUTTV3q/view?usp=sharing
```

그리고 FILE_DIRECTORY/FINAL 내에 이동 시킨다.

1. Node version **15.14.0**으로 설치한다. [https://nodejs.org/ko/download/releases/](https://nodejs.org/ko/download/releases/) (해당 버전이 아닐 시 정상 작동하지 않을 수 있음)
2. 아나콘다를 설치한다. [https://www.anaconda.com/download/](https://www.anaconda.com/download/)
3. 윈도우 CMD창을 실행 후 
    
    ```bash
    conda create -n python_venv python=3.8
    ```
    
    명령어를 입력해 파이썬 3.8 버전의 가상환경 폴더를 생성한다.
    
4. 가상환경 폴더를 activate한다.
    
    ```bash
    conda activate python_venv
    ```
    
5. requirement.txt 내에 파이썬 패키지를 설치한다.
    
    ```bash
    pip -r install <requirement.txt>
    ```
    
6. 구축한 가상환경 폴더를 프로젝트 루트 폴더로 옮겨준다.
7. 프로젝트 루트 폴더에서 package.json안 라이브러리들을 설치해준다.
    
    ```bash
    npm install
    ```
    
8. 프로젝트 실행 명령어 및 배포 명령어
    
    ```bash
    npm start
    npm run make
    ```
    
9. out 폴더안 배포 폴더의 aim_monster.exe를 클릭하여 프로그램을 실행할 수 있다.

## Usage

![Untitled](https://user-images.githubusercontent.com/90972240/206857085-383000c9-0981-46c0-873e-f8d933b03cc2.png)

1. 회원가입
    1. 아이디, 닉네임, 비밀번호, 비밀번호 확인 입력
    2. 마우스 DPI와 인 게임 감도 입력

![Untitled 1](https://user-images.githubusercontent.com/90972240/206857030-2285e94b-96c6-4bbc-b96b-d35f17b27d89.png)

![Untitled 2](https://user-images.githubusercontent.com/90972240/206857095-1d3d0dd8-aef3-420d-b732-d8172fe54b28.png)

2. 로그인

![Untitled 3](https://user-images.githubusercontent.com/90972240/206857099-69c5ebdd-7788-4ca4-9a11-054307bc5dda.png)

3. 주의사항을 읽고 넘어간다.

![Untitled 4](https://user-images.githubusercontent.com/90972240/206857103-34f60e0b-d086-4a26-9895-aee735f14c83.png)

4. 녹화 버튼을 클릭하고 게임을 계속 진행한다.
    a. 감도를 추천할 충분한 데이터가 쌓이기 전에는 회색 버튼이며, 감도를 추천할 충분한 데이터가 쌓이면 빨간 버튼으로 활성화 된다.
    
    ![Untitled 5](https://user-images.githubusercontent.com/90972240/206857115-53d9a55d-a893-4531-93f1-1e6116a4fd96.png)
    
    ![Untitled 6](https://user-images.githubusercontent.com/90972240/206857120-eda0d598-036e-4226-83e4-8c46887860cc.png)
    
5. 정보 수집이 완료되어 버튼이 활성화되면 클릭하여 종료할 수 있다.
    
    ![Untitled 7](https://user-images.githubusercontent.com/90972240/206857131-7c0cf78c-1147-4ae2-9c85-203d5c964c48.png)
    
6. 종료 버튼 클릭시 결과 화면으로 이동하며, 추천된 마우스 감도 값을 확인할 수 있다.

![Untitled 8](https://user-images.githubusercontent.com/90972240/206857134-488ed59e-acb8-4097-b8e2-725f6552db5c.png)

7. 메인화면으로 이동하기, 프로그램 종료하기를 클릭하면 감도 변경 유무를 묻는 팝업창이 나온다.
    a. 감도를 바꾼다면, “예”를 클릭한다.
    b. 감도를 바꾸지 않는다면, “아니오”를 클릭한다.
    
    ![Untitled 9](https://user-images.githubusercontent.com/90972240/206857139-47b2ebd1-6cef-4913-abf3-6e7867e4bed0.png)
    
8. 내정보 화면에서는 최근 감도 추천 내역이 포함된 내정보 확인 및 수정을 할 수 있다.

![Untitled 10](https://user-images.githubusercontent.com/90972240/206857145-4b82346b-4472-47b1-a48e-48dd33d603a9.png)
