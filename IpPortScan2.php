<?php
	$IpStr=isset($_GET['scanstr']) ? $_GET['scanstr'] : "";
	//$IpStr="61.65.1.74";
	
	//echo base64_encode($IpStr)."<br>";
	//$tt_ip = base64_encode($IpStr);
	//echo base64_decode($IpStr)."<br>";
	$tt_ip = base64_decode($IpStr);
	
	function checkPort($host, $port, $Description, $timeout = 1) {
    $connection = @fsockopen($host, $port, $errno, $errstr, $timeout);
    
    if (is_resource($connection)) {
        //echo "Port $port on $host is open<BR>";
		?><TR>
		<TD bgcolor="red"><font color="white"><?PHP echo $port;?></font></center></TD>
		<TD bgcolor="red"><font color="white"><?PHP echo $Description;?></font></TD>
		<TD bgcolor="red"><font color="white">OPEN</font></TD><TR>
		<?PHP
        fclose($connection);
    } else {
        //echo "Port $port on $host is closed<br>";
		?><TR><TD><?PHP echo $port;?></center></TD><TD><?PHP echo $Description;?></TD><TD>CLOSE</TD><TR><?PHP
    }
	}

?>

	
	<P>注意：通常家用或手機IP的上述通訊埠應為關閉狀態（顯示為close）。若發現任何通訊埠處於開啟狀態（顯示為open），將以紅色背景標記，表示該IP提供外部服務，極可能為跳板用途。</P>
	
<?php
	$split_ip = explode(",", $tt_ip);
	$split_ip_count = count($split_ip) + 0;
	//echo $split_ip_count."<br>";
	for ($o = 0;$o < $split_ip_count;$o++)
	{
?>	
	<P>IP：<?PHP echo $split_ip[$o];?></P>
	
	<table>
	<TR>
	<TD width="80" align="left">Port</TD>
	<TD width="200" align="left">Description</TD>
	<TD width="100" align="left">Status</TD><TR>
<?php
	/*checkPort($split_ip[$o], 80, "HTTP - Standard Web Port");
	checkPort($split_ip[$o], 443, "HTTPS - Secure Web Port");
	checkPort($split_ip[$o], 8080, "HTTP Alternate/Proxy");
	checkPort($split_ip[$o], 8888, "HTTP Alternate/Proxy");
	checkPort($split_ip[$o], 500, "IPSec-VPN");
	checkPort($split_ip[$o], 1080, "SOCKS Proxy");
	checkPort($split_ip[$o], 1194, "OpenVPN");
	checkPort($split_ip[$o], 1701, "Tunneling Protocol");
	checkPort($split_ip[$o], 1723, "PPTP VPN");
	checkPort($split_ip[$o], 2000, "Cisco VoIP");
	checkPort($split_ip[$o], 5060, "SIP VoIP");*/
	
	checkPort($split_ip[$o], 80, "Http Web");
	checkPort($split_ip[$o], 443, "Https Web");
	checkPort($split_ip[$o], 8080, "Http Web");
	checkPort($split_ip[$o], 8443, "Https Web");
	checkPort($split_ip[$o], 500, "IKE VPN");
	checkPort($split_ip[$o], 1194, "Open VPN");
	checkPort($split_ip[$o], 1701, "L2TP VPN");
	checkPort($split_ip[$o], 1723, "PPTP VPN");
	checkPort($split_ip[$o], 4500, "IPsec VPN");
	checkPort($split_ip[$o], 1080, "Socks Proxy");
	checkPort($split_ip[$o], 2000, "Cisco VoIP");
	checkPort($split_ip[$o], 5060, "SIP VoIP");
?>
	</table>
	<?php
	}
	
	$jsonData = "";

	// API endpoint URL where you want to send the JSON data
	$apiUrl = 'https://d1.besteip.com/andyuse/iptt/sip_reg.php';

	// Initialize cURL session
	$ch = curl_init($apiUrl);

	// Set cURL options to send a POST request with JSON data
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	'Content-Type: application/json',
	'Content-Length: ' . strlen($jsonData)
	));
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	// Execute cURL session and get the response
	$response = curl_exec($ch);
	?>