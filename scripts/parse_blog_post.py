import json
import sys
import re

with open('/tmp/api_response.json', 'r') as f:
    data = json.load(f)

with open('/tmp/datetime.txt', 'r') as f:
    datetime_str = f.read().strip()

if 'error' in data:
    print("API Error:", data['error'])
    sys.exit(1)

content = data['choices'][0]['message']['content'].strip()

# Strip markdown code fences if present
content = re.sub(r'^```json\s*', '', content)
content = re.sub(r'^```\s*', '', content)
content = re.sub(r'\s*```$', '', content)
content = content.strip()

post = json.loads(content)
post['date'] = datetime_str

filename = 'content/blog/' + post['slug'] + '.json'
with open(filename, 'w') as f:
    json.dump(post, f, indent=2)
print('Written: ' + filename)
