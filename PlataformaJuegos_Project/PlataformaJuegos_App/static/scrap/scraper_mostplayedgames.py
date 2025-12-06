from bs4 import BeautifulSoup
import requests
import csv
from pathlib import Path


csv_path = Path("top6_steamcharts.csv")

URL = "https://steamcharts.com/top"

resp = requests.get(URL, timeout=15)

soup = BeautifulSoup(resp.text, "lxml")


# Get main table
table = soup.find("table", {"class": "common-table"})
# Get rows (games)
rows = table.find_all("tr")


data = []
for i, row in enumerate(rows):
    if i >= 6:  # Just first 6 games
        break

    tds = row.find_all("td")
    if len(tds) < 3:
        continue

    # Ranking
    rank = tds[0].get_text(strip=True).strip(".")
    # Name of the game
    title_tag = tds[1].find("a")
    title = title_tag.get_text(strip=True) if title_tag else tds[1].get_text(strip=True)
    # Current players
    current_players = tds[2].get_text(strip=True)
    # Total hours played
    player_hours_tag = row.find("td", class_="player-hours")
    if player_hours_tag:
        player_hours = player_hours_tag.get_text(strip=True)
    else:
        player_hours = tds[-1].get_text(strip=True)

    # Clean string and convert to int
    def to_int(s):
        s = s.replace(",", "").replace(".", "").strip()
        try:
            return int(s)
        except:
            return s

    current_players = to_int(current_players)
    player_hours = to_int(player_hours)

    data.append({
        "rank": rank,
        "title": title,
        "current_players": current_players,
        "player_hours": player_hours
    })


# Save CSV on the specified path
with open(csv_path, "w", newline="", encoding="utf-8") as f:
    # Names of the columns
    writer = csv.DictWriter(f, fieldnames=["rank", "title", "current_players", "player_hours"])
    writer.writeheader()
    writer.writerows(data)
