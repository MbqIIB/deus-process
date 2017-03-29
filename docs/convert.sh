for f in */*.md ; do
  of=`basename -s .md $f`;
  od=`dirname $f`;
  out=$od/$of.str;
  echo "Converting $f to $out"
  echo '"********************************************************************************\n\' > $out;
  cat $f | sed -E 's/$/ \\n\\/' >> $out
  echo '' >> $out;
  echo '(c) Stanislav Poljovka, 2017' >> $out;
  echo '********************************************************************************"' >> $out;
done;

for f in */*.md ; do
  of=`basename -s .md $f`;
  od=`dirname $f`;
  cat $od/$of.str | snow -C -m "$SNOW_MSG" -p "$SNOW_PSWD" > "$od/$of.snow" 2>/dev/null;
done;
