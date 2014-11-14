<?php
	$fn = $argv[1];
	array_shift($argv);
	
	$result = array();
	$args = array();
	try {
		$config = "./$fn.json";
		$result = file_get_contents($config);
		if(preg_match('/^\xEF\xBB\xBF/',$result)){
			$result=substr($result,3);
		}
		$testCase = json_decode($result);
		$result = file_get_contents("./testCase.tpl");
		$result = str_replace("{fn}", $testCase->fn, $result);
		foreach ($testCase->args as $arg) {
			array_push($args, $arg->value);
		}
		$result = str_replace("{args}", implode(",", $args), $result);
		createPHP($fn, $result);		
	} catch(Exception $e) {
		$app->flash('error', $e->getMessage());
	}
	
	function createPHP($fn, $result) {
		$myFile = "$fn.php";
		$fh = fopen($myFile, 'w') or die("can't open file");
		fwrite($fh, $result);
		fclose($fh);
	}
