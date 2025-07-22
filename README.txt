# How to Install the Application

1. First, download or clone the repository from GitHub to your local machine.
   - You can use the green "Code" button on GitHub and copy the HTTPS link.
   - Then, in your terminal, type:
     git clone <paste-your-link-here>

2. Open the project in your preferred code editor like VS Code.

3. Navigate to the backend and frontend folders and install the required packages:
   - Backend:
     cd apps/backend
     yarn install
   - Frontend:
     cd apps/frontend
     yarn install

4. Create `.env` files for both the backend and the frontend.
   - These files will contain environment-specific settings (leave space for now).
   - - Backend:
     cd apps/backend/.env
   -  Paste the folloeing code the the .env file:
    /** TABLE_NAME=inclusivity-carlton-InclusivityTableTable
        AWS_SECRET_ACCESS_KEY=Av774hAfxtc2kbWik5J+duR7bu28X5IFLZokApBb
        AWS_ACCESS_KEY_ID=AKIAW3MEAESI6KVM7N6C

        # AWS_SECRET_ACCESS_KEY=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
        # AWS_ACCESS_KEY_ID=AKIAW3MEAESI4YJAL7VW

        AWS_REGION=us-east-1
        REGION=us-east-1
        SECRET_KEY=mybiurthdayjahfkadhshdfjhsdj **/

     - Frontend:
     cd apps/frontend/.env
   -  Paste the folloeing code the the .env file:
    /** VITE_API_ENDPOINT="http://localhost:9000/api" **/

5. After setting up the `.env` files:
   - Start the backend:
     cd apps/backend
     yarn dev
   - Start the frontend:
     cd apps/frontend
     yarn dev

6. Once both servers are running, open the browser and go to:
   http://localhost:5173/sign-in

7. Use the following credentials to log in:
   Username: solanixhanti@gmail.com
   Password: password

8. You’re in! 🎉
