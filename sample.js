// Spiral pattern core – edit only the constants and the drawing logic.
// This function draws the spiral centered at (0,0) with an extra rotation (radians).
function drawSpiral(extraRotation) {
  const R = 405;

  // outer circle border (will be drawn after clipping, but we handle border later)
  // we draw border twice? To simplify, we only draw border at the end in the main sketch.
  // But to keep compatibility, we'll draw the border inside this function if needed.
  // However clipping removes the outer edge, so we draw border after clip restore.
  // We'll let the main sketch handle border to avoid double drawing.
  // For now, draw only dots.

  // Translate already done in main sketch, we assume (0,0) is center.

  // Save context for clipping
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(0, 0, R - 1.5, 0, TWO_PI);
  drawingContext.clip();

  noStroke();
  fill(255);

  // ---------- main controls (customize here) ----------
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
      let theta = TWO_PI * k / K + j * ringTwist;

      // Apply extra rotation to the whole pattern
      theta += extraRotation;

      // two-arm log-spiral phase
      const p = arms * theta + tight * Math.log(nr) + phase0;

      // arm intensity
      const wave = 0.5 + 0.5 * cos(p);
      const sharp = 1.7 + 1.4 * (1.0 - nr);
      const band = pow(wave, sharp);

      // dot size
      const baseSize = 0.45 + 6.9 * pow(nr, 0.92);
      const armBoost = 20.8 * pow(nr, 1.06) * band;
      const d = baseSize + armBoost;

      const x = r * cos(theta);
      const y = r * sin(theta);

      if (r + d * 0.52 > R - 1.5) continue;

      ellipse(x, y, d);
    }
  }

  drawingContext.restore();

  // Redraw outer circle border (no fill)
  noFill();
  stroke(255);
  strokeWeight(1.2);
  ellipse(0, 0, 2 * R);
}