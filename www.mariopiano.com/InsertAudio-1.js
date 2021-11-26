function InsertSampleAudio(filename)
{
document.write('<!--[if IE]>\n');
document.write('<object classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6" width="300" height="45" onclick="pageTracker._trackEvent(\'Midi\', \'Touch - IE\', \'' + filename + '\');">\n');
document.write('<param name="url" value="http://www.mariopiano.com/' + filename + '" />\n');
document.write('<param name="uimode" value="full" />\n');
document.write('<param name="autostart" value="false" />\n');
document.write('</object>\n');
document.write('<![endif]-->\n');

document.write('<!--[if !IE]><!-->\n');
document.write('<object type="audio/midi" data="http://www.mariopiano.com/' + filename + '" width="300" height="16" onclick="pageTracker._trackEvent(\'Midi\', \'Touch\', \'' + filename + '\');">\n');
document.write('<param name="src" value="http://www.mariopiano.com/' + filename + '" />\n');
document.write('<param name="controller" value="true" />\n');
document.write('<param name="autoplay" value="false" />\n');
document.write('<param name="autostart" value="0" />\n');
document.write('<param name="pluginurl" value="http://www.apple.com/quicktime/download/" />\n');
document.write('</object>\n');
document.write('<!--<![endif]-->\n');
}