<?PHP
/**
* @repository AirPortStatus https://github.com/FoxCouncil/AirPortStatus
* @file status.php
* @copyright Fox Diller
* @license GNU General Public License 2, see LICENSE file.
*/

define('AIRPORT_ADDRESS', '192.168.1.1');
define('AIRPORT_MIBSLOC', './AIRPORT-BASESTATION-3-MIB.mib');

if (isset($_GET['json']) && $_GET['json'] === 'stats')
{
	$array = array();
	
	snmp_set_valueretrieval(SNMP_VALUE_OBJECT | SNMP_VALUE_PLAIN);
	snmp_set_enum_print(true);
	// If, for some magical unicorn reason this local path doesn't work,
	// please copy the mib file to the location below use this line instead:
	// snmp_read_mib('/var/lib/mibs/ietf/AIRPORT-BASESTATION-3-MIB.mib');
	snmp_read_mib(AIRPORT_MIBSLOC);
	
	$airport = snmp2_real_walk(AIRPORT_ADDRESS, 'public', 'enterprises.apple.airport');
	foreach ($airport as $key => $value)
	{
		$array[substr($key, 27)] = $value;
	}
	
	$interfaces = snmp2_real_walk(AIRPORT_ADDRESS, 'public', 'if');
	foreach ($interfaces as $key => $value)
	{
		$array[substr($key, 8)] = $value;
	}

	$interfaces = snmp2_real_walk(AIRPORT_ADDRESS, 'public', 'ipAdEntAddr');
	foreach ($interfaces as $key => $value)
	{
		$array['extIP'] = $value;
		break;
	}
	
	echo @json_encode($array);
}
?>