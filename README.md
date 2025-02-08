# Chrome Extension for Facebook Marketplace (France)

This project is a **Proof of Concept (PoC) Chrome Extension** that automates the process of uploading products to the **French Facebook Marketplace**. It fetches product details from a backend database and fills in the required fields on Facebook Marketplace for seamless listing.

---

## Features
- Fetch product details from the backend database.
- Automate product listing on **Facebook Marketplace (France)**.
- Supports multiple product categories and conditions.
- JSON-based image handling for product uploads.
- Simple and intuitive UI for easy integration.

---

## Installation Guide

### 1. **Unzip the Project Files**
Download and extract the ZIP file:
```
chrome-extention-for-facebook-marketplace-france.zip
```

### 2. **Load Unpacked Extension in Chrome**
1. Open **Google Chrome**.
2. Navigate to `chrome://extensions/` in the address bar.
3. Enable **Developer Mode** (toggle switch in the top-right corner).
4. Click **Load unpacked** and select the extracted project folder.
5. The extension should now be visible in the Chrome Extensions list.

---

## Database Setup
This project requires a **MySQL database**. Use the following structure to set up your database:

### Database Name: `chrome_extension`

#### `products` Table Definition
```sql
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` enum('Home','Furniture','Household','Garden','Video Games','Books, films & music','Women''s clothing & shoes','Men''s clothing & shoes','Bags & luggage','Jewellery and accessories','Electronics & computers','Mobile phones','Bicycles','Arts & crafts','Sport and outdoors','Miscellaneous') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `conditionf` enum('New','Used – like new','Used – good','Used – fair') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `images` json DEFAULT NULL,
  `status` enum('active','inactive','sold') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
```

---

## Usage
1. Ensure that the backend database is running and accessible.
2. Load the extension in Chrome.
3. Navigate to Facebook Marketplace (France) and initiate the upload process.
4. The extension will automatically fill in the product details retrieved from the database.

---

## Notes
- This is a **Proof of Concept**, meaning it is not production-ready.
- The extension is designed specifically for the **French Facebook Marketplace**.
- Further enhancements can be made to improve UI/UX and error handling.

---

## Contribution & Support
For any issues, feel free to open an issue in the repository or contact the project maintainers.

**GitHub Repository:** [Chrome Extension for Facebook Marketplace France](https://github.com/rifatron999/chrome-extention-for-facebook-marketplace-france.git)

