# Certificate images

Drop your certificate images here (e.g. `fullstack.png`, `aws-kms.jpg`).

Then in `backend/data/certifications.json`, set `imageUrl` for each certification:

- **Local image:** `"/certificates/your-file.png"` (path from the frontend’s `public` folder)
- **External URL:** use the full URL, e.g. `"https://example.com/badge.png"`

Optional: set `credentialUrl` to the official verification or credential page so “View credential / verify” opens that link.
