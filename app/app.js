const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const axios = require('axios');

const app = express();
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Replace these variables with your values
const CLOUDFLARE_API_TOKEN = '';                      // API Token Must BE for Edite DNS Zone            //P-HPHyuUWyS5vLyypHrPhoereE8npXtrHiEFmZpa
const ZONE_ID = '';                                               //eca709e93e9292a4deef2737d7062fed

// Function to get all DNS records for the zone
async function getDNSRecords() {
  try {
    const response = await axios.get(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, {
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching DNS records:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to delete a DNS record by ID
async function deleteDNSRecord(recordId) {
  try {
    await axios.delete(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${recordId}`, {
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`Deleted record ID: ${recordId}`);
  } catch (error) {
    console.error(`Error deleting record ID ${recordId}:`, error.response ? error.response.data : error.message);
  }
}

// Function to delete all DNS records
async function deleteAllDNSRecords() {
  try {
    const records = await getDNSRecords();
    for (const record of records) {
      await deleteDNSRecord(record.id);
    }
    console.log('All DNS records have been deleted.');
  } catch (error) {
    console.error('Error in deleting DNS records:', error.message);
  }
}

// Route to trigger DNS record deletion
app.get("/delete-dns-records", async (req, res) => {
  try {
    await deleteAllDNSRecords();
    res.send("All DNS records have been deleted.");
  } catch (error) {
    res.status(500).send("An error occurred while deleting DNS records.");
  }
});

// Serve static files from "public" and "pics" directories (optional)
// app.use(express.static('public'));
// app.use('/pics', express.static('pics'));

app.get("/", (req, res) => {
  res.render("landing");
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).render('404', {
    url: req.originalUrl
  });
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', {
    error: err,
    showError: true
  });
});

// Start the server
app.listen("3000", () => {
  console.log("server running on port 3000");
});
