#!/bin/sh
# Shrinks photos for the web. Run after adding new photos:  npm run photos
#
#   photo-originals/                full-size originals (backup, not uploaded)
#   src/assets/photography/         1600px, used in "Look closer"
#   src/assets/photography-thumbs/  900px, used in the stacks and grids
#
# Only touches photos that haven't been processed yet, so it's safe to rerun.
# Uses sips, which comes with macOS.

set -e
cd "$(dirname "$0")/.."

SRC=src/assets/photography
THUMBS=src/assets/photography-thumbs
ORIG=photo-originals

find "$SRC" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | while IFS= read -r f; do
  rel="${f#$SRC/}"
  orig="$ORIG/$rel"
  thumb="$THUMBS/$rel"

  # New photo: back up the original, then shrink the site copy
  if [ ! -f "$orig" ]; then
    mkdir -p "$(dirname "$orig")"
    cp "$f" "$orig"
    sips -Z 1600 -s format jpeg -s formatOptions 65 "$orig" --out "$f" >/dev/null
    echo "shrunk  $rel"
  fi

  if [ ! -f "$thumb" ]; then
    mkdir -p "$(dirname "$thumb")"
    sips -Z 900 -s format jpeg -s formatOptions 70 "$orig" --out "$thumb" >/dev/null
    echo "thumb   $rel"
  fi
done

echo "done. site photos: $(du -sh "$SRC" | cut -f1), thumbs: $(du -sh "$THUMBS" | cut -f1)"
