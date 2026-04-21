@echo off
echo Setting up backend...
if not exist "backend\env" (
    python -m venv backend\env
)
call backend\env\Scripts\activate
pip install -r backend\requirements.txt
cd backend
alembic upgrade head
cd ..

echo Setting up frontend...
cd frontend
npm install
cd ..

echo Setup complete.
pause
