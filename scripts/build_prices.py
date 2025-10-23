import json
import re
from pathlib import Path

PICKUP_NAMES = [
    "Antalya Airport",
    "Adrasan",
    "Alanya",
    "Alanya Kalesi",
    "Antalya Center",
    "Antalya Expo",
    "Avsallar",
    "Belek",
    "Boğazkent",
    "Çamyuva",
    "Çıralı",
    "Demirtaş",
    "Dim Çayı",
    "Dim Mağarası",
    "Fethiye, Muğla",
    "Gazipasa Airport",
    "Gazipaşa Center",
    "Geyikbayırı",
    "Isparta Airport",
    "Kalkan",
    "Kaş",
    "Kemer",
    "Kepez Döşemealtı",
    "Kestel",
    "Kızılağaç",
    "Kızılot",
    "Konaklı",
    "Konyaaltı",
    "Kumluca",
    "Lara / Kundu",
    "Mahmutlar",
    "Okurcalar",
    "Pamukkale",
    "Sapadere Kanyonu",
    "Side",
    "Tekirova",
    "Türkler",
    "Üzümlü, Alanya/Antalya",
]

PICKUP_NAMES = sorted(PICKUP_NAMES, key=len, reverse=True)

RAW_DATA = """\
Pick-up Region Destination Passenger Car (€) Minibus (€) Crafter (€) UltraLux (€)
Antalya Airport Adrasan 60 70 85 80
Antalya Airport Alanya 50 70 100 80
Antalya Airport Antalya Center 20 30 40 40
Antalya Airport Antalya Expo 20 30 40 40
Antalya Airport Avsallar 50 65 100 75
Antalya Airport Belek 25 35 45 45
Antalya Airport Boğazkent 30 40 50 50
Antalya Airport Çamyuva 50 60 80 70
Antalya Airport Çıralı 60 70 85 80
Antalya Airport Demirtaş 75 105 150 115
Antalya Airport Fethiye, Muğla 170 210 250 220
Antalya Airport Gazipasa Airport 80 105 150 115
Antalya Airport Gazipaşa Center 80 105 150 115
Antalya Airport Geyikbayırı 35 50 60 60
Antalya Airport Isparta Airport 100 150 200 160
Antalya Airport Kalkan 120 160 200 170
Antalya Airport Kaş 120 160 200 170
Antalya Airport Kemer 40 50 70 60
Antalya Airport Kepez Döşemealtı 35 50 60 60
Antalya Airport Kestel 60 70 100 80
Antalya Airport Kızılağaç 50 65 90 75
Antalya Airport Kızılot 50 65 90 75
Antalya Airport Konaklı 50 70 100 80
Antalya Airport Konyaaltı 25 35 45 45
Antalya Airport Kumluca 65 75 95 85
Antalya Airport Lara / Kundu 20 30 40 40
Antalya Airport Mahmutlar 60 70 100 80
Antalya Airport Okurcalar 50 65 100 75
Antalya Airport Pamukkale 180 230 300 240
Antalya Airport Side 45 55 80 65
Antalya Airport Tekirova 50 60 80 70
Antalya Airport Türkler 50 70 100 80
Antalya Airport Üzümlü, Alanya/Antalya 100 150 200 160
Adrasan Adrasan 60 70 85 80
Adrasan Alanya 110 140 185 150
Adrasan Antalya Airport 60 70 85 80
Adrasan Antalya Center 60 70 85 80
Adrasan Antalya Expo 65 75 90 85
Adrasan Avsallar 110 135 185 145
Adrasan Belek 85 105 130 115
Adrasan Boğazkent 90 110 135 120
Adrasan Çamyuva 60 70 85 80
Adrasan Çıralı 60 70 85 80
Adrasan Demirtaş 140 175 235 185
Adrasan Fethiye, Muğla 170 210 250 220
Adrasan Gazipasa Airport 140 175 235 185
Adrasan Gazipaşa Center 140 175 235 185
Adrasan Geyikbayırı 60 70 85 80
Adrasan Isparta Airport 160 220 285 230
Adrasan Kalkan 120 160 200 170
Adrasan Kaş 120 160 200 170
Adrasan Kemer 60 70 85 80
Adrasan Kepez Döşemealtı 60 70 85 80
Adrasan Kestel 120 140 185 150
Adrasan Kızılağaç 110 135 175 145
Adrasan Kızılot 110 135 175 145
Adrasan Konaklı 110 140 185 150
Adrasan Konyaaltı 60 70 85 80
Adrasan Kumluca 65 75 95 85
Adrasan Lara / Kundu 60 70 85 80
Adrasan Mahmutlar 120 140 185 150
Adrasan Okurcalar 110 135 185 145
Adrasan Pamukkale 180 230 300 240
Adrasan Side 105 125 165 135
Adrasan Tekirova 60 70 85 80
Adrasan Türkler 110 140 185 150
Alanya Adrasan 110 140 185 150
Alanya Alanya 25 30 50 40
Alanya Alanya Kalesi 30 40 50
Alanya Antalya Airport 50 70 100 80
Alanya Antalya Center 60 80 110 90
Alanya Antalya Expo 50 70 100 80
Alanya Avsallar 25 30 60 40
Alanya Belek 50 70 100 80
Alanya Boğazkent 50 70 100 80
Alanya Çamyuva 100 130 180 140
Alanya Çıralı 110 140 185 150
Alanya Demirtaş 30 35 50 45
Alanya Dim Çayı 30 50 70 60
Alanya Dim Mağarası 40 50 60
Alanya Fethiye, Muğla 220 280 350 290
Alanya Gazipasa Airport 30 35 50 45
Alanya Gazipaşa Center 30 35 50 45
Alanya Geyikbayırı 85 120 160 130
Alanya Isparta Airport 150 220 300 230
Alanya Kalkan 170 230 300 240
Alanya Kaş 170 230 300 240
Alanya Kemer 90 120 170 130
Alanya Kepez Döşemealtı 85 120 160 130
Alanya Kestel 25 30 50 40
Alanya Kızılağaç 45 50 70 60
Alanya Kızılot 45 50 70 60
Alanya Konaklı 25 30 60 40
Alanya Konyaaltı 60 80 110 90
Alanya Kumluca 115 145 195 155
Alanya Lara / Kundu 60 80 110 90
Alanya Mahmutlar 25 30 50 40
Alanya Okurcalar 35 40 60 50
Alanya Pamukkale 230 300 400 310
Alanya Sapadere Kanyonu 80 100 130 110
Alanya Side 45 55 80 65
Alanya Tekirova 100 130 180 140
Alanya Türkler 25 30 60 40
Alanya Kalesi Alanya 30 40 50
Alanya Kalesi Avsallar 60 70 80
Alanya Kalesi Kestel 30 40 50
Alanya Kalesi Kızılağaç 70 80 90
Alanya Kalesi Kızılot 70 80 90
Alanya Kalesi Konaklı 40 50 60
Alanya Kalesi Mahmutlar 30 40 50
Alanya Kalesi Okurcalar 70 80 90
Alanya Kalesi Türkler 60 70 80
Antalya Center Adrasan 60 70 85 80
Antalya Center Alanya 60 80 110 90
Antalya Center Antalya Airport 20 30 40 40
Antalya Center Antalya Center 20 30 40 40
Antalya Center Antalya Expo 25 35 45 45
Antalya Center Avsallar 60 75 110 85
Antalya Center Belek 35 45 55 55
Antalya Center Boğazkent 40 50 60 60
Antalya Center Çamyuva 50 60 80 70
Antalya Center Çıralı 60 70 85 80
Antalya Center Demirtaş 90 115 160 125
Antalya Center Fethiye, Muğla 170 210 250 220
Antalya Center Gazipasa Airport 90 115 160 125
Antalya Center Gazipaşa Center 90 115 160 125
Antalya Center Geyikbayırı 35 50 60 60
Antalya Center Isparta Airport 100 150 200 160
Antalya Center Kalkan 120 160 200 170
Antalya Center Kaş 120 160 200 170
Antalya Center Kemer 40 50 70 60
Antalya Center Kepez Döşemealtı 35 50 60 60
Antalya Center Kestel 70 80 110 90
Antalya Center Kızılağaç 60 75 100 85
Antalya Center Kızılot 60 75 100 85
Antalya Center Konaklı 60 80 110 90
Antalya Center Konyaaltı 25 35 45 45
Antalya Center Kumluca 65 75 95 85
Antalya Center Lara / Kundu 25 35 45 45
Antalya Center Mahmutlar 70 80 110 90
Antalya Center Okurcalar 60 75 110 85
Antalya Center Pamukkale 180 230 300 240
Antalya Center Side 55 65 90 75
Antalya Center Tekirova 50 60 80 70
Antalya Center Türkler 60 80 110 90
Antalya Expo Adrasan 65 75 90 85
Antalya Expo Alanya 50 70 100 80
Antalya Expo Antalya Airport 20 30 40 40
Antalya Expo Antalya Center 25 35 45 45
Antalya Expo Avsallar 50 65 100 75
Antalya Expo Belek 25 35 45 45
Antalya Expo Boğazkent 30 40 50 50
Antalya Expo Çamyuva 55 65 85 75
Antalya Expo Çıralı 65 75 90 85
Antalya Expo Gazipasa Airport 80 105 150 115
Antalya Expo Gazipaşa Center 80 105 150 115
Antalya Expo Geyikbayırı 40 55 65 65
Antalya Expo Isparta Airport 105 155 205 165
Antalya Expo Kalkan 125 165 205 175
Antalya Expo Kaş 125 165 205 175
Antalya Expo Kemer 45 55 75 65
Antalya Expo Kestel 60 70 100 80
Antalya Expo Kızılağaç 50 65 90 75
Antalya Expo Kızılot 50 65 90 75
Antalya Expo Konaklı 50 70 100 80
Antalya Expo Konyaaltı 30 40 50 50
Antalya Expo Kumluca 70 80 100 90
Antalya Expo Lara / Kundu 25 35 45 45
Antalya Expo Mahmutlar 60 70 100 80
Antalya Expo Okurcalar 50 65 100 75
Antalya Expo Pamukkale 185 235 305 245
Antalya Expo Side 45 55 80 65
Antalya Expo Tekirova 55 65 85 75
Antalya Expo Türkler 50 70 100 80
Avsallar Adrasan 110 135 185 145
Avsallar Alanya 25 30 60 40
Avsallar Alanya Kalesi 60 70 80
Avsallar Antalya Airport 50 65 100 75
Avsallar Antalya Center 60 75 110 85
Avsallar Antalya Expo 50 65 100 75
Avsallar Avsallar 25 30 60 40
Avsallar Belek 50 65 100 75
Avsallar Boğazkent 50 65 100 75
Avsallar Çamyuva 100 125 180 135
Avsallar Çıralı 110 135 185 145
Avsallar Demirtaş 50 55 75 65
Avsallar Dim Çayı 50 80 110 90
Avsallar Dim Mağarası 70 80 90
Avsallar Fethiye, Muğla 220 275 350 285
Avsallar Gazipasa Airport 50 55 75 65
Avsallar Gazipaşa Center 50 55 75 65
Avsallar Geyikbayırı 85 115 160 125
Avsallar Isparta Airport 150 215 300 225
Avsallar Kalkan 170 225 300 235
Avsallar Kaş 170 225 300 235
Avsallar Kemer 90 115 170 125
Avsallar Kepez Döşemealtı 85 115 160 125
Avsallar Kestel 25 30 60 40
Avsallar Kızılağaç 45 50 70 60
Avsallar Kızılot 45 50 70 60
Avsallar Konaklı 25 30 60 40
Avsallar Konyaaltı 60 75 110 85
Avsallar Kumluca 115 140 195 150
Avsallar Lara / Kundu 60 75 110 85
Avsallar Mahmutlar 30 35 60 45
Avsallar Okurcalar 35 40 60 50
Avsallar Pamukkale 230 295 400 305
Avsallar Sapadere Kanyonu 100 120 150 130
Avsallar Side 45 55 80 65
Avsallar Tekirova 100 125 180 135
Avsallar Türkler 25 30 60 40
Belek Adrasan 85 105 130 115
Belek Alanya 50 70 100 80
Belek Antalya Airport 25 35 45 45
Belek Antalya Center 35 45 55 55
Belek Antalya Expo 25 35 45 45
Belek Avsallar 50 65 100 75
Belek Belek 25 35 45 45
Belek Boğazkent 25 35 45 45
Belek Çamyuva 75 95 125 105
Belek Çıralı 85 105 130 115
Belek Demirtaş 80 105 150 115
Belek Fethiye, Muğla 195 245 295 255
Belek Gazipasa Airport 80 105 150 115
Belek Gazipaşa Center 80 105 150 115
Belek Geyikbayırı 60 85 105 95
Belek Isparta Airport 125 185 245 195
Belek Kalkan 145 195 245 205
Belek Kaş 145 195 245 205
Belek Kemer 65 85 115 95
Belek Kepez Döşemealtı 60 85 105 95
Belek Kestel 60 70 100 80
Belek Kızılağaç 50 65 90 75
Belek Kızılot 50 65 90 75
Belek Konaklı 50 70 100 80
Belek Konyaaltı 35 45 55 55
Belek Kumluca 90 110 140 120
Belek Lara / Kundu 35 45 55 55
Belek Mahmutlar 60 70 100 80
Belek Okurcalar 50 65 100 75
Belek Pamukkale 205 265 345 275
Belek Side 45 55 80 65
Belek Tekirova 75 95 125 105
Belek Türkler 50 70 100 80
Boğazkent Adrasan 90 110 135 120
Boğazkent Alanya 50 70 100 80
Boğazkent Antalya Airport 30 40 50 50
Boğazkent Antalya Center 40 50 60 60
Boğazkent Antalya Expo 30 40 50 50
Boğazkent Avsallar 50 65 100 75
Boğazkent Belek 25 35 45 45
Boğazkent Boğazkent 30 40 50 50
Boğazkent Çamyuva 80 100 130 110
Boğazkent Çıralı 90 110 135 120
Boğazkent Demirtaş 80 105 150 115
Boğazkent Fethiye, Muğla 200 250 300 260
Boğazkent Gazipasa Airport 80 105 150 115
Boğazkent Gazipaşa Center 80 105 150 115
Boğazkent Geyikbayırı 65 90 110 100
Boğazkent Isparta Airport 130 190 250 200
Boğazkent Kalkan 150 200 250 210
Boğazkent Kaş 150 200 250 210
Boğazkent Kemer 70 90 120 100
Boğazkent Kepez Döşemealtı 65 90 110 100
Boğazkent Kestel 60 70 100 80
Boğazkent Kızılağaç 50 65 90 75
Boğazkent Kızılot 50 65 90 75
Boğazkent Konaklı 50 70 100 80
Boğazkent Konyaaltı 40 50 60 60
Boğazkent Kumluca 95 115 145 125
Boğazkent Lara / Kundu 40 50 60 60
Boğazkent Mahmutlar 60 70 100 80
Boğazkent Okurcalar 50 65 100 75
Boğazkent Pamukkale 210 270 350 280
Boğazkent Side 45 55 80 65
Boğazkent Tekirova 80 100 130 110
Boğazkent Türkler 50 70 100 80
Çamyuva Adrasan 60 70 85 80
Çamyuva Alanya 100 130 180 140
Çamyuva Antalya Airport 50 60 80 70
Çamyuva Antalya Center 50 60 80 70
Çamyuva Antalya Expo 55 65 85 75
Çamyuva Avsallar 100 125 180 135
Çamyuva Belek 75 95 125 105
Çamyuva Boğazkent 80 100 130 110
Çamyuva Çamyuva 50 60 80 70
Çamyuva Çıralı 60 70 85 80
Çamyuva Demirtaş 130 165 230 175
Çamyuva Fethiye, Muğla 170 210 250 220
Çamyuva Gazipasa Airport 130 165 230 175
Çamyuva Gazipaşa Center 130 165 230 175
Çamyuva Geyikbayırı 50 60 80 70
Çamyuva Isparta Airport 150 210 280 220
Çamyuva Kalkan 120 160 200 170
Çamyuva Kaş 120 160 200 170
Çamyuva Kemer 50 60 80 70
Çamyuva Kepez Döşemealtı 50 60 80 70
Çamyuva Kestel 110 130 180 140
Çamyuva Kızılağaç 100 125 170 135
Çamyuva Kızılot 100 125 170 135
Çamyuva Konaklı 100 130 180 140
Çamyuva Konyaaltı 50 60 80 70
Çamyuva Kumluca 65 75 95 85
Çamyuva Lara / Kundu 50 60 80 70
Çamyuva Mahmutlar 110 130 180 140
Çamyuva Okurcalar 100 125 180 135
Çamyuva Pamukkale 180 230 300 240
Çamyuva Side 95 115 160 125
Çamyuva Tekirova 50 60 80 70
Çamyuva Türkler 100 130 180 140
Çıralı Adrasan 60 70 85 80
Çıralı Alanya 110 140 185 150
Çıralı Antalya Airport 60 70 85 80
Çıralı Antalya Center 60 70 85 80
Çıralı Antalya Expo 65 75 90 85
Çıralı Avsallar 110 135 185 145
Çıralı Belek 85 105 130 115
Çıralı Boğazkent 90 110 135 120
Çıralı Çamyuva 60 70 85 80
Çıralı Çıralı 60 70 85 80
Çıralı Demirtaş 140 175 235 185
Çıralı Fethiye, Muğla 170 210 250 220
Çıralı Gazipasa Airport 140 175 235 185
Çıralı Gazipaşa Center 140 175 235 185
Çıralı Geyikbayırı 60 70 85 80
Çıralı Isparta Airport 160 220 285 230
Çıralı Kalkan 120 160 200 170
Çıralı Kaş 120 160 200 170
Çıralı Kemer 60 70 85 80
Çıralı Kepez Döşemealtı 60 70 85 80
Çıralı Kestel 120 140 185 150
Çıralı Kızılağaç 110 135 175 145
Çıralı Kızılot 110 135 175 145
Çıralı Konaklı 110 140 185 150
Çıralı Konyaaltı 60 70 85 80
Çıralı Kumluca 65 75 95 85
Çıralı Lara / Kundu 60 70 85 80
Çıralı Mahmutlar 120 140 185 150
Çıralı Okurcalar 110 135 185 145
Çıralı Pamukkale 180 230 300 240
Çıralı Side 105 125 165 135
Çıralı Tekirova 60 70 85 80
Çıralı Türkler 110 140 185 150
Demirtaş Adrasan 140 175 235 185
Demirtaş Alanya 30 35 50 45
Demirtaş Antalya Airport 75 105 150 115
Demirtaş Antalya Center 90 115 160 125
Demirtaş Avsallar 50 55 75 65
Demirtaş Belek 80 105 150 115
Demirtaş Boğazkent 80 105 150 115
Demirtaş Çamyuva 130 165 230 175
Demirtaş Çıralı 140 175 235 185
Demirtaş Gazipasa Airport 25 35 50 45
Demirtaş Gazipaşa Center 25 35 50 45
Demirtaş Isparta Airport 180 255 350 265
Demirtaş Kalkan 200 265 350 275
Demirtaş Kaş 200 265 350 275
Demirtaş Kemer 120 155 220 165
Demirtaş Kestel 30 35 50 45
Demirtaş Kızılağaç 50 60 75 70
Demirtaş Kızılot 50 60 75 70
Demirtaş Konaklı 50 55 75 65
Demirtaş Konyaaltı 90 115 160 125
Demirtaş Kumluca 145 180 245 190
Demirtaş Lara / Kundu 90 115 160 125
Demirtaş Mahmutlar 25 35 50 45
Demirtaş Okurcalar 50 60 75 70
Demirtaş Pamukkale 260 335 450 345
Demirtaş Side 65 75 100 85
Demirtaş Tekirova 130 165 230 175
Demirtaş Türkler 50 55 75 65
Dim Çayı Alanya 30 50 70 60
Dim Çayı Avsallar 50 80 110 90
Dim Çayı Kestel 30 50 70 60
Dim Çayı Kızılağaç 50 60 80
Dim Çayı Kızılot 50 60 80
Dim Çayı Konaklı 50 80 110 90
Dim Çayı Mahmutlar 30 50 70 60
Dim Çayı Okurcalar 50 80 110 90
Dim Çayı Türkler 50 80 110 90
Dim Mağarası Alanya 40 50 60
Dim Mağarası Avsallar 70 80 90
Dim Mağarası Kestel 40 50 60
Dim Mağarası Kızılağaç 80 90 100
Dim Mağarası Kızılot 80 90 100
Dim Mağarası Konaklı 50 60 70
Dim Mağarası Mahmutlar 40 50 60
Dim Mağarası Okurcalar 80 90 100
Dim Mağarası Türkler 70 80 90
Fethiye, Muğla Adrasan 170 210 250 220
Fethiye, Muğla Alanya 220 280 350 290
Fethiye, Muğla Antalya Airport 170 210 250 220
Fethiye, Muğla Antalya Center 170 210 250 220
Fethiye, Muğla Avsallar 220 275 350 285
Fethiye, Muğla Belek 195 245 295 255
Fethiye, Muğla Boğazkent 200 250 300 260
Fethiye, Muğla Çamyuva 170 210 250 220
Fethiye, Muğla Çıralı 170 210 250 220
Fethiye, Muğla Gazipasa Airport 250 315 400
Fethiye, Muğla Gazipaşa Center 250 315 400
Fethiye, Muğla Geyikbayırı 170 210 250 220
Fethiye, Muğla Isparta Airport 270 360 450 370
Fethiye, Muğla Kalkan 170 210 250 220
Fethiye, Muğla Kaş 170 210 250 220
Fethiye, Muğla Kemer 170 210 250 220
Fethiye, Muğla Kestel 230 280 350 290
Fethiye, Muğla Kızılağaç 220 275 340 285
Fethiye, Muğla Kızılot 220 275 340 285
Fethiye, Muğla Konaklı 220 280 350 290
Fethiye, Muğla Konyaaltı 170 210 250 220
Fethiye, Muğla Kumluca 170 210 250 220
Fethiye, Muğla Lara / Kundu 170 210 250 220
Fethiye, Muğla Mahmutlar 230 280 350 290
Fethiye, Muğla Okurcalar 220 275 350 285
Fethiye, Muğla Pamukkale 230 280 350 290
Fethiye, Muğla Side 215 265 330 275
Fethiye, Muğla Tekirova 170 210 250 220
Fethiye, Muğla Türkler 220 280 350 290
Gazipasa Airport Adrasan 140 175 235 185
Gazipasa Airport Alanya 30 35 50 45
Gazipasa Airport Antalya Airport 80 105 150 115
Gazipasa Airport Antalya Center 90 115 160 125
Gazipasa Airport Antalya Expo 80 105 150 115
Gazipasa Airport Avsallar 50 55 75 65
Gazipasa Airport Belek 80 105 150 115
Gazipasa Airport Boğazkent 80 105 150 115
Gazipasa Airport Çamyuva 130 165 230 175
Gazipasa Airport Çıralı 140 175 235 185
Gazipasa Airport Demirtaş 25 35 50 45
Gazipasa Airport Fethiye, Muğla 250 315 400
Gazipasa Airport Gazipaşa Center 25 35 50 45
Gazipasa Airport Geyikbayırı 115 155 210 165
Gazipasa Airport Isparta Airport 180 255 350 265
Gazipasa Airport Kalkan 200 265 350 275
Gazipasa Airport Kaş 200 265 350 275
Gazipasa Airport Kemer 120 155 220 165
Gazipasa Airport Kepez Döşemealtı 115 155 210 165
Gazipasa Airport Kestel 30 35 50 45
Gazipasa Airport Kızılağaç 50 60 75 70
Gazipasa Airport Kızılot 50 60 75 70
Gazipasa Airport Konaklı 50 55 75 65
Gazipasa Airport Konyaaltı 90 115 160 125
Gazipasa Airport Kumluca 145 180 245 190
Gazipasa Airport Lara / Kundu 90 115 160 125
Gazipasa Airport Mahmutlar 25 35 50 45
Gazipasa Airport Okurcalar 50 60 75 70
Gazipasa Airport Pamukkale 260 335 450 345
Gazipasa Airport Side 65 75 100 85
Gazipasa Airport Tekirova 130 165 230 175
Gazipasa Airport Türkler 50 55 75 65
Gazipasa Airport Üzümlü, Alanya/Antalya 60 80 150 90
Gazipaşa Center Adrasan 140 175 235 185
Gazipaşa Center Alanya 30 35 50 45
Gazipaşa Center Antalya Airport 80 105 150 115
Gazipaşa Center Antalya Center 90 115 160 125
Gazipaşa Center Antalya Expo 80 105 150 115
Gazipaşa Center Avsallar 50 55 75 65
Gazipaşa Center Belek 80 105 150 115
Gazipaşa Center Boğazkent 80 105 150 115
Gazipaşa Center Çamyuva 130 165 230 175
Gazipaşa Center Çıralı 140 175 235 185
Gazipaşa Center Demirtaş 25 35 50 45
Gazipaşa Center Fethiye, Muğla 250 315 400
Gazipaşa Center Gazipasa Airport 25 35 50 45
Gazipaşa Center Gazipaşa Center 25 35 50 45
Gazipaşa Center Geyikbayırı 115 155 210 165
Gazipaşa Center Isparta Airport 180 255 350 265
Gazipaşa Center Kalkan 200 265 350 275
Gazipaşa Center Kaş 200 265 350 275
Gazipaşa Center Kemer 120 155 220 165
Gazipaşa Center Kepez Döşemealtı 115 155 210 165
Gazipaşa Center Kestel 30 35 50 45
Gazipaşa Center Kızılağaç 50 60 75 70
Gazipaşa Center Kızılot 50 60 75 70
Gazipaşa Center Konaklı 50 55 75 65
Gazipaşa Center Konyaaltı 90 115 160 125
Gazipaşa Center Kumluca 145 180 245 190
Gazipaşa Center Lara / Kundu 90 115 160 125
Gazipaşa Center Mahmutlar 25 35 50 45
Gazipaşa Center Okurcalar 50 60 75 70
Gazipaşa Center Pamukkale 260 335 450 345
Gazipaşa Center Side 65 75 100 85
Gazipaşa Center Tekirova 130 165 230 175
Gazipaşa Center Türkler 50 55 75 65
Geyikbayırı Adrasan 60 70 85 80
Geyikbayırı Alanya 85 120 160 130
Geyikbayırı Antalya Airport 35 50 60 60
Geyikbayırı Antalya Center 35 50 60 60
Geyikbayırı Antalya Expo 40 55 65 65
Geyikbayırı Avsallar 85 115 160 125
Geyikbayırı Belek 60 85 105 95
Geyikbayırı Boğazkent 65 90 110 100
Geyikbayırı Çamyuva 50 60 80 70
Geyikbayırı Çıralı 60 70 85 80
Geyikbayırı Fethiye, Muğla 170 210 250 220
Geyikbayırı Gazipasa Airport 115 155 210 165
Geyikbayırı Gazipaşa Center 115 155 210 165
Geyikbayırı Geyikbayırı 35 50 60 60
Geyikbayırı Isparta Airport 135 200 260 210
Geyikbayırı Kalkan 120 160 200 170
Geyikbayırı Kaş 120 160 200 170
Geyikbayırı Kemer 40 50 70 60
Geyikbayırı Kepez Döşemealtı 35 50 60 60
Geyikbayırı Kestel 95 120 160 130
Geyikbayırı Kızılağaç 85 115 150 125
Geyikbayırı Kızılot 85 115 150 125
Geyikbayırı Konaklı 85 120 160 130
Geyikbayırı Konyaaltı 35 50 60 60
Geyikbayırı Kumluca 65 75 95 85
Geyikbayırı Lara / Kundu 35 50 60 60
Geyikbayırı Mahmutlar 95 120 160 130
Geyikbayırı Okurcalar 85 115 160 125
Geyikbayırı Pamukkale 180 230 300 240
Geyikbayırı Side 80 105 140 115
Geyikbayırı Tekirova 50 60 80 70
Geyikbayırı Türkler 85 120 160 130
Isparta Airport Adrasan 160 220 285 230
Isparta Airport Alanya 150 220 300 230
Isparta Airport Antalya Airport 100 150 200 160
Isparta Airport Antalya Center 100 150 200 160
Isparta Airport Antalya Expo 105 155 205 165
Isparta Airport Avsallar 150 215 300 225
Isparta Airport Belek 125 185 245 195
Isparta Airport Boğazkent 130 190 250 200
Isparta Airport Çamyuva 150 210 280 220
Isparta Airport Çıralı 160 220 285 230
Isparta Airport Demirtaş 180 255 350 265
Isparta Airport Fethiye, Muğla 270 360 450 370
Isparta Airport Gazipasa Airport 180 255 350 265
Isparta Airport Gazipaşa Center 180 255 350 265
Isparta Airport Geyikbayırı 135 200 260 210
Isparta Airport Kalkan 220 310 400 320
Isparta Airport Kaş 220 310 400 320
Isparta Airport Kemer 140 200 270 210
Isparta Airport Kepez Döşemealtı 135 200 260 210
Isparta Airport Kestel 160 220 300 230
Isparta Airport Kızılağaç 150 215 290 225
Isparta Airport Kızılot 150 215 290 225
Isparta Airport Konaklı 150 220 300 230
Isparta Airport Konyaaltı 125 185 245 195
Isparta Airport Kumluca 165 225 295 235
Isparta Airport Lara / Kundu 100 150 200 160
Isparta Airport Mahmutlar 160 220 300 230
Isparta Airport Okurcalar 150 215 300 225
Isparta Airport Pamukkale 280 380 500 390
Isparta Airport Side 145 205 280 215
Isparta Airport Tekirova 150 210 280 220
Isparta Airport Türkler 150 220 300 230
Kalkan Adrasan 120 160 200 170
Kalkan Alanya 170 230 300 240
Kalkan Antalya Airport 120 160 200 170
Kalkan Antalya Center 120 160 200 170
Kalkan Antalya Expo 125 165 205 175
Kalkan Avsallar 170 225 300 235
Kalkan Belek 145 195 245 205
Kalkan Boğazkent 150 200 250 210
Kalkan Çamyuva 120 160 200 170
Kalkan Çıralı 120 160 200 170
Kalkan Demirtaş 200 265 350 275
Kalkan Fethiye, Muğla 170 210 250 220
Kalkan Gazipasa Airport 200 265 350 275
Kalkan Gazipaşa Center 200 265 350 275
Kalkan Geyikbayırı 120 160 200 170
Kalkan Isparta Airport 220 310 400 320
Kalkan Kalkan 120 160 200 170
Kalkan Kaş 120 160 200 170
Kalkan Kemer 120 160 200 170
Kalkan Kepez Döşemealtı 120 160 200 170
Kalkan Kestel 180 230 300 240
Kalkan Kızılağaç 170 225 290 235
Kalkan Kızılot 170 225 290 235
Kalkan Konaklı 170 230 300 240
Kalkan Konyaaltı 120 160 200 170
Kalkan Kumluca 120 160 200 170
Kalkan Lara / Kundu 120 160 200 170
Kalkan Mahmutlar 180 230 300 240
Kalkan Okurcalar 170 225 300 235
Kalkan Pamukkale 180 230 300 240
Kalkan Side 165 215 280 225
Kalkan Tekirova 120 160 200 170
Kalkan Türkler 170 230 300 240
Kaş Adrasan 120 160 200 170
Kaş Alanya 170 230 300 240
Kaş Antalya Airport 120 160 200 170
Kaş Antalya Center 120 160 200 170
Kaş Antalya Expo 125 165 205 175
Kaş Avsallar 170 225 300 235
Kaş Belek 145 195 245 205
Kaş Boğazkent 150 200 250 210
Kaş Çamyuva 120 160 200 170
Kaş Çıralı 120 160 200 170
Kaş Demirtaş 200 265 350 275
Kaş Fethiye, Muğla 170 210 250 220
Kaş Gazipasa Airport 200 265 350 275
Kaş Gazipaşa Center 200 265 350 275
Kaş Geyikbayırı 120 160 200 170
Kaş Isparta Airport 220 310 400 320
Kaş Kalkan 120 160 200 170
Kaş Kaş 120 160 200 170
Kaş Kemer 120 160 200 170
Kaş Kepez Döşemealtı 120 160 200 170
Kaş Kestel 180 230 300 240
Kaş Kızılağaç 170 225 290 235
Kaş Kızılot 170 225 290 235
Kaş Konaklı 170 230 300 240
Kaş Konyaaltı 120 160 200 170
Kaş Kumluca 120 160 200 170
Kaş Lara / Kundu 120 160 200 170
Kaş Mahmutlar 180 230 300 240
Kaş Okurcalar 170 225 300 235
Kaş Pamukkale 180 230 300 240
Kaş Side 165 215 280 225
Kaş Tekirova 120 160 200 170
Kaş Türkler 170 230 300 240
Kemer Adrasan 60 70 85 80
Kemer Alanya 90 120 170 130
Kemer Antalya Airport 40 50 70 60
Kemer Antalya Center 40 50 70 60
Kemer Antalya Expo 45 55 75 65
Kemer Avsallar 90 115 170 125
Kemer Belek 65 85 115 95
Kemer Boğazkent 70 90 120 100
Kemer Çamyuva 50 60 80 70
Kemer Çıralı 60 70 85 80
Kemer Demirtaş 120 155 220 165
Kemer Fethiye, Muğla 170 210 250 220
Kemer Gazipasa Airport 120 155 220 165
Kemer Gazipaşa Center 120 155 220 165
Kemer Geyikbayırı 40 50 70 60
Kemer Isparta Airport 140 200 270 210
Kemer Kalkan 120 160 200 170
Kemer Kaş 120 160 200 170
Kemer Kemer 40 50 70 60
Kemer Kepez Döşemealtı 40 50 70 60
Kemer Kestel 100 120 170 130
Kemer Kızılağaç 90 115 160 125
Kemer Kızılot 90 115 160 125
Kemer Konaklı 90 120 170 130
Kemer Konyaaltı 40 50 70 60
Kemer Kumluca 65 75 95 85
Kemer Lara / Kundu 40 50 70 60
Kemer Mahmutlar 100 120 170 130
Kemer Okurcalar 90 115 170 125
Kemer Pamukkale 180 230 300 240
Kemer Side 85 105 150 115
Kemer Tekirova 50 60 80 70
Kemer Türkler 90 120 170 130
Kepez Döşemealtı Adrasan 60 70 85 80
Kepez Döşemealtı Alanya 85 120 160 130
Kepez Döşemealtı Antalya Airport 35 50 60 60
Kepez Döşemealtı Antalya Center 35 50 60 60
Kepez Döşemealtı Avsallar 85 115 160 125
Kepez Döşemealtı Belek 60 85 105 95
Kepez Döşemealtı Boğazkent 65 90 110 100
Kepez Döşemealtı Çamyuva 50 60 80 70
Kepez Döşemealtı Çıralı 60 70 85 80
Kepez Döşemealtı Gazipasa Airport 115 155 210 165
Kepez Döşemealtı Gazipaşa Center 115 155 210 165
Kepez Döşemealtı Geyikbayırı 35 50 60 60
Kepez Döşemealtı Isparta Airport 135 200 260 210
Kepez Döşemealtı Kalkan 120 160 200 170
Kepez Döşemealtı Kaş 120 160 200 170
Kepez Döşemealtı Kemer 40 50 70 60
Kepez Döşemealtı Kepez Döşemealtı 35 50 60 60
Kepez Döşemealtı Kestel 95 120 160 130
Kepez Döşemealtı Kızılağaç 85 115 150 125
Kepez Döşemealtı Kızılot 85 115 150 125
Kepez Döşemealtı Konaklı 85 120 160 130
Kepez Döşemealtı Konyaaltı 35 50 60 60
Kepez Döşemealtı Kumluca 65 75 95 85
Kepez Döşemealtı Lara / Kundu 35 50 60 60
Kepez Döşemealtı Mahmutlar 95 120 160 130
Kepez Döşemealtı Okurcalar 85 115 160 125
Kepez Döşemealtı Pamukkale 180 230 300 240
Kepez Döşemealtı Side 80 105 140 115
Kepez Döşemealtı Tekirova 50 60 80 70
Kepez Döşemealtı Türkler 85 120 160 130
Kestel Adrasan 120 140 185 150
Kestel Alanya 25 30 50 40
Kestel Alanya Kalesi 30 40 50
Kestel Antalya Airport 60 70 100 80
Kestel Antalya Center 70 80 110 90
Kestel Antalya Expo 60 70 100 80
Kestel Avsallar 25 30 60 40
Kestel Belek 60 70 100 80
Kestel Boğazkent 60 70 100 80
Kestel Çamyuva 110 130 180 140
Kestel Çıralı 120 140 185 150
Kestel Demirtaş 30 35 50 45
Kestel Dim Çayı 30 50 70 60
Kestel Dim Mağarası 40 50 60
Kestel Fethiye, Muğla 230 280 350 290
Kestel Gazipasa Airport 30 35 50 45
Kestel Gazipaşa Center 30 35 50 45
Kestel Geyikbayırı 95 120 160 130
Kestel Isparta Airport 160 220 300 230
Kestel Kalkan 180 230 300 240
Kestel Kaş 180 230 300 240
Kestel Kemer 100 120 170 130
Kestel Kepez Döşemealtı 95 120 160 130
Kestel Kestel 25 30 50 40
Kestel Kızılağaç 45 50 70 60
Kestel Kızılot 45 50 70 60
Kestel Konaklı 25 30 60 40
Kestel Konyaaltı 70 80 110 90
Kestel Kumluca 125 145 195 155
Kestel Lara / Kundu 70 80 110 90
Kestel Mahmutlar 25 30 50 40
Kestel Okurcalar 35 40 60 50
Kestel Pamukkale 240 300 400 310
Kestel Sapadere Kanyonu 80 100 130 110
Kestel Side 45 55 80 65
Kestel Tekirova 110 130 180 140
Kestel Türkler 25 30 60 40
Kızılağaç Adrasan 110 135 175 145
Kızılağaç Alanya 45 50 70 60
Kızılağaç Alanya Kalesi 70 80 90
Kızılağaç Antalya Airport 50 65 90 75
Kızılağaç Antalya Center 60 75 100 85
Kızılağaç Antalya Expo 50 65 90 75
Kızılağaç Avsallar 45 50 70 60
Kızılağaç Belek 50 65 90 75
Kızılağaç Boğazkent 50 65 90 75
Kızılağaç Çamyuva 100 125 170 135
Kızılağaç Çıralı 110 135 175 145
Kızılağaç Demirtaş 50 60 75 70
Kızılağaç Dim Çayı 50 60 80
Kızılağaç Dim Mağarası 80 90 100
Kızılağaç Fethiye, Muğla 220 275 340 285
Kızılağaç Gazipasa Airport 50 60 75 70
Kızılağaç Gazipaşa Center 50 60 75 70
Kızılağaç Geyikbayırı 85 115 150 125
Kızılağaç Isparta Airport 150 215 290 225
Kızılağaç Kalkan 170 225 290 235
Kızılağaç Kaş 170 225 290 235
Kızılağaç Kemer 90 115 160 125
Kızılağaç Kepez Döşemealtı 85 115 150 125
Kızılağaç Kestel 45 50 70 60
Kızılağaç Kızılağaç 45 50 70 60
Kızılağaç Kızılot 45 50 70 60
Kızılağaç Konaklı 45 50 70 60
Kızılağaç Konyaaltı 60 75 100 85
Kızılağaç Kumluca 115 140 185 150
Kızılağaç Lara / Kundu 60 75 100 85
Kızılağaç Mahmutlar 45 50 70 60
Kızılağaç Okurcalar 45 50 70 60
Kızılağaç Pamukkale 230 295 390 305
Kızılağaç Sapadere Kanyonu 110 130 160 140
Kızılağaç Side 45 55 80 65
Kızılağaç Tekirova 100 125 170 135
Kızılağaç Türkler 45 50 70 60
Kızılot Adrasan 110 135 175 145
Kızılot Alanya 45 50 70 60
Kızılot Alanya Kalesi 70 80 90
Kızılot Antalya Airport 50 65 90 75
Kızılot Antalya Center 60 75 100 85
Kızılot Antalya Expo 50 65 90 75
Kızılot Avsallar 45 50 70 60
Kızılot Belek 50 65 90 75
Kızılot Boğazkent 50 65 90 75
Kızılot Çamyuva 100 125 170 135
Kızılot Çıralı 110 135 175 145
Kızılot Demirtaş 50 60 75 70
Kızılot Dim Çayı 50 60 80
Kızılot Dim Mağarası 80 90 100
Kızılot Fethiye, Muğla 220 275 340 285
Kızılot Gazipasa Airport 50 60 75 70
Kızılot Gazipaşa Center 50 60 75 70
Kızılot Geyikbayırı 85 115 150 125
Kızılot Isparta Airport 150 215 290 225
Kızılot Kalkan 170 225 290 235
Kızılot Kaş 170 225 290 235
Kızılot Kemer 90 115 160 125
Kızılot Kepez Döşemealtı 85 115 150 125
Kızılot Kestel 45 50 70 60
Kızılot Kızılağaç 45 50 70 60
Kızılot Kızılot 45 50 70 60
Kızılot Konaklı 45 50 70 60
Kızılot Konyaaltı 60 75 100 85
Kızılot Kumluca 115 140 185 150
Kızılot Lara / Kundu 60 75 100 85
Kızılot Mahmutlar 45 50 70 60
Kızılot Okurcalar 45 50 70 60
Kızılot Pamukkale 230 295 390 305
Kızılot Sapadere Kanyonu 110 130 160 140
Kızılot Side 45 55 80 65
Kızılot Tekirova 100 125 170 135
Kızılot Türkler 45 50 70 60
Konaklı Adrasan 110 140 185 150
Konaklı Alanya 25 30 60 40
Konaklı Alanya Kalesi 40 50 60
Konaklı Antalya Airport 50 70 100 80
Konaklı Antalya Center 60 80 110 90
Konaklı Antalya Expo 50 70 100 80
Konaklı Avsallar 25 30 60 40
Konaklı Belek 50 70 100 80
Konaklı Boğazkent 50 70 100 80
Konaklı Çamyuva 100 130 180 140
Konaklı Çıralı 110 140 185 150
Konaklı Demirtaş 50 55 75 65
Konaklı Dim Çayı 50 80 110 90
Konaklı Dim Mağarası 50 60 70
Konaklı Fethiye, Muğla 220 280 350 290
Konaklı Gazipasa Airport 50 55 75 65
Konaklı Gazipaşa Center 50 55 75 65
Konaklı Geyikbayırı 85 120 160 130
Konaklı Isparta Airport 150 220 300 230
Konaklı Kalkan 170 230 300 240
Konaklı Kaş 170 230 300 240
Konaklı Kemer 90 120 170 130
Konaklı Kepez Döşemealtı 85 120 160 130
Konaklı Kestel 25 30 60 40
Konaklı Kızılağaç 45 50 70 60
Konaklı Kızılot 45 50 70 60
Konaklı Konaklı 25 30 60 40
Konaklı Konyaaltı 60 80 110 90
Konaklı Kumluca 115 145 195 155
Konaklı Lara / Kundu 60 80 110 90
Konaklı Mahmutlar 30 35 60 45
Konaklı Okurcalar 35 40 60 50
Konaklı Pamukkale 230 300 400 310
Konaklı Sapadere Kanyonu 90 110 140 120
Konaklı Side 45 55 80 65
Konaklı Tekirova 100 130 180 140
Konaklı Türkler 25 30 60 40
Konyaaltı Adrasan 60 70 85 80
Konyaaltı Alanya 60 80 110 90
Konyaaltı Antalya Airport 25 35 45 45
Konyaaltı Antalya Center 25 35 45 45
Konyaaltı Antalya Expo 30 40 50 50
Konyaaltı Avsallar 60 75 110 85
Konyaaltı Belek 35 45 55 55
Konyaaltı Boğazkent 40 50 60 60
Konyaaltı Çamyuva 50 60 80 70
Konyaaltı Çıralı 60 70 85 80
Konyaaltı Demirtaş 90 115 160 125
Konyaaltı Fethiye, Muğla 170 210 250 220
Konyaaltı Gazipasa Airport 90 115 160 125
Konyaaltı Gazipaşa Center 90 115 160 125
Konyaaltı Geyikbayırı 35 50 60 60
Konyaaltı Isparta Airport 125 185 245 195
Konyaaltı Kalkan 120 160 200 170
Konyaaltı Kaş 120 160 200 170
Konyaaltı Kemer 40 50 70 60
Konyaaltı Kepez Döşemealtı 35 50 60 60
Konyaaltı Kestel 70 80 110 90
Konyaaltı Kızılağaç 60 75 100 85
Konyaaltı Kızılot 60 75 100 85
Konyaaltı Konaklı 60 80 110 90
Konyaaltı Konyaaltı 25 35 45 45
Konyaaltı Kumluca 65 75 95 85
Konyaaltı Lara / Kundu 25 35 45 45
Konyaaltı Mahmutlar 70 80 110 90
Konyaaltı Okurcalar 60 75 110 85
Konyaaltı Pamukkale 180 230 300 240
Konyaaltı Side 55 65 90 75
Konyaaltı Tekirova 50 60 80 70
Konyaaltı Türkler 60 80 110 90
Kumluca Adrasan 65 75 95 85
Kumluca Alanya 115 145 195 155
Kumluca Antalya Airport 65 75 95 85
Kumluca Antalya Center 65 75 95 85
Kumluca Antalya Expo 70 80 100 90
Kumluca Avsallar 115 140 195 150
Kumluca Belek 90 110 140 120
Kumluca Boğazkent 95 115 145 125
Kumluca Çamyuva 65 75 95 85
Kumluca Çıralı 65 75 95 85
Kumluca Demirtaş 145 180 245 190
Kumluca Fethiye, Muğla 170 210 250 220
Kumluca Gazipasa Airport 145 180 245 190
Kumluca Gazipaşa Center 145 180 245 190
Kumluca Geyikbayırı 65 75 95 85
Kumluca Isparta Airport 165 225 295 235
Kumluca Kalkan 120 160 200 170
Kumluca Kaş 120 160 200 170
Kumluca Kemer 65 75 95 85
Kumluca Kepez Döşemealtı 65 75 95 85
Kumluca Kestel 125 145 195 155
Kumluca Kızılağaç 115 140 185 150
Kumluca Kızılot 115 140 185 150
Kumluca Konaklı 115 145 195 155
Kumluca Konyaaltı 65 75 95 85
Kumluca Kumluca 65 75 95 85
Kumluca Lara / Kundu 65 75 95 85
Kumluca Mahmutlar 125 145 195 155
Kumluca Okurcalar 115 140 195 150
Kumluca Pamukkale 180 230 300 240
Kumluca Side 110 130 175 140
Kumluca Tekirova 65 75 95 85
Kumluca Türkler 115 145 195 155
Lara / Kundu Adrasan 60 70 85 80
Lara / Kundu Alanya 60 80 110 90
Lara / Kundu Antalya Airport 20 30 40 40
Lara / Kundu Antalya Center 25 35 45 45
Lara / Kundu Antalya Expo 25 35 45 45
Lara / Kundu Avsallar 60 75 110 85
Lara / Kundu Belek 35 45 55 55
Lara / Kundu Boğazkent 40 50 60 60
Lara / Kundu Çamyuva 50 60 80 70
Lara / Kundu Çıralı 60 70 85 80
Lara / Kundu Demirtaş 90 115 160 125
Lara / Kundu Fethiye, Muğla 170 210 250 220
Lara / Kundu Gazipasa Airport 90 115 160 125
Lara / Kundu Gazipaşa Center 90 115 160 125
Lara / Kundu Geyikbayırı 35 50 60 60
Lara / Kundu Isparta Airport 100 150 200 160
Lara / Kundu Kalkan 120 160 200 170
Lara / Kundu Kaş 120 160 200 170
Lara / Kundu Kemer 40 50 70 60
Lara / Kundu Kepez Döşemealtı 35 50 60 60
Lara / Kundu Kestel 70 80 110 90
Lara / Kundu Kızılağaç 60 75 100 85
Lara / Kundu Kızılot 60 75 100 85
Lara / Kundu Konaklı 60 80 110 90
Lara / Kundu Konyaaltı 25 35 45 45
Lara / Kundu Kumluca 65 75 95 85
Lara / Kundu Lara / Kundu 20 30 40 40
Lara / Kundu Mahmutlar 70 80 110 90
Lara / Kundu Okurcalar 60 75 110 85
Lara / Kundu Pamukkale 180 230 300 240
Lara / Kundu Side 55 65 90 75
Lara / Kundu Tekirova 50 60 80 70
Lara / Kundu Türkler 60 80 110 90
Mahmutlar Adrasan 120 140 185 150
Mahmutlar Alanya 25 30 50 40
Mahmutlar Alanya Kalesi 30 40 50
Mahmutlar Antalya Airport 60 70 100 80
Mahmutlar Antalya Center 70 80 110 90
Mahmutlar Antalya Expo 60 70 100 80
Mahmutlar Avsallar 30 35 60 45
Mahmutlar Belek 60 70 100 80
Mahmutlar Boğazkent 60 70 100 80
Mahmutlar Çamyuva 110 130 180 140
Mahmutlar Çıralı 120 140 185 150
Mahmutlar Demirtaş 25 35 50 45
Mahmutlar Dim Çayı 30 50 70 60
Mahmutlar Dim Mağarası 40 50 60
Mahmutlar Fethiye, Muğla 230 280 350 290
Mahmutlar Gazipasa Airport 25 35 50 45
Mahmutlar Gazipaşa Center 25 35 50 45
Mahmutlar Geyikbayırı 95 120 160 130
Mahmutlar Isparta Airport 160 220 300 230
Mahmutlar Kalkan 180 230 300 240
Mahmutlar Kaş 180 230 300 240
Mahmutlar Kemer 100 120 170 130
Mahmutlar Kepez Döşemealtı 95 120 160 130
Mahmutlar Kestel 25 30 50 40
Mahmutlar Kızılağaç 45 50 70 60
Mahmutlar Kızılot 45 50 70 60
Mahmutlar Konaklı 30 35 60 45
Mahmutlar Konyaaltı 70 80 110 90
Mahmutlar Kumluca 125 145 195 155
Mahmutlar Lara / Kundu 70 80 110 90
Mahmutlar Mahmutlar 25 30 50 40
Mahmutlar Okurcalar 35 40 60 50
Mahmutlar Pamukkale 240 300 400 310
Mahmutlar Sapadere Kanyonu 80 100 130 110
Mahmutlar Side 45 55 80 65
Mahmutlar Tekirova 110 130 180 140
Mahmutlar Türkler 30 35 60 45
Okurcalar Adrasan 110 135 185 145
Okurcalar Alanya 35 40 60 50
Okurcalar Alanya Kalesi 70 80 90
Okurcalar Antalya Airport 50 65 100 75
Okurcalar Antalya Center 60 75 110 85
Okurcalar Antalya Expo 50 65 100 75
Okurcalar Avsallar 35 40 60 50
Okurcalar Belek 50 65 100 75
Okurcalar Boğazkent 50 65 100 75
Okurcalar Çamyuva 100 125 180 135
Okurcalar Çıralı 110 135 185 145
Okurcalar Demirtaş 50 60 75 70
Okurcalar Dim Çayı 50 80 110 90
Okurcalar Dim Mağarası 80 90 100
Okurcalar Fethiye, Muğla 220 275 350 285
Okurcalar Gazipasa Airport 50 60 75 70
Okurcalar Gazipaşa Center 50 60 75 70
Okurcalar Geyikbayırı 85 115 160 125
Okurcalar Isparta Airport 150 215 300 225
Okurcalar Kalkan 170 225 300 235
Okurcalar Kaş 170 225 300 235
Okurcalar Kemer 90 115 170 125
Okurcalar Kepez Döşemealtı 85 115 160 125
Okurcalar Kestel 35 40 60 50
Okurcalar Kızılağaç 45 50 70 60
Okurcalar Kızılot 45 50 70 60
Okurcalar Konaklı 35 40 60 50
Okurcalar Konyaaltı 60 75 110 85
Okurcalar Kumluca 115 140 195 150
Okurcalar Lara / Kundu 60 75 110 85
Okurcalar Mahmutlar 35 40 60 50
Okurcalar Okurcalar 35 40 60 50
Okurcalar Pamukkale 230 295 400 305
Okurcalar Sapadere Kanyonu 110 130 160 140
Okurcalar Side 45 55 80 65
Okurcalar Tekirova 100 125 180 135
Okurcalar Türkler 35 40 60 50
Pamukkale Adrasan 180 230 300 240
Pamukkale Alanya 230 300 400 310
Pamukkale Antalya Airport 180 230 300 240
Pamukkale Antalya Center 180 230 300 240
Pamukkale Antalya Expo 185 235 305 245
Pamukkale Avsallar 230 295 400 305
Pamukkale Belek 205 265 345 275
Pamukkale Boğazkent 210 270 350 280
Pamukkale Çamyuva 180 230 300 240
Pamukkale Çıralı 180 230 300 240
Pamukkale Demirtaş 260 335 450 345
Pamukkale Fethiye, Muğla 230 280 350 290
Pamukkale Gazipasa Airport 260 335 450 345
Pamukkale Gazipaşa Center 260 335 450 345
Pamukkale Geyikbayırı 180 230 300 240
Pamukkale Isparta Airport 280 380 500 390
Pamukkale Kalkan 180 230 300 240
Pamukkale Kaş 180 230 300 240
Pamukkale Kemer 180 230 300 240
Pamukkale Kepez Döşemealtı 180 230 300 240
Pamukkale Kestel 240 300 400 310
Pamukkale Kızılağaç 230 295 390 305
Pamukkale Kızılot 230 295 390 305
Pamukkale Konaklı 230 300 400 310
Pamukkale Konyaaltı 180 230 300 240
Pamukkale Kumluca 180 230 300 240
Pamukkale Lara / Kundu 180 230 300 240
Pamukkale Mahmutlar 240 300 400 310
Pamukkale Okurcalar 230 295 400 305
Pamukkale Side 225 285 380 295
Pamukkale Tekirova 180 230 300 240
Pamukkale Türkler 230 300 400 310
Sapadere Kanyonu Alanya 80 100 130 110
Sapadere Kanyonu Avsallar 100 120 150 130
Sapadere Kanyonu Kestel 80 100 130 110
Sapadere Kanyonu Kızılağaç 110 130 160 140
Sapadere Kanyonu Kızılot 110 130 160 140
Sapadere Kanyonu Konaklı 90 110 140 120
Sapadere Kanyonu Mahmutlar 80 100 130 110
Sapadere Kanyonu Okurcalar 110 130 160 140
Sapadere Kanyonu Türkler 100 120 150 130
Side Adrasan 105 125 165 135
Side Alanya 45 55 80 65
Side Antalya Airport 45 55 80 65
Side Antalya Center 55 65 90 75
Side Antalya Expo 45 55 80 65
Side Avsallar 45 55 80 65
Side Belek 45 55 80 65
Side Boğazkent 45 55 80 65
Side Çamyuva 95 115 160 125
Side Çıralı 105 125 165 135
Side Demirtaş 65 75 100 85
Side Fethiye, Muğla 215 265 330 275
Side Gazipasa Airport 65 75 100 85
Side Gazipaşa Center 65 75 100 85
Side Geyikbayırı 80 105 140 115
Side Isparta Airport 145 205 280 215
Side Kalkan 165 215 280 225
Side Kaş 165 215 280 225
Side Kemer 85 105 150 115
Side Kepez Döşemealtı 80 105 140 115
Side Kestel 45 55 80 65
Side Kızılağaç 45 55 80 65
Side Kızılot 45 55 80 65
Side Konaklı 45 55 80 65
Side Konyaaltı 55 65 90 75
Side Kumluca 110 130 175 140
Side Lara / Kundu 55 65 90 75
Side Mahmutlar 45 55 80 65
Side Okurcalar 45 55 80 65
Side Pamukkale 225 285 380 295
Side Side 45 55 80 65
Side Tekirova 95 115 160 125
Side Türkler 45 55 80 65
Tekirova Adrasan 60 70 85 80
Tekirova Alanya 100 130 180 140
Tekirova Antalya Airport 50 60 80 70
Tekirova Antalya Center 50 60 80 70
Tekirova Antalya Expo 55 65 85 75
Tekirova Avsallar 100 125 180 135
Tekirova Belek 75 95 125 105
Tekirova Boğazkent 80 100 130 110
Tekirova Çamyuva 50 60 80 70
Tekirova Çıralı 60 70 85 80
Tekirova Demirtaş 130 165 230 175
Tekirova Fethiye, Muğla 170 210 250 220
Tekirova Gazipasa Airport 130 165 230 175
Tekirova Gazipaşa Center 130 165 230 175
Tekirova Geyikbayırı 50 60 80 70
Tekirova Isparta Airport 150 210 280 220
Tekirova Kalkan 120 160 200 170
Tekirova Kaş 120 160 200 170
Tekirova Kemer 50 60 80 70
Tekirova Kepez Döşemealtı 50 60 80 70
Tekirova Kestel 110 130 180 140
Tekirova Kızılağaç 100 125 170 135
Tekirova Kızılot 100 125 170 135
Tekirova Konaklı 100 130 180 140
Tekirova Konyaaltı 50 60 80 70
Tekirova Kumluca 65 75 95 85
Tekirova Lara / Kundu 50 60 80 70
Tekirova Mahmutlar 110 130 180 140
Tekirova Okurcalar 100 125 180 135
Tekirova Pamukkale 180 230 300 240
Tekirova Side 95 115 160 125
Tekirova Tekirova 50 60 80 70
Tekirova Türkler 100 130 180 140
Türkler Adrasan 110 140 185 150
Türkler Alanya 25 30 60 40
Türkler Alanya Kalesi 60 70 80
Türkler Antalya Airport 50 70 100 80
Türkler Antalya Center 60 80 110 90
Türkler Antalya Expo 50 70 100 80
Türkler Avsallar 25 30 60 40
Türkler Belek 50 70 100 80
Türkler Boğazkent 50 70 100 80
Türkler Çamyuva 100 130 180 140
Türkler Çıralı 110 140 185 150
Türkler Demirtaş 50 55 75 65
Türkler Dim Çayı 50 80 110 90
Türkler Dim Mağarası 70 80 90
Türkler Fethiye, Muğla 220 280 350 290
Türkler Gazipasa Airport 50 55 75 65
Türkler Gazipaşa Center 50 55 75 65
Türkler Geyikbayırı 85 120 160 130
Türkler Isparta Airport 150 220 300 230
Türkler Kalkan 170 230 300 240
Türkler Kaş 170 230 300 240
Türkler Kemer 90 120 170 130
Türkler Kepez Döşemealtı 85 120 160 130
Türkler Kestel 25 30 60 40
Türkler Kızılağaç 45 50 70 60
Türkler Kızılot 45 50 70 60
Türkler Konaklı 25 30 60 40
Türkler Konyaaltı 60 80 110 90
Türkler Kumluca 115 145 195 155
Türkler Lara / Kundu 60 80 110 90
Türkler Mahmutlar 30 35 60 45
Türkler Okurcalar 35 40 60 50
Türkler Pamukkale 230 300 400 310
Türkler Sapadere Kanyonu 100 120 150 130
Türkler Side 45 55 80 65
Türkler Tekirova 100 130 180 140
Türkler Türkler 25 30 60 40
Üzümlü, Alanya/Antalya Antalya Airport 100 150 200 160
Üzümlü, Alanya/Antalya Gazipasa Airport 60 80 150 90
"""


def parse_raw_data(raw: str):
    lines = [line.strip() for line in raw.splitlines() if line.strip()]
    header = lines.pop(0)
    pattern = re.compile(r"^\d+$")
    entries = []
    for line in lines:
        pickup = None
        for name in PICKUP_NAMES:
            if line.startswith(name + " ") or line == name:
                pickup = name
                remainder = line[len(name):].strip()
                break
        if pickup is None:
            raise ValueError(f"Unknown pickup in line: {line}")
        parts = remainder.split()
        prices = []
        while parts and pattern.match(parts[-1]):
            prices.append(int(parts.pop()))
        prices.reverse()
        while len(prices) < 4:
            prices.append(None)
        destination = " ".join(parts).strip()
        entries.append(
            {
                "pickup": pickup,
                "destination": destination,
                "passenger_car": prices[0],
                "minibus": prices[1],
                "crafter": prices[2],
                "ultra_lux": prices[3],
            }
        )
    return entries


def main():
    data = parse_raw_data(RAW_DATA)
    Path("assets/data/prices.json").write_text(
        json.dumps(data, ensure_ascii=False, indent=2)
    )
    print(f"Generated {len(data)} price entries")


if __name__ == "__main__":
    main()
