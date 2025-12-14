// ============================================================
// PRESETS - Примеры градиентов
// ============================================================

const PRESETS = {
  "arctic-aurora": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "70% 80%",
        colorStops: [
          { color: "#00ff88", position: 0, opacity: 50 },
          { color: "#00cc66", position: 50, opacity: 30 },
          { color: "#00cc66", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "30% 20%",
        colorStops: [
          { color: "#00d4ff", position: 0, opacity: 60 },
          { color: "#0099cc", position: 50, opacity: 40 },
          { color: "#0099cc", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "linear-gradient",
        angle: 180,
        colorStops: [
          { color: "#0c0c0c", position: 0, opacity: 100 },
          { color: "#1a1a2e", position: 50, opacity: 100 },
          { color: "#16213e", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "cosmic-nebula": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "60% 70%",
        colorStops: [
          { color: "#dc2626", position: 0, opacity: 80 },
          { color: "#ef4444", position: 40, opacity: 60 },
          { color: "#f87171", position: 100, opacity: 20 },
        ],
        blendMode: "multiply",
      },
      {
        type: "radial-gradient",
        position: "40% 30%",
        colorStops: [
          { color: "#4c1d95", position: 0, opacity: 100 },
          { color: "#7c3aed", position: 30, opacity: 100 },
          { color: "#a855f7", position: 60, opacity: 100 },
          { color: "#c084fc", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "lava-flow": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "30% 70%",
        colorStops: [
          { color: "#ffedd5", position: 0, opacity: 60 },
          { color: "#fed7aa", position: 50, opacity: 30 },
          { color: "#fdba74", position: 100, opacity: 0 },
        ],
        blendMode: "overlay",
      },
      {
        type: "linear-gradient",
        angle: 45,
        colorStops: [
          { color: "#7f1d1d", position: 0, opacity: 100 },
          { color: "#dc2626", position: 20, opacity: 100 },
          { color: "#ea580c", position: 40, opacity: 100 },
          { color: "#f97316", position: 60, opacity: 100 },
          { color: "#fb923c", position: 80, opacity: 100 },
          { color: "#fdba74", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "royal-purple": {
    shape: "rectangle",
    layers: [
      {
        type: "linear-gradient",
        angle: 135,
        colorStops: [
          { color: "#2d1b69", position: 0, opacity: 100 },
          { color: "#4338ca", position: 25, opacity: 100 },
          { color: "#6366f1", position: 50, opacity: 100 },
          { color: "#8b5cf6", position: 75, opacity: 100 },
          { color: "#a855f7", position: 100, opacity: 100 },
        ],
      },
      {
        type: "radial-gradient",
        position: "20% 80%",
        colorStops: [
          { color: "#fbbf24", position: 0, opacity: 50 },
          { color: "#f59e0b", position: 50, opacity: 25 },
          { color: "#d97706", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
    ],
  },
  chip: {
    shape: "circle",
    layers: [
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 50, opacity: 0 },
          { color: "#686a6a", position: 50, opacity: 100 },
          { color: "#686a6a", position: 54, opacity: 100 },
          { color: "transparent", position: 54, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "#3a5bc9", position: 0, opacity: 100 },
          { color: "#3a5bc9", position: 54, opacity: 100 },
          { color: "transparent", position: 54, opacity: 0 },
        ],
      },
      {
        type: "repeating-conic-gradient",
        angle: 10,
        position: "center",
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 100 },
          { color: "#ffffff", position: 20, opacity: 100 },
          { color: "transparent", position: 20, opacity: 0 },
          { color: "transparent", position: 40, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "30% 30%",
        colorStops: [
          { color: "#4972fb", position: 0, opacity: 100 },
          { color: "#4972fb", position: 30, opacity: 100 },
          { color: "#4972fb", position: 60, opacity: 100 },
          { color: "#4972fb", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "nebula-core": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "70% 30%",
        colorStops: [
          { color: "#dc2626", position: 0, opacity: 80 },
          { color: "#ea580c", position: 30, opacity: 70 },
          { color: "#f59e0b", position: 60, opacity: 60 },
          { color: "#fbbf24", position: 90, opacity: 50 },
          { color: "#fde047", position: 100, opacity: 40 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "40% 60%",
        colorStops: [
          { color: "#4c1d95", position: 0, opacity: 100 },
          { color: "#5b21b6", position: 30, opacity: 100 },
          { color: "#7c3aed", position: 60, opacity: 100 },
          { color: "#8b5cf6", position: 90, opacity: 100 },
          { color: "#a78bfa", position: 100, opacity: 100 },
        ],
      },
      {
        type: "conic-gradient",
        angle: 90,
        position: "50% 50%",
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 60 },
          { color: "#f8fafc", position: 20, opacity: 50 },
          { color: "#f1f5f9", position: 40, opacity: 40 },
          { color: "#e2e8f0", position: 60, opacity: 30 },
          { color: "#cbd5e1", position: 80, opacity: 20 },
          { color: "#ffffff", position: 100, opacity: 60 },
        ],
        blendMode: "overlay",
      },
      {
        type: "repeating-radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "transparent", position: 40, opacity: 0 },
          { color: "#ffffff", position: 40, opacity: 25 },
          { color: "#ffffff", position: 60, opacity: 25 },
          { color: "transparent", position: 60, opacity: 0 },
          { color: "transparent", position: 100, opacity: 0 },
        ],
        blendMode: "overlay",
      },
    ],
  },
  watercolour: {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "20% 20%",
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 100 },
          { color: "#f8fafc", position: 30, opacity: 80 },
          { color: "#f1f5f9", position: 60, opacity: 60 },
          { color: "#e2e8f0", position: 100, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "80% 40%",
        colorStops: [
          { color: "#fbbf24", position: 0, opacity: 90 },
          { color: "#f59e0b", position: 40, opacity: 70 },
          { color: "#d97706", position: 80, opacity: 50 },
          { color: "#b45309", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "60% 80%",
        colorStops: [
          { color: "#3b82f6", position: 0, opacity: 80 },
          { color: "#2563eb", position: 40, opacity: 60 },
          { color: "#1d4ed8", position: 80, opacity: 40 },
          { color: "#1e40af", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "40% 60%",
        colorStops: [
          { color: "#10b981", position: 0, opacity: 70 },
          { color: "#059669", position: 40, opacity: 50 },
          { color: "#047857", position: 80, opacity: 30 },
          { color: "#065f46", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "90% 10%",
        colorStops: [
          { color: "#ef4444", position: 0, opacity: 60 },
          { color: "#dc2626", position: 40, opacity: 40 },
          { color: "#b91c1c", position: 80, opacity: 20 },
          { color: "#991b1b", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
    ],
  },
  target: {
    shape: "circle",
    layers: [
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "#000000", position: 0, opacity: 100 },
          { color: "#000000", position: 20, opacity: 100 },
          { color: "transparent", position: 20, opacity: 0 },
          { color: "transparent", position: 100, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "transparent", position: 20, opacity: 0 },
          { color: "#ffffff", position: 20, opacity: 100 },
          { color: "#ffffff", position: 40, opacity: 100 },
          { color: "transparent", position: 40, opacity: 0 },
          { color: "transparent", position: 100, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "transparent", position: 40, opacity: 0 },
          { color: "#dc2626", position: 40, opacity: 100 },
          { color: "#dc2626", position: 60, opacity: 100 },
          { color: "transparent", position: 60, opacity: 0 },
          { color: "transparent", position: 100, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "transparent", position: 60, opacity: 0 },
          { color: "#ffffff", position: 60, opacity: 100 },
          { color: "#ffffff", position: 80, opacity: 100 },
          { color: "transparent", position: 80, opacity: 0 },
          { color: "transparent", position: 100, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "transparent", position: 80, opacity: 0 },
          { color: "#dc2626", position: 80, opacity: 100 },
          { color: "#dc2626", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "dark-pattern": {
    shape: "rectangle",
    layers: [
      {
        type: "repeating-linear-gradient",
        angle: 0,
        colorStops: [
          { color: "#1f1f1f", position: 0, opacity: 100, unit: "px" },
          { color: "#1f1f1f", position: 2, opacity: 100, unit: "px" },
          { color: "#2a2a2a", position: 2, opacity: 100, unit: "px" },
          { color: "#2a2a2a", position: 6, opacity: 100, unit: "px" },
        ],
      },
    ],
  },
  "paper-noise": {
    shape: "rectangle",
    layers: [
      {
        type: "repeating-radial-gradient",
        position: "center",
        colorStops: [
          { color: "#000000", position: 0, opacity: 3, unit: "px" },
          { color: "#000000", position: 1, opacity: 3, unit: "px" },
          { color: "transparent", position: 1, opacity: 0, unit: "px" },
          { color: "transparent", position: 6, opacity: 0, unit: "px" },
        ],
      },
    ],
  },
  "generative-texture": {
    shape: "rectangle",
    layers: [
      {
        type: "repeating-radial-gradient",
        position: "20% 30%",
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 8, unit: "px" },
          { color: "#ffffff", position: 2, opacity: 8, unit: "px" },
          { color: "transparent", position: 4, opacity: 0, unit: "px" },
        ],
      },
      {
        type: "repeating-radial-gradient",
        position: "80% 70%",
        colorStops: [
          { color: "#000000", position: 0, opacity: 10, unit: "px" },
          { color: "#000000", position: 3, opacity: 10, unit: "px" },
          { color: "transparent", position: 6, opacity: 0, unit: "px" },
        ],
      },
      {
        type: "linear-gradient",
        angle: 135,
        colorStops: [
          { color: "#667eea", position: 0, opacity: 100, unit: "%" },
          { color: "#764ba2", position: 100, opacity: 100, unit: "%" },
        ],
      },
    ],
  },
  "pseudo-liquid-metal": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "30% 30%",
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 35 },
          { color: "transparent", position: 40, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "70% 60%",
        colorStops: [
          { color: "#000000", position: 0, opacity: 35 },
          { color: "transparent", position: 45, opacity: 0 },
        ],
      },
      {
        type: "linear-gradient",
        angle: 120,
        colorStops: [
          { color: "#bdc3c7", position: 0, opacity: 100 },
          { color: "#2c3e50", position: 50, opacity: 100 },
          { color: "#bdc3c7", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "fractal-techno-pattern": {
    shape: "rectangle",
    layers: [
      {
        type: "repeating-linear-gradient",
        angle: 90,
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 5 },
          { color: "#ffffff", position: 1, opacity: 5, unit: "px" },
          { color: "transparent", position: 1, opacity: 0, unit: "px" },
          { color: "transparent", position: 12, opacity: 0, unit: "px" },
        ],
      },
      {
        type: "repeating-linear-gradient",
        angle: 0,
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 3 },
          { color: "#ffffff", position: 1, opacity: 3, unit: "px" },
          { color: "transparent", position: 1, opacity: 0, unit: "px" },
          { color: "transparent", position: 16, opacity: 0, unit: "px" },
        ],
      },
      {
        type: "linear-gradient",
        angle: 135,
        colorStops: [
          { color: "#141e30", position: 0, opacity: 100 },
          { color: "#243b55", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "abstract-spots": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "20% 30%",
        colorStops: [
          { color: "#ff6a00", position: 0, opacity: 100 },
          { color: "transparent", position: 50, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "80% 20%",
        colorStops: [
          { color: "#ee0979", position: 0, opacity: 100 },
          { color: "transparent", position: 45, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "50% 80%",
        colorStops: [
          { color: "#00c6ff", position: 0, opacity: 100 },
          { color: "transparent", position: 50, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "linear-gradient",
        angle: 0,
        colorStops: [
          { color: "#0f2027", position: 0, opacity: 100 },
          { color: "#0f2027", position: 100, opacity: 100 },
        ],
        blendMode: "normal",
      },
    ],
  },
  "offset-ellipse-demo": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "top left",
        radialShape: "ellipse",
        radialSize: "farthest-corner",
        colorStops: [
          { color: "#fddb92", position: 0, opacity: 100 },
          { color: "#d1fdff", position: 50, opacity: 100 },
          { color: "#ffffff", position: 100, opacity: 100 },
        ],
        blendMode: "normal",
      },
    ],
  },
  "deep-dark-gradient": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "center",
        radialShape: "ellipse",
        radialSize: "farthest-corner",
        colorStops: [
          { color: "#434343", position: 0, opacity: 100 },
          { color: "#1c1c1c", position: 60, opacity: 100 },
          { color: "#000000", position: 100, opacity: 100 },
        ],
        blendMode: "normal",
      },
    ],
  },
  "lined-notebook": {
    shape: "rectangle",
    layers: [
      {
        type: "linear-gradient",
        angle: 90,
        colorStops: [
          { color: "transparent", position: 40, opacity: 0, unit: "px" },
          { color: "#ff6b6b", position: 40, opacity: 100, unit: "px" },
          { color: "#ff6b6b", position: 42, opacity: 100, unit: "px" },
          { color: "transparent", position: 42, opacity: 0, unit: "px" },
        ],
        blendMode: "normal",
      },
      {
        type: "repeating-linear-gradient",
        angle: 180,
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 100, unit: "px" },
          { color: "#ffffff", position: 23, opacity: 100, unit: "px" },
          { color: "#cfd8ff", position: 24, opacity: 100, unit: "px" },
        ],
        blendMode: "normal",
      },
    ],
  },
};

function loadPreset(presetName) {
  const preset = PRESETS[presetName];
  if (!preset) return;

  AppState.layers = [];
  AppState.nextLayerId = 0;
  AppState.selectedLayerId = null;

  // Устанавливаем форму превью
  const shape = preset.shape || "rectangle";
  document.getElementById("previewShape").value = shape;
  // Обновляем класс превью элемента
  document.getElementById("preview").className = `preview ${shape}`;

  preset.layers.forEach((layerData) => {
    const layer = {
      id: `layer-${AppState.nextLayerId++}`,
      type: layerData.type,
      angle: layerData.angle ?? 90,
      position: layerData.position || "center",
      radialShape: layerData.radialShape || "circle",
      radialSize: layerData.radialSize || "farthest-corner",
      colorStops: layerData.colorStops,
      blendMode: layerData.blendMode || "normal",
    };
    AppState.layers.push(layer);
  });

  if (AppState.layers.length > 0) {
    AppState.selectedLayerId = AppState.layers[0].id;
  }

  updateUI();
  showNotification(`Preset "${presetName}" загружен!`);
}
