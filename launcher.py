import sys
import time
import webbrowser
import uvicorn
import logging
import traceback
from pathlib import Path
from datetime import datetime

class ApplicationLogger:
    """Handles logging for the application with file output."""

    def __init__(self):
        self.log_file = self._get_log_path()
        self._setup_logging()

    def _get_log_path(self) -> Path:
        """Get the log file path."""
        if getattr(sys, 'frozen', False):
            base_dir = Path(sys.executable).parent
        else:
            base_dir = Path(__file__).parent

        return base_dir / "GasDetection_log.txt"

    def _setup_logging(self):
        """Setup logging configuration."""
        # Create logger
        self.logger = logging.getLogger('GasDetection')
        self.logger.setLevel(logging.DEBUG)

        # Create formatters
        file_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        console_formatter = logging.Formatter(
            '%(levelname)s: %(message)s'
        )

        # File handler
        file_handler = logging.FileHandler(self.log_file, encoding='utf-8')
        file_handler.setLevel(logging.DEBUG)
        file_handler.setFormatter(file_formatter)

        # Console handler
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(logging.INFO)
        console_handler.setFormatter(console_formatter)

        # Add handlers
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)

        # Log startup
        self.logger.info("=" * 50)
        self.logger.info(f"GasDetection Application Started - {datetime.now()}")
        self.logger.info(f"Log file: {self.log_file}")
        self.logger.info(f"Python version: {sys.version}")
        self.logger.info("=" * 50)

    def log_system_info(self):
        """Log detailed system information."""
        try:
            import platform
            self.logger.info(f"OS: {platform.system()} {platform.release()}")
            self.logger.info(f"Architecture: {platform.machine()}")
            self.logger.info(f"Executable mode: {'Frozen' if getattr(sys, 'frozen', False) else 'Script'}")

            if getattr(sys, 'frozen', False):
                self.logger.info(f"Executable path: {sys.executable}")
        except Exception as e:
            self.logger.error(f"Failed to log system info: {e}")

def main():
    """Launch the FastAPI server and open browser."""
    logger = ApplicationLogger()
    log = logger.logger

    try:
        log.info("Starting GasDetection application...")

        # Get the directory where the executable is located
        if getattr(sys, 'frozen', False):
            base_dir = Path(sys.executable).parent
            log.info(f"Running from executable: {base_dir}")
        else:
            base_dir = Path(__file__).parent
            log.info(f"Running from script: {base_dir}")

        # Log directory contents
        log.info("Directory contents:")
        try:
            for item in base_dir.iterdir():
                log.info(f"  {item.name} ({'dir' if item.is_dir() else 'file'})")
        except Exception as e:
            log.error(f"Failed to list directory contents: {e}")

        # Add the base directory to Python path
        if str(base_dir) not in sys.path:
            sys.path.insert(0, str(base_dir))
            log.info(f"Added to Python path: {base_dir}")

        log.info("Importing FastAPI application...")
        log.info(f"Python path: {sys.path}")

        # Import the FastAPI app
        try:
            from backend.main import app
            log.info("Successfully imported FastAPI app")
        except ImportError as e:
            log.error(f"Import Error: {e}")
            log.error("Missing required modules. The executable may be corrupted.")
            log.error("Python path contents:")
            for path in sys.path:
                log.error(f"  {path}")
            input("Press Enter to exit...")
            return
        except Exception as e:
            log.error(f"Unexpected import error: {e}")
            log.error(traceback.format_exc())
            input("Press Enter to exit...")
            return

        log.info("Checking port availability...")
        # Check if port is available
        import socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('127.0.0.1', 8000))
        sock.close()

        if result == 0:
            log.info("Port 8000 is already in use. Trying port 8001...")
            port = 8001
        else:
            port = 8000
            log.info("Port 8000 is available")

        log.info(f"Starting server on http://127.0.0.1:{port}")
        log.info(f"Frontend will be available at: http://127.0.0.1:{port}/GasDetection/")
        log.info("Press Ctrl+C to stop the server")

        # Open browser after a short delay
        def open_browser():
            try:
                time.sleep(2)
                log.info("Opening browser to frontend...")
                result = webbrowser.open(f"http://127.0.0.1:{port}/GasDetection/")
                log.info(f"Browser open result: {result}")
            except Exception as e:
                log.error(f"Failed to open browser: {e}")

        import threading
        browser_thread = threading.Thread(target=open_browser)
        browser_thread.daemon = True
        browser_thread.start()

        # Start uvicorn server directly
        log.info("Starting uvicorn server...")
        uvicorn.run(
            app,
            host="127.0.0.1",
            port=port,
            reload=False,
            log_level="info",
            access_log=True
        )

    except OSError as e:
        log.error(f"Network Error: {e}")
        log.error("Cannot bind to network port. Try running as administrator.")
        input("Press Enter to exit...")
    except KeyboardInterrupt:
        log.info("Shutting down server...")
    except Exception as e:
        log.error(f"Unexpected Error: {e}")
        log.error(traceback.format_exc())
        input("Press Enter to exit...")

if __name__ == "__main__":
    main()
