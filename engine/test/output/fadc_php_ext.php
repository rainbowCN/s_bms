<?php

/**
 * Example of built-in test-case.
 */ 
function fadc_php_ext($vdom, $mkey) {
	echo "exec with args: $vdom and $mkey.";
}

class fadc_php_ext {
	
	public function run($argv) {
		$result = NULL;
		try {
			array_shift($argv);		
			if(count($argv)>0 && count($argv) == 2) {
			 	call_user_func_array("fadc_php_ext", $argv);
			} else {
				$result = fadc_php_ext("root","1");
			}
		} catch(Exception $e) {
			$result = "Fail";
		}
		print_r($result);
		return $result;
	}
}

$testCase = new fadc_php_ext();
$testCase->run($argv);