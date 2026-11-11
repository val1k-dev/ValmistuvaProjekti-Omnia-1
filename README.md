# ValmistuvaProjekti-Omnia-1

Project install guide

1. Clone repository from `https://github.com/val1k-dev/ValmistuvaProjekti-Omnia-1.git`
2. Go into directory and run `npm install`
3. After installation open `db.json.example` and copy all content.
4. Create new file named `db.json` and insert here copied content.
5. Run `npm run server` command and wait until JSON Server starts.
6. Open `index.html` with `Live Server` or `Open server` or `XAMPP` or any other application.
7. Use and enjoy the website!

!!! IMPORTANT !!!
If you encounter problems with website:

1. Check if the JSON Server really works and port 7777 is free.
2. If port 7777 is taken and you can't use it, open file api.js and change port in `export const API = "http://localhost:7777"`
3. If you stil getting errors, check developer console and send error here `https://github.com/val1k-dev/ValmistuvaProjekti-Omnia-1/issues`.
