<?php

function fadc_module_method($vdom, $mkey) {
	echo ">>>>>".$vdom;
}
class {fn} {
	
	public function run() {
		$result = NULL;
		try {
			$result = {fn}({args});
		} catch(Exception $e) {
			$result = $e->getMessage();
		}
		print_r($result);
		
	}
}

$testCase = new {fn}();
$testCase->run();