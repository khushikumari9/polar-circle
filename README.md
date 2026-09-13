# Polar Circle

Build a modern, responsive React (or Angular) website called 

"Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal" 

with the following structure:

1. Homepage:

   - Hero banner with title and subtitle:

     "Discover India’s Polar Science – Real-time Data • Expedition Archives • Outreach"

   - Navigation bar with links: Home, Datasets, Visualization, Outreach, Education, Careers, Collaboration, News, Login/Signup.

   - Featured grid cards for datasets:

     • Antarctica (Maitri, Bharati)

     • Arctic (Himadri)

     • Himalaya (Himansh)

     • Southern Ocean

   - Footer with © 2026 NCPOR • Ministry of Earth Sciences.

2. Authentication:

   - Login/Signup page with role-based access:

     • Public User: browse outreach, education, basic datasets.

     • Researcher: after login, access advanced datasets, visualization tools, and submission forms.

     • Admin (NCPOR staff): dashboard for approving datasets, managing outreach content, careers, and collaborations.

3. Datasets Page:

   - Sections for each station (Maitri, Bharati, Himadri, Himansh, Southern Ocean).

   - Placeholder charts and tables for weather data.

   - Download buttons for CSV/JSON/NetCDF.

4. Visualization Page:

   - Interactive map placeholder (Leaflet.js).

   - Chart dashboard placeholders (Plotly/D3.js).

   - AI-powered search bar: "Ask for data in natural language".

5. Outreach Page:

   - Expedition diaries, photo gallery, video embeds.

   - Infographics section.

   - Social media integration placeholders.

6. Education Page:

   - Quizzes, learning modules, timelines.

   - Student-friendly articles and simplified explanations.

7. Careers Page:

   - Internship listings, dissertation projects, PhD/Post-doc programs.

   - Application form placeholder.

8. Collaboration Page:

   - MoUs, international partnerships.

   - Researcher directory placeholder.

   - Proposal submission form.

9. News Page:

   - Latest workshops, conferences, expedition updates.

   - Blog-style layout.

Design Guidelines:

- Clean, modern UI with blue/white polar theme.

- Responsive layout for desktop and mobile.

- Use React or Angular components for dynamic dashboards.

- Include placeholders for charts (Plotly/D3.js) and maps (Leaflet.js).

- Ensure all navigation links connect to their respective pages.

- Add role-based conditional rendering for Public, Researcher, and Admin views.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://polar-circle.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e4a251d7-383f-451d-8d86-b111d9c011f7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
