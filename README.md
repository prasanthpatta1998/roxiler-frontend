# Roxiler MERN Challenge - Frontend Task

This project implements a single-page application that displays transaction data and statistics using provided APIs. The application includes a transaction table, transaction statistics, and a transaction bar chart, all of which update dynamically based on user input.

## Features

### Transactions Table
- **Month Selection Dropdown**: 
  - A dropdown menu allows users to select a month (January to December). 
  - By default, the month of March is selected.
  
- **Transaction Listing**:
  - The table lists transactions for the selected month, irrespective of the year, using the transactions API.
  
- **Search Functionality**:
  - A search box is provided to filter transactions based on `title`, `description`, or `price`. 
  - If the search text matches any of these fields, the corresponding transactions for the selected month are displayed.
  - Clearing the search box resets the list to display all transactions for the selected month.
  
- **Pagination**:
  - The table supports pagination with "Next" and "Previous" buttons to load data from the API.
  - Clicking "Next" loads the next page of transactions.
  - Clicking "Previous" loads the previous page of transactions.

### Transactions Statistics
- Displays the following statistics for the selected month:
  - **Total Amount of Sale**: Sum of all transaction amounts.
  - **Total Sold Items**: Count of all sold items.
  - **Total Not Sold Items**: Count of all items that were not sold.

### Transactions Bar Chart
- Displays a bar chart showing the distribution of transaction prices in different ranges for the selected month, irrespective of the year.
- The chart updates based on the month selected from the dropdown menu above the transactions table.

### Transactions Pie Chart
- Displays a pie chart showing the distribution of transaction categories in different types for the selected month, irrespective of the year.
- The chart updates based on the month selected from the dropdown menu above the transactions table.

## API Usage

- The application makes use of the provided APIs to fetch transaction data, statistics, bar chart data and pie chart data.
- The selected month from the dropdown is passed as a parameter to filter the API responses accordingly.
