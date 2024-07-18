
# DNS Record Deletion App

This application allows users to delete all DNS records for a specified zone in Cloudflare using the Cloudflare API. Users can input their Cloudflare API Token and Zone ID, and the app will delete all DNS records in that zone, displaying the deleted record IDs in real-time.

## Features

- Accepts user input for Cloudflare API Token and Zone ID.
- Deletes all DNS records in the specified zone.
- Displays each deleted DNS record ID to the user.
- Shows a loading bar while processing the DNS deletions.

## Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager) installed.
- Cloudflare account with appropriate API Token that has permissions to edit DNS records.

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/yourusername/dns-record-deletion-app.git
cd app/

```

### Install Dependencies

```sh
npm install
```

### Project Structure

```
delete-cloudflare-dns/
app{
├── public/
│   └── css/
│       └── styles.css
├── views/
│   └── landing.ejs
├── app.js
├── package.json && package-lock.json
└── node_modules/
},
--licence,
-- README.md
```

### Running the App

1. **Start the Server**

```sh
 - cd app/

node app.js
```

The server will start on port 3000. You should see the message:

```
server running on port 3000
```

2. **Access the Application**

Open your browser and navigate to `http://localhost:3000`. You will see the form to input your Cloudflare API Token and Zone ID.

### Using the Application

1. **Enter Cloudflare API Token and Zone ID**

   - **Cloudflare API Token:** This token must have the necessary permissions to edit DNS records in the specified zone.
   - **Zone ID:** The ID of the zone from which you want to delete all DNS records.

2. **Submit the Form**

   - Click the "Submit" button.
   - The loading bar will appear, indicating the process has started.

3. **View Deleted Record IDs**

   - As the DNS records are deleted, their IDs will be displayed in real-time below the form.
   - Once all DNS records are deleted, you will see a success message.

### Code Overview

#### `app.js`

- Sets up the Express server and middleware.
- Defines the route to handle DNS record deletion.
- Implements functions to fetch and delete DNS records using the Cloudflare API.
- Sends real-time updates to the client using Server-Sent Events (SSE).

#### `views/landing.ejs`

- Contains the HTML form for user input.
- Includes client-side JavaScript to handle form submission and display results dynamically.

#### `public/css/styles.css`

- Styles the HTML elements for a clean and professional look.
- Includes styles for the loading bar animation.

### Detailed Steps

1. **Setup Express Server**
   - Initialize Express app.
   - Set the view engine to EJS.
   - Serve static files from the `public` directory.

2. **Define Routes**
   - `/`: Serves the form page (`landing.ejs`).
   - `/delete-dns-records`: Handles the form submission and performs the DNS record deletion.

3. **Fetch DNS Records**
   - Uses the Cloudflare API to fetch all DNS records for the given zone.

4. **Delete DNS Records**
   - Iterates over the fetched DNS records and deletes each one.
   - Sends real-time updates to the client for each deleted record ID.

5. **Client-Side Form Handling**
   - Prevents default form submission behavior.
   - Sends form data to the server using `fetch`.
   - Handles server responses and updates the DOM to display deleted record IDs and messages.

### Troubleshooting

- Ensure your Cloudflare API Token has the necessary permissions.
- Check that the Zone ID is correct.
- If the server doesn't start, ensure all dependencies are installed and there are no syntax errors in the code.

### Future Enhancements

- Add authentication for additional security.
- Implement error handling for specific scenarios.
- Enhance UI/UX with more detailed progress indicators.

---

By following the above instructions, you should be able to set up and run the DNS Record Deletion App on your local machine. If you encounter any issues or have questions, please open an issue on this repository.
devopled to you by ME https://aasystemsolution.com/
