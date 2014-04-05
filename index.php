<?php
/**
 * Cast local media to a ChromeCast
 * 
 * PHP version 5
 * 
 * @category LocalCast
 * @package  LocalCast
 * @author   Pierre Rudloff <contact@rudloff.pro>
 * @license  GPL http://www.gnu.org/licenses/gpl.html
 * @link     https://github.com/Rudloff/localcast
 * */
?>
<!DOCTYPE HTML>
<head>
    <meta charset="UTF-8" />
    <title>LocalCast</title>
    <script type="text/javascript"
        src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script>
    <script src="cast.js"></script>
</head>
<body>
    <select id="fileChooser">
<?php
$d = dir("media");
while (false !== ($entry = $d->read())) {
    if ($entry != '.' && $entry != '..') {
        echo '<option data-mime="', mime_content_type('media/'.$entry),
            '">', $entry, '</option>';
    }
}
$d->close();
?>
</select>
<br/>
<button id="cast_btn_launch">Cast</button>
<button id="cast_btn_stop" disabled>Stop Casting</button>
<pre id="status">Not casting</pre>
</body>
