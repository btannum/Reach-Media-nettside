#!/bin/sh
# Konverterer kildemateriale i ../Medier / til web-klare filer i public/media/.
# Kjør fra web/: sh scripts/media.sh [ads|video|logos|all]
# Krever ffmpeg og cwebp (brew install ffmpeg webp).
set -eu

SRC="../Medier "
ADS_SRC="$SRC/Ads skal brukes i nettsie/ADS"
UGC_SRC="$ADS_SRC/UGC videoer"
LOGO_SRC="$SRC/Logoer"
OUT_ADS="public/media/ads"
OUT_LOGOS="public/media/logos"
what="${1:-all}"

TMP="${TMPDIR:-/tmp}/rm-media"
mkdir -p "$OUT_ADS" "$OUT_LOGOS" "$TMP"

# Alle annonser til 9:16, 540x960 WebP. 4:5-kilder fylles ut med uskarp
# versjon av seg selv i stedet for å beskjæres.
ads() {
  i=0
  find "$ADS_SRC" -maxdepth 1 -type f -iname '*.png' ! -name '8.png' ! -name '13.png' | LC_ALL=C sort | while IFS= read -r f; do
    i=$((i + 1))
    n=$(printf '%02d' "$i")
    ffmpeg -nostdin -v error -y -i "$f" -filter_complex \
      "[0:v]scale=540:960:force_original_aspect_ratio=increase,crop=540:960,boxblur=24:6,setsar=1[bg];[0:v]scale=540:960:force_original_aspect_ratio=decrease,setsar=1[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=rgb24" \
      -frames:v 1 -update 1 "$TMP/static-$n.png"
    cwebp -quiet -q 82 "$TMP/static-$n.png" -o "$OUT_ADS/static-$n.webp"
    echo "static-$n.webp <- $(basename "$f")"
  done
}

# Filer lagt til senere, med fast nummer så ads.ts-id-ene ikke flytter seg.
# Format: "<nummer>|<sti relativt til $SRC>"
EXTRA_ADS="22|Ads skal brukes i nettsie/ADS/8.png
23|Ads skal brukes i nettsie/ADS/13.png
24|Ads skal brukes i nettsie/bikeplay-tradlos-carplay-mc.png
25|Ads skal brukes i nettsie/bikeplay-kundeomtale.png
26|Ads skal brukes i nettsie/carplay-for-etter.png"

ads_extra() {
  printf '%s\n' "$EXTRA_ADS" | while IFS='|' read -r n rel; do
    [ -z "$n" ] && continue
    f="$SRC/$rel"
    ffmpeg -nostdin -v error -y -i "$f" -filter_complex \
      "[0:v]scale=540:960:force_original_aspect_ratio=increase,crop=540:960,boxblur=24:6,setsar=1[bg];[0:v]scale=540:960:force_original_aspect_ratio=decrease,setsar=1[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=rgb24" \
      -frames:v 1 -update 1 "$TMP/static-$n.png"
    cwebp -quiet -q 82 "$TMP/static-$n.png" -o "$OUT_ADS/static-$n.webp"
    echo "static-$n.webp <- $rel"
  done
}

# UGC-videoer lagt til senere, med faste numre så rekkefølgen ikke endres.
UGC_EXTRA_SRC="$SRC/Ads skal brukes i nettsie/UGC videoer nye"

# UGC: HEVC .mov -> H.264 mp4 720x1280 + poster.
ugc_one() {
  ffmpeg -nostdin -v error -y -i "$1" -vf "scale=720:1280,format=yuv420p" -c:v libx264 -preset slow -crf 27 -movflags +faststart -c:a aac -b:a 96k "$OUT_ADS/ugc-$2.mp4"
  ffmpeg -nostdin -v error -y -ss 1 -i "$OUT_ADS/ugc-$2.mp4" -frames:v 1 -vf "scale=540:960" -update 1 "$TMP/ugc-$2.png"
  cwebp -quiet -q 82 "$TMP/ugc-$2.png" -o "$OUT_ADS/ugc-$2.webp"
  echo "ugc-$2.mp4 + poster <- $(basename "$1")"
}

# Filene i UGC_EXTRA_SRC heter NN-navn.mov; NN blir ugc-NN.
video_extra() {
  find "$UGC_EXTRA_SRC" -maxdepth 1 -type f -iname '*.mov' | LC_ALL=C sort | while IFS= read -r f; do
    ugc_one "$f" "$(basename "$f" | cut -c1-2)"
  done
}

video() {
  i=0
  find "$UGC_SRC" -maxdepth 1 -type f -iname '*.mov' | LC_ALL=C sort | while IFS= read -r f; do
    i=$((i + 1))
    n=$(printf '%02d' "$i")
    ugc_one "$f" "$n"
  done
}

# Logoer: monokrom hvit med alfa fra mørkhet (til mørk bakgrunn), maks 640 px bred.
# Kilder som allerede er hvite på transparent (CarPlay) beholdes som de er.
mono_white() {
  in="$1"; out="$2"
  # Flat på hvit først, så gjennomsiktige kilder ikke blir svarte (= hvite bokser).
  ffmpeg -nostdin -v error -y -i "$in" -filter_complex \
    "[0:v]format=rgba,scale=640:-1:flags=lanczos,split=2[s1][s2];color=c=white[c];[c][s1]scale2ref[cw][s1b];[cw][s1b]overlay=shortest=1,format=gray,negate[alpha];[s2]drawbox=c=white@1:t=fill[white];[white][alpha]alphamerge" \
    -frames:v 1 -update 1 "$out"
}

logos() {
  # AVIF/WebP dekodes av sips først; ffmpeg leser dem ikke likt.
  sips -s format png "$LOGO_SRC/Novito_Official_Logo_Tropicosd_Beauty.avif" --out "$TMP/novito-src.png" >/dev/null
  sips -s format png "$LOGO_SRC/GorillaGames Logo.webp" --out "$TMP/gorilla-src.png" >/dev/null
  mono_white "$LOGO_SRC/Untitled design (4).png" "$OUT_LOGOS/kla.png"
  mono_white "$TMP/novito-src.png" "$OUT_LOGOS/novito.png"
  mono_white "$LOGO_SRC/Spekebua Logo long.png" "$OUT_LOGOS/spekebua.png"
  mono_white "$TMP/gorilla-src.png" "$OUT_LOGOS/gorilla-games.png"
  mono_white "$LOGO_SRC/BEEKI_lang_gull.png" "$OUT_LOGOS/beeki.png"
  ffmpeg -nostdin -v error -y -i "$LOGO_SRC/Skjermbilde_2026-09-25_kl._11.15.48-removebg-preview.png" -vf "format=rgba,scale=640:-1:flags=lanczos" -frames:v 1 -update 1 "$OUT_LOGOS/carplay.png"
  ffmpeg -nostdin -v error -y -i "$LOGO_SRC/Reach Media logo.webp" -vf "format=rgba" -frames:v 1 -update 1 "public/media/logo.png"
  # Kun R-merket (venstre kvadrat) til nav/footer; navnet settes i tekst.
  ffmpeg -nostdin -v error -y -i "$LOGO_SRC/Reach Media logo.webp" -vf "format=rgba,crop=97:97:0:0" -frames:v 1 -update 1 "public/media/logo-mark.png"
  ls -la "$OUT_LOGOS" public/media/logo.png
}

case "$what" in
  ads) ads; ads_extra ;;
  extra) ads_extra ;;
  video) video; video_extra ;;
  video_extra) video_extra ;;
  logos) logos ;;
  all) ads; ads_extra; logos; video; video_extra ;;
esac
