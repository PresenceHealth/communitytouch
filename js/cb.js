/********************************
 ****** START METADATA
 *******************************/

// Users: Edit the information in this section to customize for your hospital or health system.
// Be careful to only edit this section (down to "END METADATA"), unless you know what you're doing.


// global selections: initial values are defaults
/*global QueryString*/
var m = 'System'; // Default hospital, region, or system to show on page load
var c = 'Overall Community Benefit'; // Default category to show: TD replace this with just the first category
var u = 'Amount'; // Default units to use
var t = 'Yearly'; // Default temporal selection: Yearly or Quarterly
var ac = 'Overall Community Benefit'; // Area chart uses different variable, so specify here the default category to show if it's a grouping
var p = '2016'; // Default time period (could be the latest, or any other one)

var options = {
	systemName: 'Presence Health',
	lastUpdated: 'May 8, 2017',
	earlier: false,
}; 

// List of hospital abbreviations and names.
// The abbreviations MUST match the names of your data files, e.g. "PCMC.csv". 
var hospitals = {
	'PCMC': 'Presence Covenant Medical Center',
	'PHFMC': 'Presence Holy Family Medical Center',
	'PMMC': 'Presence Mercy Medical Center',
	'PRMC': 'Presence Resurrection Medical Center',
	'PSFH': 'Presence Saint Francis Hospital',
	'PSJHC': 'Presence Saint Joseph Hospital - Chicago',
	'PSJHE': 'Presence Saint Joseph Hospital - Elgin',
	'PSJMC': 'Presence Saint Joseph Medical Center',
	'PSMEMC': 'Presence Saints Mary and Elizabeth Medical Center',
	'PSMH': 'Presence St. Mary&rsquo;s Hospital',
	'PUSMC': 'Presence United Samaritans Medical Center',
	'PMG': 'Presence Medical Group',
	'PLC': 'Presence Life Connections',
	'PH Corp': 'Presence Health Corporate',
	'System': 'Presence Health'
};

var allHospitals = Object.keys(hospitals);

// Customizations
// Often data before a certain time period is of poor quality. Here, you can indicate 
// whether or not to show data before a certain time period, which may be of poor quality.
// The user can request this in the URL by adding ?earlier=true
// Checking a checkbox in the left sidebar reloads the page with earlier=true
if ("earlier" in QueryString && QueryString.earlier == "true") {
	options.earlier = true;
}

// User can show a certain hospital on page load by adding "?hospital=XXXX" to the URL, e.g. "?hospital=PCMC"
if ("hospital" in QueryString && allHospitals.indexOf(QueryString.hospital) !== -1) {
	m = QueryString.hospital;
	console.log(m);
}

// Here, give the category groupings you want to use.
// You can keep these default ones, or add your own. 
// "NonCB" should contain any categories which are not community benefit. This grouping is not shown to the user.
var groupings = {
	'Community Health': ['Community Building Activities',
		'Community Health Improvement', 'Community Benefit Operations'
	],
	'Total Community Benefit (IRS)': ['Financial Assistance', 'Unreimbursed Medicaid', 'Health Professions Education',
		'Subsidized Health Services', 'Research', 'Cash/In-Kind Contributions',
		'Community Health'
	],
	'Total Community Benefit (AG)': ['Financial Assistance', 'Unreimbursed Medicaid',
		'Health Professions Education', 'Research', 'Cash/In-Kind Contributions',
		'Medicare Shortfall', 'Bad Debt', 'Language Assistance Services', 'Volunteer Services',
		'Subsidized Health Services (AG)', 'Other Community Benefits'
	],
	'Total Means-Tested': ['Financial Assistance', 'Unreimbursed Medicaid'],
	'Proactive Community Benefit': ['Community Health Improvement', 'Community Building Activities',
		'Community Benefit Operations', 'Cash/In-Kind Contributions', 'Research',
		'Language Assistance Services', 'Volunteer Services'
	],
	'NonCB': ['Total Operating Expenses', 'Cost-to-Charge Ratio', 'Net Patient Revenue'],
	'Community Transformation': ['Health Professions Education',
		'Subsidized Health Services', 'Research', 'Cash/In-Kind Contributions',
		'Community Health'
	],
	'Overall Community Benefit': ['Financial Assistance', 'Unreimbursed Medicaid', 'Community Transformation'],
};

// Provide a plain-English way of referring to each category or grouping.
// This is shown in the headline, as so: "In [2015], [Presence Health] provided [$206,346,459] in total community benefit (IRS definition), helping [379,524] people in our communities.""
var categories_abbr = {
	'Overall Community Benefit': 'community benefit',
	'Total Community Benefit (IRS)': 'total community benefit (IRS definition)',
	'Total Community Benefit (AG)': 'total community benefit (Illinois Attorney General definition)',
	'Total Means-Tested': 'means-tested community benefit',
	'Proactive Community Benefit': 'proactive community benefit',
	'Community Health': 'community health programs',
	'Community Transformation': 'community transformation',
	'Financial Assistance': 'financial assistance',
	'Unreimbursed Medicaid': 'unreimbursed Medicaid services',
	'Community Health Improvement': 'community health improvement services',
	'Health Professions Education': 'health professions education',
	'Subsidized Health Services': 'subsidized health services',
	'Research': 'research expenses',
	'Cash/In-Kind Contributions': 'cash and in-kind donations',
	'Community Building Activities': 'community building activities',
	'Community Benefit Operations': 'community benefit operations',
	'Medicare Shortfall': 'unreimbursed Medicare services',
	'Bad Debt': 'uncollected debts',
	'Language Assistance Services': 'language assistance services',
	'Volunteer Services': 'volunteer programs',
};

/* DEFINITIONS */
// These are plain English explanations of the community benefit categories which appear in the headline.
// Feel free to change these as you wish, and make sure you add definitions for any new categories you add.
// The format is     'Category Name': 'Definition',      (with single quote marks, and a trailing comma)
var categories_definitions = {
	'Overall Community Benefit': 'Under the Affordable Care Act, the Internal Revenue Service requires all non-profit hospitals to provide annual reports of programs undertaken to improve the health of their communities. Below is a broad overview of community benefit provided by ' + options.systemName + '. Click on other categories to the left to see more details.',
	'Total Community Benefit (IRS)': 'Under the Affordable Care Act, the Internal Revenue Service requires all non-profit hospitals to provide annual reports of programs undertaken to improve the health of their communities.',
	'Total Community Benefit (AG)': 'The Illinois Attorney General requires all non-profit hospitals to report community benefit annually. Their classification differs somewhat from the IRS&rsquo;s classification and includes Medicare shortfall and bad debts.',
	'Total Means-Tested': 'Includes financial assistance and Medicaid shortfall, which are provided only to patients below certain income levels.',
	'Proactive Community Benefit': 'As part of our mission to enhance the health of our communities, we have a special focus on proactively addressing the root causes of health outcomes. Through community health programs, research, volunteer activities, and other community benefit, we are removing barriers to healthy communities, reducing overall health care costs, and helping residents remain healthy and fulfilled.',
	'Community Health': 'Community health programs are provided to patients in poverty and to the broader community, and focus on proactively improving community health through services like educational sessions, health screenings, enrollment assistance, and care coordination programs.',
	'Community Transformation': 'Services provided to the broader community that proactively address the root causes of health outcomes and invest in building and supporting healthy communities.',
	'Financial Assistance': 'Free or discounted health services provided to persons who cannot afford to pay all or portions of their medical bills and who meet the criteria specified in Presence Health\'s Financial Assistance Policy. Reported in terms of actual costs, not charges.',
	'Unreimbursed Medicaid': 'The difference between net patient revenue and total expenses (cost of care) for Medicaid patients.',
	'Community Health Improvement': 'Activities to improve community health such as educational sessions, health screenings, enrollment assistance, and care coordination programs offered community residents.',
	'Health Professions Education': 'Costs incurred helping prepare future health care professionals such as residents, nursing students, or other health professionals.',
	'Subsidized Health Services': 'Clinical service lines provided despite a financial loss because they meet an essential community need, such as a trauma center or behavioral health program.',
	'Research': 'Clinical and community health research, as well as studies on health care delivery that are shared with others outside the organization such as cancer registries.',
	'Cash/In-Kind Contributions': 'Cash or services donated to individuals or the community at large. In-kind donations include donations of food, equipment, space, or supplies.',
	'Community Building Activities': 'Programs that address root causes of health problems, such as poverty, homelessness, and environmental hazards, as well as advocacy undertaken on behalf of the underserved and underprivileged.',
	'Community Benefit Operations': 'Costs associated with dedicated community benefit staff and community health needs and assets assessments.',
	'Medicare Shortfall': 'The difference between net patient revenue and total expenses (cost of care) for Medicare patients.',
	'Bad Debt': 'Unpaid patient balances that are written off as uncollectable. Reported in terms of costs, not charges.',
	'Language Assistance Services': 'Interpretation and translation services for patients and community residents.',
	'Volunteer Services': 'Programs that mobilize volunteers, including both community members and Presence Health associates on their own time.',
	'Cost-to-Charge Ratio': 'A rough measure of how efficiently services are being provided, the cost-to-charge ratio is used in calculating several kinds of community benefit. A lower cost-to-charge ratio indicates more efficient operations and tends to reduce the total community benefit. The cost-to-charge ratio does not indicate anything about the financial strength of a hospital, and should not be used to make comparisons between hospitals.',
	'Total Operating Expenses': '',
	'Net Patient Revenue': '',
}


// Change this to use your own color scheme if you want. Colors will be used in order from first to last, and then loop around again.
var colors = ['#87D2DA', '#70C8BC', '#B3D034', '#7ABC43', '#EEB91C',
	'#089DAB', '#06A18C', '#4AB553', '#DF7E2A', '#666666'
];






/********************************
 ****** END METADATA
 *******************************/


/************************************************
// YOU SHOULD NOT NEED TO EDIT PAST THIS LINE
************************************************/

/*global $*/
/*global Highcharts*/
/*global Papa*/
/*global HighchartHolder*/

var cb = {
	scope: {
		years: [],
		quarters: [],
		temporalFilled: false,
		d: {},
		completed: 0
	},
	functions: {
		initialize: function() {
			cb.events.document_ready();
			HighchartHolder.functions.initialize();

			$('#period').append('<option value="' + p + '">' + p + '</option>');

			/** 
			 *	For every hospital in hospitals array, load individual data
			 **/
			for (var ho in hospitals) {
				cb.functions.loadHospital(ho);
			}
		},
		csvToArray: function(csvString) {
			// The array we're going to build
			var csvArray = [];
			// Break it into rows to start
			var csvRows = csvString.split(/\n/);
			// Take off the first line to get the headers, then split that into an array
			var csvHeaders = csvRows.shift().split(';');

			// Loop through remaining rows
			for (var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex) {
				var rowArray = csvRows[rowIndex].split(';');

				// Create a new row object to store our data.
				var rowObject = csvArray[rowIndex] = {};

				// Then iterate through the remaining properties and use the headers as keys
				for (var propIndex = 0; propIndex < rowArray.length; ++propIndex) {
					// Grab the value from the row array we're looping through...
					var propValue = rowArray[propIndex].replace(/^"|"$/g, '');
					// ...also grab the relevant header (the RegExp in both of these removes quotes)
					var propLabel = csvHeaders[propIndex].replace(/^"|"$/g, '');;

					rowObject[propLabel] = propValue;
				}
			}

			return csvArray;
		},
		loadHospital: function loadHospital(hospital) {
			/**
			 *	Load hospital csv data locally,
			 *  Use Papa to parse CSV,
			 *  Update progress bar for each hospital loaded. 
			 **/
			var githubUrl = '/data/' + hospital + '.csv';

			Papa.parse(githubUrl, {
				download: true,
				header: true,
				dynamicTyping: true,
				complete: function(results) {
					/**
					 *  Have to use counting function due to delay on loading callback
					 **/
					cb.scope.completed++;
					cb.functions.loadData(hospital, results.data);
					$('#progress-bar .progress-bar').css('width', String(cb.scope.completed / allHospitals.length * 100) + '%')
						.attr('aria-valuenow', cb.scope.completed);

					if (cb.scope.completed == allHospitals.length) {
						cb.functions.loadFinished();
					}
				}
			});
		},
		loadFinished: function() {
			/**
			 *  Add the option to switch years,
			 *	Hide the progress bar,
			 *	Load the main chart.
			 **/
			cb.scope.years.forEach(function(year) {
				if (year !== p) {
					$('#period').append('<option value="' + year + '">' + year + '</option>');
				}
			});
			$('#progress-bar').hide();
			HighchartHolder.functions.loadCharts('ac');
		},
		loadData: function(hospital, r) {
			/**
			 *	 TODO: Are we changing this? Does work well although convoluted. 
			 **/
			cb.scope.d[hospital] = {};
			var type, unit, category, value; // vars for the loop
			var fillInTemporal = !(cb.scope.temporalFilled);
			cb.scope.temporalFilled = true;
			var earliest = options.earlier ? 2008 : 2012; // TD Move under "Customizations": Let user say before what year the data was poor quality (in this case, before 2012, and the data goes back to 2008)
			// TD We need to refactor this for loop to make it simpler and more efficient.
			// for each row
			for (let i = 0; i < r.length; i++) {
				// For the first hospital to go through this function, use the "Period" column to build lists of the years and quarters
				// (This is why all data files need to have all the same rows in the same order)
				if (r[i]['Period'] !== "" && Number(String(r[i]['Period']).substr(0, 4)) >= earliest) {
					// if Period is a quarter, set type to quarterly, else yearly
					type = (String(r[i]['Period']).indexOf('-') === -1 ? 'Yearly' : 'Quarterly');
					// fill out temporal values
					if (fillInTemporal) {
						if (type == 'Yearly') {
							cb.scope.years.push(String(r[i]['Period']));
						}
						else {
							cb.scope.quarters.push(String(r[i]['Period']));
						}
					}
					// iterate through keys and assign values to d (data) object
					for (var key in r[i]) {
						if (r[i].hasOwnProperty(key)) {
							// filter the keys
							value = r[i][key];
							if (value === "") {
								value = null;
							}
							if (key === 'Period') {
								// pass: we already did this
							}
							else if (groupings['NonCB'].indexOf(key) !== -1) { // NonCB is a group of categories that are not part of
								// community benefit, like hospital revenue and the cost-to-charge ratio
								// check that key exists
								if (!(cb.scope.d[hospital].hasOwnProperty(key))) {
									// initiate the object
									cb.scope.d[hospital][key] = {};
								}
								// these are unitless; key = category
								// check that data array exists
								if (!(cb.scope.d[hospital][key].hasOwnProperty(type))) {
									// initiate the array
									cb.scope.d[hospital][key][type] = [];
								}
								// add the data
								if (key == 'Cost-to-Charge Ratio') { // This is a percentage
									if (value) {
										cb.scope.d[hospital][key][type].push(Math.round(value * 10000) / 100);
									}
									else {
										// value is null
										cb.scope.d[hospital][key][type].push(value);
									}
								}
								else {
									cb.scope.d[hospital][key][type].push(value);
								}
							}
							else {
								// all other keys have units defined in the column name
								category = key.substr(0, key.indexOf(' - '));
								unit = key.slice(key.indexOf(' - ') + 3);
								// check that key exists
								if (!(cb.scope.d[hospital].hasOwnProperty(category))) {
									// initiate the object
									cb.scope.d[hospital][category] = {};
								}
								// check that unit exists
								if (!(cb.scope.d[hospital][category].hasOwnProperty(unit))) {
									// initiate the object
									cb.scope.d[hospital][category][unit] = {};
								}
								// check that data array exists
								if (!(cb.scope.d[hospital][category][unit].hasOwnProperty(type))) {
									// initiate the array
									cb.scope.d[hospital][category][unit][type] = [];
								}
								// add the data
								cb.scope.d[hospital][category][unit][type].push(value);
							}
						}
					} // end loop over keys
					// add aggregated data (user-defined groupings)
					Object.keys(groupings).forEach(function(category) {
						key = category;
						// checks
						if (!(cb.scope.d[hospital].hasOwnProperty(category))) {
							cb.scope.d[hospital][category] = {};
						}
						['Amount', 'Persons served'].forEach(function(unit) {
							if (unit !== 'Persons served' || category !== 'Total Community Benefit (AG)') {
								// don't collect persons served for this data
								if (!(cb.scope.d[hospital][category].hasOwnProperty(unit))) {
									cb.scope.d[hospital][category][unit] = {};
								}
								if (!(cb.scope.d[hospital][category][unit].hasOwnProperty(type))) {
									cb.scope.d[hospital][category][unit][type] = [];
								}
								// add the data
								var pieces;
								var agg = 0;
								pieces = groupings[category]
								pieces.forEach(function(piece) {
									try {
										// per 2015 IRS rules, we should zero out negative components
										if (category !== 'Total Community Benefit (IRS)' || cb.scope.d[hospital][piece][unit][type].slice(-1)[0] > 0) {
											agg += cb.scope.d[hospital][piece][unit][type].slice(-1)[0];
										}
									}
									catch (err) {
										// pass
									}
								});
								if (agg != 0) {
									cb.scope.d[hospital][category][unit][type].push(agg);
								}
								else {
									cb.scope.d[hospital][category][unit][type].push(null);
								}
							}
						});
					});
					// calculate percent of revenue
					for (let cat in cb.scope.d[hospital]) {
						// ignore technical, non-community benefit categories
						if (groupings['NonCB'].indexOf(cat) === -1) {
							if (!(cb.scope.d[hospital][cat].hasOwnProperty('% of revenue'))) {
								cb.scope.d[hospital][cat]['% of revenue'] = {};
							}
							// check that data array exists
							if (!(cb.scope.d[hospital][cat]['% of revenue'].hasOwnProperty(type))) {
								// initiate the array
								cb.scope.d[hospital][cat]['% of revenue'][type] = [];
							}
							// calculate
							var revenue = cb.scope.d[hospital]['Net Patient Revenue'][type].slice(-1)[0];
							var amount;
							var percent = null;
							if (revenue !== null && revenue !== 0) {
								try{
									amount = cb.scope.d[hospital][cat]['Amount'][type].slice(-1)[0];
								} catch(err){
									console.log(cb.scope.d[hospital]);
								}
								if (amount !== null) {
									percent = Math.round(amount / revenue * 10000) / 100;
								}
							}
							cb.scope.d[hospital][cat]['% of revenue'][type].push(percent);
						}
					}
				}
			}
		}
	},
	events: {
		document_ready: function() {
			/***
			 *	TODO: Seperate into individual event calls/handle better way
			 **/
			$(document).ready(function() {
				if (options.earlier) {
					$('#earlier-data').prop('checked', true);
				}

				$('.system-name').text(options.systemName);
				$('.last-updated').text(options.lastUpdated);

				$('#hospitalSelect').val(m);

				$('#earlier-data').on('change', function(e) {
					var checked = $(this).prop('checked');
					var url = window.location.protocol + '//' + window.location.host + window.location.pathname;
					// TD Is there a safer way to modify the URL like this?
					if (checked) {
						window.location = url + '?earlier=true';
					}
					else {
						window.location = url;
					}
				});

				// When user changes the category shown, everything changes
				function changeCategory(cat) {
					c = cat;
					// change units
					// for non-CB categories
					if (groupings['NonCB'].indexOf(c) !== -1) {
						// reset and disable all buttons
						$('#unit .amount-dropdown').hide().find('.dropdown-name').text('Amount');
						$('#unit .amount-unit').show();
						$('#unit .amount-dropdown button').attr('disabled', 'disabled').removeClass('active');
						$('#unit .btn-default').removeClass('active').addClass('disabled');
						u = 'Amount';
						HighchartHolder.functions.loadCharts('c');
					}
					else {
						// enable all buttons
						$('#unit .amount-dropdown button').removeAttr('disabled', 'disabled');
						$('#unit .btn-default').removeClass('disabled');
						if (c == 'Unreimbursed Medicaid') {
							// switch to amount dropdown
							$('#unit .amount-unit').hide();
							$('#unit .amount-dropdown').show().find('li').show();
							// if unit was in the dropdown, keep it highlighted
							if (u == 'Amount' || u == 'Amount at cost' || u == 'Billings') {
								$('#unit .dropdown-name').text(u);
								$('#unit .amount-dropdown button').addClass('active');
							}
						}
						else if (c == 'Financial Assistance' || c == 'Bad Debt') {
							// switch to amount dropdown
							$('#unit .amount-unit').hide();
							$('#unit .amount-dropdown').show().find('li').each(function(index) {
								if ($(this).find('a').data('name') == 'Amount at cost') {
									$(this).hide();
								}
								else {
									$(this).show();
								}
							});
							// if unit was in the dropdown, keep it highlighted
							if (u == 'Amount' || u == 'Billings') {
								$('#unit .dropdown-name').text(u);
								$('#unit .amount-dropdown button').addClass('active');
							}
							else if (u == 'Amount at cost') {
								$('#unit .dropdown-name').text(u);
								$('#unit .amount-dropdown button').addClass('active');
								u = 'Amount';
							}
						}
						else {
							// hide dropdown
							$('#unit .amount-unit').show();
							$('#unit .amount-dropdown').hide().find('.dropdown-name').text('Amount');
							// if unit was in the dropdown, highlight Amount
							if (u == 'Amount' || u == 'Amount at cost' || u == 'Billings') {
								$('#unit .amount-unit').addClass('active');
								u = 'Amount';
							}
							// hide person served if necessary
							if (['Medicare Shortfall', 'Bad Debt', 'Language Assistance Services',
									'Volunteer Services', 'total Community Benefit (AG)'
								].indexOf(c) !== -1) {
								$('#unit .persons-unit').addClass('disabled');
								if (u == 'Persons served') {
									u = 'Amount';
									$('#unit .amount-unit').addClass('active');
								}
							}
							else {
								$('#unit .persons-unit').removeClass('disabled');
							}
						}
						// if user requested a grouping, give it to them
						if (c in groupings) {
							ac = c;
							HighchartHolder.functions.loadCharts('ac');
						}
						else {
							HighchartHolder.functions.loadCharts('c');
						}
					}
				}

				/******************* category change */
				// list group items
				$('#category-select .list-group').on('click', 'a', function(e) {
					e.preventDefault();
					changeCategory($(this).data('name'));
					$('#category-select .list-group a').removeClass('active');
					$(this).addClass('active');
				});
				// drop-down select
				$('#category-select select').on('change', function(e) {
					if (this.value !== 'Other Categories...') {
						$('#category-select .list-group a').removeClass('active');
						changeCategory(this.value);
					}
					else {
						// reset
						$('#category-select .list-group a').eq(0).trigger('click');
					}
				});

				/******************* unit change */
				// drop-down select
				$('#unit .amount-dropdown a').on('click', function(e) {
					e.preventDefault();
					$('#unit a.btn').removeClass('active');
					u = $(this).data('name');
					$('#unit .dropdown-name').text($(this).data('name'));
					$('#unit .amount-dropdown button').addClass('active');
					HighchartHolder.functions.loadCharts('u');
				});
				// button group items
				$('#unit a.btn').on('click', function(e) {
					e.preventDefault();
					$('#unit .amount-dropdown button').removeClass('active');
					$('#unit a.btn').removeClass('active');
					$(this).addClass('active');
					u = $(this).data('name');
					HighchartHolder.functions.loadCharts('u');
				});

				/******************* hospital change */
				$('#hospital #hospitalSelect').on('change', function(e) {
					m = this.value;
					HighchartHolder.functions.loadCharts('m');
				});

				/******************* temporal change */
				$('#temporal').on('click', 'a', function(e) {
					$('#period option').remove();
					if ($(this).data('name') == "Yearly") {
						cb.scope.years.forEach(function(year) {
							$('#period').append('<option value="' + year + '">' + year + '</option>');
						});
						p = cb.scope.years[0];
					}
					else {
						cb.scope.quarters.forEach(function(quarter) {
							$('#period').append('<option value="' + quarter + '">' + quarter + '</option>');
						});
						p = cb.scope.quarters[0];
					}
					$('#temporal a').toggleClass('active');
					t = $(this).data('name');
					$('.period-dropdown label').text(t.substring(0, $(this).data('name').length - 2));
					HighchartHolder.functions.loadCharts('t');
				});

				/******************* period change */
				$('#period').on('change', function(e) {
					p = this.value;
					HighchartHolder.functions.loadCharts('p');
				});
			});
		}

	}
}


/*********************************************
 ***************** 	MAKING THE CHARTS
 *********************************************/

// The charts are made on demand depending on what the user selects. 
// loadCharts() determines what charts to load.
HighchartHolder = {
	scope: {
		columnChart: {},
		areaChart: {},
		treeChart: {},
		lineChart: {}
	},
	events: {

	},
	functions: {
		charts: {
			loadLineChart: function() {
				$('#container-4').parent('div').fadeIn();
				// select the data
				if (t == 'Yearly') {
					var x = Array.prototype.slice.call(cb.scope.years).reverse();
				}
				else {
					var x = Array.prototype.slice.call(cb.scope.quarters).reverse();
				}
				// we want to show both the amount (in $ or %) alongside persons served, where possible
				var amount = [];
				var persons = [];
				var amountTitle, personsTitle, amountName, personsName, amountTooltip, personsTooltip;
				// common tooltip styles
				var percentTooltip = '<span style="color:{point.color}">{series.name}</span>: <b>{point.y}%</b><br/>';
				var dollarsTooltip = '<span style="color:{point.color}">{series.name}</span>: <b>${point.y:,.0f}</b><br/>';
				personsTooltip = '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b><br/>';
				if (groupings['NonCB'].indexOf(c) !== -1) {
					if (cb.scope.d[m][c][t].length &&
						cb.scope.d[m][c][t].reduce(function(a, b) {
							return a + b;
						})) {
						amount = Array.prototype.slice.call(cb.scope.d[m][c][t]).reverse();
					};
					if (c == 'Cost-to-Charge Ratio') {
						amountTitle = 'Percent';
						amountTooltip = percentTooltip;
					}
					else { // financial data
						amountTitle = u + ' ($)';
						amountTooltip = dollarsTooltip;
					}
					personsTitle = '';
					amountName = c;
					personsName = '';
				}
				else {
					// capture both the amount (either $ or % of revenue) and the persons helped
					// persons served
					if (cb.scope.d[m][c]['Persons served'] !== undefined &&
						cb.scope.d[m][c]['Persons served'][t].length &&
						cb.scope.d[m][c]['Persons served'][t].reduce(function(a, b) {
							return a + b;
						})) {
						persons = Array.prototype.slice.call(cb.scope.d[m][c]['Persons served'][t]).reverse();
						personsName = 'Persons served';
						personsTitle = 'Persons served';
					}
					else {
						// no persons served data
						persons = [];
						personsName = '';
						personsTitle = '';
					}
					var amountVariable;
					// if user asked for persons served, show $ too
					if (u == 'Persons served') {
						amountVariable = 'Amount';
						amountTitle = 'Amount ($)';
						amountName = amountVariable;
						amountTooltip = dollarsTooltip;
					}
					else if (u == 'Amount') {
						amountVariable = 'Amount';
						amountTitle = 'Amount ($)';
						amountName = amountVariable;
						amountTooltip = dollarsTooltip;
					}
					else if (u == '% of revenue') {
						amountVariable = '% of revenue';
						amountTitle = 'Percent';
						amountName = amountVariable;
						amountTooltip = percentTooltip;
					}
					else {
						// billings, amount at cost, etc.
						amountVariable = u;
						amountTitle = amountVariable + ' ($)';
						amountName = amountVariable;
						amountTooltip = dollarsTooltip;
					}
					if (cb.scope.d[m][c][amountVariable][t].length &&
						cb.scope.d[m][c][amountVariable][t].reduce(function(a, b) {
							return a + b;
						})) {
						amount = Array.prototype.slice.call(cb.scope.d[m][c][amountVariable][t]).reverse();
					};
				}

				lineChart = new Highcharts.Chart({
					chart: {
						renderTo: 'container-4',
						zoomType: 'x'
					},
					colors: colors,
					title: {
						text: c + ' Over Time'
					},
					subtitle: {
						text: ''
					},
					xAxis: {
						categories: x,
						crosshair: true,
						minRange: 2
					},
					yAxis: [{ // Primary axis
						title: {
							text: amountTitle,
							style: {
								color: colors[1]
							}
						},
						labels: {
							style: {
								color: colors[1]
							}
						}
					}, { // secondary axis
						title: {
							text: personsTitle,
							style: {
								color: colors[3]
							}
						},
						labels: {
							style: {
								color: colors[3]
							}
						},
						opposite: true,
						min: 0 // can't help negative people (hopefully)
					}],
					tooltip: {
						useHTML: true,
						shared: true
					},
					plotOptions: {
						series: {
							marker: {
								enabled: false,
								symbol: 'circle',
								radius: 3
							},
							lineWidth: 3
						}
					},
					series: [{
						type: 'column',
						data: amount,
						name: amountName,
						tooltip: {
							pointFormat: amountTooltip
						},
						zIndex: 2,
						index: 0,
						color: colors[1],
						pointPadding: 0.05,
						groupPadding: 0.1
					}, {
						type: 'line',
						yAxis: 1,
						data: persons,
						name: personsName,
						tooltip: {
							pointFormat: personsTooltip
						},
						color: colors[3],
						showInLegend: (personsTitle == '' ? false : true),
						index: 2,
						zIndex: 3
					}],
					credits: {
						enabled: false
					}
				});

				// if medicaid amount or amount at cost, show the other unit too
				if (c == 'Unreimbursed Medicaid' && (u == 'Amount' || u == 'Amount at cost')) {
					amountVariable = (u == 'Amount' ? 'Amount at cost' : 'Amount');
					if (cb.scope.d[m][c][amountVariable][t].length &&
						cb.scope.d[m][c][amountVariable][t].reduce(function(a, b) {
							return a + b;
						})) {
						var secondAmount = Array.prototype.slice.call(cb.scope.d[m][c][amountVariable][t]).reverse();
						lineChart.addSeries({
							type: 'column',
							data: secondAmount,
							name: amountVariable,
							tooltip: {
								pointFormat: amountTooltip
							},
							zIndex: 2,
							index: 1,
							color: colors[5],
							pointPadding: 0.05,
							groupPadding: 0.1
						});
					};
				}
			},
			loadTreeChart: function() {
				$('#container-3').parent('div').fadeIn();
				// select the data
				var y = [];
				var period = -1;
				if (t == 'Yearly') {
					period = cb.scope.years.indexOf(p);
				}
				else {
					period = cb.scope.quarters.indexOf(p);
				}
				var unit = (['Billings', 'Amount at cost'].indexOf(u) == -1 ? u : 'Amount');
				groupings[ac].forEach(function(category) {
					if (cb.scope.d[m][category][unit][t].length &&
						cb.scope.d[m][category][unit][t].reduce(function(a, b) {
							return a + b;
						})) {
						y.push({
							name: category,
							value: cb.scope.d[m][category][unit][t][period]
						});
					}
				});

				// get the y axis title
				if (u == '% of revenue') {
					var tooltip = '<tr style="font-size:14px;"><td style="color:{point.color};padding:0">{point.name}: </td>' +
						'<td style="padding:0"><b>{point.value:,.2f}%</b> of revenue</td></tr>';
				}
				else if (u == 'Persons served') {
					var tooltip = '<tr style="font-size:14px;"><td style="color:{point.color};padding:0">{point.name}: </td>' +
						'<td style="padding:0"><b>{point.value:,.0f}</b> persons served</td></tr>';
				}
				else {
					var tooltip = '<tr style="font-size:14px;"><td style="color:{point.color};padding:0">{point.name}: </td>' +
						'<td style="padding:0"><b>${point.value:,.0f}</b></td></tr>';
				}

				treeChart = new Highcharts.Chart({
					chart: {
						renderTo: 'container-3'
					},
					title: {
						text: 'What made up ' + categories_abbr[ac] + ' in ' + p + '?',
						margin: 20
					},
					subtitle: {
						text: 'Relative size is proportional to ' + unit.toLowerCase()
					},
					series: [{
						type: "treemap",
						layoutAlgorithm: 'squarified',
						colorByPoint: true,
						colors: colors,
						data: y
					}],
					tooltip: {
						headerFormat: '<span style="font-size:12px">{point.key}</span><table>',
						pointFormat: tooltip,
						footerFormat: '</table>',
						useHTML: true
					},
					credits: {
						enabled: false
					}
				});
			},
			loadAreaChart: function() {
				$('#container-2').parent('div').fadeIn();
				// select the data
				var x = Array.prototype.slice.call((t == 'Yearly' ? cb.scope.years : cb.scope.quarters)).reverse();
				var y = [];
				var index = 10;
				var unit = (['Billings', 'Amount at cost'].indexOf(u) == -1 ? u : 'Amount');
				var missingData = [];

				// add the data
				groupings[ac].forEach(function(category) {
					if (cb.scope.d[m][category][unit][t].length &&
						cb.scope.d[m][category][unit][t].reduce(function(a, b) {
							return a + b;
						})) {
						y.push({
							name: category,
							data: Array.prototype.slice.call(cb.scope.d[m][category][unit][t]).reverse(),
							index: index,
							visible: !(ac === 'Total Community Benefit (IRS)' && m !== 'System' && cb.scope.d[m][category][unit][t][0] < 0)
						});
					}
					if (m !== 'System') {
						var numMissing = 0;
						cb.scope.d[m][category][unit][t].forEach(function(datum) {
							if (datum === null) {
								numMissing++;
							}
						});
						if (numMissing > 0) {
							missingData.push(HighchartHolder.functions.addMissing(m, category, numMissing));
						}
					}
					else {
						// need to check each hospital
						for (var mi in hospitals) {
							var numMissing = 0;
							cb.scope.d[mi][category][unit][t].forEach(function(datum) {
								if (datum === null) {
									numMissing++;
								}
							});
							if (numMissing > 0) {
								missingData.push(HighchartHolder.functions.addMissing(mi, category, numMissing));
							}
						}
					}
					index -= 1;
				});

				// get the y axis title
				if (u == '% of revenue') {
					var y_title = '% of revenue';
					var tooltip = '<tr style="font-size:12px;"><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:,.2f}%</b> of revenue</td></tr>';
				}
				else if (u == 'Persons served') {
					var y_title = u;
					var tooltip = '<tr style="font-size:12px;"><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:,.0f}</b> persons served</td></tr>';
				}
				else {
					var y_title = unit + ' ($)';
					var tooltip = '<tr style="font-size:12px;"><td style="color:{series.color};padding:0; min-width: 180px;">{series.name}: </td>' +
						'<td style="padding:0"><b>${point.y:,.0f}</b></td></tr>';
				}

				areaChart = new Highcharts.Chart({
					chart: {
						type: 'area',
						renderTo: 'container-2',
						zoomType: 'x'
					},
					colors: colors,
					title: {
						text: 'What makes up ' + categories_abbr[ac] + ' over time?'
					},
					subtitle: {
						text: 'Click on a year to view data from that year'
					},
					xAxis: {
						categories: x,
						crosshair: true,
						minRange: 2
					},
					yAxis: {
						title: {
							text: y_title
						}
					},
					tooltip: {
						formatter: function() {
							var s = '<span style="font-size:12px">' + this.x + '</span><table>';
							// show total
							var sum = 0;
							$.each(this.points, function(i, point) {
								sum += point.y;
							});
							s += '<tr style="font-size:12px;border-bottom:2px solid #666;">' +
								'<td style="padding:0;"">Total: </td><td style="padding:0; text-align:right;"><b>';
							if (u == '% of revenue') {
								s += sum.toFixed(2) + '% of revenue';
							}
							else if (u == 'Persons served') {
								s += HighchartHolder.functions.numberWithCommas(sum) + ' persons served';
							}
							else if (u == 'Amount') {
								s += '$' + HighchartHolder.functions.numberWithCommas(sum);
							}
							s += '</b></td></tr>';
							// loop over series
							$.each(this.points, function(i, point) {
								s += '<tr style="font-size:12px;">' +
									'<td style="color:' + point.series.color + ';padding:0">' +
									point.series.name + ': </td><td style="padding:0; text-align:right;"><b>';
								if (u == '% of revenue') {
									s += point.y.toFixed(2) + '%</b> of revenue';
								}
								else if (u == 'Persons served') {
									s += HighchartHolder.functions.numberWithCommas(point.y) + '</b> persons served';
								}
								else if (u == 'Amount') {
									s += '$' + HighchartHolder.functions.numberWithCommas(point.y) + '</b>';
								}
								s += '</td></tr>'
								sum += point.y;
							});
							s += '</table>';
							return s;
						},
						useHTML: true,
						shared: true
					},
					plotOptions: {
						area: {
							stacking: 'normal',
							fillOpacity: 0.8,
							trackByArea: true
						},
						series: {
							marker: {
								enabled: false,
								symbol: 'circle',
								radius: 3
							},
							cursor: 'pointer',
							point: {
								events: {
									click: function() {
										p = this.category;
										$('#period').val(p).trigger('change');
									}
								}
							}
						}
					},
					series: y,
					credits: {
						enabled: false
					}
				});

				HighchartHolder.functions.noteMissing('#container-2', missingData, (m == 'System'));
			},
			loadColumnChart: function() {
				// select the data
				var x = [];
				var y = [];
				for (let i = 2; i >= 0; i--) {
					y.push({
						name: cb.scope.years[i],
						data: []
					})
				}

				// figure out the proper order (sort descending based on most recent value)
				var orderedHospitals = [];

				function swapElement(array, indexA, indexB) {
					var tmp = array[indexA];
					array[indexA] = array[indexB];
					array[indexB] = tmp;
				}
				var o = {};
				if (groupings['NonCB'].indexOf(c) !== -1) { // For non-community benefit categories
					for (let mi in hospitals) {
						if (cb.scope.d[mi][c]['Yearly'].length &&
							cb.scope.d[mi][c]['Yearly'].reduce(function(a, b) {
								return a + b;
							}) &&
							(mi !== 'System' || c == 'Cost-to-Charge Ratio')) {
							orderedHospitals.push({
								name: mi,
								value: cb.scope.d[mi][c]['Yearly'][0]
							});
						}
					}
				}
				else {
					for (let mi in hospitals) {
						if (cb.scope.d[mi][c][u]['Yearly'].length &&
							cb.scope.d[mi][c][u]['Yearly'].reduce(function(a, b) {
								return a + b;
							}) &&
							(mi !== 'System' || u == '% of revenue')) {
							orderedHospitals.push({
								name: mi,
								value: cb.scope.d[mi][c][u]['Yearly'][0]
							});
						}
					}
				}
				// Put hospitals in descending order of most recent amount
				var working = true;
				while (working) {
					working = false;
					for (let i = 0; i < orderedHospitals.length - 1; i++) {
						if (orderedHospitals[i]['value'] < orderedHospitals[i + 1]['value']) {
							swapElement(orderedHospitals, i, i + 1);
							working = true;
						}
					}
				}

				// add the data
				// Note: the column chart always shows yearly data. Quarterly data varies too much and is often missing
				if (groupings['NonCB'].indexOf(c) !== -1) {
					for (let j = 0; j < orderedHospitals.length; j++) {
						let mi = orderedHospitals[j]['name'];
						if (cb.scope.d[mi][c]['Yearly'].length &&
							cb.scope.d[mi][c]['Yearly'].reduce(function(a, b) {
								return a + b;
							}) &&
							(mi !== 'System' || c == 'Cost-to-Charge Ratio')) {
							x.push(mi);
							// add the data
							// make System column stand out by coloring it gray
							if (mi == 'System') {
								for (let i = 0; i <= 2; i++) {
									var b = cb.scope.d[mi][c]['Yearly'][2 - i];
									y[i]['data'].push({
										y: b,
										color: '#666'
									});
								}
							}
							else {
								for (let i = 0; i <= 2; i++) {
									var b = cb.scope.d[mi][c]['Yearly'][2 - i];
									y[i]['data'].push(b);
								}
							}
						}
					}
				}
				else {
					for (let j = 0; j < orderedHospitals.length; j++) {
						let mi = orderedHospitals[i = j]['name'];
						if (cb.scope.d[mi][c][u]['Yearly'].length &&
							cb.scope.d[mi][c][u]['Yearly'].reduce(function(a, b) {
								return a + b;
							}) &&
							(mi !== 'System' || u == '% of revenue')) {
							x.push(mi);
							// add the data
							// make System columns stand out
							if (mi == 'System') {
								for (i = 0; i <= 2; i++) {
									var b = cb.scope.d[mi][c][u]['Yearly'][2 - i];
									y[i]['data'].push({
										y: b,
										color: '#666'
									});
								}
							}
							else {
								for (let i = 0; i <= 2; i++) {
									var b = cb.scope.d[mi][c][u]['Yearly'][2 - i];
									y[i]['data'].push(b);
								}
							}
						}
					}
				}
				// only enable the most recent year
				y[0]['visible'] = false;
				y[1]['visible'] = false;

				// get the y axis title
				// TD there must be an easier way to set this
				if (u == '% of revenue') {
					var y_title = '% of revenue';
					var tooltip = '<tr style="font-size:14px;"><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:,.2f}%</b> of revenue</td></tr>';
				}
				else if (u == 'Persons served') {
					var y_title = u;
					var tooltip = '<tr style="font-size:14px;"><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:,.0f}</b> persons served</td></tr>';
				}
				else if (c == 'Cost-to-Charge Ratio') {
					var y_title = 'Percent';
					var tooltip = '<tr style="font-size:14px;"><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:,.2f}%</b></td></tr>';
				}
				else {
					var y_title = u + ' ($)';
					var tooltip = '<tr style="font-size:14px;"><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>${point.y:,.0f}</b></td></tr>';
				}

				columnChart = new Highcharts.Chart({
					chart: {
						type: 'column',
						renderTo: 'container-1'
					},
					colors: [colors[1], colors[3], colors[4]],
					title: {
						text: 'All Hospitals, Annual'
					},
					subtitle: {
						text: 'Click a bar to view that hospital, or click on previous years to see more bars. This is for reference only: hospitals are different and not meant to be compared to each other.'
					},
					xAxis: {
						categories: x,
						crosshair: true
					},
					yAxis: {
						title: {
							text: y_title
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:12px">{point.key}</span><table>',
						pointFormat: tooltip,
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.05,
							borderWidth: 0,
							groupPadding: 0.15
						},
						series: {
							cursor: 'pointer',
							point: {
								events: {
									click: function() {
										m = this.category;
										$('#hospitalSelect').val(m).trigger('change');
									}
								}
							}
						},

					},
					series: y,
					credits: {
						enabled: false
					}
				});
			}
		},
		loadCharts: function(order) {
			// order refers to what variables are changing (mcutp: hospital, category, units, temporal, period)
			if (order == 'c') {
				$('#container-1').parent('div').removeClass('col-lg-6');
				HighchartHolder.functions.charts.loadColumnChart();
				HighchartHolder.functions.charts.loadLineChart();
				$('#container-2').parent('div').hide();
				$('#container-3').parent('div').hide();
			}
			else if (order == 'ac') {
				$('#container-1').parent('div').addClass('col-lg-6');
				HighchartHolder.functions.charts.loadColumnChart();
				HighchartHolder.functions.charts.loadAreaChart();
				HighchartHolder.functions.charts.loadTreeChart();
				$('#container-4').parent('div').hide();
			}
			else if (order == 'm') {
				if (c in groupings) {
					HighchartHolder.functions.charts.loadAreaChart();
					HighchartHolder.functions.charts.loadTreeChart();
				}
				else {
					HighchartHolder.functions.charts.loadLineChart();
				}
			}
			else if (order == 'u') {
				HighchartHolder.functions.charts.loadColumnChart();
				if (c in groupings) {
					HighchartHolder.functions.charts.loadAreaChart();
					HighchartHolder.functions.charts.loadTreeChart();
				}
				else {
					HighchartHolder.functions.charts.loadLineChart();
				}
			}
			else if (order == 't') {
				if (c in groupings) {
					HighchartHolder.functions.charts.loadAreaChart();
					HighchartHolder.functions.charts.loadTreeChart();
				}
				else {
					HighchartHolder.functions.charts.loadLineChart();
				}
			}
			else if (order == 'p') {
				if (c in groupings) {
					HighchartHolder.functions.charts.loadTreeChart();
				}
			}
			HighchartHolder.functions.loadHeadline();
		},
		initialize: function() {
			// Highcharts global options
			Highcharts.setOptions({
				lang: {
					thousandsSep: ',',
					noData: 'No data to display'
				}
			});
		},
		loadHeadline: function() {
			var headline = '';
			if (t == 'Yearly') {
				var timeIndex = cb.scope.years.indexOf(p);
			}
			else {
				var timeIndex = cb.scope.quarters.indexOf(p);
			}
			var value;
			if (cb.scope.d[m][c]['Amount'] &&
				cb.scope.d[m][c]['Amount'][t][timeIndex] &&
				cb.scope.d[m][c]['Amount'][t][timeIndex] !== 0 && groupings['NonCB'].indexOf(c) == -1) {
				value = HighchartHolder.functions.numberWithCommas(cb.scope.d[m][c]['Amount'][t][timeIndex]);
				// build headline
				headline += 'In ';
				if (t == 'Quarterly') {
					headline += p.split('-')[1] + ' of ' + p.split('-')[0];
				}
				else {
					headline += p;
				}
				headline += ', <span id="headline-min">' + hospitals[m] + '</span> ';
				headline += ' provided <span id="headline-num">$' + value + '</span> in <span id="headline-cat">' +
					categories_abbr[c] + '</span>';
				if (cb.scope.d[m][c]['Persons served'] !== undefined &&
					cb.scope.d[m][c]['Persons served'][t][timeIndex] &&
					cb.scope.d[m][c]['Persons served'][t][timeIndex] !== 0) {
					headline += ', helping <span id="headline-per">' + HighchartHolder.functions.numberWithCommas(cb.scope.d[m][c]['Persons served'][t][timeIndex]) +
						'</span> people in our communities.';
				}
				else {
					headline += ' to our communities.';
				}
			}
			else {
				// no value for headline
				headline = hospitals[m] + ', ' + c;
			}
			$('.headline h3').html(headline);
			if (m !== 'System' && c === 'Total Community Benefit (IRS)') {
				$('.headline>p').html(categories_definitions[c] + '<br><p class="small pull-right">* May include negative components treated as $0 per IRS guidelines.</p>');
			}
			else {
				$('.headline>p').html(categories_definitions[c]);
			}
		},
		numberWithCommas: function(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		addMissing: function(m, c, n) {
			return {
				hospital: m,
				category: c,
				number: n
			};
		},
		noteMissing: function(chart, data, system) {
			if (data.length) {
				var numMissing = 0;
				var missingLines = [];
				if (system) {
					// TD This needs to just be built live using `hospitals` instead of hard-coding all of them
					var mins = {
						'PCMC': 0,
						'PHFMC': 0,
						'PMMC': 0,
						'POLRMC': 0,
						'PRMC': 0,
						'PSFH': 0,
						'PSJHC': 0,
						'PSJHE': 0,
						'PSJMC': 0,
						'PSMEMC': 0,
						'PSMH': 0,
						'PUSMC': 0,
						'PLC': 0,
						'PMG': 0,
						'PH Corp': 0
					};
					data.forEach(function(datum) {
						mins[datum.hospital] += datum.number;
						numMissing += datum.number;
					});
					for (let min in mins) {
						if (mins[min] > 0) {
							missingLines.push(min + ': ' + mins[min] + ' missing');
						}
					}
					missingLines.push('________________<br>Please look at individual<br>hospitals for more details.');
				}
				else {
					data.forEach(function(datum) {
						numMissing += datum.number;
						missingLines.push(datum.category + ': ' + datum.number + ' missing');
					});
				}
				$(chart).siblings('.warning').html('<a href="#" data-html="true" data-toggle="tooltip" ' +
					'title="' + missingLines.join('<br/>') + '">Note: ' + HighchartHolder.functions.numberWithCommas(numMissing) +
					' data point' + (numMissing == 1 ? ' is' : 's are') + ' missing.</a>');
				$('[data-toggle="tooltip"]').tooltip();
			}
			else {
				$(chart).siblings('.warning').empty();
			}
		}
	}
}

cb.functions.initialize();
