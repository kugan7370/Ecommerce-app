# Simple E-Commerce Application

This is a React-based e-commerce application with basic functionality, including user authentication, product listing, and shopping cart management. The app uses React Context for state management and fulfills the requirements outlined in the project assessment.

## Features

### 1. User Authentication
- **User Registration (Sign Up):**
  - Fields: Name, Email, Password
  - Includes basic form validation.
- **User Login:**
  - Fields: Email, Password
  - Includes basic form validation.
- **Authentication State Management:**
  - User authentication state is managed using React Context.
  - Provides feedback for successful login or registration.
  - Includes **Protected Routes** to restrict access to authenticated users only.

### 2. Product List and Management
- Displays a list of products with the following attributes:
  - Name
  - Price
  - Description
  - Image
- Uses a hardcoded array for the product list.

### 3. Shopping Cart
- **Add to Cart:**
  - "Add to Cart" button for each product.
- **View Cart:**
  - Displays items in the cart, showing:
    - Product name
    - Quantity
    - Individual price
    - Total price for each item
- **Update Quantity:**
  - Users can increase or decrease the quantity of items in the cart.
- **Remove from Cart:**
  - Users can remove items from the cart.
- **Cart Total:**
  - Calculates and displays the total cost of items in the cart.

### 4. Additional Features
- **Client-Side Routing:**
  - Uses React Router to navigate between Login/Register, Product List, and Cart pages.
- **Local Storage:**
  - Persists the shopping cart and user authentication state across page reloads.
- **Search and Filter Products:**
  - Filters products by name, price, or category.
- **Notifications:**
  - Uses React Toastify to display feedback messages for actions like login, registration, adding to cart, etc.

### 5. UI/UX Considerations
- Responsive design for desktop and mobile devices.
- Clean and modern design using Tailwind CSS.
- Basic error handling and validation feedback for forms and actions.

## Technology Stack
- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **State Management:** React Context
- **Routing:** React Router
- **Persistence:** Local Storage
- **Notifications:** React Toastify

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kugan7370/Ecommerce-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Ecommerce-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173 in your browser.

## Future Improvements
- Implement a backend for data persistence.
- Add user-specific cart and authentication handling.
- Enhance the search and filter functionalities.
- Introduce animations for better UX.


## Screen Shots

![Capture](https://github.com/user-attachments/assets/0be8389b-b410-4ba9-8b7e-da11113f4a18)
![details](https://github.com/user-attachments/assets/99195cb5-9bfb-42bf-ab93-042b6bd4cf55)
![checkout1](https://github.com/user-attachments/assets/7fad437a-ac48-41e9-8545-365ad10fdfda)


<div style="display: flex; flex-wrap: wrap; gap: 20px;">
   <img src="https://github.com/user-attachments/assets/7194b488-e336-4c18-bf77-a131d3b4a3f1" alt="Screenshot 5" width="330" height="600"/>
  <img src="https://github.com/user-attachments/assets/dccdf38b-0e4f-4a2f-a842-652ce589a316" alt="Screenshot 1" width="330" height="600"/>
   <img src="https://github.com/user-attachments/assets/c5a3c458-3bd8-4851-b165-07e4d5f7c984" alt="Screenshot 4" width="330" height="600"/>
  <img src="https://github.com/user-attachments/assets/b63686d2-2c47-4e40-ac9f-c8b5c8f2c142" alt="Screenshot 3" width="330" height="600"/>
   <img src="https://github.com/user-attachments/assets/e7c6ede8-06a1-4e2a-b2fc-66a1be1be71f" alt="Screenshot 2" width="330" height="600"/>
  <img src="https://github.com/user-attachments/assets/1fb5c8d0-7896-4b47-901d-fbe2f5f7b105" alt="Screenshot 6" width="330" height="600"/>
</div>






