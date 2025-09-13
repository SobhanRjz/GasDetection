# Gas Safety Decision Support System

A comprehensive gas detection and monitoring system designed for industrial and commercial environments. This application provides real-time monitoring, advanced analytics, and intelligent alerts to ensure workplace safety.

## 🚀 Features

### Core Functionality
- **Real-time Gas Monitoring** - Continuous monitoring of gas levels and environmental conditions
- **Advanced Analytics** - Comprehensive data analysis and trend identification
- **Smart Alerts** - Intelligent notification system with customizable thresholds
- **Mobile Access** - Responsive dashboard accessible from any device
- **Multi-sensor Support** - Integration with various gas detection sensors

### Dashboard Features
- **Live Metrics** - Real-time display of gas levels, temperature, and system status
- **Alert Management** - Recent alerts with severity levels and timestamps
- **System Health** - Sensor status and network connectivity monitoring
- **Data Visualization** - Interactive charts and progress indicators

### Settings & Configuration
- **Customizable Thresholds** - Adjustable alert levels for different gas types
- **Notification Preferences** - Email and SMS alert configuration
- **Data Management** - Configurable data retention and export options
- **Theme Customization** - Light/dark theme support

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing for single-page application

### Backend
- **Python** - Backend logic and API development
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLite/PostgreSQL** - Database for storing sensor data and configurations

## 📁 Project Structure

```
GasDetection_Demo/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   ├── bg.mp4          # Background video
│   │   └── vite.svg        # Vite logo
│   ├── src/                # Source code
│   │   ├── components/     # Reusable UI components
│   │   ├── layouts/        # Layout components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript definitions
│   │   ├── constants/      # Application constants
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Application entry point
│   │   └── router.tsx      # Routing configuration
│   ├── package.json        # Dependencies and scripts
│   └── vite.config.ts      # Vite configuration
├── backend/                # Python backend application
│   └── main.py            # FastAPI application
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

## 🚀 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn** package manager

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GasDetection_Demo/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the server**
   ```bash
   python main.py
   ```

## 📖 Usage

### Accessing the Application

1. **Start both frontend and backend servers**
2. **Open your browser** and navigate to `http://localhost:5174`
3. **Home Page** - Landing page with background video and main navigation
4. **Dashboard** - Real-time monitoring and alerts
5. **Settings** - Configure system preferences and thresholds
6. **About** - Information about the system and team

### Key Features Usage

#### Dashboard
- View real-time gas levels and temperature
- Monitor system status and sensor connectivity
- Review recent alerts with severity indicators

#### Settings
- Adjust gas threshold levels
- Configure notification preferences
- Set data retention policies
- Customize theme and language

#### Alerts
- Receive real-time notifications
- View alert history with timestamps
- Filter alerts by severity level

## 🔧 Configuration

### Environment Variables

Create `.env` files in both frontend and backend directories:

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Gas Safety System
```

#### Backend (.env)
```env
DATABASE_URL=sqlite:///./gas_detection.db
SECRET_KEY=your-secret-key-here
DEBUG=True
```

### Sensor Configuration

Configure sensor thresholds in the Settings page:
- **Safe Level**: 0-50 PPM
- **Warning Level**: 51-70 PPM
- **Danger Level**: 71+ PPM

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
```

### Backend Testing
```bash
cd backend
python -m pytest
```

## 📦 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the dist/ folder to your web server
```

### Backend Deployment
```bash
cd backend
# Configure production settings
python main.py
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: support@gassafety.com #temp
- **Documentation**: [Internal Wiki](https://wiki.company.com/gas-safety)
- **Issue Tracker**: [GitHub Issues](https://github.com/company/gas-safety/issues)

## 🔄 Version History

### v1.0.0 (Current)
- Initial release with core gas detection features
- Real-time monitoring dashboard
- Alert management system
- Responsive design for mobile devices
- Multi-sensor integration

---

**Built with ❤️ for workplace safety and environmental monitoring**