const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

(async () => {
    const links = [
        { url: '/', changefreq: 'monthly', priority: 0.8 },
        { url: '/commands', changefreq: 'monthly', priority: 0.7 },
    ];

    const stream = new SitemapStream({
        hostname: 'https://serverinspector.vercel.app/',
    });

    // Pass the links to the stream
    for (let i = 0; i < links.length; i++) {
        stream.write(links[i]);
    }

    stream.end();

    // Wait until the stream ends and get the resulting string
    const sitemap = await streamToPromise(stream).then((data) =>
        data.toString(),
    );

    fs.writeFileSync('public/sitemap.xml', sitemap);
})();
