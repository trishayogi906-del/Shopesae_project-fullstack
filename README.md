# 🛒 ShopEase – Full Stack Shopping Website

ShopEase is an online shopping website built with the **MERN stack** (MongoDB, Express, React, Node.js).
Users can browse products, search them, add items to the cart, log in, place orders, and see their order history.

This is my **final year BCA project**.

---

## ✨ Features

**For customers**
- Register and log in (secure login using JWT and HTTP-only cookies)
- See your name and profile menu in the top-right corner after login
- Browse products by category (Men, Women, Electronics, Shoes, Beauty)
- Search products by name
- Add products to the cart and change quantity
- **Your cart is saved in the database**, so you get the same cart again after logout and login
- Cart added as a guest is merged with your account when you log in
- Checkout with address and payment method (Cash on Delivery / Online)
- "My Orders" page to see all your past orders
- Protected pages: Checkout and Orders open only after login

**For admin (API)**
- Add, edit, and delete products (with image upload)
- Admin account is created automatically by the seed script

**Security**
- Passwords are stored in hashed form (bcrypt), never as plain text
- Order total is calculated on the server, not trusted from the browser
- Input is checked on the server to block bad data

---

## 🧰 Tech Stack

| Part | Technology |
|---|---|
| Frontend | React, Vite, React Router, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Authentication | JWT + HTTP-only cookie, bcrypt |
| File upload | Multer |

---

## 📁 Project Structure

```
ShopEase/
├── frontend/                 # React app
│   └── src/
│       ├── components/       # Navbar, ProductCard, Cart, Checkout, etc.
│       ├── context/          # AuthContext, CartContext
│       ├── hooks/            # useAuth, useCart, useProducts
│       ├── layouts/          # MainLayout, AuthLayout
│       ├── pages/            # Home, Products, Cart, Checkout, Orders, Login, Register
│       ├── routes/           # App routes and protected routes
│       └── services/         # API calls to the backend
│
└── backend/                  # Node + Express API
    └── src/
        ├── config/           # Database connection, categories
        ├── controllers/      # Logic for auth, products, cart, orders
        ├── middleware/       # Auth check, error handling, image upload
        ├── models/           # User, Product, Cart, Order
        ├── routes/           # API routes
        ├── seed/             # Script to add sample products
        └── server.js         # Starting point of the server
```

---

## ⚙️ How to Run This Project

### Before you start

Please install these first:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- MongoDB: either [MongoDB Atlas](https://www.mongodb.com/atlas) (free, online) or MongoDB installed on your computer

### 1. Clone the project

```bash
git clone https://github.com/your-username/shopease.git
cd shopease
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a file named `.env` inside the `backend` folder and add this:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=write-any-long-random-text-here
CLIENT_URL=http://localhost:5173

# Optional: used only to create an admin account when seeding
ADMIN_EMAIL=admin@shopease.com
ADMIN_PASSWORD=admin123
```

> ⚠️ Do not put a `/` at the end of `CLIENT_URL`. It must match the frontend address exactly.

Add sample products to the database (run this only once, internet is needed):

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

You should see that MongoDB is connected and the server is running on `http://localhost:5000`.
To check, open `http://localhost:5000/api/health` in your browser. It should show `{"status":"ok"}`.

### 3. Set up the frontend

Open a **new terminal**:

```bash
cd frontend
npm install
```

Create a file named `.env` inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Now open **http://localhost:5173** in your browser. 🎉

> Keep both terminals running. If the backend is closed, the website will not work.

---

## 🔌 API Endpoints

**Auth** – `/api/auth`
| Method | Endpoint | What it does | Login needed |
|---|---|---|---|
| POST | `/register` | Create a new account | No |
| POST | `/login` | Log in | No |
| POST | `/logout` | Log out | No |
| GET | `/me` | Get the logged-in user | Yes |

**Products** – `/api/products`
| Method | Endpoint | What it does | Login needed |
|---|---|---|---|
| GET | `/` | Get products (supports `category`, `q` for search, `page`, `limit`) | No |
| GET | `/:id` | Get one product | No |
| POST | `/` | Add a product | Admin |
| PUT | `/:id` | Update a product | Admin |
| DELETE | `/:id` | Delete a product | Admin |

**Cart** – `/api/cart`
| Method | Endpoint | What it does | Login needed |
|---|---|---|---|
| GET | `/` | Get my cart | Yes |
| PUT | `/` | Save my cart | Yes |

**Orders** – `/api/orders`
| Method | Endpoint | What it does | Login needed |
|---|---|---|---|
| POST | `/` | Place an order | Yes |
| GET | `/my` | Get my orders | Yes |
| GET | `/:id` | Get one order | Yes |

**Categories** – `GET /api/categories`

---

## 🔐 How Login Works (Simple Explanation)

1. The user enters email and password.
2. The backend checks them in the database and creates a **JWT token**.
3. The token is saved in the browser as an **HTTP-only cookie** (JavaScript cannot read it, so it is safer).
4. After that, the browser sends this cookie with every request.
5. The backend checks the cookie and knows which user is asking, so it returns **only that user's cart and orders**.
6. When the page is refreshed, the website asks `/api/auth/me` to find out if the user is still logged in.

---

## 🖼️ Screenshots

> Add your screenshots here. Create a `screenshots` folder in the project and use this format:

```md
![Home Page](screenshots/home.png)
![Cart Page](screenshots/cart.png)
![Orders Page](screenshots/orders.png)
```

---

## 🚀 Future Improvements

- Real online payment gateway (like Razorpay)
- Product detail page with reviews
- Admin dashboard (a screen to manage products and orders)
- Wishlist and order tracking
- Forgot password with email

---

## 🧪 Common Problems

| Problem | Solution |
|---|---|
| CORS error in the browser | `CLIENT_URL` in backend `.env` must be exactly `http://localhost:5173` (no `/` at the end). Restart the backend. |
| Products are not showing | Run `npm run seed` and make sure the backend is running. |
| `Can't reach the server` | Check that the backend is running and `VITE_API_URL` is correct. Restart the frontend after changing `.env`. |
| MongoDB connection failed | Check `MONGO_URI`. In Atlas, allow your IP address in Network Access. |
| Login works but you are logged out on refresh | Use `http://localhost:5173` (not `127.0.0.1`) and keep `NODE_ENV=development`. |

---

## 👩‍💻 Author

**Trisha yogi**
BCA Final Year Student | Full Stack Web Developer

- GitHub: [your-username](https://github.com/your-username)
- LinkedIn: [your-profile](https://www.linkedin.com/in/your-profile)

---

## 📄 License

This project is made for learning purposes.
