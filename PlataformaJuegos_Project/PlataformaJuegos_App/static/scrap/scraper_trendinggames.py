from bs4 import BeautifulSoup
import requests
import csv
from pathlib import Path


csv_path = Path("trending_games.csv")

URL = "https://42matters.com/most-popular-mobile-games-spain"

resp = requests.get(URL, timeout=15)

soup = BeautifulSoup(resp.text, "lxml")

# Get main list
table = soup.find("ul", {"class": "subpage-block-list m-0"})
# Get rows (games)
rows = table.find_all("li")

data = []
for i, row in enumerate(rows):
    if i >= 4:  # Just first 4 games
        break

    # Ranking
    rank_tag = row.find("div", {"class": "subpage-block-item-counter"})
    rank = rank_tag.get_text(strip=True).strip(".") if rank_tag else ""

    # Name of the game
    title_tag = row.find("div", {"class": "subpage-block-item-title fw-600"})
    title = title_tag.get_text(strip=True) if title_tag else row.get_text(strip=True)

    # Picture
    img_tag = row.find("img")
    game_pic = img_tag["src"] if img_tag else ""

    data.append({
        "rank": rank,
        "title": title,
        "picture": game_pic
    })

# Save CSV on the specified path
with open(csv_path, "w", newline="", encoding="utf-8") as f:
    # Names of the columns
    writer = csv.DictWriter(f, fieldnames=["rank", "title", "picture"])
    writer.writeheader()
    writer.writerows(data)
