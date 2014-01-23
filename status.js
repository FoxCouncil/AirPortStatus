/**
* @repository AirPortStatus https://github.com/FoxCouncil/AirPortStatus
* @file status.js
* @copyright Fox Diller
* @license GNU General Public License 2, see LICENSE file.
*/
// JavaScript Document
var ticks = 0;
var routerData, bandwidthData;
var oldData = {};
var clock, wirelessClients, DHCPClients, WifiUPTotal, WifiDOWNTotal, EthernetUPSpeed, EthernetDOWNSpeed, EthernetUPTotal, EthernetDOWNTotal, InternetUPSpeed, InternetDOWNSpeed, InternetUPTotal, InternetDOWNTotal;

$(document).ready(function(e) {
	  
	clock = new SegmentDisplay("dClock");
	clock.pattern = "##:##:##";
	clock.draw();
	
	wirelessClients = new SegmentDisplay("dWirelessClients");
	wirelessClients.pattern = "###";
	wirelessClients.draw();
	
	DHCPClients = new SegmentDisplay("dDHCPClients");
	DHCPClients.pattern = "###";
	DHCPClients.draw();
	
	WifiUPSpeed = new SegmentDisplay("dWifiUPSpeed");
	WifiUPSpeed.pattern = "###.##";
	WifiUPSpeed.draw();
	
	WifiDOWNSpeed = new SegmentDisplay("dWifiDOWNSpeed");
	WifiDOWNSpeed.pattern = "###.##";
	WifiDOWNSpeed.draw();
	
	WifiUPTotal = new SegmentDisplay("dWifiUPTotal");
	WifiUPTotal.pattern = "#######";
	WifiUPTotal.draw();
	
	WifiDOWNTotal = new SegmentDisplay("dWifiDOWNTotal");
	WifiDOWNTotal.pattern = "#######";
	WifiDOWNTotal.draw();
	
	EthernetUPSpeed = new SegmentDisplay("dEthernetUPSpeed");
	EthernetUPSpeed.pattern = "###.##";
	EthernetUPSpeed.draw();
	
	EthernetDOWNSpeed = new SegmentDisplay("dEthernetDOWNSpeed");
	EthernetDOWNSpeed.pattern = "###.##";
	EthernetDOWNSpeed.draw();
	
	EthernetUPTotal = new SegmentDisplay("dEthernetUPTotal");
	EthernetUPTotal.pattern = "#######";
	EthernetUPTotal.draw();
	
	EthernetDOWNTotal = new SegmentDisplay("dEthernetDOWNTotal");
	EthernetDOWNTotal.pattern = "#######";
	EthernetDOWNTotal.draw();
	
	InternetUPSpeed = new SegmentDisplay("dInternetUPSpeed");
	InternetUPSpeed.pattern = "###.##";
	InternetUPSpeed.draw();
	
	InternetDOWNSpeed = new SegmentDisplay("dInternetDOWNSpeed");
	InternetDOWNSpeed.pattern = "###.##";
	InternetDOWNSpeed.draw();
	
	InternetUPTotal = new SegmentDisplay("dInternetUPTotal");
	InternetUPTotal.pattern = "#######";
	InternetUPTotal.draw();
	
	InternetDOWNTotal = new SegmentDisplay("dInternetDOWNTotal");
	InternetDOWNTotal.pattern = "#######";
	InternetDOWNTotal.draw();
	
	loadData();
	
	// You can adjust as neccessary, 1000 = 1 second.
	setInterval(tick1,  1000);
});


function tick1()
{
	loadData();
	clock.setValue(moment().format('HH:mm:ss'));	
	ticks++;
}

function loadData()
{
	$.getJSON('status.php?json=stats', function(data) {
		routerData = data;
		drawData();		
	});
}

function loadDeltas()
{
	oldData.wInOctets = (parseInt(routerData['ifInOctets.6'].value) + parseInt(routerData['ifInOctets.7'].value));
	oldData.wOutOctets = (parseInt(routerData['ifOutOctets.6'].value) + parseInt(routerData['ifOutOctets.7'].value));
	
	oldData.eInOctets = parseInt(routerData['ifInOctets.1'].value);
	oldData.eOutOctets = parseInt(routerData['ifOutOctets.1'].value);
	
	oldData.iInOctets = parseInt(routerData['ifInOctets.2'].value);
	oldData.iOutOctets = parseInt(routerData['ifOutOctets.2'].value);
}

function drawData()
{
	// Router Details
	var routerName = routerData['sysConfName.0'].value;

	// Wireless 2.4Ghz + 5.0Ghz
	var wInOctets = calcBytes(parseInt(routerData['ifInOctets.6'].value) + parseInt(routerData['ifInOctets.7'].value));
	var wOutOctets = calcBytes(parseInt(routerData['ifOutOctets.6'].value) + parseInt(routerData['ifOutOctets.7'].value));
	
	var wInOctetsSpeed = calcSpeed(oldData.wInOctets, wInOctets.tol);
	var wOutOctetsSpeed = calcSpeed(oldData.wOutOctets, wOutOctets.tol);
	
	// Ethernet
	var eInOctets = calcBytes(parseInt(routerData['ifInOctets.1'].value));
	var eOutOctets = calcBytes(parseInt(routerData['ifOutOctets.1'].value));
	
	var eInOctetsSpeed = calcSpeed(oldData.eInOctets, eInOctets.tol);
	var eOutOctetsSpeed = calcSpeed(oldData.eOutOctets, eOutOctets.tol);
	
	// Internet
	var iInOctets = calcBytes(parseInt(routerData['ifInOctets.2'].value));
	var iOutOctets = calcBytes(parseInt(routerData['ifOutOctets.2'].value));
	
	var iInOctetsSpeed = calcSpeed(oldData.iInOctets, iInOctets.tol);
	var iOutOctetsSpeed = calcSpeed(oldData.iOutOctets, iOutOctets.tol);
		
	// Set Text
	$('title').text(routerName)
	$('#dTitle').text(routerName);
	
	// Wifi
	wirelessClients.setValue(pad(routerData['wirelessNumber.0'].value, 3));
	
	$('#dWifiUPSpeedSign').attr('src', wOutOctetsSpeed.sig);
	WifiUPSpeed.pattern = wOutOctetsSpeed.pat;
	WifiUPSpeed.setValue(pad(wOutOctetsSpeed.val, wOutOctetsSpeed.pad));
	
	$('#dWifiDOWNSpeedSign').attr('src', wInOctetsSpeed.sig);
	WifiDOWNSpeed.pattern = wInOctetsSpeed.pat;
	WifiDOWNSpeed.setValue(pad(wInOctetsSpeed.val, wInOctetsSpeed.pad));
	
	$('#dWifiUPTotalSign').attr('src', wOutOctets.sig);
	WifiUPTotal.pattern = wOutOctets.pat;
	WifiUPTotal.setValue(pad(wOutOctets.val, wOutOctets.pad));
	
	$('#dWifiDOWNTotalSign').attr('src', wInOctets.sig);
	WifiDOWNTotal.pattern = wInOctets.pat;
	WifiDOWNTotal.setValue(pad(wInOctets.val, wInOctets.pad));
	
	// Ethernet
	DHCPClients.setValue(pad(routerData['dhcpNumber.0'].value, 3));
	
	$('#dEthernetUPSpeedSign').attr('src', eOutOctetsSpeed.sig);
	EthernetUPSpeed.pattern = eOutOctetsSpeed.pat;
	EthernetUPSpeed.setValue(pad(eOutOctetsSpeed.val, eOutOctetsSpeed.pad));
	
	$('#dEthernetDOWNSpeedSign').attr('src', eInOctetsSpeed.sig);
	EthernetDOWNSpeed.pattern = eInOctetsSpeed.pat;
	EthernetDOWNSpeed.setValue(pad(eInOctetsSpeed.val, eInOctetsSpeed.pad));
	
	$('#dEthernetUPTotalSign').attr('src', eOutOctets.sig);
	EthernetUPTotal.pattern = eOutOctets.pat;
	EthernetUPTotal.setValue(pad(eOutOctets.val, eOutOctets.pad));
	
	$('#dEthernetDOWNTotalSign').attr('src', eInOctets.sig);
	EthernetDOWNTotal.pattern = eInOctets.pat;
	EthernetDOWNTotal.setValue(pad(eInOctets.val, eInOctets.pad));
	
	// Internet
	$('#dInternetUPSpeedSign').attr('src', iOutOctetsSpeed.sig);
	InternetUPSpeed.pattern = iOutOctetsSpeed.pat;
	InternetUPSpeed.setValue(pad(iOutOctetsSpeed.val, iOutOctetsSpeed.pad));
	
	$('#dInternetDOWNSpeedSign').attr('src', iInOctetsSpeed.sig);
	InternetDOWNSpeed.pattern = iInOctetsSpeed.pat;
	InternetDOWNSpeed.setValue(pad(iInOctetsSpeed.val, iInOctetsSpeed.pad));
	
	$('#dInternetUPTotalSign').attr('src', iOutOctets.sig);
	InternetUPTotal.pattern = iOutOctets.pat;
	InternetUPTotal.setValue(pad(iOutOctets.val, iOutOctets.pad));
	
	$('#dInternetDOWNTotalSign').attr('src', iInOctets.sig);
	InternetDOWNTotal.pattern = iInOctets.pat;
	InternetDOWNTotal.setValue(pad(iInOctets.val, iInOctets.pad));
	
	$('#dIPAddress').text(routerData['extIP'].value);
	
	loadDeltas();
}

function calcSpeed(old, now)
{
	if (old === undefined)
	{
		return {'pad': 6, 'pat': '###.##', 'sig': 'kbs.png', 'tol': 0, 'val': 0};
	}
	
	var total = (now - old);
	
	var output = {};
	
	output.pad = 6;
	output.pat = '###.##';
	output.sig = 'kbs.png';
	output.tol = total;
	
	if (total == 0)
	{
		output.val = 0;
	}
	else
	{
		output.val = (total / 1000).toFixed(2);
	}
	
	if (output.val > 999)
	{
		output.sig = 'mbs.png';
		output.val = (output.val / 1000).toFixed(2);
	}
	
	if (output.val > 999)
	{
		output.sig = 'gbs.png';
		output.val = (output.val / 1000).toFixed(2);
	}
	
	if (output.val > 999)
	{
		output.sig = 'tbs.png';
		output.val = (output.val / 1000).toFixed(2);
	}
	
	if (output.val > 999)
	{
		output.pat = '######';
		output.val = (output.val / 1000).toFixed(0);
	}
	
	return output;
}

function calcBytes(total)
{
	var output = {};
	
	output.pad = 6;
	output.pat = '######';
	output.sig = 'b.png';
	output.tol = total;
	output.val = total;
	
	if (output.val > 999999)
	{
		output.pad = 7;
		output.pat = '####.##';
		output.sig = 'kb.png';
		output.val = (output.val / 1000).toFixed(2);
	}
	
	if (output.val > 9999)
	{
		output.sig = 'mb.png';
		output.val = (output.val / 1000).toFixed(2);
	}
	
	if (output.val > 9999)
	{
		output.sig = 'gb.png';
		output.val = (output.val / 1000).toFixed(2);
	}
	
	if (output.val > 9999)
	{
		output.sig = 'tb.png';
		output.val = (output.val / 1000).toFixed(2);
	}
	
	if (output.val > 9999)
	{
		output.pat = '#######';
		output.val = (output.val / 1000).toFixed(0);
	}
	
	return output;
}

function pad(str, max)
{
	return ("" + str).length < max ? pad("0" + str, max) : str;
}