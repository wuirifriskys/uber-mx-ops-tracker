#!/usr/bin/env python3
"""
Process raw review CSVs into JSON files for the Next.js frontend.
Uses only standard library modules.
"""

import csv
import json
import os
from collections import Counter, defaultdict
from datetime import datetime

# Paths
RAW_DIR = os.path.expanduser("~/Projects/uber-mx-ops-tracker/data/raw")
OUT_DIR = os.path.expanduser("~/Projects/uber-mx-ops-tracker/src/data")
os.makedirs(OUT_DIR, exist_ok=True)

# CSV files mapped to display names
APPS = {
    "uber_driver_reviews.csv": "Uber Driver",
    "didi_driver_reviews.csv": "DiDi Driver",
    "rappi_consumer_reviews.csv": "Rappi Consumer",
    "uber_eats_consumer_reviews.csv": "Uber Eats Consumer",
}

STOPWORDS = {
    "que", "no", "de", "la", "el", "en", "es", "un", "una", "los", "las",
    "por", "con", "para", "del", "al", "se", "lo", "ya", "más", "muy",
    "pero", "como", "está", "tiene", "han", "fue", "ser", "hay", "esto",
    "ese", "eso", "esta", "todo", "bien", "mal", "solo", "cada", "otra",
    "otro", "etc", "app", "aplicación", "uber", "didi", "rappi", "eats",
}


def load_reviews(filename):
    """Load a CSV and return list of dicts with parsed fields."""
    path = os.path.join(RAW_DIR, filename)
    reviews = []
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                score = int(row["score"])
            except (ValueError, KeyError):
                continue
            try:
                thumbs = int(row.get("thumbsUpCount", 0))
            except ValueError:
                thumbs = 0
            text = row.get("text", "")
            date_str = row.get("date", "")
            # Extract YYYY-MM for monthly grouping
            month = date_str[:7] if len(date_str) >= 7 else "unknown"
            reviews.append({
                "date": date_str,
                "score": score,
                "text": text,
                "thumbsUpCount": thumbs,
                "month": month,
            })
    return reviews


def extract_keywords(reviews_1star, top_n=15):
    """Extract top keywords from 1-star review texts."""
    counter = Counter()
    for r in reviews_1star:
        text = r["text"].lower()
        # Remove basic punctuation
        for ch in ".,;:!?¡¿()\"'…—-/\\@#$%^&*[]{}|<>~`_+=0123456789":
            text = text.replace(ch, " ")
        words = text.split()
        for w in words:
            w = w.strip()
            if len(w) >= 4 and w not in STOPWORDS:
                counter[w] += 1
    return [{"word": w, "count": c} for w, c in counter.most_common(top_n)]


def featured_review(reviews_1star):
    """Find the 1-star review with highest thumbsUpCount."""
    if not reviews_1star:
        return None
    best = max(reviews_1star, key=lambda r: r["thumbsUpCount"])
    text = best["text"]
    if len(text) > 200:
        text = text[:197] + "..."
    return {
        "text": text,
        "thumbsUpCount": best["thumbsUpCount"],
        "date": best["date"],
        "score": best["score"],
    }


def build_review_sentiment():
    """Build review_sentiment.json."""
    result = {}
    for filename, display_name in APPS.items():
        reviews = load_reviews(filename)
        total = len(reviews)
        if total == 0:
            continue

        # Monthly aggregation
        monthly_data = defaultdict(lambda: {"total_score": 0, "count": 0})
        for r in reviews:
            m = r["month"]
            monthly_data[m]["total_score"] += r["score"]
            monthly_data[m]["count"] += 1

        monthly = []
        for month in sorted(monthly_data.keys()):
            d = monthly_data[month]
            monthly.append({
                "month": month,
                "avg": round(d["total_score"] / d["count"], 2),
                "count": d["count"],
            })

        scores = [r["score"] for r in reviews]
        overall_avg = round(sum(scores) / len(scores), 2)
        one_star_pct = round(scores.count(1) / len(scores) * 100, 1)
        five_star_pct = round(scores.count(5) / len(scores) * 100, 1)

        reviews_1star = [r for r in reviews if r["score"] == 1]

        result[display_name] = {
            "monthly": monthly,
            "overall_avg": overall_avg,
            "one_star_pct": one_star_pct,
            "five_star_pct": five_star_pct,
            "top_keywords_1star": extract_keywords(reviews_1star),
            "featured_review": featured_review(reviews_1star),
        }

    return result


def build_competitive(sentiment_data):
    """Build competitive.json from already-computed sentiment data."""
    result = []
    for filename, display_name in APPS.items():
        reviews = load_reviews(filename)
        if not reviews:
            continue
        dates = [r["date"] for r in reviews if r["date"]]
        dates_sorted = sorted(dates)
        if dates_sorted:
            start = datetime.strptime(dates_sorted[0][:10], "%Y-%m-%d")
            end = datetime.strptime(dates_sorted[-1][:10], "%Y-%m-%d")
            date_range = f"{start.strftime('%b %Y')} – {end.strftime('%b %Y')}"
        else:
            date_range = "Unknown"

        s = sentiment_data.get(display_name, {})
        result.append({
            "platform": display_name,
            "avg_rating": s.get("overall_avg", 0),
            "one_star_pct": s.get("one_star_pct", 0),
            "five_star_pct": s.get("five_star_pct", 0),
            "review_count": len(reviews),
            "date_range": date_range,
        })
    return result


def build_calculator_params():
    """Build calculator_params.json with hardcoded regulatory rates."""
    return {
        "isr": {"with_rfc": 0.025, "without_rfc": 0.20},
        "exclusion_rates": {"car": 0.48, "motorcycle": 0.32, "bicycle": 0.03},
        "income_thresholds_mxn": {"car": 18427, "motorcycle": 14092, "bicycle": 9878},
        "imss_worker_contribution": 0.025,
        "infonavit_employer": 0.05,
        "weeks_per_month": 4.33,
        "min_wage_daily_2026": 315.04,
        "min_wage_monthly_2026": 9451,
    }


def build_reform_timeline():
    """Build reform_timeline.json with key dates and stats."""
    return {
        "decree_published": "2024-12-24",
        "effective_date": "2025-06-22",
        "pilot_start": "2025-07-01",
        "pilot_end": "2025-12-31",
        "enforcement_start": "2026-01-01",
        "sat_realtime_mandate": "2026-04-01",
        "total_registered": 1349855,
        "qualifying_full_benefits_jan2026": 139000,
        "qualifying_pct": 10.3,
        "pilot_progression": [
            {"month": "Jul 2025", "qualifying": 132841},
            {"month": "Aug 2025", "qualifying": 133178},
            {"month": "Sep 2025", "qualifying": 125757},
            {"month": "Oct 2025", "qualifying": 150123},
            {"month": "Nov 2025", "qualifying": 164205},
            {"month": "Dec 2025", "qualifying": 206521},
            {"month": "Jan 2026", "qualifying": 139000},
        ],
    }


def build_profeco():
    """Build profeco.json with summary complaint data."""
    return {
        "platforms": [
            {"name": "Rappi", "total": 1663, "top_issue": "Non-delivery (35.7%)", "trend": "Peaked 2022, declining"},
            {"name": "Uber", "total": 201, "top_issue": "Non-delivery + billing errors", "trend": "Growing slowly"},
            {"name": "DiDi", "total": 166, "top_issue": "Billing errors + fraud (7.2%)", "trend": "9x growth since 2019"},
        ],
        "total_complaints_in_dataset": 554655,
        "date_range": "2019 – Jan 2026",
    }


def write_json(data, filename):
    """Write data to a JSON file."""
    path = os.path.join(OUT_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    return path


def main():
    print("=" * 60)
    print("Processing review CSVs into JSON for Next.js frontend")
    print("=" * 60)

    # 1. Review sentiment
    sentiment = build_review_sentiment()
    p = write_json(sentiment, "review_sentiment.json")
    print(f"\n[1] review_sentiment.json -> {p}")
    for app, data in sentiment.items():
        months = len(data["monthly"])
        print(f"    {app}: {months} months, avg={data['overall_avg']}, "
              f"1-star={data['one_star_pct']}%, 5-star={data['five_star_pct']}%")

    # 2. Calculator params
    params = build_calculator_params()
    p = write_json(params, "calculator_params.json")
    print(f"\n[2] calculator_params.json -> {p}")
    print(f"    ISR with RFC: {params['isr']['with_rfc']}, without: {params['isr']['without_rfc']}")

    # 3. Competitive
    competitive = build_competitive(sentiment)
    p = write_json(competitive, "competitive.json")
    print(f"\n[3] competitive.json -> {p}")
    for c in competitive:
        print(f"    {c['platform']}: avg={c['avg_rating']}, reviews={c['review_count']}, range={c['date_range']}")

    # 4. Reform timeline
    timeline = build_reform_timeline()
    p = write_json(timeline, "reform_timeline.json")
    print(f"\n[4] reform_timeline.json -> {p}")
    print(f"    Total registered: {timeline['total_registered']:,}, "
          f"qualifying: {timeline['qualifying_full_benefits_jan2026']:,} ({timeline['qualifying_pct']}%)")

    # 5. Profeco
    profeco = build_profeco()
    p = write_json(profeco, "profeco.json")
    print(f"\n[5] profeco.json -> {p}")
    for plat in profeco["platforms"]:
        print(f"    {plat['name']}: {plat['total']} complaints, top issue: {plat['top_issue']}")

    print(f"\n{'=' * 60}")
    print(f"Done. 5 JSON files written to {OUT_DIR}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
