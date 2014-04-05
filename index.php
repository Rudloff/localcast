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
    <p>Server address:
    <span id="server_info" data-path="<?php echo dirname($_SERVER['PHP_SELF']); ?>">
    <?php echo $_SERVER['SERVER_NAME']; ?></span>
    <?php
    if ($_SERVER['SERVER_NAME'] == 'localhost') {
        echo " <b>(Warning: don't use localhost to access your server.)</b>";
    }
    ?></p>
    <select id="fileChooser">
<?php
$d = dir("media");
$noentry = true;
while (false !== ($entry = $d->read())) {
    if ($entry != '.' && $entry != '..') {
        $noentry = false;
        echo '<option data-mime="', mime_content_type('media/'.$entry),
            '">', $entry, '</option>';
    }
}
$d->close();
?>
</select>
<?php
if ($noentry) {
    echo '<b>No file in <i>media/</i> folder!</b>'.PHP_EOL;
} else {
    ?>
    <button id="cast_btn_launch">Cast</button>
    <?php
}
?>
<button id="cast_btn_stop" disabled>Stop Casting</button>
<pre id="status">Not casting</pre>
</body>
