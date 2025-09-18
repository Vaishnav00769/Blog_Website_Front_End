# Blog Website

 **Live Demo:** [Blog Website](https://vaishnav-agarwal-blog-application.netlify.app/)

A full-stack **Blog Website** project built with a React front-end and a FastAPI back-end.  
This repository is split into two parts:

- [Front-End (React)](https://github.com/Vaishnav00769/Blog_Website_Front_End)
- [Back-End (FastAPI)](https://github.com/Vaishnav00769/Blog_Website_Back_End)

---

## Features

- User authentication (signup/login)
- Create, Read, Update, Delete (CRUD) blog posts
- SQLite database with SQLAlchemy ORM
- JWT authentication for secure APIs
- Responsive UI built with React
- RESTful API integration between front-end & back-end

---

## Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Front-End   | React, Tailwind CSS, Axios             |
| Back-End    | FastAPI, Python, SQLAlchemy            |
| Database    | SQLite (default, can be replaced)      |
| Auth        | JWT (JSON Web Tokens)                 |
| Deployment  | Netlify (Front-End), Render (Back-End) |

---

## Getting Started

### Prerequisites
- Node.js (>= 16)
- Python (>= 3.10)
- pip / virtualenv
- SQLite (or another database if configured)

---

###  Front-End Setup
```bash
# Clone repo
git clone https://github.com/Vaishnav00769/Blog_Website_Front_End.git
cd Blog_Website_Front_End

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Run development server
npm run dev
```

Runs at: `http://localhost:5173` (default Vite port)

---

###  Back-End Setup
```bash
# Clone repo
git clone https://github.com/Vaishnav00769/Blog_Website_Back_End.git
cd Blog_Website_Back_End

# Create virtual environment
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
```

Runs at: `http://localhost:8000`

---

##  Project Structure

**Front-End**
```
src/
├── components/ # Reusable UI components
├── pages/      # Page-level components
├── services/   # API calls via Axios
├── App.jsx
└── main.jsx
```

**Back-End**
```
├── main.py       # FastAPI entry point
├── auth.py       # JWT authentication routes
├── models.py     # Database models
├── schemas.py    # Pydantic schemas
├── database.py   # DB setup
└── requirements.txt
```

---

##  API Endpoints

| Endpoint         | Method | Description            |
|------------------|--------|------------------------|
| `/signup`        | POST   | Register user         |
| `/login`         | POST   | User login            |
| `/blogs`         | GET    | Get all blogs         |
| `/blogs`         | POST   | Create new blog       |
| `/blogs/{id}`    | GET    | Get blog by ID        |
| `/blogs/{id}`    | PUT    | Update blog           |
| `/blogs/{id}`    | DELETE | Delete blog           |

---

##  Contributing

1. Fork this repo
2. Create a new branch (`feature/xyz`)
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

---

##  License

This project is open source under the **MIT License**.

---

##  Contact

**Vaishnav Agarwal**  
GitHub: [Vaishnav00769](https://github.com/Vaishnav00769)  
LinkedIn: [Vaishnav Agarwal](https://www.linkedin.com/in/vaishnav-agarwal-9498542b0/)
