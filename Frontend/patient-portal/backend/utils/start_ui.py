import subprocess
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def start_frontend():
    frontend_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'frontend')
    frontend_dir = os.path.abspath(frontend_dir)
    
    print(f"Navigating to frontend directory: {frontend_dir}")
    if not os.path.exists(frontend_dir):
        print("Error: Frontend directory not found!")
        return

    print("Step 1: Installing dependencies (this might take a minute)...")
    subprocess.run("npm install", shell=True, cwd=frontend_dir)
    
    print("\nStep 2: Starting the React frontend...")
    print("Your browser should open automatically or you will see a 'Local: http://localhost:5173' link.")
    subprocess.run("npm run dev", shell=True, cwd=frontend_dir)

if __name__ == '__main__':
    start_frontend()
