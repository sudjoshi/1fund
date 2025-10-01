# Predictra Markets

A modern, minimalist website for Predictra Markets - a quantitative trading firm specializing in sports betting markets.

## Features

- **Animated Background**: Interactive graph nodes with connecting lines
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, minimalist design with smooth animations
- **Professional Content**: Complete sections for company info, team, blog, and careers

## Live Demo

Visit the live site: [https://yourusername.github.io/PyBet](https://yourusername.github.io/PyBet)

## Setup for GitHub Pages

### Option 1: Repository Method (Recommended)

1. **Create a new repository** on GitHub:
   - Go to [GitHub](https://github.com) and click "New repository"
   - Name it `PyBet` (or any name you prefer)
   - Make it **Public** (required for free GitHub Pages)
   - Don't initialize with README (we already have files)

2. **Upload your files**:
   ```bash
   # Navigate to your project folder
   cd /Users/s.joshi/PyBet
   
   # Initialize git repository
   git init
   
   # Add all files
   git add .
   
   # Commit files
   git commit -m "Initial commit: Predictra Markets website"
   
   # Add your GitHub repository as remote
   git remote add origin https://github.com/YOURUSERNAME/PyBet.git
   
   # Push to GitHub
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **Deploy from a branch**
   - Select **main** branch and **/ (root)** folder
   - Click **Save**

4. **Access your site**:
   - Your site will be available at: `https://YOURUSERNAME.github.io/PyBet`
   - It may take a few minutes to deploy

### Option 2: User/Organization Pages

If you want the site at `https://YOURUSERNAME.github.io` (without the repository name):

1. Create a repository named exactly `YOURUSERNAME.github.io`
2. Upload the files to this repository
3. Enable GitHub Pages (same steps as above)
4. Your site will be at `https://YOURUSERNAME.github.io`

## File Structure

```
PyBet/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript for animations
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Customization

### Changing the Company Name
To change from "Predictra Markets" to your company name:
1. Edit `index.html` - search for "PREDICTRA MARKETS" and replace
2. Edit `index.html` - search for "Predictra Markets" and replace
3. Edit `styles.css` - update any company-specific styling

### Updating Content
- **Company Info**: Edit the Who We Are section in `index.html`
- **Stats**: Change the statistics in the stats grid
- **Styling**: Modify colors and fonts in `styles.css`

### Styling
- **Colors**: Modify the color scheme in `styles.css`
- **Fonts**: Change fonts by updating the Google Fonts link in `index.html`
- **Animation**: Adjust animation parameters in `script.js`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance

The website is optimized for performance with:
- Efficient canvas animations
- Responsive images
- Minimal dependencies
- Fast loading times

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues:
1. Check that all files are uploaded correctly
2. Ensure GitHub Pages is enabled in repository settings
3. Wait a few minutes for deployment to complete
4. Check the repository's Actions tab for any deployment errors

---

**Note**: Replace `YOURUSERNAME` with your actual GitHub username in all the URLs above.
