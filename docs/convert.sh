for f in */*.md ; do
  of=`basename -s .md $f`;
  od=`dirname $f`;
  out=$od/$of.str;
  echo "Converting $f to $out"
  echo '"********************************************************************************\n\' > $out;
  cat $f | sed -r 's/$/ \\n\\/' >> $out
  echo '    copyright: (c) Stanislav Poljovka, 2017' >> $out;
  echo '********************************************************************************"' >> $out;
done;
