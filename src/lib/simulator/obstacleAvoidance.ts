export interface RangeReading {
  angle: number;
  distance: number;
}

export interface AvoidanceCommand {
  linear: number;
  angular: number;
  state: "clear" | "turning" | "reversing";
}

function relativeAngle(angle: number, heading: number) {
  return ((angle - heading + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
}

export function computeAvoidanceCommand(
  readings: RangeReading[],
  heading: number,
  cruiseSpeed: number
): AvoidanceCommand {
  let front = 5;
  let left = 5;
  let right = 5;

  for (const reading of readings) {
    const angle = relativeAngle(reading.angle, heading);
    if (Math.abs(angle) <= Math.PI / 4) front = Math.min(front, reading.distance);
    if (angle > 0 && angle <= Math.PI / 2) left = Math.min(left, reading.distance);
    if (angle < 0 && angle >= -Math.PI / 2) right = Math.min(right, reading.distance);
  }

  const turnDirection = left >= right ? 1 : -1;

  if (front < 0.42) {
    return { linear: -0.08, angular: turnDirection * 1.6, state: "reversing" };
  }
  if (front < 0.9) {
    return { linear: Math.min(cruiseSpeed * 0.3, 0.12), angular: turnDirection * 1.35, state: "turning" };
  }

  const sideBias = Math.max(-0.3, Math.min(0.3, (left - right) * 0.18));
  return { linear: cruiseSpeed, angular: sideBias, state: "clear" };
}
