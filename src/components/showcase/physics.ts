// Damped Spring Simulation (pure physics, zero external dependencies)
export interface SpringConfig {
  from?: number;
  to?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  restDelta?: number;
}

export interface SpringController {
  start: (callbacks: {
    update: (value: number) => void;
    complete?: () => void;
  }) => { stop: () => void };
}

export function createSpring({
  from = 0,
  to = 1,
  stiffness = 300,
  damping = 30,
  mass = 1,
  restDelta = 0.001,
}: SpringConfig = {}): SpringController {
  let current = from;
  let velocity = 0;
  let rafId: number | null = null;
  let isRunning = true;

  return {
    start({ update, complete }) {
      let lastTime = performance.now();

      function step(now: number) {
        if (!isRunning) return;
        const dt = Math.min((now - lastTime) / 1000, 0.064);
        lastTime = now;

        const force = -stiffness * (current - to);
        const dampingForce = -damping * velocity;
        const acceleration = (force + dampingForce) / mass;

        velocity += acceleration * dt;
        current += velocity * dt;

        if (
          Math.abs(current - to) < restDelta &&
          Math.abs(velocity) < restDelta
        ) {
          current = to;
          update(current);
          if (complete) complete();
          return;
        }

        update(current);
        rafId = requestAnimationFrame(step);
      }

      rafId = requestAnimationFrame(step);

      return {
        stop: () => {
          isRunning = false;
          if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        },
      };
    },
  };
}

// Multi-value Interpolator with Lerp Snapping
export interface ReachConfig<T extends Record<string, number>> {
  from: T;
  to: T;
  restDelta?: number;
  speed?: number;
}

export interface ReachController<T extends Record<string, number>> {
  start: (callbacks: {
    update: (value: T) => void;
    complete?: (value: T) => void;
  }) => { stop: () => void };
}

export function reach<T extends Record<string, number>>({
  from,
  to,
  restDelta = 0.001,
  speed = 0.12,
}: ReachConfig<T>): ReachController<T> {
  const current: T = { ...from };
  const keys = Object.keys(from) as (keyof T)[];
  let activeKeys = [...keys];
  let rafId: number | null = null;
  let isRunning = true;

  return {
    start({ update, complete }) {
      function loop() {
        if (!isRunning) return;
        for (let i = activeKeys.length - 1; i >= 0; i--) {
          const k = activeKeys[i];
          const targetVal = to[k];
          const curVal = current[k];
          const val = curVal + (targetVal - curVal) * speed;

          if (Math.abs(targetVal - val) < restDelta) {
            current[k] = targetVal;
            activeKeys.splice(i, 1);
          } else {
            current[k] = val as T[keyof T];
          }
        }

        update({ ...current });

        if (activeKeys.length === 0) {
          if (complete) complete({ ...current });
        } else {
          rafId = requestAnimationFrame(loop);
        }
      }

      rafId = requestAnimationFrame(loop);

      return {
        stop: () => {
          isRunning = false;
          if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        },
      };
    },
  };
}
