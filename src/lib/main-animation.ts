/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
export function initMainAnimation() {
    const c = document.createElement('canvas');
    document.body.appendChild(c);
    const style = c.style;
    style.width = '100%';
    style.position = 'absolute';
    style.zIndex = "-1";
    style.top = "0";
    style.left = "0";
    const ctx = c.getContext('2d');
    let x0: number, y0: number, w: number, h: number, dw: number;

    function init() {
        w = window.innerWidth;
        h = window.innerHeight;
        c.width = w;
        c.height = h;
        let offset = h > 380 ? 100 : 65;
        offset = h > 800 ? 116 : offset;
        x0 = w / 2;
        y0 = h - offset;
        dw = Math.max(w, h, 1000) / 13;
        drawCircles();
    }
    window.onresize = init;

    function drawCircle(radius: number) {
        ctx!.beginPath();
        const color = Math.round(255 * (1 - radius / Math.max(w, h)));
        ctx!.strokeStyle = 'rgba(' + color + ',' + color + ',' + color + ',0.1)';
        ctx!.arc(x0, y0, radius, 0, 2 * Math.PI);
        ctx!.stroke();
        ctx!.lineWidth = 2;
    }

    let step = 0;

    function drawCircles() {
        ctx!.clearRect(0, 0, w, h);
        for (let i = 0; i < 8; i++) {
            drawCircle(dw * i + step % dw);
        }
        step += 1;
    }

    let loading = true;

    function animate() {
        if (loading || step % dw < dw - 5) {
            requestAnimationFrame(function () {
                drawCircles();
                animate();
            });
        }
    }
    (window as any).animateBackground = function (l: boolean) {
        loading = l;
        animate();
    };
    init();
    animate();
}