from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files from frontend dist directory
frontend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist")
if os.path.exists(frontend_path):
    app.mount("/GasDetection", StaticFiles(directory=frontend_path, html=True), name="frontend")

@app.get("/")
def root():
    return {"message": "Backend running"}

# Serve the main frontend page
@app.get("/GasDetection/")
async def serve_frontend():
    index_path = os.path.join(frontend_path, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"error": "Frontend not found"}

# Catch-all route to serve the frontend for client-side routing
@app.get("/{path:path}")
async def serve_spa(path: str):
    # Check if it's an API route
    if path.startswith("api/"):
        return {"error": "API endpoint not found"}

    # Otherwise serve the frontend
    index_path = os.path.join(frontend_path, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"error": "Frontend not found"}
