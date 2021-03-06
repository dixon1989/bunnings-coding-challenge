# Bunnings Coding Challenge

# README

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for?

- Bunnings Coding Challenge to determine the next stage of interview
- Version 1.0

### How do I get set up?

- Be sure you have node.js installed.
- Make sure you are at the correct directory named ./bunnings-coding-challenge or root folder.
- You will need to run "npm install" or "yarn" on your terminal depending on your preference.
- To view the history progress of my commits, run "git log" on your terminal.
- To run test you will need to run "npm run test" or "yarn test" on your terminal depending on your preference.
- Run "npm start" or "yarn start" to view the web application on my work.

### Contribution guidelines

- Developing, Commiting code
- Writing tests code
- Code review
- Documentation
- Code are deployed and develop personally by Dickson Lim

### Stacks Used

- React Typescript
- React Hooks
- Styled-Components
- Jest
- Axios
- papaparse -> CSV Reader to Object
- react-csv -> Convert and Download CSV
- react-table

### Who do I talk to?

- Repo owner or admin - Dickson Lim
- Kindly email to dixon.lim89@gmail.com for any inquiry.

# Requirement: Coding Skills Challenge

### The below describes a problem statement, make sure to read all the instructions in this readme before you start.

### Business Requirement:

- Company A have acquired Company B, A and B sell some common products, sourced from suppliers (Sometimes the same supplier, sometimes a different one).
- The business wants to consolidate the product catalog into one superset (merged catalog).

### There are possibilities like:

- Company A and B could have conflicting product codes (SKUs).
- Product codes might be same, but they are different products.
- Product codes are different, but they are same product.
- You should not be duplicating product records in merged catalog.
- Product on merged catalog must have information about the company it belongs to originally.

The business provided the following information that may help in identifying a matching product:

- Products have associated suppliers, each supplier provides 1 or many barcodes for a product,
- A product may have many suppliers,
- If any supplier barcode matches for one product of company A with Company B then we can consider that those products as the same.

So, you have following entities to play with:

<img src="./entity_diagram.png" width="800px" height="auto">

You need to produce code in your preferred language which can demonstrate following:

### Initial load

- Mega merge: All products from both companies should get merge into a common catalog

### Sample Data

Please refer input folder for following CSVs:

1. [catalogA.csv](input/catalogA.csv) - Products for Company A
1. [catalogB.csv](input/catalogB.csv) - Products for Company B
1. [suppliersA.csv](input/suppliersA.csv) - List of Suppliers for Company A
1. [suppliersB.csv](input/suppliersB.csv) - List of Suppliers for Company B
1. [barcodesA.csv](input/barcodesA.csv) - Product barcodes provided by supplier for company A
1. [barcodesB.csv](input/barcodesB.csv) - Product barcodes provided by supplier for company B
1. [result_output.csv](output/result_output.csv) - The correct results based on the above sample data

### Deliverables.

- Application should be able to accept above data as csv files from input folder and must produce a merged catalog as a csv file in output folder.
- Proving your code works via unit testing is highly encouraged.
- Spend as little or as much time as you like ???
- The code you produce can be in any language ???
- The output of the efforts ??? must be committed back into a Public Repo in Github and the URL shared back for review.
- Document instructions on how to install and run your solution in the README.
