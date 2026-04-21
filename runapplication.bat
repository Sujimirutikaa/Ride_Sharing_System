@echo off
set PYTHONPATH=%cd%
echo Starting backend...
start "RideFlow Backend" cmd /k "call backend\env\Scripts\activate && python -m backend.main"

echo Starting frontend...
cd frontend
npm run dev
cd ..
