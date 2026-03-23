# Birklehof Spendenbarometer

This is a digital donation tracker for new chairs in the Musikhaus of Birklehof.

For more details see https://www.birklehof.de/stuehle/.

## Development

The site is a basic Svelte app which uses the Vercel Edge API as Backend for the chair count.

```bash
npm run dev
npm run lint -- --fix
```

## Deployment

The page is deployed on Vercel and embedded on the wordpress under https://www.birklehof.de/stuehle/

The code for the embed of the page itself:

```html
<div class="container">
<iframe class="responsive-iframe" src="https://spendenbarometer-stuehle-musikhaus-alpha.vercel.app/" width="660" height="310"></iframe>
</div>
```

The code for the embed of the progress bar, fetching the chair count from the Vercel API:

```html
<h4 class="availible-text" id="availible-text">
Noch 
<span id="chairs-count">…</span>
von 220 Stühlen verfügbar!
</h4>
<div class="progress-wrapper">
  <div class="progress-bar" id="chairs-progress"></div>
</div>


<style>
    .availible-text {
        margin-top: 20px;
        line-height: 1.5;
    }
    
    .progress-wrapper {
        width: 100%;
        background: #eee;
        height: 20px;
        border-radius: 10px;
        overflow: hidden;
        margin-top: 20px;
    }
    
    .progress-bar {
        height: 100%;
        width: 0%;
        background: #004e47;
        transition: width 1s ease;
    }
</style>


<script>
  async function loadChairsCount() {
    const url = "https://edge-config.vercel.com/ecfg_bbejt4si5y3sxmf4tjntfyt0scdb/item/chairs?token=13772412-7a1b-4109-8f60-a41d39475766";
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      let value = data;

      document.getElementById("chairs-count").textContent = Math.max(0, 220 - value);
      if (value >= 220) {
        document.getElementById("availible-text").textContent = "Wir haben 220 Stühle erreicht. Vielen Dank!";
      }

      // Progress bar logic
      const maxValue = 220;
      const percent = Math.min((value / maxValue) * 100, 100);

      document.getElementById("chairs-progress").style.width = percent + "%";

    } catch (err) {
      console.error("Error fetching chairs count:", err);
      document.getElementById("chairs-count").textContent = "Error loading number";
    }
  }

  loadChairsCount();
</script>
```

![Screenshot of the wordpress embed](screenshot.png)