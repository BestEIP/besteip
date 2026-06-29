<?php
	$IpStr=isset($_GET['scanstr']) ? $_GET['scanstr'] : "";
?>

<html>
	<head>
		<style>
			.open {
				background-color: red; /* 設置整行背景為紅色 */
				color: white; /* 設置文字顏色為白色以增強可讀性 */
			}

			#comment {
				margin-top: 20px;
				font-size: 16px;
				color: #333;
			}
			
			.labfor {
				width: 100%;
				font-weight: bold;
				font-size: 15px;
				color: #333 !important;
			}
		</style>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>
	</head>
	<body>
		<form>
			<div style="display:none;">
				<input type="text" id="txtIP" name="txtIP" value="<?php echo $IpStr;?>" />
			</div>
			<p>注意：通常家用或手機IP的上述通訊埠應為關閉狀態（顯示為close）。若發現任何通訊埠處於開啟狀態（顯示為open），將以紅色背景標記，表示該IP提供外部服務，極可能為跳板用途。</p>
			<div>
				<div id="divIP_0"></div>
			</div>
		</form>
		
	</body>
</html>

<script type="text/javascript">
	jQuery(document).ready(function(){
		let host=$('#txtIP').val();
		function PortScanner() {
                this.portDescriptions = {
                    80: 'HTTP - Standard Web Port',
                    443: 'HTTPS - Secure Web Port',
                    8080: 'HTTP Alternate/Proxy',
                    8888: 'HTTP Alternate/Proxy',
                    500: 'IPSec-VPN',
                    1080: 'SOCKS Proxy',
                    1194: 'OpenVPN',
                    1701: 'Tunneling Protocol',
                };
        }

        PortScanner.prototype.init = function (host, ports, idx) {
			var self = this;
            ports.forEach(function (port) {
            self.check(function (port, status) {
				var description = self.portDescriptions[port] || 'Unknown Port';
                var statusClass = status === 'open' ? 'open' : '';
                var row = '<tr class="' + statusClass + '"><td class="width:100px;">' + port + '</td><td class="width:200px;">' + description + '</td><td class="width:100px;">' + status + '</td></tr>';
                $('#results_' + idx).append(row);
                $('#divIP_' + idx).css('display', '');
                }, host, port, 5000); // Increased timeout for better accuracy
            });
        };

        PortScanner.prototype.check = function (callback, target, port, timeout) {
			var timeout = (timeout == null) ? 5000 : timeout; // Set default timeout to 3000ms
            var img = new Image();
            img.onerror = function () {
            if (!img) return;
				img = undefined;
                callback(port, 'open');
            };
            img.onload = img.onerror;
            img.src = 'http://' + target + ':' + port;
            setTimeout(function () {
				if (!img) return;
				img = undefined;
                callback(port, 'closed');
            }, timeout);
        };
			
		if (host != "") {
			var ports = [80, 443, 8080, 8888, 500, 1080, 1194, 1701]; // Define ports to scan
			let aHostList = host.split(';');
            let sHtmlStr = "";
            let iRow = 0;
            let sPrevId = 0;
            $.each(aHostList, (idx, item) => {
				iRow = iRow + 1;
                let sPadding = (iRow > 1) ? "padding-top:15px;" : "";
                sHtmlStr = '<div id="divIP_' + iRow + '" style="display:none;' + sPadding + '"><div class="labfor">IP：' + item + '</div>';
                sHtmlStr = sHtmlStr + '<table id="table_' + iRow + '" style="border-spacing: 2px;border-collapse:separate;">';
                sHtmlStr = sHtmlStr + '  <thead>';
                sHtmlStr = sHtmlStr + '     <tr>';
                sHtmlStr = sHtmlStr + '         <th style="width:100px;">Port</th>';
                sHtmlStr = sHtmlStr + '         <th style="width:200px;">Description</th>';
                sHtmlStr = sHtmlStr + '         <th style="width:100px;">Status</th>';
                sHtmlStr = sHtmlStr + '     </tr>';
                sHtmlStr = sHtmlStr + '  </thead>';
                sHtmlStr = sHtmlStr + '  <tbody id="results_' + iRow + '">';
                sHtmlStr = sHtmlStr + '  </tbody>';
                sHtmlStr = sHtmlStr + '</table>';
                sHtmlStr = sHtmlStr + '</div>';
                $('#divIP_' + sPrevId).after(sHtmlStr);
                var portscanner = new PortScanner();
                portscanner.init(item, ports, iRow);
                sPrevId = iRow;
                if ($('#divIP_0').length > 0) {
					$('#divIP_0').remove();
                }
            });
       }
	});
</script>