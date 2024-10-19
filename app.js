const chars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzc".split("");

document.getElementById('upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (ev) {
        img.src = ev.target.result;
    };

    img.onload = function () {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        const w = 100;
        const h = (img.height / img.width) * w;
        canvas.width = w;
        canvas.height = h;

        ctx.drawImage(img, 0, 0, w, h);

        const data = ctx.getImageData(0, 0, w, h);
        const pxls = data.data;
        let ascii = '';

        for (let i = 0; i < pxls.length; i += 4) {
            const r = pxls[i];
            const g = pxls[i + 1];
            const b = pxls[i + 2];
            const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
            const idx = Math.floor((brightness / 255) * (chars.length - 1));
            ascii += chars[idx];
            if ((i / 4 + 1) % w === 0) {
                ascii += '\n';
            }
        }

        document.getElementById('out').textContent = ascii;
    };

    reader.readAsDataURL(file);
});
