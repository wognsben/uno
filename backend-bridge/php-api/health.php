<?php
/*
 * health.php
 * 카페24 서버에 API 브릿지를 처음 올렸을 때 PHP 실행, bbs/common.php 경로, Gnuboard DB 함수 로드 여부를 확인하는 진단 endpoint입니다.
 * 로그인/예약 기능을 수행하지 않고 서버 연결 상태와 API 배치 상태만 JSON으로 보여줍니다.
 * 운영 확인 후 삭제해도 되는 점검 전용 파일이며, DB 비밀번호나 민감한 설정값은 출력하지 않습니다.
 */

define('UNO_API_BOOTSTRAPPED', true);

$apiRoot = dirname(__DIR__);
$commonPath = $apiRoot . '/bbs/common.php';
$commonExists = file_exists($commonPath);
$commonLoaded = false;

if ($commonExists) {
    require_once $commonPath;
    $commonLoaded = true;
}

require_once __DIR__ . '/_response.php';

$memberId = '';
if (isset($member) && is_array($member) && isset($member['mb_id'])) {
    $memberId = (string) $member['mb_id'];
}

uno_api_success(array(
    'phpVersion' => PHP_VERSION,
    'expectedCommonPath' => '../bbs/common.php',
    'commonExists' => $commonExists,
    'commonLoaded' => $commonLoaded,
    'gnuboardFunctions' => array(
        'sql_fetch' => function_exists('sql_fetch'),
        'sql_query' => function_exists('sql_query'),
        'sql_fetch_array' => function_exists('sql_fetch_array'),
    ),
    'session' => array(
        'memberLoaded' => $memberId !== '',
    ),
));
