import json
import os
import re
import sys
import urllib.request

topic = os.environ['TOPIC']
app = os.environ['APP']
play_link = os.environ['PLAY_LINK']
keyword = os.environ['KEYWORD']
secondary = os.environ['SECONDARY']
date = os.environ['POST_DATE']
datetime_str = os.environ['POST_DATETIME']
api_key = os.environ['OPENROUTER_API_KEY']
app_slug = os.environ.get('APP_SLUG', '')
# Exam topics also link the free web mock test, so readers can try it straight away.
extra = (
    f"\n6. This is a search-question post: answer the question in the first paragraph, use facts only from official sources, "
    f"and link the free mock test at https://ofbuilder.com/{app_slug}/mock-test/ and the guide at https://ofbuilder.com/{app_slug}/guide/."
    if app_slug else ""
)

prompt = f"""You are a blog writer for OfBuilder — an indie app studio based in Sylhet, Bangladesh that builds AI-powered Flutter apps.

WRITER PERSONA:
Write as the founder — a real developer sharing genuine insights. First-person (I, we). Conversational but knowledgeable. Like a developer's personal blog, not a corporate press release. Think: levels.io, pieter levels, indie hackers tone.

THIS WEEK'S POST:
Topic: {topic}
App focus: {app}
Play Store link: {play_link}
Target keyword: {keyword}
Secondary keywords: {secondary}
Date: {date}

STRICT RULES:
1. HUMAN TONE — avoid: "In today's fast-paced world", "We are excited to announce", "Discover the amazing features", "Transforming your experience". Use short sentences and clear, practical advice.
2. FACTS ONLY — never invent statistics, download counts, ratings, user numbers, countries, quotes, testimonials, family members or personal anecdotes. Never invent app features: only describe what the topic and keywords make clear. If you are not sure a fact is true, leave it out. Exam facts (question counts, pass marks, fees) must match official sources; if unsure, tell readers to check the official website.
3. Word count: 600-900 words.
4. Do NOT use: journey, game-changer, revolutionary, seamless, robust, leverage.
5. Include the Play Store link and https://ofbuilder.com as backlinks naturally in the text.{extra}

STRUCTURE:
- Hook (2-3 sentences): the reader's problem or question — not generic, no invented stories
- The answer or main idea (1-2 paragraphs): practical and accurate
- Practical tips (H2 section): 3-5 tips in plain English, 1-2 sentences each
- How the app helps (1 short paragraph): only features you are sure of; no numbers, ratings or download counts
- Play Store CTA: natural sentence linking to Play Store URL and mentioning ofbuilder.com
- Closing (2-3 sentences): a helpful takeaway

OUTPUT FORMAT — Return ONLY a valid JSON object with these exact fields:
{{
  "slug": "url-slug-keyword-{date}",
  "title": "SEO title 50-60 chars with primary keyword",
  "description": "Meta description 150-160 chars with keyword and CTA",
  "excerpt": "One sentence summary of the post",
  "category": "App Update or Studio News or Dev Tips or AI News",
  "tags": ["tag1", "tag2", "tag3"],
  "body": "Full markdown blog post (no frontmatter, start with # H1, include H2 subheadings and paragraphs)"
}}

No text outside the JSON object. Body must be full markdown with H1, H2 subheadings, and paragraphs. Word count 600-900 words."""

payload = json.dumps({
    "model": "openai/gpt-4o-mini",
    "messages": [{"role": "user", "content": prompt}]
}).encode("utf-8")

req = urllib.request.Request(
    "https://openrouter.ai/api/v1/chat/completions",
    data=payload,
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ofbuilder.com",
        "X-Title": "OfBuilder Blog",
    },
)

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode("utf-8"))

if "error" in data:
    print("API Error:", data["error"])
    sys.exit(1)

content = data["choices"][0]["message"]["content"].strip()

# Strip markdown code fences if present
content = re.sub(r"^```json\s*", "", content, flags=re.MULTILINE)
content = re.sub(r"^```\s*", "", content, flags=re.MULTILINE)
content = re.sub(r"\s*```$", "", content, flags=re.MULTILINE)
content = content.strip()

post = json.loads(content)
post["date"] = datetime_str
post.setdefault("description", post.get("excerpt", ""))
post.setdefault("tags", [])
if app_slug:
    post["app"] = app_slug

filename = "content/blog/" + post["slug"] + ".json"
with open(filename, "w", encoding="utf-8") as f:
    json.dump(post, f, indent=2, ensure_ascii=False)
print("Written: " + filename)
