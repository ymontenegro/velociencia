import { db } from "./index";
import { rssFeeds } from "./schema";

const defaultFeeds = [
  // General Cycling News
  { name: "CyclingNews", url: "https://www.cyclingnews.com/rss", section: "general" as const },
  { name: "VeloNews", url: "https://www.velonews.com/feed/", section: "general" as const },
  { name: "road.cc", url: "https://road.cc/rss", section: "general" as const },
  { name: "BikeRadar", url: "https://www.bikeradar.com/feed", section: "general" as const },

  // Training-focused
  { name: "TrainerRoad Blog", url: "https://www.trainerroad.com/blog/feed/", section: "entrenamiento" as const },
  { name: "TrainingPeaks Blog", url: "https://www.trainingpeaks.com/blog/feed/", section: "entrenamiento" as const },
  { name: "CyclingTips", url: "https://cyclingtips.com/feed/", section: "entrenamiento" as const },

  // Science / Nutrition
  { name: "BJSM Blog", url: "https://blogs.bmj.com/bjsm/feed/", section: "ciencia" as const },
  { name: "MySportScience", url: "https://www.mysportscience.com/feed", section: "nutricion" as const },
];

export function seedDatabase() {
  console.log("Seeding RSS feeds...");
  for (const feed of defaultFeeds) {
    try {
      db.insert(rssFeeds)
        .values({
          name: feed.name,
          url: feed.url,
          section: feed.section,
        })
        .onConflictDoNothing()
        .run();
      console.log(`  ✓ ${feed.name}`);
    } catch {
      console.log(`  - ${feed.name} (already exists)`);
    }
  }
  console.log("Seed complete.");
}
