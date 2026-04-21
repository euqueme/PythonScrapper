@echo off
setlocal enabledelayedexpansion

REM Get Python path
set PYTHON_PATH=%APPDATA%\..\Local\Programs\Python\Python311\python.exe

REM Check if Python exists
if not exist "%PYTHON_PATH%" (
    echo Python not found at %PYTHON_PATH%
    exit /b 1
)

echo Python found: %PYTHON_PATH%
"%PYTHON_PATH%" --version

REM Navigate to backend
cd /d "%~dp0backend"

REM Create virtual environment
echo Creating virtual environment...
"%PYTHON_PATH%" -m venv venv

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements
echo Installing Python packages...
pip install -r requirements.txt

echo Setup complete!
pause
