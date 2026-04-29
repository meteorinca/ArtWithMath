// Spiral pattern definition
// Update this file anytime to change the pattern without touching the HTML

function setup() {
  createCanvas(900, 900);
  noLoop();
}

function draw() {
  background(20);

  translate(width / 2, height / 2);

  const R = 405;

  // outer circle
  noFill();
  stroke(255);
  strokeWeight(1.2);
  ellipse(0, 0, 2 * R);

  // clip dots to circle
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(0, 0, R - 1.5, 0, TWO_PI);
  drawingContext.clip();

  noStroke();
  fill(255);

  // ----------------------------
  // main controls
  // ----------------------------
  const K = 68;            // dots per ring
  const r0 = 0.0105;       // smallest normalized radius
  const growth = 0.053;    // exponential ring spacing
  const ringTwist = 0.132; // rotation per ring
  const tight = 10.85;     // arm winding amount
  const phase0 = 0.72;     // global rotation
  const arms = 2;          // two opposite bright arms

  for (let j = 0; ; j++) {
    const nr = r0 * Math.exp(growth * j);
    if (nr > 0.995) break;

    const r = nr * R;

    for (let k = 0; k < K; k++) {
      const theta = TWO_PI * k / K + j * ringTwist;

      // two-arm log-spiral phase
      const p = arms * theta + tight * Math.log(nr) + phase0;

      // arm intensity
      const wave = 0.5 + 0.5 * cos(p);

      // narrower arms toward the center
      const sharp = 1.7 + 1.4 * (1.0 - nr);
      const band = pow(wave, sharp);

      // dot size: small base everywhere + larger sizes on the bright arms
      const baseSize = 0.45 + 6.9 * pow(nr, 0.92);
      const armBoost = 20.8 * pow(nr, 1.06) * band;
      const d = baseSize + armBoost;

      const x = r * cos(theta);
      const y = r * sin(theta);

      // keep dot inside border
      if (r + d * 0.52 > R - 1.5) continue;

      ellipse(x, y, d);
    }
  }

  drawingContext.restore();

  // redraw circle border on top
  noFill();
  stroke(255);
  strokeWeight(1.2);
  ellipse(0, 0, 2 * R);
}
