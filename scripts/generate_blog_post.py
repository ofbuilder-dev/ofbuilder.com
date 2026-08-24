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
1. HUMAN TONE — avoid: "In today's fast-paced world", "We are excited to announce", "Discover the amazing features", "Transforming your experience". Use short sentences and real thoughts. Start with a specific story or problem. Include one honest struggle. Mention real numbers.
2. Word count: 600-900 words exactly.
3. Do NOT use: journey, game-changer, revolutionary, seamless, robust, leverage.
4. Include the Play Store link and https://ofbuilder.com as backlinks naturally in the text.

STRUCTURE:
- Hook (2-3 sentences): specific problem, story, or surprising fact — not generic
- The Problem (1 paragraph): what the app solves and why it exists
- The Build / Story (1-2 paragraphs): how it was built, one real challenge, one honest admission
- Key Features (H2 section): 3-4 features in plain English, 1-2 sentences each — not a bullet dump
- Real Numbers / Proof (1 paragraph): downloads, countries, user feedback — be honest, small numbers are fine
- Play Store CTA: natural sentence linking to Play Store URL and mentioning ofbuilder.com
- Closing (2-3 sentences): what is next for the app, one human thought

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

filename = "content/blog/" + post["slug"] + ".json"
with open(filename, "w", encoding="utf-8") as f:
    json.dump(post, f, indent=2, ensure_ascii=False)
print("Written: " + filename)
