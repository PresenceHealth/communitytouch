## Community Touch

#### Community Benefit at your fingertips

### Overview
Community Touch is a mobile-first, customizable, single-page web app for visualizing hospital community benefit investments. Originally developed by the Mission department at Presence Health, a Catholic health system based in Illinois, it is available to all nonprofit hospitals as free, open source software. It enables intuitive, interactive displays of community benefit spending between categories, at different hospitals, and over time in an attractive and printable format. 

### Installation
1. “Fork” the Community Touch repository at the above URL. You will need to create a GitHub account, which is free. Your fork will work out of the box, but it uses sample data for a sample hospital system. 
2. Edit your fork (copy) of the repository as described below under “Customization” to add your hospital’s name and logo, and specify what categories and hospitals you are including.
3. Ensure that your Community Benefit data is compiled in the proper format, as described below under “Data Provision”. 
4. Once you make these changes to your fork, you should be able to see your visualization at https://github.com/[username]/communitytouch, where [username] is your hospital’s username on GitHub. You can redirect this to another URL you own, or have your hospital’s web development team incorporate Community Touch into a page on your hospital website. 

### Data Provision
Data for Community Touch is collected in a single Microsoft Excel workbook (sample provided). In order for Community Touch to read this data, the individual sheets need to be saved as CSV (comma-separated values) files in the `/data/` folder of your Community Touch repository. One CSV file is used per hospital, region, or whole system. 

The columns are distinct categories of community benefit, such as Financial Assistance and Medicaid shortfall; each row is a temporal (quarterly or annual) observation, such as “Q1 2017” or “2017”. Each separate CSV file that you provide needs to have the exact same rows and columns. For each category, data can be provided for any or all of the following:

* Actual community benefit spending at cost ($)
* Community benefit at charges or billings ($)
* Percent of revenue (%) – automatically calculated if you provide a Net Patient Revenue column
* Persons served (count)

Please see the provided Excel document for more information about how to structure your worksheet. **If your data is not in the proper format, Community Touch cannot read it.**

### Customization
The process of using Community Touch for your hospital or health system is designed to be easy and require minimal technical skills. 

1. Provide information about your setup in the cb.js JavaScript file. This is where you can customize Community Touch by including a different group of categories or different default options. This information includes what categories you’re using, what groupings you’re placing them into—such as “Community Health” or “Means-Tested Government Programs”—and what should happen by default when a user loads the page. 
2. Edit the HTML document to personalize it. For instance, replace the Presence Health logo with your health system’s logo, edit the text in the left-hand sidebar, and include your own links in the footer section.

### Troubleshooting
Presence Health is making Community Touch available to all 2,845 non-profit hospitals in the United States, free of charge. As such, we are unable to provide custom technical support for each implementation. If you notice a bug or would like to suggest an improvement, please do so by [opening an issue](https://github.com/PresenceHealth/communitytouch/issues). 

If you are having trouble implementing Community Touch yourself and do not know what the problem is, we recommend one of the following:

* Most of the issues will be related to improper structure of the CSV data files. Please carefully review the requirements noted in the Excel spreadsheet. 
* Work forwards rather than backwards by creating a clean fork (copy) of Community Touch. Ensure that it works out of the box with the sample data, then gradually add your own changes and customizations and data to it. After each change, ensure that the website still works. This could help you pinpoint the source of the trouble. 
* Request the support of your hospital’s web development team.

### Team
[Jonathan Giuffrida](https://lucaluca.github.io)
[Will Snyder](https://twitter.com/williamsnyder)

Built using [Highcharts](http://www.highcharts.com/), [Papa Parse](http://papaparse.com/), and other open source libraries.
