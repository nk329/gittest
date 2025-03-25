# Python 3.10을 기반으로 한 Docker 이미지 사용
FROM python:3.10

# 작업 디렉터리를 /app으로 설정
WORKDIR /app

# requirements.txt를 컨테이너로 복사 후 라이브러리 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 현재 디렉터리의 모든 파일을 컨테이너로 복사
COPY . .

# Uvicorn을 사용하여 FastAPI 서버 실행
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000","--reload"]
