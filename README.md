# **Expense Tracker**

## **Project Objective**

The Expense Tracker is a simple and user-friendly web application designed for groups of people traveling together. Its primary goal is to facilitate the management of shared expenses, making it easy to keep track of who owes money to whom. By providing just a name, users can register and start recording the expenses they have paid for others. The application then calculates the final balance for each person, listing all the records from the database, ensuring that everyone can settle their debts by the end of the trip.

## **Features**

- **User Registration**: Simple registration process where you enter your name to start using the application.
- **Add Expenses**: Log expenses you have paid on behalf of others, specifying the amount and who owes you.
- **View Balances**: See at a glance who owes you money and how much, as well as whom you owe.
- **Persistent Records**: All expenses and balances are saved in a database for retrieval at any time.

## **Local Setup**

To set up the Expense Tracker application on your local machine, follow these detailed steps:

### **Prerequisites**

- Python (3.7 or newer)
- pip (Python package installer)
- Flask (Python web framework)
- SQLite (Database)

### **Step-by-Step Setup**

1. **Clone the Repository**

   Start by cloning the repository to your local machine. Open your terminal and run:

   ```bash
   bashCopy code
   git clone https://github.com/bill255203/Expense-Tracker.git
   cd Expense-Tracker

   ```

2. **Set Up a Python Virtual Environment** (optional but recommended)

   Create a virtual environment to keep dependencies required by different projects separate by running:

   ```
   Copy code
   python -m venv venv

   ```

   Activate the virtual environment:

   - On Windows:

     ```
     Copy code
     venv\Scripts\activate

     ```

   - On macOS and Linux:

     ```bash
     bashCopy code
     source venv/bin/activate

     ```

3. **Install Dependencies**

   While in the project directory and with your virtual environment activated, install the required Python packages:

   ```
   pip install flask flask-cors

   ```

4. **Run the Flask Application**

   Run the server by running:

   ```
   python3 app.py

   ```

   The application should now be running on **`http://localhost:5000`** and create an **`expenses.db`** file with the necessary **`user`** and **`expense`** tables in the expenses.db.

5. **Access the Application**

   Open your web browser and navigate to **`http://localhost:5000`** or install the live server extension in vscode and click `go live` in the bottom of vscode to use the Expense Tracker.

6. **Troubleshooting**

   If you encounter any issues, such as the browser blocking requests due to CORS policy, ensure that the **`flask_cors`** extension is properly set up in your **`app.py`** file.
